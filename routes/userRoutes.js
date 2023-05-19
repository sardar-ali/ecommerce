const express = require("express");
const {
    createUser,
    getUser,
    loginUser,
    getAllUsers,
    deleteUser,
    updateUser,
    editUser,
    blockUser,
    unBlockUser,
    refreshTokenHandler,
    logoutUser,
    updatePassword,
    forgotPassword,
    resetPassword
} = require("../controllers/userController")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const validateMongodbId = require("../utils/validateMongodbId");
const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser)
router.get("/logout", logoutUser)
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword)
router.put("/updatePassword", authMiddleware, updatePassword)
router.get("/getAllUsers", getAllUsers)
router.get("/getSingleUser/:id", validateMongodbId, authMiddleware, isAdmin, getUser)
router.delete("/deleteUser/:id", validateMongodbId, deleteUser)
router.put("/updateUser/:id", validateMongodbId, updateUser)
router.put("/editUser", authMiddleware, isAdmin, editUser)
router.put("/blockUser/:id", validateMongodbId, authMiddleware, isAdmin, blockUser)
router.put("/unBlockUser/:id", validateMongodbId, authMiddleware, isAdmin, unBlockUser)
router.get("/refreshToken", refreshTokenHandler)


module.exports = router;