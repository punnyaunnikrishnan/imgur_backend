const mongoose = require("mongoose")
const {ObjectId}=mongoose.Schema.Types
const commentSchema = new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:"User"
    },
    image:{
        type:ObjectId,
        ref:"Image"
    },
    text:{
        type:String

    }
},{
    timestamps:true
})
const comment = mongoose.model("Comment",commentSchema)
module.exports = comment