const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
}, {
    timestamps: true,
});


const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;