"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerDecorator = void 0;
function ServerDecorator(config) {
    var serverUrl = config.protocol + "://" + (config.subdomains ? config.subdomains.join('.') + '.' : "") + config.domen + (config.port ? ":" + config.port : "");
    var url = config.proxy ? ServerDecorator(config.proxy).url : serverUrl;
    return Object.assign(config, { serverUrl: serverUrl, url: url });
}
exports.ServerDecorator = ServerDecorator;
