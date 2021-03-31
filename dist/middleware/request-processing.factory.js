"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestProcessingFactory = void 0;
var passport_1 = require("passport");
var jsonwebtoken_1 = require("jsonwebtoken");
var error_handler_1 = require("../utils/error-handler");
var rights_manager_class_1 = require("../utils/rights-manager.class");
var RequestProcessingFactory = /** @class */ (function () {
    function RequestProcessingFactory() {
    }
    RequestProcessingFactory.unauthorized = function (handler) {
        return function (req, res) {
            try {
                handler(req, res);
            }
            catch (error) {
                error_handler_1.errorHandler(res, error);
            }
        };
    };
    RequestProcessingFactory.maybeAuthorized = function (unauthorizedHandler, authorizedHandler) {
        return RequestProcessingFactory.unauthorized(function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!!req.headers.authorization) {
                        RequestProcessingFactory.authorized(authorizedHandler)(req, res);
                    }
                    else {
                        unauthorizedHandler(req, res);
                    }
                    return [2 /*return*/];
                });
            });
        });
    };
    RequestProcessingFactory.authorized = function (handler, action) {
        if (action === void 0) { action = null; }
        return RequestProcessingFactory.unauthorized(function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, passport_1.authenticate('jwt', { session: false }, function (err, user) {
                                if (err || !user) {
                                    res.status(401).json({ message: err || 'Необходимо авторизироваться' });
                                    return;
                                }
                                if (!!action && !RequestProcessingFactory.canUseAction(action, user)) {
                                    res.status(403).json({ message: err || "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C \u0434\u043E\u0441\u0442\u0443\u043F \u0434\u043B\u044F " + action });
                                    return;
                                }
                                handler(req, res, user);
                            })(req, res)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    RequestProcessingFactory.onlyModerator = function (handler, action) {
        if (action === void 0) { action = null; }
        return RequestProcessingFactory.authorized(function (req, res, user) {
            if (!(new rights_manager_class_1.RightsManager(user).isModerator)) {
                res.status(403).json({ message: 'Нужны права модератора' });
                return;
            }
            handler(req, res, user);
        }, action);
    };
    RequestProcessingFactory.onlyAdmin = function (handler, action) {
        if (action === void 0) { action = null; }
        return RequestProcessingFactory.authorized(function (req, res, user) {
            if (!(new rights_manager_class_1.RightsManager(user).isAdmin)) {
                res.status(403).json({ message: 'Нужны права администратора' });
                return;
            }
            handler(req, res, user);
        }, action);
    };
    RequestProcessingFactory.hasRelevantRefreshAndAccessTokens = function (handler) {
        return RequestProcessingFactory.unauthorized(function (req, res) {
            if (!req.headers.authorization) {
                res.status(412).json({ message: 'Нет токена авторизации' });
                return;
            }
            if (!req.body.refresh_token) {
                res.status(400).json({ message: 'Нет токена обновления' });
                return;
            }
            var access_token_payload = jsonwebtoken_1.decode(req.headers.authorization.replace('Bearer ', ''), { json: true });
            var refresh_token_payload = jsonwebtoken_1.decode(req.body.refresh_token, { json: true });
            if (!(access_token_payload === null || access_token_payload === void 0 ? void 0 : access_token_payload.created) || !(refresh_token_payload === null || refresh_token_payload === void 0 ? void 0 : refresh_token_payload.created) || !(access_token_payload === null || access_token_payload === void 0 ? void 0 : access_token_payload._id) || !(refresh_token_payload === null || refresh_token_payload === void 0 ? void 0 : refresh_token_payload._id)) {
                res.status(400).json({ message: 'Некорректные токены' });
                return;
            }
            if (access_token_payload.created !== refresh_token_payload.created || access_token_payload._id !== refresh_token_payload._id) {
                res.status(400).json({ message: 'Токены не совместимы' });
                return;
            }
            handler(req, res);
        });
    };
    RequestProcessingFactory.canUseAction = function (action, user) {
        return new rights_manager_class_1.RightsManager(user).canUseAction(action);
    };
    return RequestProcessingFactory;
}());
exports.RequestProcessingFactory = RequestProcessingFactory;
