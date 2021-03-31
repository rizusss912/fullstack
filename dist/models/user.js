"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var user_1 = require("./configs/user");
var status_enum_1 = require("./enums/status.enum");
var model_enum_1 = require("./enums/model.enum");
var userSchema = new mongoose_1.Schema({
    login: {
        type: String,
        required: [true, "\u041F\u043E\u043B\u0435 login \u043D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E"],
        maxlength: [user_1.USER.MAX_LOGIN_LENGTH, "\u0414\u043B\u0438\u043D\u0430 \u043B\u043E\u0433\u0438\u043D\u0430 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 " + user_1.USER.MAX_LOGIN_LENGTH],
        minlength: [user_1.USER.MIN_LOGIN_LENGTH, "\u0414\u043B\u0438\u043D\u0430 \u043B\u043E\u0433\u0438\u043D\u0430 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435 " + user_1.USER.MIN_LOGIN_LENGTH],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "\u041F\u043E\u043B\u0435 password \u043D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E"],
        minlength: [user_1.USER.MIN_PASSWORD_LENGTH, "\u0414\u043B\u0438\u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435 " + user_1.USER.MIN_PASSWORD_LENGTH],
        maxlength: [user_1.USER.MAX_PASSWORD_LENGTH, "\u0414\u043B\u0438\u043D\u0430 \u043F\u0430\u0440\u043E\u043B\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 " + user_1.USER.MAX_PASSWORD_LENGTH],
    },
    created: {
        type: Date,
        required: [true, "\u041F\u043E\u043B\u0435 created \u043D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E"],
        default: Date.now,
    },
    statuses: {
        type: [String],
        enum: status_enum_1.Status,
        required: false,
        default: [],
    },
});
exports.User = mongoose_1.default.model(model_enum_1.Model.User, userSchema);
