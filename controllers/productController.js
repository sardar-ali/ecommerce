const Product = require("../models/productModel");
const fs = require("fs");
const User = require("../models/userModel");
const CustomError = require("../config/customError");
const slugify = require("slugify");
const cloadUploadingImg = require("../utils/fileUploadConfig");


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

    //Filtering
    const queryObj = { ...req?.query };
    const excludeField = ["sort", "page", "limit", "fields"]
    excludeField?.forEach((itm) => delete queryObj[itm]);
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    queryStr = JSON.parse(queryStr)

    let products = Product.find(queryStr)

    if (!products) {
        return next(new CustomError("There is no Product in database!", 200))
    }

    //Sorting
    if (req?.query?.sort) {
        let sortBy = req?.query?.sort.split(",").join(" ");
        products = products.sort(sortBy)
    } else {
        products = products?.sort("-createdAt")
    }

    // 4) send limited fields in response
    if (req?.query?.fields) {
        const fields = req?.query?.fields?.split(",").join(" ");
        products = products.select(fields)
    } else {
        products = products.select("-__v")
    }


    // paginatio=n
    if (req?.query?.page && req?.query?.limit) {
        const page = req?.query?.page;
        const limit = req?.query?.limit;
        const skip = (page - 1) * limit;
        const productCount = await Product.countDocuments();
        if (skip >= productCount) {
            next(new CustomError("This page is not found!", 404))
        }

        products = products.skip(skip).limit(limit)


    }


    products = await products;

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


//LIKE BLOG
const addToWishlist = async (req, res, next) => {
    const { productId } = req?.body;

    const userId = req?.user?._id;

    const user = await User.findById(userId);

    const alreadyAdded = user?.wishlist?.find((id) => id.toString() == productId);
    //removed user from dislike if user want to like the blog
    if (alreadyAdded) {

        const user = await User.findByIdAndUpdate(userId, {
            $pull: { wishlist: productId },
        }, { new: true })

        res.status(200).json({
            status: true,
            data: {
                user,
                message: "Product removed from wishlist successfully!"
            }

        })

    } else {

        const user = await User.findByIdAndUpdate(userId, {
            $push: { wishlist: productId },
        }, { new: true })

        res.status(200).json({
            status: true,
            data: {
                user,
                message: "Product Added in wishlist successfully!"
            }

        })
    }



}

const uploadImages = async (req, res, next) => {
        try {
          const uploader = (path) => cloadUploadingImg(path, "images");
          const urls = [];
          const files = req.files;
          for (const file of files) {
            const { path } = file;
            console.log("here path ::", path)
            const newpath = await uploader(path);
            console.log(newpath);
            urls.push(newpath);
            fs.unlinkSync(path);
          }
          const images = urls.map((file) => {
            return file;
          });
          res.json(images);
        } catch (error) {
          next(error)
        }
}


module.exports = {
    createProduct,
    getProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
    addToWishlist,
    uploadImages
}