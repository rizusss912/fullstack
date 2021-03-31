import {Schema} from "mongoose";
import {Condition} from "./enums/condition.enum";
import * as mongoose from "mongoose";
import {StepFieldType} from "./enums/step-field-type.enum";
import {Model} from "./enums/model.enum";
import {generalPartOfSchemaForModuleObjects} from "./interfaces/abstract-module-object";

const stepFieldSchema = new Schema(
    generalPartOfSchemaForModuleObjects,
    {
        discriminatorKey: 'type',
    },
);

const textFieldSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Отсутствует текст'],
    },
    title: {
        type: String,
        required: false,
    },
});

const YoutubeVideoFieldSchema = new Schema({
    video_id: {
        type: String,
        required: [true, 'Отсутствует id видео'],
    },
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
});

const stepFieldDiscriminatorsSchems: Record<StepFieldType, Schema> = {
    Text: textFieldSchema,
    YoutubeVideo: YoutubeVideoFieldSchema,
}

Object.keys(stepFieldDiscriminatorsSchems).forEach((key: StepFieldType) => stepFieldSchema.discriminator(key, stepFieldDiscriminatorsSchems[key]));


export const StepField = mongoose.model<StepFieldModel & Document>(Model.StepField, stepFieldSchema);
