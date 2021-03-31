import {Request, Response} from "express";
import {UserModel} from "../../models/interfaces/user.model";
import {MODULE_ID_PARAMS_NAME} from "./module.router";
import {Module} from "../../models/module";
import {errorHandler} from "../../utils/error-handler";
import {copyKeys} from "./functions/copy-keys";

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

        res.status(200);
    } catch (error) {
        errorHandler(res, error);
    }
}
