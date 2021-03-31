"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var passport_1 = __importDefault(require("passport"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var passport_2 = require("./middleware/passport");
var main_router_1 = require("./routes/main.router");
var servers_1 = require("./configs/servers");
var app = express_1.default();
var port = servers_1.BACKAND.port || 5000;
mongoose_1.default.connect('mongodb://127.0.0.1:27017/', { useNewUrlParser: true })
    .then(function () { return console.log('MongoDB connected'); })
    .catch(function (error) { return console.log('MongoDB connected error: \n', error); });
app.use(require('morgan')('dev'));
// TODO: Без этого костыля пакет localtunnel работает непредсказуемо. При отказе от localtunnel, можно заменить на пакет cors
app.use(function (req, res, next) {
    res.header("access-control-allow-origin", "*");
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('access-control-allow-methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});
app.use(cookie_parser_1.default());
app.use(passport_1.default.initialize());
passport_2.useStrategy(passport_1.default);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/api', main_router_1.mainRouter);
app.listen(port, function () { return console.log("Server has been started on " + port); });
