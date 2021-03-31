import express, {Application} from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import passport from "passport";
import cookieParser from "cookie-parser";
import {useStrategy} from './middleware/passport';
import {mainRouter} from "./routes/main.router";
import {BACKAND} from "./configs/servers";

const app: Application = express();
const port: number = BACKAND.port || 5000;

mongoose.connect('mongodb://127.0.0.1:27017/', {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('MongoDB connected error: \n', error))

app.use(require('morgan')('dev'));

// TODO: Без этого костыля пакет localtunnel работает непредсказуемо. При отказе от localtunnel, можно заменить на пакет cors
app.use(function(req, res, next) {
    res.header("access-control-allow-origin", "*");
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('access-control-allow-methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});

app.use(cookieParser());

app.use(passport.initialize());
useStrategy(passport);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', mainRouter);

app.listen(port, () => console.log(`Server has been started on ${port}`));
