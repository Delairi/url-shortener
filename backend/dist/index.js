"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const general_model_1 = __importStar(require("./models/general.model"));
const general_route_1 = __importDefault(require("./routes/general.route"));
dotenv_1.default.config();
const Main = () => __awaiter(void 0, void 0, void 0, function* () {
    general_model_1.client.on('error', err => console.log('Redis Client Error', err));
    yield general_model_1.client.connect();
    yield (0, general_model_1.default)().then(() => console.log('Index Created')).catch(err => console.log(err));
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
    app.use('/api/v1', general_route_1.default);
    app.get('/*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../build', 'index.html'));
    });
    app.listen(4002, () => {
        console.log('Server is running on port 4002');
    });
});
Main().catch(err => console.log(err));
