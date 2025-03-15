let cart = [];
try {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
} catch (error) {
    console.error("Error parsing cart from localStorage:", error);
}

// Update the cart count badge
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length; // Dynamically update based on the cart array
}

// Add a product to the cart
function addToCart(product) {
    cart.push(product); // Add the product to the cart array
    localStorage.setItem("cart", JSON.stringify(cart)); // Save to localStorage
    updateCartCount(); // Update the cart count
}

// Display cart items on the Cart page
function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p>Your cart is empty.</p>`;
        return;
    }

    cartItemsContainer.innerHTML = ""; // Clear the container
    cart.forEach((item, index) => {
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" />
                <div>
                    <h4>${item.name}</h4>
                    <p>Price: $${item.price}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    });
}

// Remove an item from the cart
function removeFromCart(index) {
    if (confirm("Are you sure you want to remove this item?")) {
        cart.splice(index, 1); // Remove the item at the given index
        localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
        displayCartItems(); // Update the cart display
        updateCartCount(); // Update the count badge
    }
}

// Initialize functionality
document.addEventListener("DOMContentLoaded", () => {
    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const product = {
                name: button.getAttribute("data-name"),
                price: button.getAttribute("data-price"),
                image: button.getAttribute("data-image")
            };
            addToCart(product);
            alert(`${product.name} has been added to your cart!`);
        });
    });

    // Update the cart count on all pages
    updateCartCount();

    // Display cart items on the cart page
    if (document.getElementById("cart-items")) {
        displayCartItems();
    }
});



/* workshop */
document.querySelectorAll('.thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        const mainImageId = thumbnail.getAttribute('data-main');
        const mainImage = document.getElementById(mainImageId);

        // تحديث الصورة الكبيرة
        mainImage.src = thumbnail.src;

        // إضافة حركة تكبير مؤقتة
        mainImage.style.transition = "transform 0.3s ease-in-out";
        mainImage.style.transform = "scale(1.1)";
        setTimeout(() => {
            mainImage.style.transform = "scale(1)";
        }, 300);
    });
});
