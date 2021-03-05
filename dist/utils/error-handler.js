"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(res, error) {
    res.status(500).json({
        message: (error === null || error === void 0 ? void 0 : error.message) || error || "unknown error",
    });
}
exports.errorHandler = errorHandler;
