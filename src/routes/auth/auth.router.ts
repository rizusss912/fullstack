import express, {Router} from 'express';
import {loginRouter} from "./login";
import {registerRouter} from "./register";

const router: Router = express.Router();

router.use('/auth', loginRouter);
router.use('/auth', registerRouter);

export const authRouter: Router = router;
