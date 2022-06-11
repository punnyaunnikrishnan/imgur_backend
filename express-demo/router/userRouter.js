const User = require("../controller/userControl")
const verifyToken = require("../middleware/auth")
const router = (app)=>{
    app.post("/register",User.register)
    app.post("/login",User.login)
    // app.get("/hello",verifyToken,(req,res)=>{
    //     return res.status(200).json({msg:"hello world"})

    // }
   
       

}
module.exports = router