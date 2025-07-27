const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const validator = require("validator")
authRouter.post("/signup", async (req,res) => {
    
    try{
        validateSignUpData(req)
        const {firstName, lastName, emailId, password} = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        const user = new User({
            firstName,lastName,emailId,password: passwordHash
        })
        await user.save()
        res.send("user added successfully.")
    }catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})

authRouter.post("/login", async(req,res) => {
    try{
        const{emailId, password} = req.body;
        if(!validator.isEmail(emailId)){
            throw new Error("Invalid emailId")
        }
        const user = await User.findOne({emailId : emailId})
        if(!user){
            throw new Error("User not found")
        }
        const isPasswordValid = await user.validatePassword(password)
        if(isPasswordValid){
            const token = await user.getJWT();
            res.cookie("token", token, {expires : new Date(Date.now() + 8 * 3600000)})
            res.send("Login successfully")
        }else{
            res.status(400).send("Invalid credentials")
        }

    }catch(err){    
        res.status(400).send("ERROR: "+err.message)
    }
})
authRouter.post("/logout", async(req,res) => {
    res.cookie("token" , null, {expires : new Date(Date.now())})
    res.send("Logout successfully")
})

module.exports = authRouter;