const mongoose = require("mongoose");

const dbConnection = () => {
    // 1) first method 
  
    try {
        const result = mongoose.connect(process.env.MONGODB_URL);
        console.log("database connected successfully!")
    } catch (error) {
        console.log("Error ::", error)
    }

}

module.exports = {
    dbConnection
}