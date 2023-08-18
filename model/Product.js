import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME || "orte",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "admin",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
  },
);

export const Product = sequelize.define("Product", {
  price: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  stock: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  img: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  size: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});
