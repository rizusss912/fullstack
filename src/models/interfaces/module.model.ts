import {AbstractModuleObject} from "./abstract-module-object";

export interface ModuleModel extends AbstractModuleObject {
    lessons: string[],
    title: string,
    price: number,
    description: string,
    _id: string,
}
