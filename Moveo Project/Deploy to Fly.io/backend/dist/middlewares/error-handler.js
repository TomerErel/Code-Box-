"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var zod_1 = require("zod");
var errors_1 = require("../errors");
function errorHandler(err, req, res, next) {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json(err.issues);
    }
    if (err instanceof errors_1.NotFoundError) {
        return res.status(404).json({ message: err.message });
    }
    if (err instanceof errors_1.CollisionError) {
        return res.status(409).json({ message: err.message });
    }
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong!' });
}
exports.errorHandler = errorHandler;
