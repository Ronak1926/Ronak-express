// to run the server in development mode:--> npm run start:dev

import express from 'express';
import routes from './routes/index.js';
import cookieParser from "cookie-parser"; 
import session from "express-session";
import { mockUser } from './utils/constants.js';
import passport from "passport";
import './strategies/local-stategy.js'; // import the local strategy

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser('helloworld')); 
app.use(session({
    secret : 'anson the dev',
    saveUninitialized : false,
    resave : false,
    cookie : { maxAge : 60000 * 60 } 
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.post('/api/auth',passport.authenticate('local'), (request, response) => {
   response.sendStatus(200);
});

app.get('/api/auth/status', (request,response) => {
    console.log(`Inside /auth/status endpoint`);
    console.log(request.user);
    console.log(request.session);

    return request.user ? response.send(request.user) : response.sendStatus(401);
});

app.post('/api/auth/logout',(request,response)=>{
    if(!request.user) {
        return response.sendStatus(401);
    }
    request.logout((err) =>{
        if(err){
            return response.sendStatus(400);
        }
        response.sendStatus(200);
    })
})

app.get('/', (request, response) => {
    console.log(request.session);
    console.log(request.session.id)

    request.session.visited = true;
    response.cookie("hello", "world", { maxAge: 60000 * 60 ,signed: true}); 
    response.status(200).send("Hello World!");
})


/* app.post('/api/auth',(request,response)=>{
    const {
        body : {username, password}
    } = request;

    const findUser = mockUser.find((user) => user.username === username);

    if (!findUser || findUser.password !== password) {
        return response.status(401).send({ msg: "BAD CREDENTIALS" });
    }

    request.session.user = findUser;
    return response.status(200).send(findUser);
});

app.get('/api/auth/status',(request,response) => {
    request.sessionStore.get(request.sessionID,(err, session)=>{
        console.log(session);
    })
    return request.session.user? 
    response.status(200).send(request.session.user) : response.status(401).send({msg : "Not Authenticated"});
 });

app.post('/api/cart', (request, response) => {

    if (!request.session.user) {
        return response.status(401);
    }
    const {body : item} = request;
    const { cart } = request.session;
    if (cart){
        cart.push(item);
    }
    else{
        request.session.cart = [item];
    }
    return response.status(201).send(item);

})

app.get('/api/cart',(request,response) =>{
    if (!request.session.user) {
        return response.status(401);
    }
    return response.send(request.session.cart ?? []);// if cart is undefined then return []
})
 */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
