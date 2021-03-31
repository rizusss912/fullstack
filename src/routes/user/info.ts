import {Request, Response} from "express";
import {UserInfoResponse} from "./innterfaces/user-info";
import {UserModel} from "../../models/interfaces/user.model";
import {authorizedImplementer} from "../../middleware/request-processing.factory";
import {errorHandler} from "../../utils/error-handler";

export const info: authorizedImplementer = (req: Request, res: Response, user: UserModel) => {
    try {
        const response: UserInfoResponse = {
            login: user.login,
        };

        res.status(200).json(response);
    } catch (error) {
        errorHandler(res, error);
    }
}
