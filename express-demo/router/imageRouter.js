const ImageControl = require("../controller/imageControl")
const verifyToken = require("../middleware/auth")
const router = (app)=>{
    app.post("/images",verifyToken,ImageControl.addImage)
    app.delete("/images/:id",verifyToken,ImageControl.deleteImage)
    app.get("/images",ImageControl.getAllImage)
    app.get("/images/:id",verifyToken,ImageControl.getImageById)
    app.get("/images/:id/like",verifyToken,ImageControl.toggleLike)
    app.get("/myimages",verifyToken,ImageControl.getMyImage)
    app.get("/image",verifyToken,ImageControl.searchByCategory)
    app.post("/images/:id/comment",verifyToken,ImageControl.addComment)
    app.delete("/images/:id/comment/:commentId",verifyToken,ImageControl.deleteComment)
    app.put("/images/:id/comment/:commentId",verifyToken,ImageControl.editComment)
   
}
module.exports = router