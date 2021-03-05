import jwt from "jsonwebtoken";
import {UserModel} from "../../../models/interfaces/user.model";

export function getTokenByUserModel(user: UserModel): string {
    return jwt.sign(
        {
            _id: user._id,
        },
        'dev-jwt',
        {
            expiresIn: 60 * 60,
        },
    );
}
