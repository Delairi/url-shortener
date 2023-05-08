"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isUrl({ str }) {
    console.log(str);
    const urlRegex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return urlRegex.test(str);
}
exports.default = isUrl;
