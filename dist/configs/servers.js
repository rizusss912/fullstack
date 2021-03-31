"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACKAND = exports.FRONTEND = void 0;
var server_decorator_1 = require("../utils/server.decorator");
var useProxy = false;
var frontend_proxy_config = {
    domen: 'loca.lt',
    protocol: 'https',
    subdomains: ['rizuss912'],
};
var backand_proxy_config = {
    domen: 'loca.lt',
    protocol: 'https',
    subdomains: ['rizus-api'],
};
var frontend_config = {
    domen: 'localhost',
    protocol: 'http',
    port: 4200,
};
var backand_config = {
    domen: 'localhost',
    protocol: 'http',
    port: 5000,
};
if (useProxy) {
    Object.assign(frontend_config, { proxy: frontend_proxy_config });
    Object.assign(backand_config, { proxy: backand_proxy_config });
}
exports.FRONTEND = server_decorator_1.ServerDecorator(frontend_config);
exports.BACKAND = server_decorator_1.ServerDecorator(backand_config);
