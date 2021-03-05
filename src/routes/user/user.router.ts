import express, {Router} from 'express';
import {infoRoutes} from "./info";

const router: Router = express.Router();

router.use('/user', infoRoutes);

export const userRouter: Router = router;
