const express = require("express");
const {connectDB} = require("./config/database")
const app = express();
const cookieParser = require("cookie-parser")
app.use(express.json())
app.use(cookieParser())

const authRouter  = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request")

app.use("/", authRouter, profileRouter, requestRouter)


connectDB()
 .then(() => {
    console.log("Database connection established...")
    app.listen(9999, () => {
        console.log("Server is running on the port 9999")
    })
 })
 .catch((err) => {
    console.log("Database connection not established..."+err.message )
 }) 
