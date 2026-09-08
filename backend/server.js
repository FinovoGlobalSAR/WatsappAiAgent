const app = require("./src/app");
const sequelize = require("./src/config/db");
require("./src/models/index.model");
const databaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
    await sequelize.sync({ alter: true });
    console.log("All tables synced successfully");
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

databaseConnection();
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
