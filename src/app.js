const express = require("express");
const app = express();
const port = 9999;
const {connectDB} = require("./config/database")
require("dotenv").config(); // Load .env variables
const User = require("./models/user");

app.post("/signup", async (req, res) => {
        const user = new User({
                firstName : "Lenka",
                lastName : "Prasanth",
                emailId : "pra@gmail.com",
                gender : "Male"
        })
        await user.save();
        res.send("User saved successfully")
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
 