import express, {Application} from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import passport from "passport";
// @ts-ignore
import {useStrategy} from './middleware/passport';
import {mainRouter} from "./routes/main.router";


const app: Application = express();
const port: string | number = process.env.PORT || 5000;

mongoose.connect('mongodb://127.0.0.1:27017/',  { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('MongoDB connected error: \n', error))

app.use(require('morgan')('dev'));
app.use(require('cors')());

app.use(passport.initialize());
useStrategy(passport);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('', mainRouter);

app.listen(port, () => console.log(`Server has been started on ${port}`));

