const mongoose = require("mongoose");

const blogCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
}, {
    timestamps: true,
});


const BlogCategory = mongoose.model("BlogCategory", blogCategorySchema);

module.exports = BlogCategory;