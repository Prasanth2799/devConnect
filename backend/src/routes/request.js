const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const  ConnectionRequest  = require("../models/connectionRequest");
const user = require("../models/user");
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res) => {
    try{
        const fromUserId = req.user._id;
        const{toUserId, status} = req.params;
        const allowedStatusFields = ["interested", "ignored"];
        const isStatusAllowed = allowedStatusFields.includes(status);
        if(!isStatusAllowed){
            return res.status(400).send("Invalid status type: "+status)
        }
        const toUser = await user.findById(toUserId)
        if(!toUser){
            return res.status(404).send("User not found!")
        }
        const isConnectionRequestExist = await ConnectionRequest.findOne({
            $or: [
                {toUserId, fromUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        })
        if(isConnectionRequestExist){
            return res.status(400).send("Connection Request already exist")
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId, toUserId, status
        })
        const data = await connectionRequest.save()
        res.json({
            message : req.user.firstName+" "+req.user.lastName+" is "+status+" in "+toUser.firstName+" "+toUser.lastName,
            data
        })
    }catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})
module.exports = {requestRouter};