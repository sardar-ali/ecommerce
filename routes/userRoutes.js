const express = require("express");
const { createUser, getUser, loginUser, getAllUsers, deleteUser, updateUser, editUser, blockUser } = require("../controllers/userController")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser)
router.get("/getAllUsers", getAllUsers)
router.get("/getSingleUser/:id", authMiddleware, isAdmin, getUser)
router.delete("/deleteUser/:id", deleteUser)
router.put("/updateUser/:id", updateUser)
router.put("/editUser", authMiddleware, isAdmin, editUser)
router.put("/blockUser", authMiddleware, isAdmin, blockUser)


module.exports = router;