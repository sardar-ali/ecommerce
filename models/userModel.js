const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const crypto = require("crypto")

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
    passwordChangedAt: Date,
    passwordRestToken: String,
    passwordRestExpires: Date,
    refreshToken: {
        type: String
    },


}, {
    timestamps: true
});


//hashed user password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

// compare user plainPassword with hashed password in the dbs
userSchema.methods.isPasswordMatched = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

// generate reset token 
userSchema.methods.createPasswordRestToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordRestToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordRestExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

//initialize and export user model
module.exports = mongoose.model("User", userSchema)