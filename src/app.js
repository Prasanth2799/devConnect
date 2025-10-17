const express = require("express");
const app = express();
const port = 9999;
//order os the middleware matters
app.use("/", (req,res) => {
    res.send("Hello world")
})

app.use("/test", (req,res) => {
    res.send("Test")
})
app.use("/hello", (req,res) => {
    res.send("Hello Hello Hello")
})


app.listen(port, () => {
    console.log(`Server is successfully listening on por ${port}`)
})