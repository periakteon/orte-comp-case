const socket = io("http://localhost:7500");

socket.on("connect", () => {
	console.log("Connected to the server");
});

socket.on("allProducts", (products) => {
	const productList = document.getElementById("productList");
	productList.innerHTML = "";
	products.map((product) => {
		const listItem = document.createElement("li");
		listItem.textContent = `${product.description} - ${product.price}`;
		productList.appendChild(listItem);
	});
});
