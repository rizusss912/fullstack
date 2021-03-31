"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = void 0;
var error_handler_1 = require("../../utils/error-handler");
var info = function (req, res, user) {
    try {
        var response = {
            login: user.login,
        };
        res.status(200).json(response);
    }
    catch (error) {
        error_handler_1.errorHandler(res, error);
    }
};
exports.info = info;
