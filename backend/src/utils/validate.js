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
const validateUpdateFieldsData = (req) => {
    const updateAllowedFields = ["firstName", "lastName", "age", "gender", "emailId", "skills", "about", "photoUrl"]
    const isUpdateAllowed = Object.keys(req.body).every(field => updateAllowedFields.includes(field))
    return isUpdateAllowed
}
module.exports = {validateSignUpData, validateUpdateFieldsData}