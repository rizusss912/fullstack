import {Request, Response} from "express";
import {UserModel} from "../../models/interfaces/user.model";
import {Module} from "../../models/module";
import {RightsManager} from "../../utils/rights-manager.class";
import {Condition} from "../../models/enums/condition.enum";
import {errorHandler} from "../../utils/error-handler";
import {ModuleModel} from "../../models/interfaces/module.model";
import {Action} from "../../enums/Action.enum";
import {mapModuleModelToModuleConfig} from "./functions/map-module-model-to-module-config";

export interface ModuleConfig {
    title: string,
    description: string,
    price: number,
    _id: string | undefined,
    condition?: Condition,
    canChangeModule?: boolean,
}

export type ModuleListResponse = ModuleConfig[];

export async function getModuleListByUnauthorized(req: Request, res: Response) {
    try {
        const moduleList: ModuleModel[] = await Module.find({condition: Condition.Valid});
        const response: ModuleListResponse = moduleList.map((model: ModuleModel) => mapModuleModelToModuleConfig(model));

        res.status(200).json(response);
    } catch (error) {
        errorHandler(res, error);
    }
}

export async function getModuleListByAuthorized(req: Request, res: Response, user: UserModel) {
    try {
        const rightsManager: RightsManager = new RightsManager(user);
        const canChangeModule = rightsManager.canUseAction(Action.changeModule);
        const moduleList: ModuleModel[] = rightsManager.isModerator ? await Module.find() : await Module.find({condition: Condition.Valid});
        const response: ModuleListResponse = moduleList.map((model: ModuleModel) => mapModuleModelToModuleConfig(model, rightsManager.isModerator, canChangeModule));

        res.status(200).json(response);
    } catch (error) {
        errorHandler(res, error);
    }
}
