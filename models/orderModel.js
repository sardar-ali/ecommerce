const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",

            },
            count: Number,
            color: String,
        }
    ],
    paymentIntent: {},
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


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
