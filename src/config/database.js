const mongoose = require("mongoose")
const connectDB = async () => {
    await mongoose.connect("mongodb+srv://practicenode:PraLVRNPav@practicenode.mcyoh.mongodb.net/devConnect")
}

module.exports = {connectDB}