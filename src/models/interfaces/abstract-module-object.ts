import {Condition} from "../enums/condition.enum";
import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import {Model} from "../enums/model.enum";

export interface AbstractModuleObject extends mongoose.Document<string> {
    created: Date,
    creator: string,
    condition: Condition,
}

export const generalPartOfSchemaForModuleObjects = {
    created: {
        type: Date,
        required: [true, 'Не указана дата создания'],
        default: Date.now,
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: [true, 'Не указан создатель'],
        ref: Model.User,
    },
    condition: {
        type: String,
        enum: Condition,
        required: true,
        default: Condition.Hidden,
    },
}
