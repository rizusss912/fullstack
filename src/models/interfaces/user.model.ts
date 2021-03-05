import {Document} from "mongoose";

export interface UserModel extends Document {
    login: string,
    password: string,
    created: Date,
}
