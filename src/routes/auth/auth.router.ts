import express, {Router} from 'express';
import {login} from "./login";
import {RequestProcessingFactory} from "../../middleware/request-processing.factory";
import {register} from "./register";
import passport from "passport";
import {refresh} from "./refresh";

const router: Router = express.Router();

router.post('/login', RequestProcessingFactory.unauthorized(login));
router.put('/register', RequestProcessingFactory.unauthorized(register));
router.post('/refresh', passport.authenticate('refresh_token', {session: false}), RequestProcessingFactory.hasRelevantRefreshAndAccessTokens(refresh));


export const authRouter: Router = router;
