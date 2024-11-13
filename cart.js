// Example cart data
const cartData = [
  { id: 1, name: 'Succulent Plant', price: 15.99, quantity: 1, imageUrl: 'https://via.placeholder.com/80' },
  { id: 2, name: 'Cactus', price: 10.99, quantity: 2, imageUrl: 'https://via.placeholder.com/80' }
];

let totalItems = 0;
let totalCost = 0;

// Function to update the cart summary
function updateCartSummary() {
  document.getElementById('total-items').textContent = totalItems;
  document.getElementById('total-cost').textContent = totalCost.toFixed(2);
}

// Function to render cart items
function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  cartData.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');

      cartItemElement.innerHTML = `
          <img src="${item.imageUrl}" alt="${item.name}">
          <div class="cart-item-info">
              <p><strong>${item.name}</strong></p>
              <p>Unit Price: $${item.price}</p>
              <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <div class="cart-item-actions">
              <button onclick="changeQuantity(${item.id}, 1)">Increase</button>
              <button onclick="changeQuantity(${item.id}, -1)">Decrease</button>
              <button onclick="removeItem(${item.id})">Delete</button>
          </div>
      `;
      cartItemsContainer.appendChild(cartItemElement);
  });
}

// Function to update item quantity
function changeQuantity(itemId, delta) {
  const item = cartData.find(i => i.id === itemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
      removeItem(itemId);
  } else {
      updateCart();
  }
}

// Function to remove item from cart
function removeItem(itemId) {
  const index = cartData.findIndex(i => i.id === itemId);
  if (index > -1) {
      cartData.splice(index, 1);
      updateCart();
  }
}

// Function to update total items and cost
function updateCart() {
  totalItems = cartData.reduce((sum, item) => sum + item.quantity, 0);
  totalCost = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
  renderCartItems();
  updateCartSummary();
}

// Initialize cart
updateCart();