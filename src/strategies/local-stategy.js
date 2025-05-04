/* import passport from 'passport';

import { Strategy } from 'passport-local';
import { mockUser } from '../utils/constants.js';

passport.serializeUser((user, done) => {
    console.log("Inside Serialize User");
    console.log(user);
    done(null, user.id);
}) // the serializeUser method is used to store the user into the session. here in serializeUser we passed the id to the done method and then in deserializeUser we will get the id and find the user from the database.

passport.deserializeUser((id, done) => {
    console.log("Inside Deserialize User");
    console.log(`Deserializing User Id : ${id}`);
    try {
        const findUser = mockUser.find((user)=> user.id === id );
        if (!findUser) {
            throw new Error("User not found");
        }
        done(null, findUser);
    } catch (error) {
        done(error, null);
    }
})
// The deserializeUser method is used to get the user from the session.and then we can use the user object in the request object. The deserializeUser method is called when the user is authenticated and the user object is stored in the session. The deserializeUser method is called when the user makes a request to the server and the user object is retrieved from the session.


export default passport.use(
    new Strategy((username, password, done)=>{
        console.log(`username : ${username}`);
        console.log(`password : ${password}`); 
        try {
            const findUser = mockUser.find((user) => user.username === username);
            if (!findUser) {
                throw new Error("User not found");
            }
            if (findUser.password !== password){
                throw new Error("Invalid    Credentials");
            }
            done(null, findUser);
        } catch (error) {
            done(error, null);
        }
    })

)
 */



// in mogodb part

/* 
import passport from 'passport';

import { Strategy } from 'passport-local';
import { mockUser } from '../utils/constants.js';
import { User } from '../mongoose/schemas/user.js';

passport.serializeUser((user, done) => {
    console.log("Inside Serialize User");
    console.log(user);
    done(null, user.id);
}) 

passport.deserializeUser(async (id, done) => {
    console.log("Inside Deserialize User");
    console.log(`Deserializing User Id : ${id}`);
    try {
        const findUser =await User.findById(id);
        if (!findUser) {
            throw new Error("User not found");
        }
        done(null, findUser);
    } catch (error) {
        done(error, null);
    }
})



export default passport.use(
    new Strategy(async (username, password, done)=>{
         
        try {
           const findUser =await User.findOne({ username });
           // we can only write {username} instead of {username : username} because of ES6 destructuring
           if (!findUser) {
            throw new Error('User not found');
           }
           if (findUser.password !== password) throw new Error("Bad Credentials");
           done(null, findUser);
        } catch (error) {
            done(error, null);
        }
    })

)
 */


// in hashing part

import passport from 'passport';

import { Strategy } from 'passport-local';
import { mockUser } from '../utils/constants.js';
import { User } from '../mongoose/schemas/user.js';
import { comparePassword } from '../utils/helpers.js';

passport.serializeUser((user, done) => {
    console.log("Inside Serialize User");
    console.log(user);
    done(null, user.id);
}) 

passport.deserializeUser(async (id, done) => {
    console.log("Inside Deserialize User");
    console.log(`Deserializing User Id : ${id}`);
    try {
        const findUser =await User.findById(id);
        if (!findUser) {
            throw new Error("User not found");
        }
        done(null, findUser);
    } catch (error) {
        done(error, null);
    }
})



export default passport.use(
    new Strategy(async (username, password, done)=>{
         
        try {
           const findUser =await User.findOne({ username });
           
           if (!findUser) {
            throw new Error('User not found');
           }
           if (!comparePassword(password, findUser.password)) throw new Error("Bad Credentials");
           done(null, findUser);
        } catch (error) {
            done(error, null);
        }
    })

)