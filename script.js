
document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search');
    const categorySelect = document.getElementById('category');
    const filterBtn = document.getElementById('filter-btn');
    const cartContainer = document.getElementById('cart');
    const cartSummary = document.getElementById('cart-summary');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
     let isCartVisible = false;
     const modalContainer = document.getElementById('modal-container');
     const modalContentInner = document.getElementById('modal-content-inner');
     const closeButton = document.querySelector('.close-modal');
    const feedbackForm = document.querySelector('.feedback-form form');
    const viewCartLink = document.getElementById('view-cart');


     const products = {
        1: {
          name: 'Смартфон',
          price: 20000,
          description: 'Современный смартфон с отличной камерой и производительностью.',
          stars: 4,
           image: '/images/black11_5-Photoroom.png',
        },
        2: {
          name: 'Куртка',
          price: 5000,
          description: 'Стильная и теплая куртка для прохладной погоды.',
          stars: 5,
            image: '/images/item-3479cf30-f8cc-4b59-915a-c6b222b94b91-Photoroom.png',

        },
        3: {
          name: 'Книга',
          price: 800,
          description: 'Интересная книга для увлекательного чтения.',
          stars: 3,
            image: '/images/Death_Note,_Book.svg.png',
        },
    };



    function updateCartDisplay() {
        if (!cartContainer) return;

        cartContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} - ${item.price} ₽</p>
                <button class="remove-item" data-name="${item.name}">Удалить</button>
            `;
            cartContainer.appendChild(cartItem);
            total += item.price;
        });

        if (cartSummary) {
            cartSummary.textContent = `Итоговая сумма: ${total} ₽`;
        }


        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                 const itemName = this.getAttribute('data-name');
                 cart = cart.filter(item => item.name !== itemName);
                 localStorage.setItem('cart', JSON.stringify(cart));
                 updateCartDisplay();
             });
         });
           localStorage.setItem('cart', JSON.stringify(cart));

        updateCartIcon();
    }

     if(productList){
         productList.addEventListener('click', function(event) {
            if(event.target.classList.contains('view-details-btn')){
                 const productId = event.target.getAttribute('data-id');
                 showModal(productId);
            }
         });
     }

    function updateCartIcon() {
         if(viewCartLink) {
             if (cart.length > 0) {
                viewCartLink.textContent = `🛒(${cart.length})`;
             } else {
                viewCartLink.textContent = '🛒';
             }
         }

    }

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categorySelect.value;

        document.querySelectorAll('.product-card').forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();

            const matchesCategory = category === 'all' || cardCategory === category;
            const matchesSearch = cardTitle.includes(searchTerm);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    if (filterBtn){
         filterBtn.addEventListener('click', filterProducts);
    }
    if (searchInput){
         searchInput.addEventListener('input', filterProducts);
    }
    if (categorySelect){
         categorySelect.addEventListener('change', filterProducts);
    }

    if(themeToggle) {
        themeToggle.addEventListener('click', function() {
           body.classList.toggle('dark-mode');
           themeToggle.textContent = body.classList.contains('dark-mode') ? '🌙' : '☀️';
         });
    }


    if (feedbackForm){
       feedbackForm.addEventListener('submit', function(event) {
           event.preventDefault();
           const name = document.getElementById('name').value;
           const email = document.getElementById('email').value;
           const message = document.getElementById('message').value;

           alert(`Сообщение от ${name} (${email}):\n\n${message}`);
         });
    }
   if(cartContainer){
     updateCartDisplay();
   }

    updateCartIcon();

     if (viewCartLink) {
          viewCartLink.addEventListener('click', function(event) {
            event.preventDefault();
            isCartVisible = !isCartVisible;
               if(window.location.pathname === '/index.html' || window.location.pathname === '/'){
                  if(isCartVisible){
                       window.location.href = 'cart.html'
                 }
              }
           });
       }
  function showModal(productId){
        const product = products[productId];
         if(!product) return;

           const stars = '⭐'.repeat(product.stars);

          modalContentInner.innerHTML = `
             <img src="${product.image}" alt="${product.name}" style="max-width: 100%; height: auto;">
              <h2>${product.name}</h2>
              <p><strong>Цена:</strong> ${product.price} ₽</p>
              <p><strong>Описание:</strong> ${product.description}</p>
              <p><strong>Рейтинг:</strong> ${stars}</p>
              <button class="add-to-cart-btn" data-name="${product.name}" data-price="${product.price}">Добавить в корзину</button>

           `;

          modalContainer.style.display = 'block';
  }


    function hideModal(){
          modalContainer.style.display = 'none';
    }


     closeButton.addEventListener('click', hideModal);

       modalContainer.addEventListener('click', function(event) {
           if (event.target === modalContainer) {
                 hideModal();
          }
      });


        modalContentInner.addEventListener('click', function(event) {
              if (event.target.classList.contains('add-to-cart-btn')) {
                const itemName = event.target.getAttribute('data-name');
                const itemPrice = parseInt(event.target.getAttribute('data-price'));
                cart.push({ name: itemName, price: itemPrice });
                localStorage.setItem('cart', JSON.stringify(cart));
                 updateCartDisplay();
                  updateCartIcon();
                 hideModal();
              }
         });

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
        modalContainer {
        
        }
      }
    });
  });
