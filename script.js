document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const categorySelect = document.getElementById('category');
    const productList = document.getElementById('product-list');

    // Функция для фильтрации товаров
    const filterProducts = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;

        document.querySelectorAll('.product-card').forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productCategory = card.getAttribute('data-category');

            const matchesSearch = productName.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || selectedCategory === productCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };

    // Обработчики событий для поиска и фильтрации
    searchInput.addEventListener('input', filterProducts);
    categorySelect.addEventListener('change', filterProducts);

    // Обработчик для открытия карточки товара
    productList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const button = event.target;
            const productCard = button.closest('.product-card');

            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('p strong').textContent;
            const productImage = productCard.querySelector('img').src;

            openProductModal(productName, productPrice, productImage);
        }
    });

    // Функция для отображения модального окна с информацией о товаре
    const openProductModal = (name, price, image) => {
        // Создаем модальное окно
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';

        modal.innerHTML = `
            <div class="modal-content" style="background: white; padding: 20px; border-radius: 10px; width: 400px; text-align: center;">
                <span class="close-button" style="cursor: pointer; font-size: 20px; position: absolute; top: 10px; right: 20px;">&times;</span>
                <img src="${image}" alt="${name}" style="max-width: 100%; height: auto; border-radius: 5px; margin-bottom: 20px;">
                <h2>${name}</h2>
                <p>${price}</p>
                <button class="add-to-cart" data-name="${name}" data-price="${price.replace(/[^0-9]/g, '')}" style="padding: 10px 20px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">Добавить в корзину</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Обработчик для закрытия модального окна
        modal.querySelector('.close-button').addEventListener('click', () => {
            modal.remove();
        });

        // Обработчик для добавления товара в корзину из модального окна
        modal.querySelector('.add-to-cart').addEventListener('click', (event) => {
            const button = event.target;
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));
            addToCart(productName, productPrice);
            modal.remove();
        });
    };

    // Корзина
    const cart = document.getElementById('cart');
    const cartSummary = document.getElementById('cart-summary');
    const cartItems = {};

    const addToCart = (name, price) => {
        if (!cartItems[name]) {
            cartItems[name] = { price, quantity: 0 };
        }
        cartItems[name].quantity++;
        renderCart();
    };

    const renderCart = () => {
        cart.innerHTML = '';
        let total = 0;

        for (const [name, { price, quantity }] of Object.entries(cartItems)) {
            const item = document.createElement('div');
            item.classList.add('cart-item');

            const itemName = document.createElement('span');
            itemName.textContent = `${name} (${quantity})`;

            const itemPrice = document.createElement('span');
            itemPrice.textContent = `${price * quantity} ₽`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Удалить';
            removeButton.addEventListener('click', () => {
                delete cartItems[name];
                renderCart();
            });

            item.appendChild(itemName);
            item.appendChild(itemPrice);
            item.appendChild(removeButton);

            cart.appendChild(item);
            total += price * quantity;
        }

        cartSummary.textContent = `Итоговая сумма: ${total} ₽`;
    };

    // Инициализация фильтрации при загрузке
    filterProducts();

    // Добавление формы обратной связи
    const container = document.querySelector('.container');
    const form = document.createElement('div');
    container.appendChild(form);
});
document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault(); // Предотвращает отправку формы
    
    // Получаем значения полей
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    const email = document.getElementById('email').value.trim();
    
    // Проверяем, чтобы поля были заполнены
    if (!name) {
        alert('Пожалуйста, введите ваше имя.');
        return;
    }
    
    if (!email) {
        alert('Пожалуйста, введите ваш email.');
        return;
    }
    
    if (!message) {
        alert('Пожалуйста, введите сообщение.');
        return;
    }
    
    // Если все поля заполнены, показываем сообщение об успешной отправке
    alert('Жалоба отправлена!');
});
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

