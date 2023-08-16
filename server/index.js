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
    const allProducts = await Product.findAll();

    const filterSize = sizeFilter.split(",");

    const filteredProducts = allProducts.filter((product) => {
      const productSizes = product.size;
      return filterSize.some((size) => productSizes.includes(size));
    });

    socket.emit("filteredProducts", filteredProducts);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
