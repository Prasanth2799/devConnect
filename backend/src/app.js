const express = require("express");
const app = express();
const port = 9999;
const {connectDB} = require("./config/database")
const cookieParser = require("cookie-parser");
require("dotenv").config(); // Load .env variables
app.use(express.json())
app.use(cookieParser());

const {authRouter} = require("./routes/auth");
const {profileRouter} = require("./routes/profile");
const {requestRouter} = require("./routes/request");

app.use("/", authRouter, profileRouter, requestRouter)

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
 