const socket = io("http://localhost:3001");

socket.on("connect", () => {
  console.log("Connected to the server");

  const fetchProductsBtn = document.getElementById("fetchProductsBtn");
  fetchProductsBtn.addEventListener("click", () => {
    socket.emit("fetchProducts");
  });

  const filterXBtn = document.getElementById("filterX");
  filterXBtn.addEventListener("click", () => {
    socket.emit("filterProducts", "X");
  });

  const filterMBtn = document.getElementById("filterM");
  filterMBtn.addEventListener("click", () => {
    socket.emit("filterProducts", "M");
  });
});

socket.on("allProducts", (products) => {
  const productList = document.getElementById("productList");
  productList.innerHTML = `<h1>All Products (${products.length})</h1>`;
  products.map((product) => {
    const listItem = document.createElement("li");
    listItem.classList.add("product-item");

    listItem.innerHTML = `
            <div class="product-image">
                <img src="${product.img}" alt="Product Image">
            </div>
            <div class="product-details">
                <div class="product-info">
                    <span class="product-id">ID: ${product.id}</span>
                    <span class="product-price">Price: ${product.price}</span>
                    <span class="product-stock">Stock: ${product.stock}</span>
                    <span class="product-size">Size: ${product.size}</span>
                </div>
                <p class="product-description">${product.description}</p>
            </div>
        `;

    productList.appendChild(listItem);
  });
});

socket.on("filteredProducts", (products) => {
  const productList = document.getElementById("productList");
  productList.innerHTML = `<h1>Filtered Products (${products.length})</h1>`;
  products.map((product) => {
    const listItem = document.createElement("li");
    listItem.classList.add("product-item");

    listItem.innerHTML = `
            <div class="product-image">
                <img src="${product.img}" alt="Product Image">
            </div>
            <div class="product-details">
                <div class="product-info">
                    <span class="product-id">ID: ${product.id}</span>
                    <span class="product-price">Price: ${product.price}</span>
                    <span class="product-stock">Stock: ${product.stock}</span>
                    <span class="product-size">Size: ${product.size}</span>
                </div>
                <p class="product-description">${product.description}</p>
            </div>
        `;

    productList.appendChild(listItem);
  });
});
