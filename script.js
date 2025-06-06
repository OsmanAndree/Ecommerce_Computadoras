// Sample product data
const products = [
  {
    id: 1,
    title: "Laptop Gaming ASUS ROG Strix G15",
    price: 1299.99,
    rating: 4.5,
    reviews: 234,
    image: "img/rogstrix.webp",
  },
  {
    id: 2,
    title: 'MacBook Pro 14" M3 Pro',
    price: 1999.99,
    rating: 4.8,
    reviews: 156,
    image: "img/macbookpro.webp",
  },
  {
    id: 3,
    title: "PC Gaming Custom RTX 4070",
    price: 1599.99,
    rating: 4.6,
    reviews: 89,
    image: "img/pccustom.webp",
  },
  {
    id: 4,
    title: "Laptop Dell XPS 13 Plus",
    price: 1199.99,
    rating: 4.4,
    reviews: 312,
    image: "img/dellxps.webp",
  },
  {
    id: 5,
    title: 'iMac 24" M3 Chip',
    price: 1299.99,
    rating: 4.7,
    reviews: 198,
    image: "img/imac.webp",
  },
  {
    id: 6,
    title: "Laptop HP Pavilion Gaming",
    price: 899.99,
    rating: 4.2,
    reviews: 267,
    image: "img/pavilongaming.webp",
  },
  {
    id: 7,
    title: "PC Workstation Intel i9",
    price: 2299.99,
    rating: 4.9,
    reviews: 45,
    image: "img/workstation.webp",
  },
  {
    id: 8,
    title: "Laptop Lenovo ThinkPad X1",
    price: 1499.99,
    rating: 4.6,
    reviews: 178,
    image: "img/lenovothinkpad.webp",
  },
]

// Cart functionality
let cart = []
let cartCount = 0

// DOM elements
const productsGrid = document.getElementById("products-grid")
const cartCountElement = document.querySelector(".cart-count")

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  loadProducts()
  setupEventListeners()
  animateOnScroll()
})

// Load products into the grid
function loadProducts() {
  productsGrid.innerHTML = ""

  products.forEach((product) => {
    const productCard = createProductCard(product)
    productsGrid.appendChild(productCard)
  })
}

// Create product card element
function createProductCard(product) {
  const card = document.createElement("div")
  card.className = "product-card"
  card.style.animation = "fadeInUp 0.6s ease-out"

  card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-rating">
                <div class="stars">${generateStars(product.rating)}</div>
                <span class="rating-count">(${product.reviews})</span>
            </div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-cart-plus"></i> Agregar al carrito
            </button>
        </div>
    `

  return card
}

// Generate star rating
function generateStars(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  let stars = ""

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>'
  }

  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>'
  }

  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>'
  }

  return stars
}

// Add product to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  if (product) {
    cart.push(product)
    cartCount++
    updateCartCount()
    showAddToCartAnimation()

    // Show success message
    showNotification(`${product.title} agregado al carrito`)
  }
}

// Update cart count display
function updateCartCount() {
  cartCountElement.textContent = cartCount
  cartCountElement.style.animation = "none"
  setTimeout(() => {
    cartCountElement.style.animation = "pulse 0.5s ease-in-out"
  }, 10)
}

// Show add to cart animation
function showAddToCartAnimation() {
  const cartIcon = document.querySelector(".cart")
  cartIcon.style.animation = "none"
  setTimeout(() => {
    cartIcon.style.animation = "bounce 0.6s ease-in-out"
  }, 10)
}

// Show notification
function showNotification(message) {
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-in"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Setup event listeners
function setupEventListeners() {
  // Search functionality
  const searchInput = document.querySelector(".search-bar input")
  const searchBtn = document.querySelector(".search-btn")

  searchBtn.addEventListener("click", performSearch)
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch()
    }
  })

  // Category cards click
  const categoryCards = document.querySelectorAll(".category-card")
  categoryCards.forEach((card) => {
    card.addEventListener("click", function () {
      const category = this.dataset.category
      filterByCategory(category)
    })
  })

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form")
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault()
    const email = this.querySelector("input").value
    if (email) {
      showNotification("¡Suscripción exitosa! Gracias por unirte.")
      this.querySelector("input").value = ""
    }
  })

  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })
}

// Search functionality
function performSearch() {
  const searchTerm = document.querySelector(".search-bar input").value.toLowerCase()
  const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchTerm))

  displayFilteredProducts(filteredProducts)

  if (filteredProducts.length === 0) {
    showNotification("No se encontraron productos para tu búsqueda")
  }
}

// Filter by category
function filterByCategory(category) {
  let filteredProducts = products

  switch (category) {
    case "gaming":
      filteredProducts = products.filter(
        (p) =>
          p.title.toLowerCase().includes("gaming") ||
          p.title.toLowerCase().includes("rog") ||
          p.title.toLowerCase().includes("rtx"),
      )
      break
    case "office":
      filteredProducts = products.filter(
        (p) =>
          p.title.toLowerCase().includes("dell") ||
          p.title.toLowerCase().includes("thinkpad") ||
          p.title.toLowerCase().includes("xps"),
      )
      break
    case "desktop":
      filteredProducts = products.filter(
        (p) =>
          p.title.toLowerCase().includes("pc") ||
          p.title.toLowerCase().includes("imac") ||
          p.title.toLowerCase().includes("workstation"),
      )
      break
  }

  displayFilteredProducts(filteredProducts)
}

// Display filtered products
function displayFilteredProducts(filteredProducts) {
  productsGrid.innerHTML = ""

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML =
      '<p style="text-align: center; grid-column: 1/-1; font-size: 18px; color: #666;">No se encontraron productos</p>'
    return
  }

  filteredProducts.forEach((product, index) => {
    const productCard = createProductCard(product)
    productCard.style.animationDelay = `${index * 0.1}s`
    productsGrid.appendChild(productCard)
  })
}

// Animate elements on scroll
function animateOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.6s ease-out"
      }
    })
  })

  // Observe category cards
  document.querySelectorAll(".category-card").forEach((card) => {
    observer.observe(card)
  })
}

// Additional CSS animations
const additionalStyles = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    @keyframes bounce {
        0%, 20%, 60%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        80% { transform: translateY(-5px); }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`

// Add additional styles to the page
const styleSheet = document.createElement("style")
styleSheet.textContent = additionalStyles
document.head.appendChild(styleSheet)

// Initialize cart from localStorage if available
function initializeCart() {
  const savedCart = localStorage.getItem("techstore-cart")
  if (savedCart) {
    cart = JSON.parse(savedCart)
    cartCount = cart.length
    updateCartCount()
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("techstore-cart", JSON.stringify(cart))
}

// Call initialize cart on page load
initializeCart()

// Save cart whenever it changes
const originalAddToCart = addToCart
addToCart = (productId) => {
  originalAddToCart(productId)
  saveCart()
}

// Parallax effect for hero banner
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const banner = document.querySelector(".hero-banner")
  if (banner) {
    banner.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Add floating animation to category cards
function addFloatingAnimation() {
  const categoryCards = document.querySelectorAll(".category-card")
  categoryCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`
    card.style.animation = "float 3s ease-in-out infinite"
  })
}

// Enhanced scroll animations
function enhancedScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  // Observe all animated elements
  document.querySelectorAll(".category-card, .product-card, .footer-section").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "all 0.6s ease-out"
    observer.observe(el)
  })
}

// Add sparkle effect to buttons
function addSparkleEffect() {
  const buttons = document.querySelectorAll(".cta-button, .add-to-cart, .search-btn")

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      createSparkles(this)
    })
  })
}

function createSparkles(element) {
  for (let i = 0; i < 6; i++) {
    const sparkle = document.createElement("div")
    sparkle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: white;
      border-radius: 50%;
      pointer-events: none;
      animation: sparkle 0.6s ease-out forwards;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      z-index: 1000;
    `

    element.style.position = "relative"
    element.appendChild(sparkle)

    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle)
      }
    }, 600)
  }
}

// Enhanced product card interactions
function enhanceProductCards() {
  const productCards = document.querySelectorAll(".product-card")

  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
      this.style.boxShadow = "0 25px 60px rgba(0, 0, 0, 0.2)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
      this.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.08)"
    })
  })
}

// Initialize enhanced features
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    addFloatingAnimation()
    enhancedScrollAnimations()
    addSparkleEffect()
    enhanceProductCards()
  }, 500)
})

// Add sparkle animation CSS
const sparkleStyles = `
  @keyframes sparkle {
    0% {
      opacity: 0;
      transform: scale(0) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: scale(1) rotate(180deg);
    }
    100% {
      opacity: 0;
      transform: scale(0) rotate(360deg);
    }
  }
`

const sparkleStyleSheet = document.createElement("style")
sparkleStyleSheet.textContent = sparkleStyles
document.head.appendChild(sparkleStyleSheet)
