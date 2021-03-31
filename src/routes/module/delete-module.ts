import {Request, Response} from "express";
import {UserModel} from "../../models/interfaces/user.model";
import {MODULE_ID_PARAMS_NAME} from "./module.router";
import {Module} from "../../models/module";
import {errorHandler} from "../../utils/error-handler";

export async function deleteModule(req: Request, res: Response, user: UserModel) {
    try {
        const _id = req.params[MODULE_ID_PARAMS_NAME];

        await Module.remove({_id});

        res.status(200);
    } catch (error) {
        errorHandler(res, error);
    }
}
