const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId
    },
    status : {
        type : String,
        enums: {
            values : ["ignore", "interested", "accepted", "rejected"],
            message : "{VALUE} is incorrect status type."
        }
    }
}, { timeStamps: true})
const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema)
module.exports = ConnectionRequestModel