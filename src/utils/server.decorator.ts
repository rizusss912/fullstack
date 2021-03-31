export interface ServerConfig {
    domen: string,
    protocol: string,
    port?: number,
    subdomains?: string[],
    proxy?: ServerConfig,
}

export interface Server extends ServerConfig {
    url: string;
    serverUrl: string;
}

export function ServerDecorator(config: ServerConfig): Server {
    const serverUrl = `${config.protocol}://${config.subdomains ? config.subdomains.join('.') + '.' : ``}${config.domen}${config.port ? `:${config.port}` : ``}`;
    const url = config.proxy ? ServerDecorator(config.proxy).url : serverUrl;

    return Object.assign(config, {serverUrl, url});
}
