const express = require("express");
const app = express();
const port = 9999;
app.use("/", (req,res) => {
    res.send("Hello world")
})

app.listen(port, () => {
    console.log(`Server is successfully listening on por ${port}`)
})