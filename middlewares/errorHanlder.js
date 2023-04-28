const CustomError = require("../config/customError");

// invalid route error handler
const notFound = (req, res, next) => {
    // const error = new Error(`Not Found : ${req?.originalUrl}`);
    // res.status(404)
    // next(error)
    next(new CustomError(`Not Found : ${req?.originalUrl}`, 404))
}


//globle error handler of whole project
const errorHandler = (err, req, res, next) => {
    const statusCode = err?.statusCode ? err?.statusCode : 500;
    res?.status(statusCode).json({
        status: false,
        data: {
            message: err?.message,
            stack: err?.stack
        }

    })
}


module.exports = { notFound, errorHandler }