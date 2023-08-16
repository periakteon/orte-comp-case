const Sequelize = require("sequelize");
const fs = require("fs/promises");
const path = require("path");
const mysql = require("mysql2/promise");

(async () => {
	try {
		const connection = await mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "admin",
		});

		await connection.query("CREATE DATABASE IF NOT EXISTS orte");
		console.log("Veritabanı başarıyla oluşturuldu veya zaten mevcut.");

		const sequelize = new Sequelize("orte", "root", "admin", {
			host: "localhost",
			dialect: "mysql",
		});

		const Product = sequelize.define("Product", {
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

		const jsonFile = await fs.readFile(
			path.join(__dirname, "urunler.json"),
			"utf8"
		);
		const jsonData = JSON.parse(jsonFile);

		await sequelize.sync({ force: true });

		for (const product of jsonData.products) {
			for (const productName in product) {
				const productData = product[productName];

				if (productData) {
					await Product.create({
						id: productData.id,
						price: productData.price,
						stock: productData.stock,
						img: productData.img,
						size: productData.size,
						description: productData.description,
					});
				} else {
					console.log(`Ürün: ${productName} geçersiz.`);
				}
			}
		}
		console.log("Veriler başarıyla veritabanına kaydedildi.");
	} catch (error) {
		console.error("Hata oluştu:", error);
	}
})();
