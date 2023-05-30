const express = require("express")
const {
    createCoupon,
    updateCoupon,
    deleteCoupon,
    getAllCoupon,
    getSingleCoupon
} = require("../controllers/couponController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const router = express.Router();

router.post("/createCoupon", authMiddleware, isAdmin, createCoupon)
router.put("/updateCoupon/:id", authMiddleware, isAdmin, updateCoupon)
router.delete("/deleteCoupon/:id", authMiddleware, isAdmin, deleteCoupon)
router.get("/getSingleCoupon/:id", getSingleCoupon)
router.get("/getAllCoupon", getAllCoupon)

module.exports = router;