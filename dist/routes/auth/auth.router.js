"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = __importDefault(require("express"));
var login_1 = require("./login");
var register_1 = require("./register");
var router = express_1.default.Router();
router.use('/auth', login_1.loginRouter);
router.use('/auth', register_1.registerRouter);
exports.authRouter = router;
