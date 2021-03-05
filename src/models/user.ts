import mongoose, { Schema } from "mongoose";
// @ts-ignore
import {USER} from '../configs/models/user';
import {UserModel} from "./interfaces/user.model";

const userSchema = new Schema({
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
    }
});

export const User = mongoose.model<UserModel>('User', userSchema);
