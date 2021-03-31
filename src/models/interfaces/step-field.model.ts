import {StepFieldType} from "../enums/step-field-type.enum";
import {AbstractModuleObject} from "./abstract-module-object";

interface AbstractFieldModel extends AbstractModuleObject {
    type: StepFieldType,
}


export interface TextField extends AbstractFieldModel {
    text: string,
    title?: string,
}

export interface YoutubeVideoField extends AbstractFieldModel {
    video_id: string,
    title?: string,
    description?: string,
}

export type StepFieldModel = TextField | YoutubeVideoField;
