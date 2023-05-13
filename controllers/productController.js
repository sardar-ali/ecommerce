const Product = require("../models/productModel");
const CustomError = require("../config/customError");



//create product
const createProduct = async (req, res, next) => {

    const product = await Product.create(req?.body)

    if (!product) {
        return next(new CustomError("Product is not created!", 404))
    }

    res.status(201).json({
        status: true,
        data: {
            product,
            message: "Product created successfully"
        }
    })
}


//get All products
const getProducts = async (req, res, next) => {
    const products = await Product.find()

    if (!products) {
        return next(new CustomError("There is no Product in database!", 200))
    }

    res.status(200).json({
        status: true,
        data: {
            products
        }
    })
}


module.exports = {
    createProduct,
    getProducts
}