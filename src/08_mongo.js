// to run the server in development mode:--> npm run start:dev

import express from 'express';
import routes from './routes/index.js';
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUser } from './utils/constants.js';
import passport from "passport";
import './strategies/local-stategy.js'; // import the local strategy
import mongoose from 'mongoose';


const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/express_tutorial')
    .then(() => console.log('connected to mongodb'))
    .catch((err) => console.log(`Error : ${err}`))



app.use(express.json());
app.use(cookieParser('helloworld'));
app.use(session({
    secret: 'anson the dev',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.post('/api/auth', passport.authenticate('local'), (request, response) => {
    response.sendStatus(200);
});

app.get('/api/auth/status', (request, response) => {
    console.log(`Inside /auth/status endpoint`);
    console.log(request.user);
    console.log(request.session);

    return request.user ? response.send(request.user) : response.sendStatus(401);
});

app.post('/api/auth/logout', (request, response) => {
    if (!request.user) {
        return response.sendStatus(401);
    }
    request.logout((err) => {
        if (err) {
            return response.sendStatus(400);
        }
        response.sendStatus(200);
    })
})

app.get('/', (request, response) => {
    console.log(request.session);
    console.log(request.session.id)

    request.session.visited = true;
    response.cookie("hello", "world", { maxAge: 60000 * 60, signed: true });
    response.status(200).send("Hello World!");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
