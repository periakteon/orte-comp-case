import Sequelize from "sequelize";

export const sequelize = new Sequelize("orte", "root", "admin", {
	host: "localhost",
	dialect: "mysql",
});

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
		type: Sequelize.JSON,
		allowNull: false,
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
});
