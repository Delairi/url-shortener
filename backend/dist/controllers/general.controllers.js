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
const general_model_1 = require("../models/general.model");
const general_service_1 = __importDefault(require("../services/general.service"));
const randomstring_1 = __importDefault(require("randomstring"));
const IsUrl_1 = __importDefault(require("../utils/IsUrl"));
const generalController = () => {
    return {
        postLink: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const url = (req.body.url).replace(/[^a-zA-Z0-9]/g, "");
            const real = req.body.url;
            const short = randomstring_1.default.generate({
                length: 8,
                charset: url,
            });
            try {
                const verify = (0, IsUrl_1.default)({ str: req.body.url });
                if (verify) {
                    const exist = yield (0, general_service_1.default)().existLink({ url });
                    if (!exist) {
                        yield general_model_1.client.json.set(`url:${url}`, '$', {
                            link: url,
                            short: short,
                            real: real,
                        });
                        return { short: short, url: real, exist: false };
                    }
                    else {
                        const data = (yield (0, general_service_1.default)().getLink({ url })).documents[0].value;
                        return { url: data.real, short: data.short, exist: true };
                    }
                }
                else {
                    return { message: 'Invalid URL' };
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).json({
                    message: 'Internal Server Error',
                });
            }
        }),
        getLink: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const short = (req.query.short ? req.query.short : '').toString();
                const exist_link = yield (0, general_service_1.default)().existLink({ url: short });
                if (!exist_link) {
                    return res.status(404).send({
                        message: 'Not Found',
                    });
                }
                else {
                    const data = (yield ((0, general_service_1.default)().getLink({ url: short }))).documents[0].value;
                    return { link: data.real, exist: true };
                }
            }
            catch (err) {
                res.status(500).json({
                    message: 'Internal Server Error',
                });
            }
        })
    };
};
exports.default = generalController;
