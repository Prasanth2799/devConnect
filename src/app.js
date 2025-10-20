const express = require("express");
const app = express();
const port = 9999;
const {connectDB} = require("./config/database")
const {validateSignUpData} = require("./utils/validate")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
require("dotenv").config(); // Load .env variables
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth")
app.use(express.json())
app.use(cookieParser());

app.post("/signup", async (req, res) => {
        try{
             validateSignUpData(req)
            const {firstName, lastName, emailId, password} = req.body
            const passwordHash = await bcrypt.hash(password, 10);
            const user = new User({
                firstName, lastName, emailId, password: passwordHash
            })
            await user.save()
            res.send("User added successfully")
        }
        catch(err){
            res.status(400).send("Failed to add User: "+err.message)
        }
        
})
app.post("/login", async (req,res) => {
        try{
            const{emailId, password} = req.body;
            const user = await User.findOne({emailId : emailId})
            if(!user){
                throw new Error("Please enter valid credentials")
            }
            const isValidPassword = await bcrypt.compare(password, user.password)
            if(isValidPassword){
                const token = jwt.sign({_id : user?._id}, process.env.JWT_SECRET_KEY)
                res.cookie("token", token)
                res.send("Login successfully")
            }else{
                res.status(400).send("Invalid credentials")
            }
        }catch(err){
            res.status(400).send("Login Failed: "+err.message)
        }
})
app.get("/profile", userAuth, async (req,res) => {
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

app.patch("/user/:userId", async (req,res) => {
        const userId = req.params?.userId
        const data = req.body
        try{
            const updateFields = ["photoUrl", "gender", "skills", "age", "about"]
            const isUpdateAllowed = Object.keys(data).every(key => updateFields.includes(key))
            if(!isUpdateAllowed){
                throw new Error("Update not allowed")
            }
            const totalSkills = 10
            if(data?.skills.length > totalSkills){
                throw new Error(`Number of skills should not be more than ${totalSkills}`)
            }
            const user = await User.findByIdAndUpdate({_id: userId}, data, {returnDocument: "after", runValidators : true})
            res.send(user)
        }catch(err){
            res.status(400).send("Can't update the user: "+err.message)
        }
})
connectDB()
 .then(() => {
    console.log("Database connection established successfully")
    app.listen(port, () => {
        console.log(`Server is successfully listening on port ${port}`)
    })
 })
 .catch((err) => {
    console.error("Database connection failed", err)
 })
 