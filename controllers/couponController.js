const Coupon = require("../models/couponModel");
const CustomError = require("../config/customError")


//create Coupon
const createCoupon = async (req, res, next) => {

    const coupon = await Coupon.create(req.body);

    if (!coupon) {
        next(new CustomError("Coupon is not created!", 404))
    }

    res.status(201).json({
        status: true,
        data: {
            coupon,
            message: "Coupon created successfully!"
        }
    })
}

//update Coupon
const updateCoupon = async (req, res, next) => {
    const { id } = req?.params;
    const coupon = await Coupon.findByIdAndUpdate(id, req?.body, { new: true });

    if (!coupon) {

        next(new CustomError("Coupon not updated", 404))
    }

    res.status(200).json({
        status: true,
        data: {
            coupon,
            message: "Coupon updated successfully"
        }
    })
}


// delete Coupon
const deleteCoupon = async (req, res, next) => {
    const { id } = req?.params;
    const coupon = await Coupon.findByIdAndDelete(id);

    if (!coupon) {

        next(new CustomError("Coupon not deleted", 404))
    }

    res.status(200).json({
        status: true,
        data: {
            coupon,
            message: "Coupon deleted successfully"
        }
    })
}


//get all Coupon
const getAllCoupon = async (req, res, next) => {

    const coupons = await Coupon.find();

    if (!coupons) {
        next(new CustomError("There is not Coupon in database", 404))
    }

    res.status(200).json({
        status: true,
        data: {
            coupons
        }
    })

}



// get single Coupon
const getSingleCoupon = async (req, res, next) => {
    const { id } = req?.params;
    const coupon = await Coupon.findById(id);

    if (!coupon) {

        next(new CustomError("Coupon not found", 404))
    }

    res.status(200).json({
        status: true,
        data: {
            coupon,
        }
    })
}



module.exports = {
    createCoupon,
    updateCoupon,
    deleteCoupon,
    getAllCoupon,
    getSingleCoupon
};