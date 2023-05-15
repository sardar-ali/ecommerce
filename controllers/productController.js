const Product = require("../models/productModel");
const CustomError = require("../config/customError");
const slugify = require("slugify")


//create product
const createProduct = async (req, res, next) => {

    if (req?.body?.name) {
        req.body.slug = slugify(req?.body?.name)
    }

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
    // const query = req?.query ? req?.query : {};
    // console.log("query :::", query)
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


//get single product
const getSingleProduct = async (req, res, next) => {
    const id = req?.params?.id;
    const product = await Product.findById(id)

    if (!product) {
        return next(new CustomError("Product not found!", 404))
    }

    res.status(200).json({
        status: true,
        data: {
            product
        }
    })
}


// get All products
const deleteProduct = async (req, res, next) => {
    const id = req?.params?.id;
    const product = await Product.findByIdAndDelete(id)

    if (!product) {
        return next(new CustomError("Product not found!", 404))
    }

    res.status(200).json({
        status: true,
        data: {
            product,
            message: "Product deleted successfully!"
        }
    })
}

//updated products
const updateProduct = async (req, res, next) => {
    if (req?.body?.name) {
        req.body.slug = slugify(req?.body?.name)
    }
    const product = await Product.findByIdAndUpdate(req?.params?.id, {
        ...req?.body
    }, {
        new: true
    });

    if (!product) {
        return next(new CustomError("Product not found!", 404))
    }

    res.status(200).json({
        status: true,
        data: {
            product,
            message: "Product updated successfully"
        }
    })

}


module.exports = {
    createProduct,
    getProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct
}