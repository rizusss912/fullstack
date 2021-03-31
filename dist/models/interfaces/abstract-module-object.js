"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalPartOfSchemaForModuleObjects = void 0;
var condition_enum_1 = require("../enums/condition.enum");
var mongoose_1 = require("mongoose");
var model_enum_1 = require("../enums/model.enum");
exports.generalPartOfSchemaForModuleObjects = {
    created: {
        type: Date,
        required: [true, 'Не указана дата создания'],
        default: Date.now,
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Не указан создатель'],
        ref: model_enum_1.Model.User,
    },
    condition: {
        type: String,
        enum: condition_enum_1.Condition,
        required: true,
        default: condition_enum_1.Condition.Hidden,
    },
};
