const express = require("express");
const {adminAuth} = require("./middlewares/auth")
const app = express();
const port = 9999;

app.get("/getUserData", (req,res) => {
    try{
        throw new Error("Error")
        res.send("User data sent")
    }
    catch(err){
        res.status(500).send("Error: contact support team")
    }

})
app.use("/", (err,req,res,next) => {
    if(err){
        res.status(500).send("Something went wrong")
    }
})


app.listen(port, () => {
    console.log(`Server is successfully listening on port ${port}`)
})