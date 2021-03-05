"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
var express_1 = __importDefault(require("express"));
var user_router_1 = require("./user/user.router");
var auth_router_1 = require("./auth/auth.router");
var router = express_1.default.Router();
router.use('/api', auth_router_1.authRouter);
router.use('/api', user_router_1.userRouter);
exports.mainRouter = router;
