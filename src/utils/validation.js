const validator = require("validator")

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body
    if(!firstName || !lastName){
        throw new Error("Please enter valid name")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Please enter valid email")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter valid password")
    }
}

const validateProfileEditData = (req) => {
    const allowedFields = [
        "firstName", "lastName", "emailId", "age", "gender", "about", "skills", "photoUrl"
    ]
    const isEditAllowed = Object.keys(req.body).every((fields) => allowedFields.includes(fields))
    return isEditAllowed;
}

module.exports = {validateSignUpData, validateProfileEditData} 