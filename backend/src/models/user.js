const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
    {
    firstName : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 60

    },
    lastName : {
        type : String,
        minLength : 3,
        maxLength : 60
    },
    emailId : {
        type : String,
        unique : true,
        required : true,
        lowercase : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong.")
            }
        }
    },
    age : {
        type : Number,
        min : 15
    },
    gender : {
        type : String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Invalid Gender")
            }
        }
    },
    about : {
        type : String,
        default : "Developer"
    },
    photoUrl : {
        type : String,
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Url of the photo")
            }
        }
    },
    skills : {
        type : [String]
    }
}, {
    timestamps : true
})
userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({_id: user?._id}, process.env.JWT_SECRET_KEY, {expiresIn: "4d"})
    return token;
}
userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const hashedPassword = user?.password
    const isValidPassword = await bcrypt.compare(passwordInputByUser, hashedPassword)
    return isValidPassword;
}
module.exports = mongoose.model("User", userSchema);