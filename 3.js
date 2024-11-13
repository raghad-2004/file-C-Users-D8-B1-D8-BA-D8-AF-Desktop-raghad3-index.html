// Accessing elements from HTML
const addToBasketButtons = document.querySelectorAll('.add-to-basket');
const basketList = document.getElementById('basket-list');
const totalPriceElem = document.getElementById('total-price');

// To store basket items and total price
let basket = [];
let totalPrice = 0;

// Event listener for "Add to Basket" buttons
addToBasketButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const name = event.target.getAttribute('data-name');
    const price = parseFloat(event.target.getAttribute('data-price'));

    // Add item to basket
    basket.push({ name, price });

    // Update the basket list
    updateBasket();
  });
});

// Function to update the basket display
function updateBasket() {
  // Clear current basket display
  basketList.innerHTML = '';

  // Add each item in the basket to the list
  basket.forEach(item => {
    const li = document.createElement('li');
    li.textContent = ${item.name} - $${item.price.toFixed(2)};
    basketList.appendChild(li);
  });

  // Update total price
  totalPrice = basket.reduce((acc, item) => acc + item.price, 0);
  totalPriceElem.textContent = totalPrice.toFixed(2);
}

// Optional: Checkout function (this could be more complex in a real store)
document.getElementById('checkout-btn').addEventListener('click', () => {
  if (basket.length > 0) {
    alert(Checkout complete! Total: $${totalPrice.toFixed(2)});
    // Clear basket after checkout
    basket = [];
    updateBasket();
  } else {
    alert('Your basket is empty!');
  }
});