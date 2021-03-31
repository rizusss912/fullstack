import {Request, Response} from "express";
import {UserModel} from "../models/interfaces/user.model";
import {authenticate} from "passport";
import {decode} from 'jsonwebtoken';
import {errorHandler} from "../utils/error-handler";
import {RightsManager} from "../utils/rights-manager.class";
import {Action} from "../enums/Action.enum";

export type createdHandler = (req: Request, res: Response) => void;

export type unauthorizedImplementer = (req: Request, res: Response) => void;
export type authorizedImplementer = (req: Request, res: Response, user: UserModel) => void;
export type refreshedImplementer = (req: Request, res: Response) => void;

export class RequestProcessingFactory {
    public static unauthorized(handler: unauthorizedImplementer): createdHandler {
        return function (req: Request, res: Response) {
            try {
                handler(req, res);
            } catch (error) {
                errorHandler(res, error);
            }
        }
    }

    public static maybeAuthorized(unauthorizedHandler: unauthorizedImplementer, authorizedHandler: authorizedImplementer): createdHandler {
        return RequestProcessingFactory.unauthorized(
            async function (req: Request, res: Response) {
                if (!!req.headers.authorization) {
                    RequestProcessingFactory.authorized(authorizedHandler)(req, res);
                } else {
                    unauthorizedHandler(req, res);
                }
            },
        );
    }

    public static authorized(handler: authorizedImplementer, action: Action | null = null): createdHandler {
        return RequestProcessingFactory.unauthorized(
            async function (req: Request, res: Response) {
                await authenticate(
                    'jwt',
                    {session: false},
                    function (err, user: UserModel) {
                            if (err || !user) {
                                res.status(401).json({message: err || 'Необходимо авторизироваться'});
                                return;
                            }

                            if (!!action && !RequestProcessingFactory.canUseAction(action, user)) {
                                res.status(403).json({message: err || `Необходим доступ для ${action}`});
                                return;
                            }

                            handler(req, res, user);
                    },
                )(req, res);
            },
        );
    }

    public static onlyModerator(handler: authorizedImplementer, action: Action | null = null): createdHandler {
        return RequestProcessingFactory.authorized(
            function (req: Request, res: Response, user: UserModel) {
                if (!(new RightsManager(user).isModerator)) {
                    res.status(403).json({message: 'Нужны права модератора'});
                    return;
                }

                handler(req, res, user);
            },
            action,
        );
    }

    public static onlyAdmin(handler: authorizedImplementer, action: Action | null = null): createdHandler {
        return RequestProcessingFactory.authorized(
            function (req: Request, res: Response, user: UserModel) {
                if (!(new RightsManager(user).isAdmin)) {
                    res.status(403).json({message: 'Нужны права администратора'});
                    return;
                }

                handler(req, res, user);
            },
            action,
        );
    }

    public static hasRelevantRefreshAndAccessTokens(handler: refreshedImplementer): createdHandler {
        return RequestProcessingFactory.unauthorized(
            function (req: Request, res: Response) {
                if (!req.headers.authorization) {
                    res.status(412).json({message: 'Нет токена авторизации'});
                    return;
                }

                if (!req.body.refresh_token) {
                    res.status(400).json({message: 'Нет токена обновления'});
                    return;
                }

                const access_token_payload = decode(req.headers.authorization.replace('Bearer ', ''), {json: true});
                const refresh_token_payload = decode(req.body.refresh_token, {json: true});

                if (!access_token_payload?.created || !refresh_token_payload?.created || !access_token_payload?._id || !refresh_token_payload?._id) {
                    res.status(400).json({message: 'Некорректные токены'});
                    return;
                }

                if (access_token_payload.created !== refresh_token_payload.created || access_token_payload._id !== refresh_token_payload._id) {
                    res.status(400).json({message: 'Токены не совместимы'});
                    return;
                }

                handler(req, res);
            },
        );
    }

    private static canUseAction(action: Action, user: UserModel): boolean {
        return new RightsManager(user).canUseAction(action);
    }
}
