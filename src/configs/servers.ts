import {Server, ServerConfig, ServerDecorator} from "../utils/server.decorator";

const useProxy: boolean = false;

const frontend_proxy_config: ServerConfig = {
    domen: 'loca.lt',
    protocol: 'https',
    subdomains: ['rizuss912'],
}

const backand_proxy_config: ServerConfig = {
    domen: 'loca.lt',
    protocol: 'https',
    subdomains: ['rizus-api'],
}

const frontend_config: ServerConfig = {
    domen: 'localhost',
    protocol: 'http',
    port: 4200,
}

const backand_config: ServerConfig = {
    domen: 'localhost',
    protocol: 'http',
    port: 5000,
}

if(useProxy) {
    Object.assign(frontend_config, {proxy: frontend_proxy_config});
    Object.assign(backand_config, {proxy: backand_proxy_config});
}

export const FRONTEND: Server = ServerDecorator(frontend_config);
export const BACKAND: Server = ServerDecorator(backand_config);
