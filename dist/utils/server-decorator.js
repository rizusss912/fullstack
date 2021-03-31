"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerDecorator = void 0;
function ServerDecorator(server) {
    var url = function () {
        var context = server.proxy ? server.proxy : server;
        return context.proxy
            ? ServerDecorator(context.proxy).url
            : context.protocol + "://" + (context.subdomains ? context.subdomains.join('.') + '.' : "") + context.domen + (context.port ? ":" + context.port : "");
    };
    return Object.assign(server, { url: url });
}
exports.ServerDecorator = ServerDecorator;
