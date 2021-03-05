"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenByUserModel = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getTokenByUserModel(user) {
    return jsonwebtoken_1.default.sign({
        _id: user._id,
    }, 'dev-jwt', {
        expiresIn: 60 * 60,
    });
}
exports.getTokenByUserModel = getTokenByUserModel;
