


cartItemsContainer = document.getElementById('cartItems')
totalPriceElement = document.getElementById('totalPrice')
let allProducts = [];

window.onload = function () {
    fetch("https://dummyjson.com/products")
        .then(res => res.json())
        .then(data => {
            allProducts = data.products;
            loadCart();
        });
};


function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const product = allProducts.find(p => p.id === item.id);

        if (product) {
            total += product.price * item.quantity;
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <div class="item-info">
                    <img src="${product.thumbnail}" alt="${product.title}" width="100%">
                    <h2>${product.title}</h2> 
                    <p>Price: ${product.price}</p>
                </div>
                <div class="item-controls">
                    <button class="btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <input type="number" class="w-25 text-center" value="${item.quantity}" min="1" onchange="setQuantity(${index}, this.value)">
                    <button class="btn" onclick="updateQuantity(${index}, 1)">+</button>
                    <button class="remove-btn btn" onclick="removeItem(${index})">Remove</button>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
        }
    });

    totalPriceElement.textContent = total.toFixed(2);
}

// *******************************************************

function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += change;

    if (cart[index].quantity < 1) {
        removeItem(index);
        return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartItem(index);
    updateTotalPrice();
}

// *******************************************************

function setQuantity(index, newQuantity) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity = parseInt(newQuantity);

    if (cart[index].quantity < 1 || isNaN(cart[index].quantity)) {
        cart[index].quantity = 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartItem(index);
    updateTotalPrice();
}
// *******************************************************
function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });

}

// *******************************************************

function updateCartItem(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemControls = document.querySelectorAll(".cart-item")[index].querySelector(".item-controls");
    itemControls.querySelector("input").value = cart[index].quantity;
}
// *******************************************************


function updateTotalPrice() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cart.forEach(item => {
        const product = allProducts.find(p => p.id === item.id);
        if (product) {
            total += product.price * item.quantity;
        }
    });

    totalPriceElement.textContent = total.toFixed(2);
}



