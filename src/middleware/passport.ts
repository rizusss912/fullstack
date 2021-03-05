import {Strategy, ExtractJwt, StrategyOptions, VerifiedCallback} from "passport-jwt";
import {PassportStatic} from "passport";
import {User} from '../models/user';

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'dev-jwt',
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
            }
            catch (error) {
                console.log(error);
            }
        }),
    );
}
