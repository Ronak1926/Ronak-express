// to run the server in development mode:--> npm run start:dev

import express from 'express';
import routes from './routes/index.js';
import userRouter from './routes/users.js';
import productsRouter from './routes/products.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // to parse json data from request body

// app.use(routes); // we can use like this instead of registering each router to the app we are registering each router to the routes and then regiseter the routes to the app


app.use(userRouter);
app.use(productsRouter);

app.get('/', (request, response) => {
    response.status(200).send("Hello World!");
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



/* 
patch : to update portion of the entity
put : to update the whole entity
*/