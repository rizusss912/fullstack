"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokensByUserModel = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var tocens_1 = require("../../../configs/tocens");
function getTokensByUserModel(user) {
    var created = Date.now();
    var access_token = jsonwebtoken_1.default.sign({
        _id: user._id,
        created: created,
    }, tocens_1.ACCESS_TOKEN.secretOrKey, tocens_1.ACCESS_TOKEN.options);
    var refresh_token = jsonwebtoken_1.default.sign({
        _id: user._id,
        created: created,
    }, tocens_1.REFRESH_TOKEN.secretOrKey, tocens_1.REFRESH_TOKEN.options);
    return { access_token: access_token, refresh_token: refresh_token };
}
exports.getTokensByUserModel = getTokensByUserModel;
