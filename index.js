import env from "dotenv";
env.config();

import Sequelize from "sequelize";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { Product } from "./model/Product.js";

const app = express();
app.use(cors());
app.use(express.static("public"));

const socketApp = express();
socketApp.use(cors());

const SOCKET_PORT = process.env.SOCKET_PORT || 3001;
const HTTP_PORT = process.env.HTTP_PORT || 3000;

const socketServer = createServer(socketApp);

const io = new Server(socketServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  console.log("user connected", socket.id);

  socket.on("fetchProducts", async () => {
    const products = await Product.findAll({
      attributes: ["id", "img", "price", "stock", "size", "description"],
    });
    socket.emit(
      "allProducts",
      products.map((product) => ({
        ...product.dataValues,
        size: product.dataValues.size.split(",").slice(0, -1),
      })),
    );
  });

  socket.on("filterProducts", async (sizeFilter) => {
    const products = await Product.findAll({
      where: {
        size: {
          [Sequelize.Op.like]: `%${sizeFilter},%`,
        },
      },
      attributes: ["id", "img", "price", "stock", "size", "description"],
    });

    socket.emit(
      "filteredProducts",
      products.map((product) => ({
        ...product.dataValues,
        size: product.dataValues.size.split(",").slice(0, -1),
      })),
    );
  });
});

socketServer.listen(SOCKET_PORT, () => {
  console.log(`Socket is running on port ${SOCKET_PORT}`);
});

app.listen(HTTP_PORT, () => {
  console.log(`Server is running on port ${HTTP_PORT}`);
});
