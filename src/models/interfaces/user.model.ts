import {Status} from "../enums/status.enum";
import * as mongoose from "mongoose";

export interface UserModel extends mongoose.Document {
    login: string,
    password: string,
    created: Date,
    statuses: Status[],
}
