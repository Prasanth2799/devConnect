const express = require("express");
const app = express();
app.use("/welcome", (req,res) => {
    res.send("Welcome to the express")
})
app.listen(9999, () => {
    console.log("Server is running on the port 9999")
})