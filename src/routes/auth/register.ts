import express, {Request, Response, Router} from 'express';
import {User} from "../../models/user";
import {errorHandler} from "../../utils/error-handler";
import {UserLoginResponse} from "./interfaces/user-login-response";
import {getTokenByUserModel} from "./functions/get-token-by-user";

const router: Router = express.Router();

async function register(req: Request, res: Response) {
    try {
        const user = new User({
            ...req.body,
            created: Date.now(),
        });

        await user.save();

        const response: UserLoginResponse = {
            access_token: `Bearer ${getTokenByUserModel(user)}`,
        };

        res.status(201).json(response);
    } catch (error) {
        errorHandler(res, error);
    }
}

router.post('/register', register);

export const registerRouter: Router = router;
