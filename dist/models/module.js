"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.Module = void 0;
var mongoose_1 = require("mongoose");
var mongoose = __importStar(require("mongoose"));
var model_enum_1 = require("./enums/model.enum");
var abstract_module_object_1 = require("./interfaces/abstract-module-object");
var moduleSchema = new mongoose_1.Schema(__assign(__assign({}, abstract_module_object_1.generalPartOfSchemaForModuleObjects), { lessons: {
        type: [mongoose_1.Schema.Types.ObjectId],
        default: [],
        ref: model_enum_1.Model.Lesson,
    }, title: {
        type: String,
        required: [true, 'Отсутствует название модуля'],
        unique: [true, 'Модуль с таким названием уже существует'],
    }, description: {
        type: String,
        required: [true, 'Отсутствует описание модуля'],
    }, price: {
        type: Number,
        default: 0,
    } }));
exports.Module = mongoose.model(model_enum_1.Model.Module, moduleSchema);
