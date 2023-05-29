const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser")
const { dbConnection } = require("./config/dbConnection");
const { notFound, errorHandler } = require("./middlewares/errorHanlder");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const blogRoutes = require("./routes/blogRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const brandRoutes = require("./routes/brandRoutes")
const blogCategoryRoutes = require("./routes/blogCategoryRoutes")

const app = express();
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 8081;
const base_url = process.env.BASE_URL;

// Databse connection here
dbConnection();

//define all routes
app.use(`${base_url}/user`, userRoutes);
app.use(`${base_url}/product`, productRoutes);
app.use(`${base_url}/blog`, blogRoutes);
app.use(`${base_url}/category`, categoryRoutes);
app.use(`${base_url}/brand`, brandRoutes);
app.use(`${base_url}/blog_category`, blogCategoryRoutes);

//added error middlewares
app.use(notFound)
app.use(errorHandler)

// server listing here
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

//hererandomtexthere
// vqgconinsdnfkyws