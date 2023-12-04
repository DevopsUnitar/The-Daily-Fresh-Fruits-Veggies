// Select the cart items list and the "Add to Cart" buttons
const cartItemsList = document.getElementById("cart-items");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Create an empty object to keep track of products in the cart
const cartProducts = {};

// Add a click event listener to each "Add to Cart" button
addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Get the product information from the clicked product
    const product = event.target.closest(".product");
    const productName = product.querySelector("h2").textContent;
    const productPrice = parseFloat(product.querySelector("p").textContent.replace("MYR", ""));

    // Check if the product is already in the cart
    if (cartProducts[productName]) {
      // If it's in the cart, update the quantity and price
      cartProducts[productName].quantity += 1;
    } else {
      // If it's not in the cart, add it to the cart
      cartProducts[productName] = {
        quantity: 1,
        productPrice: productPrice,
      };
    }

    // Update or add the item in the cart display
    updateCartDisplay(productName);
  });
});

// Function to update or add a product in the cart display
function updateCartDisplay(productName) {
  const cartItem = cartItemsList.querySelector(`[data-product="${productName}"]`);
  
  if (cartItem) {
    // If the item is already in the cart, update the display
    const quantity = cartProducts[productName].quantity;
    const totalPrice = quantity * cartProducts[productName].productPrice;
    cartItem.innerHTML = `${productName} - MYR${totalPrice.toFixed(2)} (Qty: ${quantity}) <button class="remove-from-cart">Remove</button>`;
  } else {
    // If the item is not in the cart, add it to the cart display
    const productPrice = cartProducts[productName].productPrice;
    const cartItem = document.createElement("li");
    cartItem.dataset.product = productName;
    cartItem.innerHTML = `${productName} - MYR${productPrice.toFixed(2)} (Qty: 1) <button class="remove-from-cart">Remove</button>`;
    cartItemsList.appendChild(cartItem);
  }

  // Add a click event listener to the remove button of the updated or added item
  const removeButton = cartItem.querySelector(".remove-from-cart");
  removeButton.addEventListener("click", () => removeFromCart(productName, cartItem));
}

// Function to remove an item from the cart
function removeFromCart(productName, cartItem) {
  // Decrease the quantity and remove the item if the quantity is zero
  cartProducts[productName].quantity -= 1;

  if (cartProducts[productName].quantity === 0) {
    delete cartProducts[productName];
    cartItem.remove();
  } else {
    // Update the cart display
    updateCartDisplay(productName);
  }
}