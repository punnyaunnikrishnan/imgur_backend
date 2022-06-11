

const Image = require("../models/imageModel")
const User = require("../models/userModel")
const Comment = require("../models/commentModel")
const ImageControl = {
    addImage: async (req, res) => {
        try {
            // const user = req.user.id
            const { category, path} = req.body
            if (!path) {
                return res.status(400).json({ msg: "please provide the path" })
            }

            const newImage = new Image({ category, path,user:req.userId })
            await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newImage._id },       //for pushing new id to posts and postcount
                $inc: { postCount: 1 }
            })
            await newImage.save()
            return res.status(200).json({ msg: "Image registered successfully" })

        } catch (error) {
            res.status(500).json({ msg: error.message })

        }
    },
    getAllImage: async (req, res) => {
        try {
            const image = await Image.find()
            return res.status(200).json({ data: image })


        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getImageById: async (req, res) => {
        try {
            const image = await Image.findById(req.params.id)
            if (!image) {
                return res.status(404).json({ msg: "no image with the id found" })
            }
            return res.status(200).json({ data: image })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteImage: async (req, res) => {
        try {
            const image = await Image.findByIdAndDelete(req.params.id)
            if (!image) {
                return res.status(404).json({ msg: "no image with the id found" })
            }
            // await image.remove()
            return res.status(200).json({ msg: "Image deleted" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    toggleLike: async (req, res) => {
        try {
            const image = await Image.findById(req.params.id)
            if (!image) {
                return res.status(404).json({ msg: "no image with the id found" })
            }
            if (image.likes.includes(req.userId)) {
                const index = image.likes.indexOf(req.userId)
                image.likes.splice(index, 1)
                image.likeCount = image.likeCount - 1
                await image.save()
                return res.status(200).json({ msg: "image disliked" })
            }
            else {
                image.likes.push(req.userId)
                image.likeCount = image.likeCount + 1
                await image.save()
                return res.status(200).json({ msg: "image liked" })
            }




        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    searchByCategory: async (req, res) => {

        try {
            const image = await Image.find({ category: req.query.category })
            return res.status(200).json({ data: image })

        } catch (error) {
            return res.status(500).json({ msg: error.message })

        }
    },
    addComment: async (req, res) => {
        try {
            const image = await Image.findById(req.params.id)
            if (!image) {
                return res.status(404).json({ msg: "no image with the id found" })
            }
            const comment = new Comment({
                user: req.userId,
                image: req.params.id,
                text: req.body.text
            })
            await comment.save()
            image.comments.push(comment._id)
            image.commentCount = image.commentCount + 1
            await image.save()
            return res.status(200).json({ msg: "comment added" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteComment: async (req, res) => {
        try {
            const image = await Image.findById(req.params.id)
            if (!image) {
                return res.status(404).json({ msg: "no image with the id found" })
            }
            const comment = await Comment.findById(req.params.commentId)
            if (!comment) {
                return res.status(404).json({ msg: "no comment with the id found" })
            }
            await comment.remove()
            const index = image.comments.indexOf(comment._id)
            image.comments.splice(index, 1)
            image.commentCount = image.commentCount - 1
            await image.save()
            return res.status(200).json({ msg: "comment deleted" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    editComment: async (req, res) => {
        try {

            const { text } = req.body
            const fieldsToUpdate = {}
            if (text) {
                fieldsToUpdate.text = text


            }
            const comment = await Comment.findByIdAndUpdate(req.params.commentId, {
                $set: { ...fieldsToUpdate }

            }, {
                new: true
            })
            return res.status(200).json({ msg: "comment edited", data: comment })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getMyImage:async(req,res)=>{
        try {
            const image = await Image.find({user:req.userId})
            return res.status(200).json({  data: image })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
            
        }
    }
}


module.exports = ImageControl