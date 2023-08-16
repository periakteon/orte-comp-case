import Sequelize from "sequelize";
import fs from "fs/promises";
import path from "path";
import mysql from "mysql2/promise";
import { fileURLToPath } from "url";

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

		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);
		const filePath = path.join(__dirname, "urunler.json");
		const jsonFile = await fs.readFile(filePath, "utf8");
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
