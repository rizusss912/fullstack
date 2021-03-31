import {Request, Response} from "express";
import {UserModel} from "../../models/interfaces/user.model";
import {Module} from "../../models/module";
import {Condition} from "../../models/enums/condition.enum";
import {errorHandler} from "../../utils/error-handler";
import {mapModuleModelToModuleConfig} from "./functions/map-module-model-to-module-config";
import {ModuleConfig} from "./module-list";

export interface ModuleCreateRequest {
    title: string,
    description: string,
    condition?: Condition,
    lessons?: string[],
}

export async function createModule(req: Request, res: Response, user: UserModel) {
    try {
        const request: ModuleCreateRequest = req.body;

        const module = new Module({
            ...request,
            creator: user._id,
            created: Date.now(),
        });

        await module.save();

        const response: ModuleConfig = mapModuleModelToModuleConfig(module);

        res.status(201).json(response);
    }
    catch (e) {
        errorHandler(res, e)
    }
 };
