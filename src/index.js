// to run the server in development mode:--> npm run start:dev

import express from 'express';
import routes from './routes/index.js';
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUser } from './utils/constants.js';
import passport from "passport";
// import './strategies/local-stategy.js'; // import the local strategy
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import './strategies/discord-strategy.js';
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
    cookie: {
        maxAge: 60000 * 60
        },
    store : MongoStore.create({
        client : mongoose.connection.getClient(),
        }),
    })

);

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

app.get('/api/auth/discord', passport.authenticate('discord'),(request, response) =>{
    conosle.log('calling the api/auth/discord endpoint')
});

app.get('/api/auth/discord/redirect', passport.authenticate('discord'), (request, response) => {
    response.sendStatus(200);
    console.log('inside the /api/auth/discord/redirect endpoint')
    console.log(request.session)
    console.log(request.user)
});

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


// client id : 1369646721185091646
// client secret : CAh0dZRt_kXDp2B0aCK_4HD9Rdq6sVtD
// redirect url : localhost:3000/api/auth/discord/redirect


/* 

 flow of the code : first when user visit the /api/auth/discord endpoint, then it will call the this passport.authenticate('discord')middleware , that takes to the discord page where user will be authorized and then it will serialize user where we will get the user id and username and avatar of the user. then it will call the deserialize user where we will find the user in the database and if not found then we will create a new user and save it to the database. then it will call the /api/auth/discord/redirect endpoint where we will get the user information and send it to the client. then we can use this information to show the user in our application.
*/