const mongoose = require("mongoose");
const CustomError = require("../config/customError");

const validateMongodbId = (req, res, next) => {
    const isValid = mongoose.Types.ObjectId.isValid(req?.params?.id);
    if (!isValid) {
        return next(new CustomError("Invalid id or not found!"));
    }
    next();
}


module.exports = validateMongodbId;