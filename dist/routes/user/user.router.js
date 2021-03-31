"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var info_1 = require("./info");
var request_processing_factory_1 = require("../../middleware/request-processing.factory");
var router = express_1.default.Router();
router.get('/info', request_processing_factory_1.RequestProcessingFactory.authorized(info_1.info));
exports.userRouter = router;
