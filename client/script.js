const socket = io("http://localhost:7500");

socket.on("connect", () => {
	console.log("Connected to the server");
});

socket.on("disconnect", () => {
	console.log("Disconnected from the server");
});

socket.on("message", (data) => {
	console.log("Received message:", data);
});

document.getElementById("sendButton").addEventListener("click", () => {
	const message = document.getElementById("messageInput").value;
	socket.emit("message", message);
});
