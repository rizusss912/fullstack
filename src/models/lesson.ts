import {Schema} from "mongoose";
import * as mongoose from "mongoose";
import {Model} from "./enums/model.enum";
import {LessonModel} from "./interfaces/lesson.model";
import {generalPartOfSchemaForModuleObjects} from "./interfaces/abstract-module-object";

const lessonSchema = new Schema({
    ...generalPartOfSchemaForModuleObjects,
    steps: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: Model.Lesson,
    },
    title: {
       type: String,
       required: [true, 'Отсутствует название урока'],
    },
});

export const Lesson = mongoose.model<LessonModel & Document>(Model.Lesson, lessonSchema);
