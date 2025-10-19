const mongoose = require("mongoose");
const validator = require("validator");
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
        default : "This is default info about the user"
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
module.exports = mongoose.model("User", userSchema);