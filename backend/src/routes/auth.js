const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user")
const {validateSignUpData} = require("../utils/validate");
const authRouter = express.Router();
authRouter.post("/signup", async (req, res) => {
        try{
             validateSignUpData(req)
            const {firstName, lastName, emailId, password} = req.body
            const passwordHash = await bcrypt.hash(password, 10);
            const user = new User({
                firstName, lastName, emailId, password: passwordHash
            })
            const savedUser = await user.save()
            const token = await user.getJWT();
            res.cookie("token", token, { expires : new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)})
            res.json({message : "User added successfully", data : savedUser})
        }
        catch(err){
            res.status(400).send("Failed to add User: "+err.message)
        }
        
})
authRouter.post("/login", async (req,res) => {
        try{
            const{emailId, password} = req.body;
            const user = await User.findOne({emailId : emailId})
            if(!user){
                throw new Error("Please enter valid credentials")
            }
            const isValidPassword = await user.validatePassword(password)
            if(isValidPassword){
                const token = await user.getJWT();
                res.cookie("token", token, { expires : new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)})
                res.json({message : "Login successful", user})
            }else{
                res.status(400).send("Invalid credentials")
            }
        }catch(err){
            res.status(400).send("Login Failed: "+err.message)
        }
})
authRouter.post("/logout", async (req,res) => {
    res.cookie("token", null, {expires : new Date(Date.now())})
    res.send("Logout successful")
})
module.exports = {authRouter};