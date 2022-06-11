const mongoose = require("mongoose")
const {ObjectId}=mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "fullname not provided "],
      },
      email: {
        type: String,
        unique: [true, "email already exists in database!"],
        lowercase: true,
        trim: true,
        required: [true, "email not provided"],
        validate: {
          validator: function (v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          },
          message: '{VALUE} is not a valid email!'
        }
    
      },
      password: {
        type: String,
        required: true
      },
      posts:[{
        type:ObjectId,
        ref:"Image"

      }],
      postCount:{
        type:Number,
        default:0
      }
      
      
    },{
        timestamps:true
    });
const User = mongoose.model("user",userSchema)

    module.exports = User