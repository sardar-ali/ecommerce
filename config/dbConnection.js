const mongoose = require("mongoose");

const dbConnection = () => {
    // 1) first method 
  
    try {
        const result = mongoose.connect(process.env.MONGODB_URL);
        console.log("database connected successfully!")
    } catch (error) {
        console.log("Error ::", error)
    }

    // 2) second menthod
    // mongoose.connect("mongodb://127.0.0.1:27017/ecommerce_store",  {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // }).then((response)=> { 
    //     console.log("database connected successfully!")
    // }).catch((error)=>{
    //     console.log("Error ::", error)
    // })


}

module.exports = {
    dbConnection
}