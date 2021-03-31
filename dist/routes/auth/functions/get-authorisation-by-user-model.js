"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthorisationDataByUserModel = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var tocens_1 = require("../../../configs/tocens");
function getTokensByUserModel(user) {
    var created = Date.now();
    var access_token = jsonwebtoken_1.sign({
        _id: user._id,
        created: created,
    }, tocens_1.ACCESS_TOKEN.secretOrKey, tocens_1.ACCESS_TOKEN.options);
    var refresh_token = jsonwebtoken_1.sign({
        _id: user._id,
        created: created,
    }, tocens_1.REFRESH_TOKEN.secretOrKey, tocens_1.REFRESH_TOKEN.options);
    return { access_token: access_token, refresh_token: refresh_token };
}
function getAuthorisationDataByUserModel(user) {
    var getPublicParams = function (_a) {
        var statuses = _a.statuses;
        return { statuses: statuses };
    };
    return Object.assign(getTokensByUserModel(user), getPublicParams(user));
}
exports.getAuthorisationDataByUserModel = getAuthorisationDataByUserModel;
