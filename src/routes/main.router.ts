import express, {Router} from 'express';
import {userRouter} from "./user/user.router";
import {authRouter} from "./auth/auth.router";
import {moduleRouter} from "./module/module.router";

const router: Router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/module', moduleRouter);

export const mainRouter: Router = router;

