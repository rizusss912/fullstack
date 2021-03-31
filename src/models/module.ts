import {Schema} from "mongoose";
import * as mongoose from "mongoose";
import {Model} from "./enums/model.enum";
import {generalPartOfSchemaForModuleObjects} from "./interfaces/abstract-module-object";
import {ModuleModel} from "./interfaces/module.model";

const moduleSchema = new Schema({
    ...generalPartOfSchemaForModuleObjects,
    lessons: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: Model.Lesson,
    },
    title: {
        type: String,
        required: [true, 'Отсутствует название модуля'],
        unique: [true, 'Модуль с таким названием уже существует'],
    },
    description: {
        type: String,
        required: [true, 'Отсутствует описание модуля'],
    },
    price: {
        type: Number,
        default: 0,
    },
});

export const Module = mongoose.model<ModuleModel & Document>(Model.Module, moduleSchema);
