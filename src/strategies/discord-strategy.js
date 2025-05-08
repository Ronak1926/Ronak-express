import passport from 'passport'
import { Strategy} from 'passport-discord' 
import { DiscordUser } from '../mongoose/schemas/discord-user.js';

// client id : 1369646721185091646
// client secret : CAh0dZRt_kXDp2B0aCK_4HD9Rdq6sVtD
// redirect url : localhost:3000/api/auth/discord/redirect


passport.serializeUser((user, done) => {
    console.log("Inside Serialize User");
    console.log(user);
    done(null, user.id);
}) 

passport.deserializeUser(async (id, done) => {
    console.log("Inside Deserialize User");
    console.log(`Deserializing User Id : ${id}`);
    try {
        const findUser =await DiscordUser.findById(id);
        
        return findUser ? done(null, findUser) : done(null, null);
    } catch (error) {
        done(error, null);
    }
})




export default passport.use(
    new Strategy({
        clientID : '1369646721185091646',
        clientSecret : 'CAh0dZRt_kXDp2B0aCK_4HD9Rdq6sVtD',
        callbackURL : 'http://localhost:3000/api/auth/discord/redirect',
        scope : ['identify'] 
        // scope is for what information you want to get from the user like if it is identify : it will give you the user id and username and avatar of the user.
    }, async (accessToken , refeshToken, profile,done) => {
        console.log(`inside the passport.use strategy profile of user`);
        console.log(profile)

        let findUser;


         try{
            findUser = await DiscordUser.findOne({discordId : profile.id});

         }catch(err){
            return done(err, null)
         }

         try {
            if (!findUser) {
                const newUser = new DiscordUser({username : profile.username , discordId : profile.id})
                const newSavedUser = await newUser.save(); // save method is asynchronouse
                return done(null, newSavedUser); // this will be passed into the serializeuser
             }
            return done(null, findUser);
         }
         catch(err){
            return done(err, null);
         }
    })
)

