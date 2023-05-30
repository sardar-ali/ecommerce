const multer = require("multer");
const sharp = require("sharp");
const path = require("path");



//create directory where the image store and make the file name unique
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images/"))
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(" ").join("-")
        // const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.jpeg`)
    }
})


const multerFilter = (req, file, cb) => {

    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb({ message: "unSupported file format" }, false)
    }
}


//product image customization
const productImagesResize = async (req, res, next) => {
    if (!req.file) return next();
    await Promise.all((req?.files?.map(async (file) => {
        await sharp(req?.path)
            .resize(300, 300)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`public/images/products/${file?.filename}`)
    })));
    next()
}


//blog image customization
const blogImagesResize = async (req, res, next) => {
    if (!req.file) return next();
    await Promise.all((req?.files?.map(async (file) => {
        await sharp(req?.path)
            .resize(300, 300)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`public/images/blogs/${file?.filename}`)
    })));
    next()
}



//set that directory here
const uploadOptions = multer({
    storage,
    fileFilter: multerFilter,
    limits: { fieldSize: 2000000 }
})


module.exports = { productImagesResize, blogImagesResize, uploadOptions }