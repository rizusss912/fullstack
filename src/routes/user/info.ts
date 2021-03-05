import express, {NextFunction, Router} from 'express';
import passport from "passport";
import {Request, Response} from "express";
import jwt from 'jsonwebtoken';
import {UserInfoResponse} from "./innterfaces/user-info";
import {UserModel} from "../../models/interfaces/user.model";
// @ts-ignore

const router: Router = express.Router();

async function info(req: Request, res: Response, next: NextFunction) {
    await passport.authenticate('jwt', {session: false} , function(err, user: UserModel) {
        try {
            if (err || !user) {
                res.status(401).json({message: err || 'Unauthorized'});
                return;
            }

            const response: UserInfoResponse = {
                login: user.login,
            };

            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    })(req, res, next);
}


router.get('/info', info);

export const infoRoutes: Router = router;
