
const cart = [];

document.getElementById('filter-btn').addEventListener('click', filterProducts);
document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', (event) => {
        const name = event.target.dataset.name;
        const price = parseFloat(event.target.dataset.price);
        addToCart(name, price);
    });
});

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById('cart');
    const cartSummary = document.getElementById('cart-summary');
    cartContainer.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name} - ${item.price} ₽</span>
            <button onclick="removeFromCart(${index})">Удалить</button>
        `;
        cartContainer.appendChild(cartItem);
        total += item.price;
    });

    cartSummary.textContent = `Итоговая сумма: ${total} ₽`;
}

function filterProducts() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const categoryFilter = document.getElementById('category').value;
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const name = product.querySelector('h3').textContent.toLowerCase();
        const category = product.dataset.category;

        if (
            (name.includes(searchInput) || searchInput === '') &&
            (category === categoryFilter || categoryFilter === 'all')
        ) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Начальная тема
    let isDarkTheme = true;

    themeToggleBtn.addEventListener('click', () => {
      isDarkTheme = !isDarkTheme;

      if (!isDarkTheme) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggleBtn.textContent = ('☽');
        themeToggleBtn.classList.replace('btn-outline-light', 'btn-outline-dark');
      } else {
          
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggleBtn.textContent = ('☀️');
        themeToggleBtn.classList.replace('btn-outline-dark', 'btn-outline-light');
      }
    });
  });