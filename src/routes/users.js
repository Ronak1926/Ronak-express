// first register the request to the router and then register the router to the app
// this is the best practice to keep the code clean and organized

import {Router} from "express";
import { query,validationResult,checkSchema,matchedData } from "express-validator"
import {createValidationSchema} from "../utils/validationSchemas.js";
import { mockUser } from "../utils/constants.js";
import { resolveIndexByUserId } from "../utils/middlewares.js";
import { User } from "../mongoose/schemas/user.js";
import { hashPassword } from "../utils/helpers.js";

const router = Router();

router.get("/api/users",
     query("filter")
     .isString()
     .notEmpty()
     .withMessage("Must not be empty")
     .isLength({ min: 3, max: 10 })
     .withMessage("Must be at least 3-10 characters")
     , (request, response) => {

        console.log('the session object at /api/users is:')
        console.log(request.session);
        console.log('the session id at /api/users is :')
        console.log(request.session.id)

    request.sessionStore.get(request.session.id, (err, sessionData)=>{
        if (err) {
            console.log(err);
            throw err;
        }
        console.log("Inside session store get");
        console.log(sessionData);
    })
    const result = validationResult(request);
    console.log(result);
    const {
        query: { filter, value },
    } = request;
    if (filter && value) {
        return response.send(mockUser.filter((user) => {
            return user[filter].includes(value);
        }))
    }
    return response.send(mockUser)}
)

router.get("/api/users/:id", resolveIndexByUserId, (request, response) => {
    console.log(request.params);
    const { findUserIndex } = request;
    const findUser = mockUser[findUserIndex];
    if (!findUser) {
        return response.sendStatus(404); // not found
    }
    return response.send(findUser);
})



/* 
router.post("/api/users",
   checkSchema(createValidationSchema)
    , (request, response) => {
        const result = validationResult(request);
        console.log(result);

        if (!result.isEmpty()) {
            return response.status(400).send({ errors: result.array() })
        }

        const data = matchedData(request); // matchedData is give all the validated fields and we are storing that in the data variable 

        console.log(data);
        const newUser = { id: mockUser[mockUser.length - 1].id + 1, ...data };
        mockUser.push(newUser);
        return response.status(201).send(newUser);
    });
 */


    
/* 
router.post("/api/users", async (request, response) => {
         const {body} = request;
         const newUser = new User(body); // to pass the body to the constructor of the user model

         try {
            const savedUser = await newUser.save(); // this is asynchronous function
            return response.status(201).send(savedUser); 
         } catch (err){
            console.log(err);
            return response.sendStatus(400); // bad request
         }
     }); 
*/


     
router.post("/api/users",checkSchema(createValidationSchema) ,async (request, response) => {
    const result = validationResult(request);
    
    if(!result.isEmpty()) {
        return response.status(400).send(result.array());
    }

    const data = matchedData(request);

    console.log(data);
    data.password = hashPassword(data.password); // hash the password before saving to the database
    console.log(data);

     const newUser = new User(data); 
     try {
        const savedUser = await newUser.save(); 
        return response.status(201).send(savedUser); 
     } catch (err){
        console.log(err);
        return response.sendStatus(400); 
     }
 });


    router.put('/api/users/:id', resolveIndexByUserId, (request, response) => {
        const {
            body, findUserIndex
        } = request;
    
        mockUser[findUserIndex] = {
            id: mockUser[findUserIndex].id,
            ...body,
        };
        return response.sendStatus(200);
    })
    
    
    router.patch('/api/users/:id', resolveIndexByUserId, (request, response) => {
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
    
    
    router.delete('/api/users/:id', resolveIndexByUserId, (request, response) => {
        const {
            findUserIndex
        } = request;
    
        mockUser.splice(findUserIndex, 1); // remove the user from the array
        return response.sendStatus(200); // success
    
    })
export default router;