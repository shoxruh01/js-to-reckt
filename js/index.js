const API = "https://dummyjson.com/products";
const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("searchInput");

let allProducts = [];

async function getProducts() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    allProducts = data.products;
    renderProducts(allProducts);
  } catch (error) {
    console.log("Xatolik:", error);
  }
}

function renderProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach(product => {
    const discount = product.discountPercentage.toFixed(0);

    const oldPrice = (
      product.price / (1 - product.discountPercentage / 100)
    ).toFixed(2);

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="badge">${discount}%</div>
      <img src="${product.thumbnail}" alt="${product.title}">
      <div class="category">${product.category}</div>
      <div class="title">${product.title}</div>
      <div class="brand">By ${product.brand}</div>

      <div class="price-box">
        <div>
          <span class="price">$${product.price}</span>
          <span class="old-price">$${oldPrice}</span>
        </div>
        <button>🛒 Add</button>
      </div>
    `;

    productsContainer.appendChild(card);
  });
}

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(value)
  );

  renderProducts(filtered);
});

getProducts();