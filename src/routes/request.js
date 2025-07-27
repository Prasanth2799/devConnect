const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth")
const User = require("../models/user")
const ConnectionRequest = require("../models/connectionRequestSchema")
requestRouter.post("/request/send/:status/:userId", userAuth, async (req,res) => {
    try{
        const user = req.user
        const fromUserId = user._id
        const toUserId = req.params.userId
        const status = req.params.status
        const allowedStatus = ["interested","ignored"]
        if(!allowedStatus.includes(status)){
            return res.status(400).send("Status in not valid")
        }
        const toUser = await User.findById(toUserId)
        if(!toUser){
            res.status(400).json({
                message : "User not found"
            })
        }
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or : [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        })
        if(existingConnectionRequest){
            return res.status(400).send("Connection Request Already exists.")
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data = await connectionRequest.save()
        res.json({
            message : "Connection Request sent successfully",
            data
        })
        
    }catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})
module.exports = requestRouter;