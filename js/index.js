let currentPage = 1;
const limit = 10;
let allProducts = [];

window.onload = function () {
  getProducts();
};

function getProducts() {
  axios
    .get("https://dummyjson.com/products")
    .then((response) => {
      allProducts = response.data.products;
      displayProducts();
      updatePagination();
    })
    .catch((error) => console.error("Error fetching products:", error));
}

function searchProducts() {
  const query = document.getElementById("searchQuery").value.toLowerCase();
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(query)
  );

  displayProducts(filteredProducts);
  updatePagination(filteredProducts.length);
}

function displayProducts(products = null) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;

  // If there is a search, the products in the search results are displayed.If there is no search, the products sent from the API are displayed.
  const productsToDisplay = (products ? products : allProducts).slice(startIndex, endIndex);


  productsToDisplay.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" width="100%">
      <h2>${product.title}</h2>
      <p>Price: $${product.price}</p>
      <button class="btn View-Details"  onclick="viewProduct(${product.id})">View Details</button>
      <button class="btn mt-2 ADD" onclick="addToCart(${product.id})">Add to Cart</button>

    `;
    productList.appendChild(productDiv);
  });
}

function viewProduct(id) {
  location.href = `Product-Details/Details.html?id=${id}`;

}

function updatePagination(totalProducts = allProducts.length) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(totalProducts / limit);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.classList.add("page-btn");

    pageButton.addEventListener("click", () => {
      currentPage = i;
      displayProducts();
      updatePagination();
    });

    if (i === currentPage) {
      pageButton.classList.add("active");
    }

    paginationContainer.appendChild(pageButton);
  }
}

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Increased quantity in cart!",
      showConfirmButton: false,
      timer: 1500
    });
  } else {
    cart.push({ id: productId, quantity: 1 });
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Product added to cart!",
      showConfirmButton: false,
      timer: 1500
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));


}

if (!localStorage.getItem("user")) {
  window.location.href = "login.html";
}

document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("user");
  window.location.href = "login.html";
});