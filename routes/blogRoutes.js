const express = require("express");
const {
    createBlog,
    updateBlog,
    getAllBlogs,
    getSingleBlog,
    deleteBlog,
    likeBlog,
    disLikeBlog,
    uploadImages
} = require("../controllers/blogController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { productImagesResize, blogImagesResize, uploadOptions } = require("../middlewares/uploadImagesMiddleware")


const router = express.Router();
    
router.post("/createBlog", authMiddleware, isAdmin, createBlog);
router.put("/updateBlog/:id", authMiddleware, isAdmin, updateBlog);
router.put("/likeBlog", authMiddleware, likeBlog);
router.put("/disLikeBlog", authMiddleware, disLikeBlog);
router.delete("/deleteBlog/:id", authMiddleware, isAdmin, deleteBlog);
router.get("/getSingleBlog/:id", getSingleBlog);
router.get("/getAllBlogs", getAllBlogs);
router.put("/uploads/:id", authMiddleware, isAdmin, uploadOptions.array("images", 10), blogImagesResize, uploadImages)


module.exports = router;