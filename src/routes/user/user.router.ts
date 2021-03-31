import express, {Router} from 'express';
import {info} from "./info";
import {RequestProcessingFactory} from "../../middleware/request-processing.factory";

const router: Router = express.Router();

router.get('/info', RequestProcessingFactory.authorized(info));

export const userRouter: Router = router;
