const express = require("express")
const {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
    getSingleCategory
} = require("../controllers/categoryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const router = express.Router();

router.post("/createCategory", authMiddleware, isAdmin, createCategory)
router.put("/updateCategory/:id", authMiddleware, isAdmin, updateCategory)
router.delete("/deleteCategory/:id", authMiddleware, isAdmin, deleteCategory)
router.get("/getSingleCategory/:id",  getSingleCategory)
router.get("/getAllCategory", getAllCategory)

module.exports = router;