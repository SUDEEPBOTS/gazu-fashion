/**
 * GAZU FASHION — LUXURY STREETWEAR ENGINE
 * Interactive E-Commerce Client State, Cart & Wishlist Store
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. PRODUCT CATALOG DATA
  // ==========================================
  const PRODUCTS = [
    {
      id: 'gazu-01',
      title: 'Heavyweight Boxy Tee',
      category: 'men',
      color: 'Washed Charcoal',
      price: 1499,
      oldPrice: 2499,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=700&auto=format&fit=crop&q=85',
      sizes: ['S', 'M', 'L', 'XL'],
      badge: 'BESTSELLER'
    },
    {
      id: 'gazu-02',
      title: 'Acid Wash Graphic Tee',
      category: 'men',
      color: 'Washed Grey / Print',
      price: 1799,
      oldPrice: 2999,
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=700&auto=format&fit=crop&q=85',
      sizes: ['S', 'M', 'L', 'XL'],
      badge: 'LIMITED'
    },
    {
      id: 'gazu-03',
      title: 'Minimalist Premium Tee',
      category: 'men',
      color: 'Midnight Black',
      price: 1299,
      oldPrice: 1999,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=700&auto=format&fit=crop&q=85',
      sizes: ['S', 'M', 'L', 'XL'],
      badge: 'CORE'
    },
    {
      id: 'gazu-04',
      title: 'Relaxed Luxury Cotton Tee',
      category: 'men',
      color: 'Chalk Off-White',
      price: 1499,
      oldPrice: 2499,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=700&auto=format&fit=crop&q=85',
      sizes: ['S', 'M', 'L', 'XL'],
      badge: 'POPULAR'
    },
    {
      id: 'gazu-05',
      title: 'Architectural Trench Coat',
      category: 'men',
      color: 'Slate Charcoal',
      price: 5999,
      oldPrice: 8999,
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&auto=format&fit=crop&q=85',
      sizes: ['M', 'L', 'XL'],
      badge: 'RUNWAY'
    },
    {
      id: 'gazu-06',
      title: 'Relaxed Oversized Knit',
      category: 'women',
      color: 'Warm Oatmeal',
      price: 2499,
      oldPrice: 3799,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&auto=format&fit=crop&q=85',
      sizes: ['XS', 'S', 'M', 'L'],
      badge: 'NEW'
    },
    {
      id: 'gazu-07',
      title: 'Urban Structured Utility Jacket',
      category: 'men',
      color: 'Deep Onyx',
      price: 4499,
      oldPrice: 6999,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&auto=format&fit=crop&q=85',
      sizes: ['S', 'M', 'L', 'XL'],
      badge: 'HOT'
    },
    {
      id: 'gazu-08',
      title: 'Youth French Terry Striped Crew',
      category: 'kids',
      color: 'Ivory / Charcoal Stripe',
      price: 1399,
      oldPrice: 1999,
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=700&auto=format&fit=crop&q=85',
      sizes: ['Y-M', 'Y-L', 'Y-XL'],
      badge: 'ESSENTIAL'
    }
  ];

  // ==========================================
  // 2. STATE MANAGEMENT
  // ==========================================
  let cart = JSON.parse(localStorage.getItem('gazu_cart') || '[]');
  let wishlist = JSON.parse(localStorage.getItem('gazu_wishlist') || '[]');
  let activeFilter = 'all';

  // ==========================================
  // 3. DOM ELEMENTS
  // ==========================================
  const productGrid = document.getElementById('productGrid');
  
  // Cart elements
  const cartOverlay = document.getElementById('cartOverlay');
  const cartDrawer = document.getElementById('cartDrawer');
  const openCartBtn = document.getElementById('openCart');
  const closeCartBtn = document.getElementById('closeCart');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartCountHeader = document.getElementById('cartCountHeader');
  const cartCountMobile = document.getElementById('cartCountMobile');
  const cartDrawerCount = document.getElementById('cartDrawerCount');
  const shippingFill = document.getElementById('shippingFill');
  const shippingText = document.getElementById('shippingText');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // Wishlist elements
  const wishlistOverlay = document.getElementById('wishlistOverlay');
  const openWishlistBtn = document.getElementById('openWishlist');
  const closeWishlistBtn = document.getElementById('closeWishlist');
  const wishlistCountEl = document.getElementById('wishlistCount');
  const wishlistItemsContainer = document.getElementById('wishlistItemsContainer');
  const wishlistDrawerCount = document.getElementById('wishlistDrawerCount');
  const mobileWishlistBtn = document.getElementById('mobileWishlistBtn');
  const mobileWishlistBadge = document.getElementById('mobileWishlistBadge');
  const mobileCartBtn = document.getElementById('mobileCartBtn');
  const mobileCartBadge = document.getElementById('mobileCartBadge');

  // Search elements
  const searchModal = document.getElementById('searchModal');
  const openSearchBtn = document.getElementById('openSearch');
  const closeSearchBtn = document.getElementById('closeSearch');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  // Toast Container
  const toastContainer = document.getElementById('toastContainer');

  // ==========================================
  // 4. RENDER PRODUCTS
  // ==========================================
  function renderProducts(category = 'all') {
    if (!productGrid) return;
    
    const items = category === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === category);

    productGrid.innerHTML = items.map(p => {
      const isWishlisted = wishlist.includes(p.id);
      return `
        <article class="product-card" data-id="${p.id}">
          <div class="product-img-wrap">
            <img src="${p.image}" alt="${p.title}" class="product-img" loading="lazy">
            
            <!-- Wishlist Heart Button -->
            <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${p.id}" aria-label="Save to Wishlist">
              <svg viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            <!-- Quick Add Button -->
            <button class="quick-add-btn" data-id="${p.id}">
              + ADD TO BAG
            </button>
          </div>

          <div class="product-details">
            <h3 class="product-title">${p.title}</h3>
            <span class="product-color">${p.color}</span>
            
            <div class="product-price-row">
              <span class="product-price">₹${p.price.toLocaleString('en-IN')}</span>
              <span class="product-old-price">₹${p.oldPrice.toLocaleString('en-IN')}</span>
            </div>

            <div class="size-selector">
              ${p.sizes.map((s, idx) => `
                <button class="size-chip ${idx === 1 ? 'active' : ''}" data-size="${s}">${s}</button>
              `).join('')}
            </div>
          </div>
        </article>
      `;
    }).join('');

    attachProductListeners();
  }

  // ==========================================
  // 5. ATTACH PRODUCT INTERACTION LISTENERS
  // ==========================================
  function attachProductListeners() {
    // Wishlist Toggle
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        toggleWishlist(id, btn);
      });
    });

    // Quick Add
    document.querySelectorAll('.quick-add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const card = btn.closest('.product-card');
        const activeSize = card.querySelector('.size-chip.active')?.getAttribute('data-size') || 'M';
        addToCart(id, activeSize);
      });
    });

    // Size Selection
    document.querySelectorAll('.size-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        const parent = chip.closest('.size-selector');
        parent.querySelectorAll('.size-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });
  }

  // ==========================================
  // 6. CART MANAGEMENT
  // ==========================================
  function addToCart(productId, size = 'M') {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId && item.size === size);
    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        color: product.color,
        price: product.price,
        image: product.image,
        size: size,
        qty: 1
      });
    }

    saveCart();
    updateCartUI();
    showToast(`Added ${product.title} (${size}) to Bag! 🛍️`);
    openCart();
  }

  function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    saveCart();
    updateCartUI();
  }

  function changeQty(productId, size, delta) {
    const item = cart.find(i => i.id === productId && i.size === size);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(productId, size);
    } else {
      saveCart();
      updateCartUI();
    }
  }

  function saveCart() {
    localStorage.setItem('gazu_cart', JSON.stringify(cart));
  }

  function updateCartUI() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (cartCountHeader) cartCountHeader.textContent = totalQty;
    if (cartCountMobile) cartCountMobile.textContent = totalQty;
    if (mobileCartBadge) mobileCartBadge.textContent = totalQty;
    if (cartDrawerCount) cartDrawerCount.textContent = totalQty;
    if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

    // Free Shipping Progress calculation (Threshold: ₹999)
    const threshold = 999;
    if (subtotal >= threshold) {
      if (shippingFill) shippingFill.style.width = '100%';
      if (shippingText) shippingText.innerHTML = '🎉 Congratulations! You have unlocked <strong>FREE Delivery</strong>!';
    } else {
      const remaining = threshold - subtotal;
      const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
      if (shippingFill) shippingFill.style.width = `${pct}%`;
      if (shippingText) shippingText.innerHTML = `Add <strong>₹${remaining.toLocaleString('en-IN')}</strong> more for FREE Delivery!`;
    }

    // Render Drawer Items
    if (!cartItemsContainer) return;
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart-msg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <p>Your bag is currently empty.</p>
          <a href="#catalog" class="btn btn-black btn-sm" id="shopNowCartBtn">EXPLORE PRODUCTS</a>
        </div>
      `;
      document.getElementById('shopNowCartBtn')?.addEventListener('click', closeCart);
    } else {
      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}" class="cart-item-img">
          <div class="cart-item-info">
            <div>
              <h4 class="cart-item-title">${item.title}</h4>
              <p class="cart-item-meta">${item.color} | Size: ${item.size}</p>
            </div>
            
            <div class="cart-item-bottom">
              <div class="qty-control">
                <button class="qty-btn" onclick="window.changeItemQty('${item.id}', '${item.size}', -1)">-</button>
                <span class="qty-val">${item.qty}</span>
                <button class="qty-btn" onclick="window.changeItemQty('${item.id}', '${item.size}', 1)">+</button>
              </div>
              <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
            </div>
            <button class="item-remove" onclick="window.removeItemFromCart('${item.id}', '${item.size}')">Remove</button>
          </div>
        </div>
      `).join('');
    }
  }

  window.changeItemQty = changeQty;
  window.removeItemFromCart = removeFromCart;

  // Drawer Open/Close
  function openCart() {
    cartOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  openCartBtn?.addEventListener('click', openCart);
  closeCartBtn?.addEventListener('click', closeCart);
  mobileCartBtn?.addEventListener('click', openCart);
  cartOverlay?.addEventListener('click', (e) => {
    if (e.target === cartOverlay) closeCart();
  });

  // ==========================================
  // 7. WISHLIST MANAGEMENT
  // ==========================================
  function toggleWishlist(productId, btnElement) {
    const idx = wishlist.indexOf(productId);
    const product = PRODUCTS.find(p => p.id === productId);

    if (idx > -1) {
      wishlist.splice(idx, 1);
      btnElement?.classList.remove('active');
      showToast(`Removed from Wishlist`);
    } else {
      wishlist.push(productId);
      btnElement?.classList.add('active');
      showToast(`Added to Wishlist! ❤️`);
    }

    saveWishlist();
    updateWishlistUI();
  }

  function saveWishlist() {
    localStorage.setItem('gazu_wishlist', JSON.stringify(wishlist));
  }

  function updateWishlistUI() {
    const count = wishlist.length;
    if (wishlistCountEl) wishlistCountEl.textContent = count;
    if (mobileWishlistBadge) mobileWishlistBadge.textContent = count;
    if (wishlistDrawerCount) wishlistDrawerCount.textContent = count;

    if (!wishlistItemsContainer) return;
    if (wishlist.length === 0) {
      wishlistItemsContainer.innerHTML = `
        <div class="empty-cart-msg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <p>No saved items yet.</p>
        </div>
      `;
    } else {
      const items = PRODUCTS.filter(p => wishlist.includes(p.id));
      wishlistItemsContainer.innerHTML = items.map(p => `
        <div class="cart-item">
          <img src="${p.image}" alt="${p.title}" class="cart-item-img">
          <div class="cart-item-info">
            <div>
              <h4 class="cart-item-title">${p.title}</h4>
              <p class="cart-item-meta">${p.color}</p>
              <span class="cart-item-price">₹${p.price.toLocaleString('en-IN')}</span>
            </div>
            <div style="display: flex; gap: 8px; margin-top: 8px;">
              <button class="btn btn-black btn-sm" onclick="window.moveToCart('${p.id}')">ADD TO BAG</button>
              <button class="item-remove" onclick="window.removeWishlist('${p.id}')">Remove</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  window.moveToCart = (id) => {
    addToCart(id, 'M');
    wishlist = wishlist.filter(x => x !== id);
    saveWishlist();
    updateWishlistUI();
    renderProducts(activeFilter);
  };

  window.removeWishlist = (id) => {
    wishlist = wishlist.filter(x => x !== id);
    saveWishlist();
    updateWishlistUI();
    renderProducts(activeFilter);
  };

  function openWishlist() {
    wishlistOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeWishlist() {
    wishlistOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  openWishlistBtn?.addEventListener('click', openWishlist);
  closeWishlistBtn?.addEventListener('click', closeWishlist);
  mobileWishlistBtn?.addEventListener('click', openWishlist);
  wishlistOverlay?.addEventListener('click', (e) => {
    if (e.target === wishlistOverlay) closeWishlist();
  });

  // ==========================================
  // 8. SEARCH MODAL FUNCTIONALITY
  // ==========================================
  function openSearch() {
    searchModal?.classList.add('open');
    searchInput?.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeSearch() {
    searchModal?.classList.remove('open');
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '<p class="search-hint">Type to search catalog...</p>';
    document.body.style.overflow = '';
  }

  openSearchBtn?.addEventListener('click', openSearch);
  closeSearchBtn?.addEventListener('click', closeSearch);
  searchModal?.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });

  searchInput?.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) {
      searchResults.innerHTML = '<p class="search-hint">Type to search catalog...</p>';
      return;
    }

    const matches = PRODUCTS.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.color.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      searchResults.innerHTML = `<p class="search-hint">No products found matching "${q}".</p>`;
    } else {
      searchResults.innerHTML = matches.map(m => `
        <div class="cart-item" style="cursor: pointer;" onclick="window.selectSearchResult('${m.id}')">
          <img src="${m.image}" alt="${m.title}" class="cart-item-img" style="width: 50px; height: 64px;">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${m.title}</h4>
            <span class="cart-item-price">₹${m.price.toLocaleString('en-IN')}</span>
          </div>
        </div>
      `).join('');
    }
  });

  window.selectSearchResult = (id) => {
    closeSearch();
    addToCart(id, 'M');
  };

  // ==========================================
  // 9. CATEGORY FILTER NAVIGATION
  // ==========================================
  document.querySelectorAll('.nav-link, .cat-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const cat = link.getAttribute('data-category') || link.getAttribute('data-filter');
      if (cat) {
        e.preventDefault();
        activeFilter = cat;
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelector(`.nav-link[data-category="${cat}"]`)?.classList.add('active');
        renderProducts(cat);
        document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  document.getElementById('viewAllBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    activeFilter = 'all';
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    renderProducts('all');
  });

  // ==========================================
  // 10. CHECKOUT & COUPON
  // ==========================================
  checkoutBtn?.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    alert(`⚡ GAZU Order Confirmed!\n\nTotal Payable: ₹${subtotal.toLocaleString('en-IN')}\nPayment Mode: UPI Instant QR\n\nThank you for shopping at GAZU!`);
    cart = [];
    saveCart();
    updateCartUI();
    closeCart();
  });

  // Newsletter
  document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Welcome to The GAZU Club! 15% code sent! 📩');
    e.target.reset();
  });

  // ==========================================
  // 11. TOAST SYSTEM
  // ==========================================
  function showToast(msg) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${msg}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // ==========================================
  // 12. INITIAL BOOTSTRAP
  // ==========================================
  renderProducts();
  updateCartUI();
  updateWishlistUI();
});
