import express, {Router} from 'express';
import {userRouter} from "./user/user.router";
import {authRouter} from "./auth/auth.router";

const router: Router = express.Router();

router.use('/api', authRouter);
router.use('/api', userRouter);

export const mainRouter: Router = router;
