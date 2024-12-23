document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    const cartContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const backToShopButton = document.getElementById('back-to-shop');

    const renderCart = () => {
        cartContainer.innerHTML = ''; // Очищаем контейнер корзины
        let total = 0;

        // Проверяем, есть ли товары в корзине
        if (Object.keys(cartItems).length === 0) {
            cartContainer.textContent = 'Корзина пуста.';
            cartSummary.textContent = 'Итоговая сумма: 0 ₽';
            return;
        }

        // Отображаем товары из корзины
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
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                renderCart();
            });

            item.appendChild(itemName);
            item.appendChild(itemPrice);
            item.appendChild(removeButton);

            cartContainer.appendChild(item);
            total += price * quantity;
        }

        cartSummary.textContent = `Итоговая сумма: ${total} ₽`;
    };

    backToShopButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    renderCart(); // Отображаем корзину при загрузке
});
