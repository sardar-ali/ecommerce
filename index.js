const express = require("express");
require("dotenv").config();

const { dbConnection } = require("./config/dbConnection");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorHanlder");

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 8081;
const base_url = process.env.BASE_URL;

// Databse connection here
dbConnection();

//define all routes
app.use(`${base_url}/user`, userRoutes);

//added error middlewares
app.use(notFound)
app.use(errorHandler)

// server listing here
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})