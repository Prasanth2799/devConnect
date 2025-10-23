const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {ConnectionRequest} = require("../models/connectionRequest");
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res) => {
    try{
        const fromUserId = req.user;
        const toUserId = req.body.toUserId;
        const status = req.status;
        const connectionRequest = new ConnectionRequest({
            fromUserId, toUserId, status
        })
        await connectionRequest.save()
        res.send("Connection saved successfully")
    }catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})
module.exports = {requestRouter};