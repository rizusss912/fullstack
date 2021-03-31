import {Request, Response} from "express";
import {UserModel} from "../../models/interfaces/user.model";
import {MODULE_ID_PARAMS_NAME} from "./module.router";
import {Module} from "../../models/module";
import {errorHandler} from "../../utils/error-handler";
import {copyKeys} from "./functions/copy-keys";
import {ModuleConfig} from "./module-list";
import {mapModuleModelToModuleConfig} from "./functions/map-module-model-to-module-config";
import {RightsManager} from "../../utils/rights-manager.class";
import {Action} from "../../enums/Action.enum";
import {ModuleModel} from "../../models/interfaces/module.model";

export interface PatchModuleRequest {
    lessons?: string[],
    title?: string,
    price?: number,
    description?: string,
}

export async function patchModule(req: Request, res: Response, user: UserModel) {
    try {
        const _id = req.params[MODULE_ID_PARAMS_NAME];
        const params: PatchModuleRequest = copyKeys<PatchModuleRequest, any>(req.body, 'lessons', 'title', 'price', 'description');

        if (!Object.keys(params).length) {
            res.status(400).json({message: 'Нет параметров'});
            return;
        }

        await Module.update({_id}, params);

        const rights = new RightsManager(user);
        const newModel: ModuleModel | null = await Module.findById(_id);

        if (!newModel) {
            res.status(404).json({message: `Нет модудя с id = ${_id}`});
            return;
        }
        const response: ModuleConfig = mapModuleModelToModuleConfig(newModel, rights.isModerator, rights.canUseAction(Action.changeModule));

        res.status(200).json(response);
    } catch (error) {
        errorHandler(res, error);
    }
}
