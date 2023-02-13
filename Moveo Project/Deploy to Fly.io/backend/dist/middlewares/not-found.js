"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
function notFound(req, res) {
    return res.status(404).json({ message: 'Route path not found!' });
}
exports.notFound = notFound;
