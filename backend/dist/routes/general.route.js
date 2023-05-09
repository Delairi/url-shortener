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
const general_controllers_1 = __importDefault(require("../controllers/general.controllers"));
const routeGeneral = express_1.default.Router();
routeGeneral.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get_link = yield (0, general_controllers_1.default)().getLink(req, res);
        res.send(get_link);
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
}));
routeGeneral.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postLinks = yield (0, general_controllers_1.default)().postLink(req, res);
        res.send(postLinks);
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
}));
exports.default = routeGeneral;
