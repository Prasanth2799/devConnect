const express = require("express");
const app = express();
const port = 9999;

app.get("/user", (req,res) => {
    res.send(
        {
            firstName : "Prasanth",
            lastName : "Kumar"
        }
    )
})

app.post("/user", (req,res) => {
    res.send("User saved Successfully!!!!")
})

app.delete("/user", (req,res) => {
    res.send("User deleted successfully!!!!")
})



app.listen(port, () => {
    console.log(`Server is successfully listening on por ${port}`)
})