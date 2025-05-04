// to run the server in development mode:--> npm run start:dev

import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // to parse json data from request body

const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
    next();
}

const resolveIndexByUserId = (request, response, next) => {
    const {
        params: { id },
    } = request;

    const parseId = parseInt(id);
    if (isNaN(parseId)) {
        return response.sendStatus(400);
    }
    const findUserIndex = mockUser.findIndex((user) => user.id === parseId);

    if (findUserIndex === -1) {
        return response.sendStatus(404);
    }
    request.findUserIndex = findUserIndex;
    next();
}

// app.use(loggingMiddleware); // it enable the loggginMiddleware for all the routes globally

const mockUser = [
    { id: 1, username: "anson", displayName: "Anson" },
    { id: 2, username: "jack", displayName: "Jack" },
    { id: 3, username: "adam", displayName: "Adam" },
    { id: 4, username: "tina", displayName: "Tina" },
    { id: 5, username: "jason", displayName: "Jason" },
    { id: 6, username: "henry", displayName: "Henry" },
    { id: 7, username: "marilyn", displayName: "Marilyn" },
]

app.get('/', loggingMiddleware, (request, response) => {
    response.status(200).send("Hello World!");
})


app.get("/api/users", (request, response) => {
    console.log(request.query); // query string
    // localhost:3000/product?key=value&key2=value2 --> query string
    const {
        query: { filter, value },
    } = request; // destructuring
    /*   
     same as 
     const filter = request.query.filter;
     const value = request.query.value; 
     */

    // when filter and value are not provided
    if (filter && value) {
        return response.send(mockUser.filter((user) => {
            return user[filter].includes(value); // filter by username or displayName
        }))
    }
    return response.send(mockUser)
})


// save the data using post request 

app.post("/api/users", (request, response) => {
    console.log(request.body);
    const { body } = request; // destructuring
    const newUser = { id: mockUser[mockUser.length - 1].id + 1, ...body }; // add new user to the end of the array
    mockUser.push(newUser); // add new user to the array
    return response.status(201).send(newUser);
});

// Update the whole entity in the array

app.put('/api/users/:id', resolveIndexByUserId, (request, response) => {
    const {
        body, findUserIndex
    } = request;

    mockUser[findUserIndex] = {
        id: mockUser[findUserIndex].id,
        ...body,
    };
    return response.sendStatus(200);
})

// find user by id localhost:3000/api/users/1


app.get("/api/users/:id", resolveIndexByUserId, (request, response) => {
    console.log(request.params);
    const { findUserIndex } = request;
    const findUser = mockUser[findUserIndex];
    if (!findUser) {
        return response.sendStatus(404); // not found
    }
    return response.send(findUser);
})


// patch request to update the portion of the entity in the array

app.patch('/api/users/:id', resolveIndexByUserId, (request, response) => {
    const {
        body, findUserIndex
    } = request;

    mockUser[findUserIndex] = {
        ...mockUser[findUserIndex],
        ...body,
    }
    return response.sendStatus(200);
}
)


// delete request to delete the entity from the array

app.delete('/api/users/:id', resolveIndexByUserId, (request, response) => {
    const {
        findUserIndex
    } = request;

    mockUser.splice(findUserIndex, 1); // remove the user from the array
    return response.sendStatus(200); // success

})

app.get("/api/products", (request, response) => {
    response.send([{ id: 123, name: "myProduct", price: 340.88 }]);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



/* 
patch : to update portion of the entity
put : to update the whole entity
*/