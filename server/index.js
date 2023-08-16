import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import {Product} from "./model/Product.js"

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
    console.log("a user connected", socket.id);
    const products = await Product.findAll();
    socket.emit("allProducts", products);
});

httpServer.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
