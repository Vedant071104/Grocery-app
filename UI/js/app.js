document.addEventListener('DOMContentLoaded', function () {
    const productsList = document.getElementById('products-list');
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    let cart = [];

    // Fetch data from backend
    fetch('http://127.0.0.1:5000/get-products')
        .then(response => response.json())
        .then(products => {
            console.log(products); // Just for verification

            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');

                productItem.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Price: ₹${product.price}</p>
                    <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
                `;

                productsList.appendChild(productItem);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });

    // Add to cart function with quantity update
    window.addToCart = function (productId, productName, productPrice) {
        // Check if the product already exists in the cart
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            // If it exists, update the quantity
            existingProduct.quantity += 1;
        } else {
            // If it's new, add it to the cart
            cart.push({ id: productId, name: productName, price: parseFloat(productPrice), quantity: 1 });
        }

        updateCart();
    };

    // Update Cart UI and Total Price
    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ₹${item.price.toFixed(2)} x ${item.quantity}`;
            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = total.toFixed(2);
    }
});
