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
    const productPrice = parseFloat(product.querySelector("p").textContent.replace("MYR", "")); // Extract and convert price to a number

    // Check if the product is already in the cart
    if (cartProducts[productName]) {
      // If it's in the cart, update the quantity and price
      cartProducts[productName].quantity += 1;
      cartProducts[productName].totalPrice += productPrice;
      cartItemsList.querySelector(`[data-product="${productName}"]`).textContent = `${productName} - MYR${cartProducts[productName].totalPrice.toFixed(2)} (Qty: ${cartProducts[productName].quantity})`;
    } else {
      // If it's not in the cart, add it to the cart
      cartProducts[productName] = {
        quantity: 1,
        totalPrice: productPrice,
      };
      const cartItem = document.createElement("li");
      cartItem.dataset.product = productName;
      cartItem.textContent = `${productName} - MYR${productPrice.toFixed(2)} (Qty: 1)`;
      cartItemsList.appendChild(cartItem);
    }
  });
});
