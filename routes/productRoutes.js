const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { createProduct, getProducts } = require("../controllers/productController")
const router = express.Router();

router.post("/createProduct", authMiddleware, isAdmin, createProduct)
router.get("/getAllProducts",  getProducts);

module.exports = router;