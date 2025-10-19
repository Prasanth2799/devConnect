const mongoose = require("mongoose");
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
        lowercase : true
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        min : 15
    },
    gender : {
        type : String,
        validate(value){
            if(!["Male", "Female", "Others"].includes(value)){
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
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    skills : {
        type : [String]
    }
}, {
    timestamps : true
})
module.exports = mongoose.model("User", userSchema);