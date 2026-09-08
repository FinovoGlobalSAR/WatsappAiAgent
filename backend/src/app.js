const express = require("express");
const cors = require("cors");
const brandRoutes = require("./routes/brand.routes");
const categoryRoutes = require("./routes/category.routes");
const carRoutes = require("./routes/car.routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/brands", brandRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cars", carRoutes);

module.exports = app;
