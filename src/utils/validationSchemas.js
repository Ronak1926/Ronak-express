/* export const createValidationSchema = {
    username: {
        isLength: {
            options:
             { min: 5, max: 32 },
            errorMessage: "Username must be between 5-32 characters", 
        },
        notEmpty : {
            errorMessage: "Username cannot be empty",
        },
        isString: {
            errorMessage: "Username must be a string!",
        },
        // if there is not a error msg then isString : true we can write like this
    },

    displayName: {
        notEmpty: {
            errorMessage: "DisplayName cannot be empty",
        },
    },
    

} */


export const createValidationSchema = {
    username: {
        isLength: {
            options:
                { min: 5, max: 32 },
            errorMessage: "Username must be between 5-32 characters", 
        },
        notEmpty : {
            errorMessage: "Username cannot be empty",
        },
        isString: {
            errorMessage: "Username must be a string!",
        },
        // if there is not a error msg then isString : true we can write like this
    },

    displayName: {
        notEmpty: {
            errorMessage: "DisplayName cannot be empty",
        },
    },
    password : {
        notEmpty : true,
    }

}