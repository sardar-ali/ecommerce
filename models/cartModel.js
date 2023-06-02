const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",

            },
            count: Number,
            color: String,
            price: Number
        }
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderStatus: {
        type: String,
        default: "Not Proccess",
        enum: ["Not Proccess", "Cash On Deliver", "Proccessed", "Dispatched", "Delivered", "Cancelled"]
    },
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },
}, {
    timestamps: true,
});


const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
