// Cart Utilities - Shared functionality for all pages
// This file ensures consistent cart behavior across the entire site

// Cart state
let cart = [];
let cartCount = 0;

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

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('techstore-cart');
    const savedCount = localStorage.getItem('techstore-cart-count');
    
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    
    if (savedCount) {
        cartCount = parseInt(savedCount);
    }
    
    updateCartCount();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('techstore-cart', JSON.stringify(cart));
    localStorage.setItem('techstore-cart-count', cartCount.toString());
}

// Add product to cart
function addToCart(product) {
    if (!product) return;
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    cartCount++;
    updateCartCount();
    saveCart();
    
    // Show notification
    showNotification(`${product.title} agregado al carrito`);
    
    // Animate cart icon
    animateCartIcon();
}

// Remove product from cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        const removedItem = cart[itemIndex];
        cart.splice(itemIndex, 1);
        cartCount -= removedItem.quantity;
        
        saveCart();
        updateCartCount();
        
        showNotification(`${removedItem.title} removido del carrito`);
        return true;
    }
    return false;
}

// Update product quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        const newQuantity = item.quantity + change;
        
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            cartCount += change;
            
            saveCart();
            updateCartCount();
            
            showNotification(`Cantidad actualizada: ${newQuantity}`);
        }
        return true;
    }
    return false;
}

// Clear cart
function clearCart() {
    if (cart.length === 0) {
        showNotification('El carrito ya está vacío', 'info');
        return false;
    }

    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        cart = [];
        cartCount = 0;
        
        saveCart();
        updateCartCount();
        
        showNotification('Carrito vaciado correctamente');
        return true;
    }
    return false;
}

// Update cart count display
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
    });
}

// Animate cart icon
function animateCartIcon() {
    const cartIcon = document.querySelector('.cart');
    if (cartIcon) {
        cartIcon.style.animation = 'none';
        setTimeout(() => {
            cartIcon.style.animation = 'bounce 0.6s ease-in-out';
        }, 10);
    }
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
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Calculate cart totals
function calculateCartTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    return {
        subtotal: subtotal,
        itemCount: cartCount,
        cartItems: cart
    };
}

// Get cart items
function getCartItems() {
    return cart;
}

// Get cart count
function getCartCount() {
    return cartCount;
}

// Check if cart is empty
function isCartEmpty() {
    return cart.length === 0;
}

// Apply coupon
function applyCoupon(code) {
    const couponCode = code.trim().toUpperCase();
    
    if (!couponCode) {
        return { success: false, message: 'Por favor ingresa un código de descuento' };
    }

    if (!availableCoupons[couponCode]) {
        return { success: false, message: 'Código de descuento inválido' };
    }

    const subtotal = calculateCartTotals().subtotal;
    const coupon = availableCoupons[couponCode];

    if (subtotal < coupon.minAmount) {
        return { 
            success: false, 
            message: `Mínimo de compra: $${coupon.minAmount}` 
        };
    }

    return { 
        success: true, 
        message: `Cupón "${couponCode}" aplicado correctamente`,
        coupon: coupon
    };
}

// Calculate discount
function calculateDiscount(subtotal, couponCode) {
    if (!couponCode || !availableCoupons[couponCode]) return 0;

    const coupon = availableCoupons[couponCode];
    
    if (subtotal < coupon.minAmount) {
        return 0;
    }

    if (coupon.type === 'percentage') {
        return (subtotal * coupon.discount) / 100;
    } else {
        return coupon.discount;
    }
}

// Get shipping cost
function getShippingCost(shippingType) {
    return shippingCosts[shippingType] || 0;
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

// Auto-save cart periodically
setInterval(() => {
    if (cart.length > 0) {
        saveCart();
    }
}, 30000); // Save every 30 seconds

// Export functions for use in other files
window.CartUtils = {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart,
    saveCart,
    updateCartCount,
    showNotification,
    calculateCartTotals,
    getCartItems,
    getCartCount,
    isCartEmpty,
    applyCoupon,
    calculateDiscount,
    getShippingCost,
    availableCoupons,
    shippingCosts
}; 