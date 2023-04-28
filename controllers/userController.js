const CustomError = require("../config/customError");
const User = require("../models/userModel");
const generateToken = require("../config/jwtToken");


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
    const blockUser = await User.findByIdAndUpdate(req?.user?._id, {
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


module.exports = {
    createUser,
    loginUser,
    deleteUser,
    updateUser,
    editUser,
    getUser,
    getAllUsers,
    blockUser,
}