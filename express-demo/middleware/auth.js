const jwt = require("jsonwebtoken")
//checks whether a valid token is present
//if present allows further access or else no

const verifyToken = (req,res,next)=>{
   try {
    const token = req.headers["x-access-token"]
    if(!token){
        return res.status(400).json({msg:"invalid authentication"})
    }
    jwt.verify(token,"This_is_very_secret_string",(error,decoded)=>{
        if(error){
            return res.status(400).json({msg:"invalid authentication"})
        }
        req.userId = decoded.id
        next()
    })
   } catch (error) {
       return res.status(500).json({msg:error.message})
   }

    
}
module.exports = verifyToken