import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

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

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("message", (data) => {
        console.log("Received message:", data);
        
        io.emit("message", data);
    });

    socket.on("disconnect", () => {
        console.log("a user disconnected", socket.id);
    });
});

httpServer.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
