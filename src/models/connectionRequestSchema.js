const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        require : true
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        require : true
    },
    status : {
        type : String,
        enum : {
            values : ["ignored", "interested", "accepted", "rejected"],
            message : "{VALUE} is not a valid status"
        }
    }
}, {timestamps: true})
connectionRequestSchema.index({fromUserId : 1, toUserId : 1})
connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Connection request cannot send youself")
    }
    next()
})

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema)