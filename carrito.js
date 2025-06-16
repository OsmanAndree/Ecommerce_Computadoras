// Cart functionality
let cart = [];
let cartCount = 0;
let appliedCoupon = null;
let shippingCost = 0;

// Available coupons
const availableCoupons = {
    'WELCOME10': { discount: 10, type: 'percentage', minAmount: 50 },
    'SAVE20': { discount: 20, type: 'percentage', minAmount: 100 },
    'FREESHIP': { discount: 15, type: 'fixed', minAmount: 75 },
    'TECH25': { discount: 25, type: 'percentage', minAmount: 200 }
};

// Shipping costs
const shippingCosts = {
    'standard': 0,
    'express': 15,
    'overnight': 25
};

// DOM elements
const cartItemsList = document.getElementById('cartItemsList');
const cartItemsCount = document.getElementById('cartItemsCount');
const emptyCart = document.getElementById('emptyCart');
const subtotalElement = document.getElementById('subtotal');
const discountElement = document.getElementById('discount');
const shippingElement = document.getElementById('shipping');
const totalElement = document.getElementById('total');
const couponCodeInput = document.getElementById('couponCode');
const couponMessage = document.getElementById('couponMessage');
const cartCountElement = document.querySelector('.cart-count');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    setupEventListeners();
    renderCart();
    updateSummary();
});

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('techstore-cart');
    const savedCount = localStorage.getItem('techstore-cart-count');
    
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    
    if (savedCount) {
        cartCount = parseInt(savedCount);
        updateCartCount();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('techstore-cart', JSON.stringify(cart));
    localStorage.setItem('techstore-cart-count', cartCount.toString());
}

// Setup event listeners
function setupEventListeners() {
    // Shipping options
    document.querySelectorAll('input[name="shipping"]').forEach(radio => {
        radio.addEventListener('change', updateShipping);
    });

    // Coupon input
    couponCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            applyCoupon();
        }
    });
}

// Render cart items
function renderCart() {
    if (cart.length === 0) {
        showEmptyCart();
        return;
    }

    hideEmptyCart();
    cartItemsList.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = createCartItem(item, index);
        cartItemsList.appendChild(cartItem);
    });

    updateCartCount();
}

// Create cart item element
function createCartItem(item, index) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s`;

    cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="cart-item-details">
            <h3 class="cart-item-title">${item.title}</h3>
            <div class="cart-item-category">${getCategoryName(item.category)}</div>
            <div class="cart-item-rating">
                <div class="stars">${generateStars(item.rating)}</div>
                <span class="rating-count">(${item.reviews})</span>
            </div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="cart-item-quantity">
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>
        <div class="cart-item-total">
            <span class="item-total">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
        <div class="cart-item-actions">
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    return cartItem;
}

// Get category name
function getCategoryName(category) {
    const categories = {
        'gaming': 'Gaming',
        'office': 'Oficina',
        'desktop': 'Escritorio',
        'components': 'Componentes',
        'accessories': 'Accesorios'
    };
    return categories[category] || category;
}

// Generate star rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        const newQuantity = item.quantity + change;
        
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart();
            renderCart();
            updateSummary();
            showNotification(`Cantidad actualizada: ${newQuantity}`);
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        const removedItem = cart[itemIndex];
        cart.splice(itemIndex, 1);
        cartCount -= removedItem.quantity;
        
        saveCart();
        renderCart();
        updateSummary();
        updateCartCount();
        
        showNotification(`${removedItem.title} removido del carrito`);
    }
}

// Clear cart
function clearCart() {
    if (cart.length === 0) {
        showNotification('El carrito ya está vacío', 'info');
        return;
    }

    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        cart = [];
        cartCount = 0;
        appliedCoupon = null;
        shippingCost = 0;
        
        saveCart();
        renderCart();
        updateSummary();
        updateCartCount();
        
        // Reset shipping selection
        document.getElementById('standard').checked = true;
        
        showNotification('Carrito vaciado correctamente');
    }
}

// Show empty cart message
function showEmptyCart() {
    emptyCart.style.display = 'block';
    cartItemsList.style.display = 'none';
    document.querySelector('.cart-actions').style.display = 'none';
    document.querySelector('.order-summary').style.display = 'none';
}

// Hide empty cart message
function hideEmptyCart() {
    emptyCart.style.display = 'none';
    cartItemsList.style.display = 'block';
    document.querySelector('.cart-actions').style.display = 'flex';
    document.querySelector('.order-summary').style.display = 'block';
}

// Update cart count
function updateCartCount() {
    cartCountElement.textContent = cartCount;
    cartItemsCount.textContent = cartCount;
}

// Update summary
function updateSummary() {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount(subtotal);
    const total = subtotal - discount + shippingCost;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    discountElement.textContent = `-$${discount.toFixed(2)}`;
    shippingElement.textContent = `$${shippingCost.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Calculate subtotal
function calculateSubtotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Calculate discount
function calculateDiscount(subtotal) {
    if (!appliedCoupon) return 0;

    const coupon = availableCoupons[appliedCoupon];
    
    if (subtotal < coupon.minAmount) {
        return 0;
    }

    if (coupon.type === 'percentage') {
        return (subtotal * coupon.discount) / 100;
    } else {
        return coupon.discount;
    }
}

// Update shipping
function updateShipping() {
    const selectedShipping = document.querySelector('input[name="shipping"]:checked').value;
    shippingCost = shippingCosts[selectedShipping];
    updateSummary();
}

// Apply coupon
function applyCoupon() {
    const code = couponCodeInput.value.trim().toUpperCase();
    
    if (!code) {
        showCouponMessage('Por favor ingresa un código de descuento', 'error');
        return;
    }

    if (!availableCoupons[code]) {
        showCouponMessage('Código de descuento inválido', 'error');
        return;
    }

    const subtotal = calculateSubtotal();
    const coupon = availableCoupons[code];

    if (subtotal < coupon.minAmount) {
        showCouponMessage(`Mínimo de compra: $${coupon.minAmount}`, 'error');
        return;
    }

    appliedCoupon = code;
    updateSummary();
    showCouponMessage(`Cupón "${code}" aplicado correctamente`, 'success');
    couponCodeInput.value = '';
}

// Show coupon message
function showCouponMessage(message, type = 'info') {
    couponMessage.textContent = message;
    couponMessage.className = `coupon-message ${type}`;
    
    setTimeout(() => {
        couponMessage.textContent = '';
        couponMessage.className = 'coupon-message';
    }, 3000);
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Agrega productos al carrito antes de proceder', 'error');
        return;
    }

    // Here you would typically redirect to a checkout page
    // For now, we'll show a success message
    showNotification('Redirigiendo al checkout...', 'success');
    
    // Simulate checkout process
    setTimeout(() => {
        alert('¡Gracias por tu compra! Esta es una simulación del proceso de checkout.');
        
        // Clear cart after successful checkout
        cart = [];
        cartCount = 0;
        appliedCoupon = null;
        shippingCost = 0;
        
        saveCart();
        renderCart();
        updateSummary();
        updateCartCount();
        
        // Reset shipping selection
        document.getElementById('standard').checked = true;
    }, 2000);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 
                    type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' :
                    'linear-gradient(135deg, #3b82f6, #2563eb)'};
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add floating animation to elements
function addFloatingAnimation() {
    const elements = document.querySelectorAll('.cart-item, .summary-card');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// Enhanced scroll animations
function enhancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.cart-item, .summary-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', () => {
    addFloatingAnimation();
    enhancedScrollAnimations();
});

// Auto-save cart periodically
setInterval(() => {
    if (cart.length > 0) {
        saveCart();
    }
}, 30000); // Save every 30 seconds 