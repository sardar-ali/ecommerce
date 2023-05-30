const cloudinary = require("cloudinary")

cloudinary.config({
    cloud_name: process.env.CLOUDE_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


const cloadUploadingImg = async (fileToUploads) => {

    return new Promise((resolve) => {
        cloudinary.uploader.upload(fileToUploads, (res) => {
            resolve(
                {
                    url: res?.secure_url,
                },
                {
                    resource_type: "auto"
                },
            )
        })
    })

}

module.exports =  cloadUploadingImg 