"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = __importDefault(require("express"));
var login_1 = require("./login");
var request_processing_factory_1 = require("../../middleware/request-processing.factory");
var register_1 = require("./register");
var passport_1 = __importDefault(require("passport"));
var refresh_1 = require("./refresh");
var router = express_1.default.Router();
router.post('/login', request_processing_factory_1.RequestProcessingFactory.unauthorized(login_1.login));
router.put('/register', request_processing_factory_1.RequestProcessingFactory.unauthorized(register_1.register));
router.post('/refresh', passport_1.default.authenticate('refresh_token', { session: false }), request_processing_factory_1.RequestProcessingFactory.hasRelevantRefreshAndAccessTokens(refresh_1.refresh));
exports.authRouter = router;
