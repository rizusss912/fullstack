"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var info_1 = require("./info");
var router = express_1.default.Router();
router.use('/user', info_1.infoRoutes);
exports.userRouter = router;
