import {Request, Response} from 'express';
import {User} from "../../models/user";
import {errorHandler} from "../../utils/error-handler";
import {AuthorisationData, getAuthorisationDataByUserModel} from "./functions/get-authorisation-by-user-model";
import {unauthorizedImplementer} from "../../middleware/request-processing.factory";
import {admin} from "../../configs/admin";
import {Status} from "../../models/enums/status.enum";

    // TODO: Сейчас пароли хранятся в открытом виде, их нужно кодировать
export const register: unauthorizedImplementer = async (req: Request, res: Response) => {
    try {
        const user = new User({
            ...req.body,
            created: Date.now(),
            statuses: admin.use && admin.login === req.body.login ? [Status.Admin] : [],
        });

        await user.save();
        
        const response: AuthorisationData = getAuthorisationDataByUserModel(user);

        res.status(201).json(response);
    } catch (error) {
        errorHandler(res, error);
    }
}
