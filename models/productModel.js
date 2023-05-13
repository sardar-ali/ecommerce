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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    brand: {
        type: String,
        enum: ["apple", "lenovo", "samsing"],
    },
    quantity: Number,
    images: {
        type: Array,

    },
    color: {
        type: String,

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