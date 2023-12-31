import env from "dotenv";
env.config();

import fs from "fs/promises";
import path from "path";
import mysql from "mysql2/promise";
import { fileURLToPath } from "url";
import { Product, sequelize } from "./model/Product.js";

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "admin",
      port: process.env.DB_PORT || 3306,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`,
    );
    console.log("Veritabanı başarıyla oluşturuldu veya zaten mevcut.");

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
            size: Array.isArray(productData.size)
              ? `${productData.size.join(",")},`
              : `${productData.size},`,
            description: productData.description,
          });
        } else {
          console.log(`Ürün: ${productName} geçersiz.`);
        }
      }
    }
    console.log("Veriler başarıyla veritabanına kaydedildi.");
    process.exit();
  } catch (error) {
    console.error("Hata oluştu:", error);
  }
})();
