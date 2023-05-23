const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    numViews: {
        type: Number,
        default: 0,
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
    isDisliked: {
        type: Boolean,
        default: false,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    disLikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    image: {
        type: String,
        default: "https://tse4.mm.bing.net/th?id=OIP.gv_8qPu75S8cxKivTpRtBgHaD7&pid=Api&P=0&h=180"
    },
    auther: {
        type: String,
        default: "Admin"
    }
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true
});


const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;