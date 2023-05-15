const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const {
    createProduct,
    getProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct
} = require("../controllers/productController")
const router = express.Router();

router.post("/createProduct", authMiddleware, isAdmin, createProduct)
router.get("/getAllProducts", getProducts);
router.get("/getSingleProduct/:id", getSingleProduct);
router.delete("/deleteProduct/:id", authMiddleware, isAdmin, deleteProduct)
router.put("/updateProduct/:id", authMiddleware, isAdmin, updateProduct)

module.exports = router;