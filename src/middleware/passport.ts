import {Strategy, ExtractJwt, StrategyOptions, VerifiedCallback} from "passport-jwt";
import {PassportStatic} from "passport";
import {User} from '../models/user';
import {UserModel} from "../models/interfaces/user.model";
import jwt from "jsonwebtoken";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../configs/tocens";
// @types none (
var RefreshTokenStrategy = require('passport-refresh-token').Strategy;

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ACCESS_TOKEN.secretOrKey,
}

export function useStrategy(passport: PassportStatic) {
    passport.use(
        new Strategy(options, async (payload, done: VerifiedCallback) => {
            try {
                const user = await User.findById(payload._id);
                if (user) {
                    done(null, user);
                    return;
                }

                done(new Error('Unauthorized'), null);
            } catch (error) {
                console.log(error);
            }
        }),
    );


    passport.use(
        new RefreshTokenStrategy(
            options,
            function (token: string, done: Function) {
                try {
                    jwt.verify(token, REFRESH_TOKEN.secretOrKey);
                    const _id = jwt.decode(token, {json: true})?._id;

                    User.findOne({_id}, function (err: Error, user: UserModel) {
                        if (err) {
                            return done(err);
                        }
                        if (!user) {
                            return done(null, false);
                        }
                        return done(null, user, {scope: 'all'});
                    });
                } catch (error) {
                    return done(error.message || error);
                }
            }
        ),
    );
}
