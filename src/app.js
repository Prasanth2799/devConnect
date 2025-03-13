const express = require("express");
const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth")
app.use("/admin", adminAuth)
app.get("/user/getUserData", userAuth, (req,res) => {
    res.send("Get user data")
})
app.get("/admin/getData", (req,res) => {
    res.send("Data received")
})
app.delete("/admin/deleteData", (req,res) => {
    res.send("Data deleted")
})
app.listen(9999, () => {
    console.log("Server is running on the port 9999")
})