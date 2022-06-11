const mongoose = require("mongoose")
const {ObjectId}=mongoose.Schema.Types
const imageSchema = new mongoose.Schema({
    category: {
        type: String
    },
    likes:[{
        type:ObjectId,
        ref:"User"

    }],
    likeCount: {
        type: Number,
        default: 0
    },
   path: {
        type: String
    },
    user:{
        type:ObjectId,
        ref:"User"
    },
    comments:[{
        type:ObjectId,
        ref:"Comment"
    }],
    commentCount:{
        type:Number,
        default:0
    }
},
{
    timestamps:true              //updates the moment of updation
}
)
const Image = mongoose.model("Image", imageSchema)
module.exports = Image