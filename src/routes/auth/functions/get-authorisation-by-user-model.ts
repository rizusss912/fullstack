import {sign} from 'jsonwebtoken';
import {UserModel} from "../../../models/interfaces/user.model";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../../configs/tocens";
import {Status} from "../../../models/enums/status.enum";

interface Tokens {
    access_token: string;
    refresh_token: string;
}

export interface AuthorisationData extends Tokens {
    statuses?: Status[],
}

function getTokensByUserModel(user: UserModel): Tokens {
    const created = Date.now();
    const access_token = sign(
        {
            _id: user._id,
            created,
        },
        ACCESS_TOKEN.secretOrKey,
        ACCESS_TOKEN.options,
    );
    const refresh_token = sign(
        {
            _id: user._id,
            created,
        },
        REFRESH_TOKEN.secretOrKey,
        REFRESH_TOKEN.options,
    );

    return {access_token, refresh_token};
}

export function getAuthorisationDataByUserModel(user: UserModel): AuthorisationData {
    const getPublicParams = ({statuses}: UserModel) => {return {statuses}};

    return Object.assign(getTokensByUserModel(user), getPublicParams(user));
}
