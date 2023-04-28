const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

//declear user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        default: "user"
    },
    cart: {
        type: Array,
        default: []
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    address: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address"
        }
    ],
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],

}, {
    timestamps: true
});


//hashed user password
userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

// compare user plainPassword with hashed password in the dbs
userSchema.methods.isPasswordMatched = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

//initialize and export user model
module.exports = mongoose.model("User", userSchema)