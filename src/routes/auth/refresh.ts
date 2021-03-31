import {Request, Response} from 'express';
import {getAuthorisationDataByUserModel} from "./functions/get-authorisation-by-user-model";
import {refreshedImplementer} from "../../middleware/request-processing.factory";

// TODO: Сейчас refresh_token можно юзать несколько раз и это нужно исправить
export const refresh: refreshedImplementer = (req: Request, res: Response) => {
    if (req.user) {
        // @ts-ignore
        res.status(200).json(getAuthorisationDataByUserModel(req.user));
    } else {
        res.status(400);
    }
}

