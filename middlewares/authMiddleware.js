const jwt = require("jsonwebtoken")
const User = require("../models/userModel");
const CustomError = require("../config/customError");

//check jwt token and verifying it
const authMiddleware = async (req, res, next) => {
    let token;

    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req?.headers?.authorization?.split(" ")[1];

        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded?.id);
            req.user = user;
            next();
        } catch (error) {
            return next(new CustomError("UnAuthorization token Please login again!", 401))
        }

    } else {
        return next(new CustomError("Authorization token required!", 401))
    }
}

//check the user role 
const isAdmin = async (req, res, next) => {
    if (req?.user?.role !== "admin") {
        next(new CustomError("You are not a Admin", 401))
    } else {
        next()
    }
}

module.exports = { authMiddleware, isAdmin }