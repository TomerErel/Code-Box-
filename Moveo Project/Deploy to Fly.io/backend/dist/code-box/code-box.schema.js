"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeBoxParams = exports.codeBox = void 0;
var zod_1 = require("zod");
exports.codeBox = zod_1.z.object({
    title: zod_1.z.string(),
    code: zod_1.z.string()
});
exports.codeBoxParams = zod_1.z.object({
    title: zod_1.z.string(),
});
