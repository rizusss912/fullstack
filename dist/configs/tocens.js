"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN = exports.ACCESS_TOKEN = void 0;
exports.ACCESS_TOKEN = {
    secretOrKey: 'dev-jwt',
    options: {
        expiresIn: 15 * 60,
    }
};
exports.REFRESH_TOKEN = {
    secretOrKey: 'dev-jwt',
    options: {
        expiresIn: 30 * 24 * 60 * 60,
    }
};
