const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Category",
    },
    brand: {
        type: String,
        required: true,
        // type: String,
        // enum: ["apple", "lenovo", "samsing"],
    },
    quantity: {
        type: Number,
        required: true
    },
    images: {
        type: Array,

    },
    color: {
        type: String,
        required: true,

    },
    sold: {
        type: Number,
        default: 0
    },
    ratings: [{
        type: Number,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }

    }],
}, {
    timestamps: true
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;