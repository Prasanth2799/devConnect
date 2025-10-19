const express = require("express");
const app = express();
const port = 9999;
const {connectDB} = require("./config/database")
require("dotenv").config(); // Load .env variables
const User = require("./models/user");
app.use(express.json())

app.post("/signup", async (req, res) => {
        const user = new User(req.body)
        try{
            await user.save()
            res.send("User added successfully")
        }
        catch(err){
            res.status(400).send("Failed to add User "+err.message)
        }
        
})
app.get("/user", async (req,res) => {
        const email = req.body
        try{
            const user = await User.findOne(email)
            res.send(user)
        }catch(err){
            res.status(400).send("Can't find that user ", err)
        }
})
app.get("/feed", async (req,res) => {
        try{
            const users = await User.find({})
            if(users.length === 0){
                res.status(400).send("Users not found")
            }else{
                res.send(users)
            }
        }catch(err){
            console.error("Something went wrong"+err.message)
        }
})
app.patch("/user", async (req,res) => {
        const data = req.body
        try{
            const user = await User.findByIdAndUpdate({_id: req.body.userId}, data, {returnDocument: "before"})
            res.send(user)
            console.log(user)
        }catch(err){
            res.status(400).send("User not found")
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
 