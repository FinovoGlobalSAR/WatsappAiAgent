const sequelize = require("../config/db");

const Brand = require("./brand.model");
const Category = require("./category.model");
const Car = require("./car.model");


Brand.hasMany(Car, {
  foreignKey: "brandId",
  as: "cars",

  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Car.belongsTo(Brand, {
  foreignKey: "brandId",
  as: "brand",
});

Category.hasMany(Car, {
  foreignKey: "categoryId",
  as: "cars",

  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Car.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

module.exports = {
  sequelize,
  Brand,
  Category,
  Car,
};
