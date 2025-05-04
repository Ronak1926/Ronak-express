import bcrypt from 'bcrypt';

const saltRounds = 10; //Number of times hashing function is applied (default = 10 is secure)

export const hashPassword = (password) =>{
    const salt = bcrypt.genSaltSync(saltRounds);// Random data added to make each hash unique
    console.log(`Salt : ${salt}`);
    return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain,hashed)=>{
    return bcrypt.compareSync(plain,hashed)
}