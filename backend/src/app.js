const express = require("express");
const {connectDB} = require("./config/database")
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")
const http = require("http")
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
const {userRouter} = require("./routes/user");
const initializeSocket = require("./utils/socket");
app.use("/", authRouter, profileRouter, requestRouter, userRouter)
const server = http.createServer(app)
initializeSocket(server)

connectDB()
 .then(() => {
    console.log("Database connection established successfully")
    server.listen(port, () => {
        console.log(`Server is successfully listening on port ${port}`)
    })
 })
 .catch((err) => {
    console.error("Database connection failed", err)
 })
 