const express = require("express");
const {connectDB} = require("./config/database")
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")
const port = 9999;
require("dotenv").config(); 
app.use(cors({
   origin : "http://localhost:5173",
   credentials : true,
}))
app.use(express.json())
// Load .env variables

app.use(cookieParser());


const {authRouter} = require("./routes/auth");
const {profileRouter} = require("./routes/profile");
const {requestRouter} = require("./routes/request");
const {userRouter} = require("./routes/user")
app.use("/", authRouter, profileRouter, requestRouter, userRouter)

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
 