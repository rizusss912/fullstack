"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = void 0;
var get_authorisation_by_user_model_1 = require("./functions/get-authorisation-by-user-model");
// TODO: Сейчас refresh_token можно юзать несколько раз и это нужно исправить
var refresh = function (req, res) {
    if (req.user) {
        // @ts-ignore
        res.status(200).json(get_authorisation_by_user_model_1.getAuthorisationDataByUserModel(req.user));
    }
    else {
        res.status(400);
    }
};
exports.refresh = refresh;
