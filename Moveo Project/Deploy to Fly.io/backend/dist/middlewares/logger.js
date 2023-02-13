"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
function logger(req, res, next) {
    console.log("Method: ".concat(req.method, ", url: ").concat(req.originalUrl));
    next();
}
exports.logger = logger;
