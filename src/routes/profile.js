const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt")
const validator = require("validator");
const {userAuth} = require("../middlewares/auth");
const { validateUpdateFieldsData } = require("../utils/validate");
profileRouter.get("/profile", userAuth, async (req,res) => {
    try{
        const user = req.user;
        if(!user){
            throw new Error("User not found")
        }
        res.send(user)

        
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})
profileRouter.post("/profile/edit", userAuth, async (req,res) => {
    try{
        if(!validateUpdateFieldsData(req)){
            throw new Error("Invalid edit request")
        }
        const loggedInUser = req.user
        console.log(loggedInUser)
        Object.keys(req.body).forEach(field => loggedInUser[field] = req.body[field])
        await loggedInUser.save();
        res.json({
            message : `${loggedInUser.firstName} your profile updated successfully`,
            data : loggedInUser
        })
    }catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})


module.exports = {profileRouter};