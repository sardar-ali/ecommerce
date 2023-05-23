const Blog = require("../models/blogModel")
const CustomError = require("../config/customError");

//create blog 
const createBlog = async (req, res, next) => {

    const blog = await Blog.create(req.body);

    if (!blog) {
        next(new CustomError("Blog is not created !", 404))
    }

    res.status(201).json({
        status: true,
        blog,
        message: "Blog created successfully!"
    })
}


//update blog
const updateBlog = async (req, res, next) => {
    const { id } = req?.params;
    const blog = await Blog.findByIdAndUpdate(id, { ...req?.body }, { new: true });


    if (!blog) {
        next(new CustomError("Blog is not updated !", 404))
    }

    res.status(200).json({
        status: true,
        blog,
        message: "Blog updated successfully!"
    })
}


//get all blogs
const getAllBlogs = async (req, res, next) => {
    const blogs = await Blog.find();

    if (!blogs.length) {
        return next(new CustomError("There is no Blogs in database!", 200))
    }

    res.status(200).json({
        status: true,
        data: {
            blogs
        }
    })

}


//update blog
const getSingleBlog = async (req, res, next) => {
    const { id } = req?.params;

    const blog = await Blog.findByIdAndUpdate(id,
        {
            $inc: { numViews: 1 }
        },
        { new: true }
    )
        .populate("likes")
        .populate("disLikes");


    if (!blog) {
        next(new CustomError("Blog is not found !", 404))
    }

    res.status(200).json({
        status: true,
        blog,
    })
}


//delete blog
const deleteBlog = async (req, res, next) => {
    const { id } = req?.params;
    if (!id) {
        next(new CustomError("Please select blog for deleting", 404))
    }
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
        next(new CustomError("Blog not found", 404))
    }

    res.status(200).json({
        status: true,
        data: {
            blog,
            message: "Blog deleted successfully"
        }
    })

}

//LIKE BLOG
const likeBlog = async (req, res, next) => {
    const { blogId } = req?.body;

    const userId = req?.user?._id;

    const blog = await Blog.findById(blogId);

    const isAlreadyDisliked = blog?.disLikes?.find((itm) => itm.toString() === userId.toString());

    //removed user from dislike if user want to like the blog
    if (isAlreadyDisliked) {

        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { disLikes: userId },
            isDisliked: false
        }, { new: true })


        // res.status(200).json({
        //     status: true,
        //     data: {
        //         blog,
        //         message: "Like blog successfully!"
        //     }

        // })
    }


    //check if blog is like make it unlike if unlike make like
    if (blog?.isLiked) {

        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: userId },
            isLiked: false
        }, { new: true });

        res.status(200).json({
            status: true,
            data: {
                blog,
                message: "unLike blog successfully!"
            }

        })

    } else {

        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { likes: userId },
            isLiked: true
        }, { new: true });

        res.status(200).json({
            status: true,
            data: {
                blog,
                message: "Like blog successfully!"
            }

        })
    }



}


//disLike blog
const disLikeBlog = async (req, res, next) => {
    const { blogId } = req?.body;
    const userId = req?.user?._id


    //find blog by sended id
    const blog = await Blog.findById(blogId);

    const isAlreadyLiked = blog.likes?.find((id) => id.toString() === userId.toString());

    if (isAlreadyLiked) {

        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: userId },
            isLiked: false
        }, { new: true })
    }

    if (blog?.isDisliked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { disLikes: userId },
            isDisliked: false
        }, { new: true })

        res.status(200).json({
            status: true,
            data: {
                blog,
                message: "Blog is unLike successfully"
            }

        })
    } else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { disLikes: userId },
            isDisliked: true
        }, { new: true })

        res.status(200).json({
            status: true,
            data: {
                blog,
                message: "Blog is DisLike successfully"
            }

        })
    }
}

module.exports = {
    createBlog,
    updateBlog,
    getAllBlogs,
    getSingleBlog,
    deleteBlog,
    likeBlog,
    disLikeBlog
}