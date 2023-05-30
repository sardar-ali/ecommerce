const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { productImagesResize, blogImagesResize, uploadOptions } = require("../middlewares/uploadImagesMiddleware")
const {
    createProduct,
    getProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
    addToWishlist,
    uploadImages
} = require("../controllers/productController")
const router = express.Router();

router.post("/createProduct", authMiddleware, isAdmin, createProduct)
router.get("/getAllProducts", getProducts);
router.get("/getSingleProduct/:id", getSingleProduct);
router.delete("/deleteProduct/:id", authMiddleware, isAdmin, deleteProduct)
router.put("/updateProduct/:id", authMiddleware, isAdmin, updateProduct)
router.put("/uploads/:id", authMiddleware, isAdmin, uploadOptions.array("images", 10), productImagesResize, uploadImages)
router.put("/addToWishlist/", authMiddleware, isAdmin, addToWishlist)

module.exports = router;