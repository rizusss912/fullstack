import {AbstractModuleObject} from "./abstract-module-object";

export interface LessonModel extends AbstractModuleObject {
    steps: string[],
    title: string,
}
