const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Car = sequelize.define(
  "Car",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    model: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    registrationNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    color: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    transmission: {
      type: DataTypes.ENUM("Automatic", "Manual"),
      allowNull: false,
    },

    fuelType: {
      type: DataTypes.ENUM(
        "Petrol",
        "Diesel",
        "Hybrid",
        "Electric"
      ),
      allowNull: false,
    },

    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    doors: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    mileage: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    pricePerDay: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "Available",
        "Rented",
        "Maintenance"
      ),
      defaultValue: "Available",
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "cars",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Car;