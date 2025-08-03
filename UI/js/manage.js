document.addEventListener('DOMContentLoaded', function () {
    fetchProducts();

    const form = document.getElementById('add-product-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const productName = document.getElementById('product-name').value;
        const productPrice = document.getElementById('product-price').value;
        const productUom = document.getElementById('product-uom').value;
        const productId = document.getElementById('product-id').value;

        const productData = {
            name: productName,
            price: productPrice,
            uom: productUom
        };

        // Check if it's an update or new product
        if (productId) {
            fetch(`http://127.0.0.1:5000/update-product/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            })
                .then(response => response.json())
                .then(data => {
                    alert('Product updated successfully!');
                    form.reset();
                    document.getElementById('product-id').value = '';
                    fetchProducts();
                })
                .catch(error => console.error('Error updating product:', error));
        } else {
            fetch('http://127.0.0.1:5000/add-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            })
                .then(response => response.json())
                .then(data => {
                    alert('Product added successfully!');
                    form.reset();
                    fetchProducts();
                })
                .catch(error => console.error('Error adding product:', error));
        }
    });
});

function fetchProducts() {
    fetch('http://127.0.0.1:5000/get-products')
        .then(response => response.json())
        .then(products => {
            const tableBody = document.getElementById('product-table').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = '';

            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.uom}</td>
                    <td>
                        <button onclick="editProduct(${product.id}, '${product.name}', '${product.price}', '${product.uom}')">Edit</button>
                        <button onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            alert('Failed to load products');
        });
}

function editProduct(id, name, price, uom) {
    document.getElementById('product-name').value = name;
    document.getElementById('product-price').value = price;
    document.getElementById('product-uom').value = uom;
    document.getElementById('product-id').value = id;
}

function deleteProduct(productId) {
    fetch(`http://127.0.0.1:5000/delete-product/${productId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            alert('Product deleted successfully!');
            fetchProducts();
        })
        .catch(error => console.error('Error deleting product:', error));
}
