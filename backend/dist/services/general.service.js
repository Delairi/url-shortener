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
Object.defineProperty(exports, "__esModule", { value: true });
const general_model_1 = require("../models/general.model");
const generalService = () => {
    return {
        existLink: ({ url }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const exist_link = yield general_model_1.client.ft.search('idx:urls', url);
                return exist_link.documents.length === 0 ? false : true;
            }
            catch (err) {
                throw new Error('no exist link');
            }
        }),
        getLink: ({ url }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const link = yield general_model_1.client.ft.search('idx:urls', url);
                return link;
            }
            catch (err) {
                throw new Error('no exist link');
            }
        })
    };
};
exports.default = generalService;
