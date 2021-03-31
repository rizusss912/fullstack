import mongoose, { Schema } from "mongoose";
import {USER} from './configs/user';
import {UserModel} from "./interfaces/user.model";
import {Status} from "./enums/status.enum";
import {Model} from "./enums/model.enum";

const userSchema = new Schema<UserModel>({
    login: {
        type: String,
        required: [true, `Поле login не заполнено`],
        maxlength: [USER.MAX_LOGIN_LENGTH, `Длина логина не может быть больше ${USER.MAX_LOGIN_LENGTH}`],
        minlength: [USER.MIN_LOGIN_LENGTH, `Длина логина не может быть меньше ${USER.MIN_LOGIN_LENGTH}`],
        unique: true,
    },
    password: {
        type: String,
        required: [true, `Поле password не заполнено`],
        minlength: [USER.MIN_PASSWORD_LENGTH, `Длина пароля не может быть меньше ${USER.MIN_PASSWORD_LENGTH}`],
        maxlength: [USER.MAX_PASSWORD_LENGTH, `Длина пароля не может быть больше ${USER.MAX_PASSWORD_LENGTH}`],
    },
    created: {
        type: Date,
        required: [true, `Поле created не заполнено`],
        default: Date.now,
    },
    statuses: {
        type: [String], // Status enum
        enum: Status,
        required: false,
        default: [],
    },
});

export const User = mongoose.model<UserModel & Document>(Model.User, userSchema);
