let allProducts = [];
let cart = [];

// Cargar productos del API
async function loadProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        allProducts = data.products;
        displayProducts(allProducts);
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

// Mostrar productos en la página
function displayProducts(products) {
    const container = document.getElementById('productResults');
    container.innerHTML = '';
    products.forEach(product => {
        const html = `
            <div class="col-md-4 mb-3 animate__animated animate__fadeIn">
                <div class="card">
                    <img src="${product.thumbnail}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">Precio: ${product.price} - Categoría: ${product.category}</p>
                        <button class="btn btn-success" onclick="addToCart(${product.id}, '${product.title}')">Añadir a Carrito</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

// Aplicar filtros de búsqueda
function applyFilters() {
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const category = document.getElementById('category').value.toLowerCase();
    const brand = document.getElementById('brand').value.toLowerCase();

    const filteredProducts = allProducts.filter(product => {
        return (product.price >= minPrice) &&
               (!category || product.category.toLowerCase().includes(category)) &&
               (!brand || product.brand.toLowerCase().includes(brand));
    });
    displayProducts(filteredProducts);
}

// Añadir producto al carrito
function addToCart(productId, title) {
    const product = allProducts.find(p => p.id === productId);
    cart.push(product);
    updateCartView();
    Swal.fire({ // SweetAlert2 para la alerta de éxito
        title: '¡Producto añadido!',
        text: `${title} ha sido añadido al carrito.`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

// Actualizar vista del carrito
function updateCartView() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.className = 'list-group-item animate__animated animate__fadeIn';
        cartItem.textContent = `${item.title} - ${item.price}`;
        cartContainer.appendChild(cartItem);
    });
}

window.onload = loadProducts;

