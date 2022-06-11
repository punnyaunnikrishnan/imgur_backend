const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/userModel")

const UserControl = {
    register: async (req, res) => {
        try {
            const { fullName, email, password } = req.body
            const user = await User.findOne({ email })
            if (user) {
                return res.status(400).json({ msg: "user already exists" })
            }
            const newUser = new User({ fullName, email, password: bcrypt.hashSync(password, 8) })

            await newUser.save()
            return res.status(200).json({ msg: "user registered successfully" })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    login:async (req,res)=>{
        try {
            const {email,password}=req.body

            const user = await User.findOne({email})
            if(!user){
                return res.status(404).json({msg:"user not found"})
            }
            const passwordIsValid = bcrypt.compareSync(password,user.password)
            if(!passwordIsValid){
                return res.status(401).json({msg:"Invalid password"})

            }
            const token = jwt.sign({        //
                id:user._id
            },"This_is_very_secret_string",{
                expiresIn:86400
                
            })
            return res.status(200).json({data:user,message:"login successful",accessToken:token})
        } catch (error) {
            return res.status(500).json({msg:error.message})
            
        }
    }
}
module.exports = UserControl