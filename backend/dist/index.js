"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const redis_1 = require("redis");
const randomstring_1 = __importDefault(require("randomstring"));
const dotenv_1 = __importDefault(require("dotenv"));
const IsUrl_1 = __importDefault(require("./utils/IsUrl"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const client = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});
const IndexUrl = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.ft.create('idx:urls', {
        '$.link': {
            type: redis_1.SchemaFieldTypes.TEXT,
            AS: 'link',
        },
        '$.short': {
            type: redis_1.SchemaFieldTypes.TEXT,
            AS: 'short',
        },
        '$.real': {
            type: redis_1.SchemaFieldTypes.TEXT,
            AS: 'real',
        }
    }, {
        ON: 'JSON',
        PREFIX: ['url:'],
    });
});
const Main = () => __awaiter(void 0, void 0, void 0, function* () {
    client.on('error', err => console.log('Redis Client Error', err));
    yield client.connect();
    yield IndexUrl().then(() => console.log('Index Created')).catch(err => console.log(err));
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.static(path_1.default.join(__dirname, '../build')));
    process.env.NODE_ENV == 'development' && app.use((0, cors_1.default)({
        origin: 'http://localhost:3002',
    }));
    process.env.NODE_ENV == 'production' && app.use((0, cors_1.default)({
        origin: 'https://shortener.delairis.com',
    }));
    app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('okkkk');
        const short = req.query.short;
        try {
            const exist_link = yield client.ft.search('idx:urls', short);
            if (exist_link.documents.length === 0) {
                return res.status(404).send({
                    message: 'Not Found',
                });
            }
            else {
                const data = exist_link.documents[0].value;
                return res.send({ link: data.real, exist: true });
            }
        }
        catch (err) {
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    }));
    app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const verify = (0, IsUrl_1.default)({ str: req.body.url });
        console.log("it is?", verify);
        if (verify) {
            const url = (req.body.url).replace(/[^a-zA-Z0-9]/g, "");
            const real = req.body.url;
            const short = randomstring_1.default.generate({
                length: 8,
                charset: url,
            });
            try {
                const exist_link = yield client.ft.search('idx:urls', url);
                if (exist_link.documents.length === 0) {
                    yield client.json.set(`url:${url}`, '$', {
                        link: url,
                        short: short,
                        real: real,
                    });
                    return res.send({ short: short, url: real, exist: false });
                }
                else {
                    const data = exist_link.documents[0].value;
                    return res.send({ url: data.real, short: data.short, exist: true });
                }
            }
            catch (err) {
                res.status(500).json({
                    message: 'Internal Server Error',
                });
            }
        }
        else {
            return res.status(400).send({
                message: 'Invalid URL',
            });
        }
    }));
    app.get('/*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../build', 'index.html'));
    });
    app.listen(4002, () => {
        console.log('Server is running on port 4002');
    });
});
Main().catch(err => console.log(err));
