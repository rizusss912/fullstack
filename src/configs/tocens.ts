import {SignOptions} from "jsonwebtoken";

interface TokenConfig {
    secretOrKey: string,
    options: SignOptions,
}

export const ACCESS_TOKEN: TokenConfig = {
    secretOrKey: 'dev-jwt',
    options: {
        expiresIn: 15 * 60,
    }
}

export const REFRESH_TOKEN: TokenConfig = {
    secretOrKey: 'dev-jwt',
    options: {
        expiresIn: 30 * 24 * 60 * 60,
    }
}
