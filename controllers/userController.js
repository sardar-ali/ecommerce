const CustomError = require("../config/customError");
const User = require("../models/userModel");
const generateToken = require("../config/jwtToken");
const generateRefreshToken = require("../config/refreshToken");
const jwt = require("jsonwebtoken");

// signup user
const createUser = async (req, res, next) => {
    const email = req?.body?.email;

    //check if user already exist throw error
    const isExist = await User.findOne({ email });

    if (isExist) {
        // next(new Error('Email already exists'))
        next(new CustomError(`'Email is already exists'`, 400))
    }

    // create new user
    const user = await User.create(req?.body);

    if (user) {
        user.password = undefined;
    }

    //send response back to user
    res.json({
        status: true,
        data: {
            user,
            message: "User created successfully"
        }
    })
}


//user Login
const loginUser = async (req, res, next) => {
    const { email, password } = req?.body;

    if (!email || !password) {
        return next(new CustomError("Email and Password are required!", 400))
    }

    const isUser = await User.findOne({ email }).select("+password");

    if (!isUser) {
        return next(new CustomError("Invalid Email  or Password!", 400))
    }

    if (! await isUser?.isPasswordMatched(password, isUser?.password)) {
        return next(new CustomError("Invalid  credentials!", 400))
    }

    const refreshToken = await generateRefreshToken(isUser?.id);

    const updateUser = await User.findOneAndUpdate(isUser?._id, {
        refreshToken: refreshToken,
    }, {
        new: true
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000
    })
    //response back to user
    res.status(200).json({
        status: true,
        data: {
            user: {
                firstName: isUser?.firstName,
                lastName: isUser?.lastName,
                email: isUser?.email,
                phone: isUser?.phone,
                token: generateToken(isUser?._id)
            },
            message: "Logged in successfully"
        }
    })

}

//user logout
const logoutUser = async (req, res, next) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        return next(new CustomError("There is no token in cookie!", 404))
    }

    const refreshToken = cookie?.refreshToken;
    const user = await User.findOne({ refreshToken })

    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        })
        return res.status(204).json({
            status: true,
            message: "Cookies clear successfully!"
        })
    }


    await User.findOneAndUpdate(refreshToken, { refreshToken: "" });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    })

    res.status(204).json({
        status: true,
        message: "Logout successfully"
    })
}

const refreshTokenHandler = async (req, res, next) => {
    const refreshToken = req?.cookies?.refreshToken;
    // if no refresh token in cookie send error message to user 
    if (!refreshToken) {
        return next(new CustomError("There is no token in cookies!", 400))
    }

    //find user using refreshToken
    const user = await User.findOne({ refreshToken });

    //if no user in the db against that refresh token send error to user
    if (!user) {
        return next(new CustomError("No refreshToken in db in db or not match!", 400))
    }

    //verifying refreshToken
    const verifyToken = await jwt.verify(refreshToken, process.env.JWT_SECRET);
    //generate new token on the basis of that refresh token
    const accessToken = await generateToken(verifyToken?.id);
    //send the new access token in the response to user
    res.status(200).json({
        data: {
            accessToken
        }
    })
}
// delete user
const deleteUser = async (req, res, next) => {

    const user = await User.findByIdAndDelete(req?.params?.id)
    if (!user) {
        return next(new CustomError("invalid user selected!", 400))
    }

    res.status(200).json({
        status: true,
        data: {
            user,
            message: "User deleted successfully"
        }
    })
}

//update user
const updateUser = async (req, res, next) => {

    const user = await User.findByIdAndUpdate(req?.params?.id, {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        phone: req?.body?.phone,
    }, {
        new: true
    })

    if (!user) {
        return next(new CustomError("User is not updated!", 400))
    }

    res.status(200).json({
        status: true,
        data: {
            user,
            message: "User updated successfully"
        }
    })
}

// get all users
const getAllUsers = async (req, res, next) => {

    const users = await User.find();

    if (!users) {
        next(new CustomError("There is no user in databse!", 200))
    }

    res.status(200).json({
        status: true,
        data: {
            users
        }
    })
}


// get single user
const getUser = async (req, res, next) => {

    const id = req?.params?.id

    // const user = await User.findById({ _id: id }, { password: 0 });
    const user = await User.findById(req?.params?.id).select("-password");

    if (!user) {
        return next(new CustomError("User not found!", 404))
    }

    res.status(200).json({
        status: true,
        data: {
            user
        }
    })
}


//update user
const editUser = async (req, res, next) => {

    const user = await User.findByIdAndUpdate(req?.user?._id, {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        phone: req?.body?.phone,
    }, {
        new: true
    })

    if (!user) {
        return next(new CustomError("User is not updated!", 400))
    }

    res.status(200).json({
        status: true,
        data: {
            user,
            message: "User updated successfully"
        }
    })
}


const blockUser = async (req, res, next) => {
    const blockUser = await User.findByIdAndUpdate(req?.params?.id, {
        isBlocked: true
    }, {
        new: true
    });

    if (!blockUser) {
        return next(new CustomError("User is not blocked!", 400))
    }
    res.status(200).json({
        status: true,
        data: {
            user: blockUser,
            message: "User blocked successfully!"
        }
    })

}


const unBlockUser = async (req, res, next) => {
    const unblockUser = await User.findOneAndUpdate(req?.params?.id, {
        isBlocked: false
    }, {
        new: true
    });

    if (!unblockUser) {
        return next(new CustomError("Unabled to unblock user!", 400))
    }

    res.status(200).json({
        status: true,
        data: {
            user: unblockUser,
            message: "Unblocked user successfully"
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    deleteUser,
    updateUser,
    editUser,
    getUser,
    getAllUsers,
    blockUser,
    unBlockUser,
    refreshTokenHandler,
    logoutUser
}