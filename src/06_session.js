// to run the server in development mode:--> npm run start:dev

import express from 'express';
import routes from './routes/index.js';
import cookieParser from "cookie-parser"; 
import session from "express-session";
import { mockUser } from './utils/constants.js';


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
app.use(routes);

app.get('/', (request, response) => {
    console.log(request.session);
    console.log(request.session.id)

    // console.log(request.sessionID) // this is the same as request.session.id
    request.session.visited = true;
    response.cookie("hello", "world", { maxAge: 60000 * 60 ,signed: true}); // to sign the cookie
    // response.cookie("hello", "world", { maxAge: 60000 * 60 ,signed: true}); // to sign the cookie
    response.status(200).send("Hello World!");
})


app.post('/api/auth',(request,response)=>{
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
