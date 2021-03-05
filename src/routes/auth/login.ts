import express, {Request, Response, Router} from 'express';
import {User} from "../../models/user";
import {UserLoginRequest} from "./interfaces/user-login-request";
import {UserLoginResponse} from "./interfaces/user-login-response";
import {getTokenByUserModel} from "./functions/get-token-by-user";

const router: Router = express.Router();

async function login(req: Request, res: Response) {
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

    const response: UserLoginResponse = {
        access_token: `Bearer ${getTokenByUserModel(candidate)}`,
    };

    res.status(200).json(response);
}

router.post('/login', login);

export const loginRouter: Router = router;
