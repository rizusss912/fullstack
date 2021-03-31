import {Request, Response} from 'express';
import {User} from "../../models/user";
import {UserLoginRequest} from "./interfaces/user-login-request";
import {AuthorisationData, getAuthorisationDataByUserModel} from "./functions/get-authorisation-by-user-model";
import {unauthorizedImplementer} from "../../middleware/request-processing.factory";

export const login: unauthorizedImplementer = async (req: Request, res: Response) => {
    const {login, password}: UserLoginRequest = req.body;
    const candidate = await User.findOne({login});

    if (!candidate) {
        res.status(404).json({message: `Пользователь ${login} не найден`});
        return;
    }

    if (candidate.password !== password) {
        res.status(401).json({message: `Неверный пароль`});
        return;
    }

    const response: AuthorisationData = getAuthorisationDataByUserModel(candidate);

    res.status(200).json(response);
}

