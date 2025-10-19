const validator = require("validator");
const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body
    if(!firstName || !lastName){
        throw new Error("Please enter valid name")
    }else if(!validator.isEmail(emailId)){
        throw new Error("Invalid Email")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter strong password")
    }
}
module.exports = {validateSignUpData}