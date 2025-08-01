const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
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
        lowercase : true,
        required : true,
        unique : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter valid email"+value)
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter strong password")
            }
        }
    },
    age : {
        type : Number,
        min : 14
    },
    gender : {
        type : String,
        validate(value){
            if(!["Male", "Female", "Others"].includes(value)){
                throw new Error("Gender is not valid")
            }
        }
    },
    about : {
        default : "This is default info about the user",
        type : String
    },
    photoUrl : {
        type : String,
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Give valid photo url")
            }
        }
    },
    skills : {
        type : [String]
    }
}, {
    timestamps : true
})

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id: user._id}, "DevConnect@27189999", {expiresIn: "2d"})
    return token
}
userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}


module.exports = mongoose.model("User", userSchema)