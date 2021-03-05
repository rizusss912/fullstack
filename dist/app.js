"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var passport_1 = __importDefault(require("passport"));
// @ts-ignore
var passport_2 = require("./middleware/passport");
var main_router_1 = require("./routes/main.router");
var app = express_1.default();
var port = process.env.PORT || 5000;
mongoose_1.default.connect('mongodb://127.0.0.1:27017/', { useNewUrlParser: true })
    .then(function () { return console.log('MongoDB connected'); })
    .catch(function (error) { return console.log('MongoDB connected error: \n', error); });
app.use(require('morgan')('dev'));
app.use(require('cors')());
app.use(passport_1.default.initialize());
passport_2.useStrategy(passport_1.default);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('', main_router_1.mainRouter);
app.listen(port, function () { return console.log("Server has been started on " + port); });
