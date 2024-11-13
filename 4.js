let cartCount = 0;
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart icon and page
function updateCartDisplay() {
  document.getElementById('cart-count').textContent = cartCount;
  document.getElementById('total-items').textContent = cartCount;
  
  // Calculate total cost of items in cart
  let totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('total-cost').textContent = totalCost.toFixed(2);
  
  // Update cart data in localStorage
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Function to add product to cart
function addToCart(name, price) {
  cartCount++;
  let found = cartItems.find(item => item.name === name);
  if (found) {
    found.quantity++;
  } else {
    cartItems.push({ name, price, quantity: 1 });
  }
  updateCartDisplay();
}

// Function to populate the cart page
function populateCartPage() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';  // Clear the container first

  cartItems.forEach(item => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');
    
    cartItemDiv.innerHTML = `
      <img src="plant1.jpg" alt="${item.name}">
      <p>${item.name}</p>
      <p>$${item.price}</p>
      <p>Quantity: <span id="quantity-${item.name}">${item.quantity}</span></p>
      <button onclick="updateQuantity('${item.name}', 1)">+</button>
      <button onclick="updateQuantity('${item.name}', -1)">-</button>
      <button onclick="removeFromCart('${item.name}')">Remove</button>
    `;
    
    cartItemsContainer.appendChild(cartItemDiv);
  });
}

// Function to update quantity in cart
function updateQuantity(name, change) {
  const item = cartItems.find(item => item.name === name);
  if (item) {
    item.quantity = Math.max(1, item.quantity + change);  // Ensure quantity is at least 1
  }
  updateCartDisplay();
  populateCartPage();
}

// Function to remove an item from the cart
function removeFromCart(name) {
  cartItems = cartItems.filter(item => item.name !== name);
  cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);  // Recalculate cartCount
  updateCartDisplay();
  populateCartPage();
}

// Initial update
updateCartDisplay();
populateCartPage();








  // تحديث ملخص العربة (إجمالي العناصر والمجموع الكلي)
  function updateCartSummary() {
    totalItems = cartData.reduce((sum, item) => sum + item.quantity, 0); // إجمالي العناصر
    totalCost = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0); // المجموع الكلي

    // تحديث واجهة المستخدم
    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-cost').textContent = totalCost.toFixed(2);

    // تمكين أو تعطيل زر الدفع بناءً على عدد العناصر
    document.getElementById('checkout-button').disabled = totalItems === 0;
  }

  // عرض العناصر في العربة
  function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // تنظيف الحاوية قبل الإضافة

    cartData.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');

        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <p><strong>${item.name}</strong></p>
                <p>سعر الوحدة: $${item.price}</p>
                <p>الكمية: ${item.quantity}</p>
                <p>المجموع: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <button onclick="changeQuantity(${item.id}, 1)">زيادة</button>
                <button onclick="changeQuantity(${item.id}, -1)">تقليص</button>
                <button onclick="removeItem(${item.id})">حذف</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
  }

  // تغيير الكمية
  function changeQuantity(itemId, delta) {
    const item = cartData.find(i => i.id === itemId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeItem(itemId);
    } else {
        updateCart(); // سيتم حساب الإجمالي وتحديث العربة تلقائيًا
    }
  }

  // حذف منتج من العربة
  function removeItem(itemId) {
    const index = cartData.findIndex(i => i.id === itemId);
    if (index > -1) {
        cartData.splice(index, 1);
        updateCart(); // تحديث العربة بعد الحذف
    }
  }

  // الدفع
  function checkout() {
    if (totalItems === 0) {
      alert('عربتك فارغة! الرجاء إضافة منتجات قبل الدفع.');
      return;
    }

    // محاكاة عملية الدفع
    alert(`تم الدفع بنجاح! إجمالي ${totalItems} منتجًا بمجموع $${totalCost.toFixed(2)}`);

    // مسح العربة بعد الدفع
    cartData.length = 0;
    updateCart(); // تحديث العربة بعد الدفع
  }

  // تهيئة العربة عند تحميل الصفحة
  updateCart();
  renderCartItems();
