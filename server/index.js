import Sequelize from "sequelize";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { Product } from "./model/Product.js";

const app = express();
app.use(cors());

const PORT = 7500;

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  console.log("user connected", socket.id);

  socket.on("fetchProducts", async () => {
    const products = await Product.findAll();
    socket.emit("allProducts", products);
  });

  socket.on("filterProducts", async (sizeFilter) => {
    const products = await Product.findAll({
      where: {
        size: {
          [Sequelize.Op.like]: `%${sizeFilter}%`,
        },
      },
    });

    const filteredProducts = products.filter((product) => {
      const sizes = product.size.split(", ");
      return sizes.includes(sizeFilter);
    });

    socket.emit("filteredProducts", filteredProducts);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
