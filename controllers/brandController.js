const Brand = require("../models/brandModel");
const CustomError = require("../config/customError")


//create brand
const createBrand = async (req, res, next) => {

    const brand = await Brand.create(req.body);

    if (!brand) {
        next(new CustomError("Brand is not created!", 404))
    }

    res.status(201).json({
        status: true,
        data: {
            brand,
            message: "Brand created successfully!"
        }
    })
}

//update brand
const updateBrand = async (req, res, next) => {
    const { id } = req?.params;
    const brand = await Brand.findByIdAndUpdate(id, req?.body, { new: true });

    if (!brand) {

        next(new CustomError("Brand not updated", 404))
    }

    res.status(200).json({
        status: true,
        data: {
            brand,
            message: "Brand updated successfully"
        }
    })
}


// delete brand
const deleteBrand = async (req, res, next) => {
    const { id } = req?.params;
    const brand = await Brand.findByIdAndDelete(id);

    if (!brand) {

        next(new CustomError("Brand not deleted", 404))
    }

    res.status(200).json({
        status: true,
        data: {
            brand,
            message: "Brand deleted successfully"
        }
    })
}


//get all brand
const getAllBrand = async (req, res, next) => {

    const brands = await Brand.find();

    if (!brands) {
        next(new CustomError("There is not brand in database", 404))
    }

    res.status(200).json({
        status: true,
        data: {
            brands
        }
    })

}



// get single brand
const getSingleBrand = async (req, res, next) => {
    const { id } = req?.params;
    const brand = await Brand.findById(id);

    if (!brand) {

        next(new CustomError("Brand not found", 404))
    }

    res.status(200).json({
        status: true,
        data: {
            brand,
        }
    })
}



module.exports = {
    createBrand,
    updateBrand,
    deleteBrand,
    getAllBrand,
    getSingleBrand
};