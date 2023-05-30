const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    expire: {
        type: Date,
        required: true,
    },
    discount: {
        type: String,
        required: true,
    },
});


const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;