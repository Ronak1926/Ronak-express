// to run the server in development mode:--> npm run start:dev

import express from 'express';
import routes from './routes/index.js';
import cookieParser from "cookie-parser"; // we need to register this middleware before the routes to be able to use the cookies in the routes

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser()); 
// app.use(cookieParser('secret')); // to parse the signed cookies secret means any string that is used to sign the cookie
app.use(routes);

app.get('/', (request, response) => {
    response.cookie("hello", "world", { maxAge: 60000 * 60 });
    // response.cookie("hello", "world", { maxAge: 60000 * 60 ,signed: true}); // to sign the cookie
    response.status(200).send("Hello World!");
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
