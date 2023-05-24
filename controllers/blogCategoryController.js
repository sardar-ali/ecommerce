const BlogCategory = require("../models/blogCategoryModel");
const CustomError = require("../config/customError")

const createCategory = async (req, res, next) => {

    const category = await BlogCategory.create(req.body);

    if (!category) {
        next(new CustomError("Category is not created!", 404))
    }

    res.status(201).json({
        status: true,
        data: {
            category,
            message: "Category created successfully!"
        }
    })
}

//update category
const updateCategory = async (req, res, next) => {
    const { id } = req?.params;
    const category = await BlogCategory.findByIdAndUpdate(id, req?.body, { new: true });

    if (!category) {

        next(new CustomError("Category not updated", 404))
    }

    res.status(200).json({
        status: true,
        data: {
            category,
            message: "Category updated successfully"
        }
    })
}


// delete category
const deleteCategory = async (req, res, next) => {
    const { id } = req?.params;
    const category = await BlogCategory.findByIdAndDelete(id);

    if (!category) {

        next(new CustomError("Category not deleted", 404))
    }

    res.status(200).json({
        status: true,
        data: {
            category,
            message: "Category deleted successfully"
        }
    })
}


//get all categories
const getAllCategory = async (req, res, next) => {

    const categories = await BlogCategory.find();

    if (!categories) {
        next(new CustomError("There is not category in database", 404))
    }

    res.status(200).json({
        status: true,
        data: {
            categories
        }
    })

}



// get single category
const getSingleCategory = async (req, res, next) => {
    const { id } = req?.params;
    const category = await BlogCategory.findById(id);

    if (!category) {

        next(new CustomError("Category not found", 404))
    }

    res.status(200).json({
        status: true,
        data: {
            category,

        }
    })
}



module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
    getSingleCategory
};