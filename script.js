/* ============================================
   VITORINO – SEMIJOIAS DE LUXO
   script.js – Interatividade Completa
   ============================================ */

'use strict';

// ============================================
// PRODUTOS
// ============================================
const products = [
  {
    id: 1, name: 'Colar Lua Crescente', category: 'colares',
    price: 189.90, originalPrice: 239.90,
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    ],
    badge: 'new', isNew: true, isBestseller: true,
    description: 'Delicado colar com pingente lua crescente, banhado a ouro 18k. Corrente ajustável de 45 a 50cm. Uma peça que emana mistério e sofisticação.',
    material: 'Prata 925 com banho ouro 18k', rating: 5, reviews: 47,
  },
  {
    id: 2, name: 'Brinco Gota de Luz', category: 'brincos',
    price: 129.90, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80',
      'https://images.unsplash.com/photo-1573408301185-9519f94e9c0f?w=600&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80',
    ],
    badge: null, isNew: false, isBestseller: true,
    description: 'Brinco pendente em forma de gota com cristal austríaco, banhado a ouro 18k. Elegância fluida que complementa qualquer look.',
    material: 'Latão com banho ouro 18k e cristal', rating: 5, reviews: 62,
  },
  {
    id: 3, name: 'Anel Solitário Eterno', category: 'aneis',
    price: 159.90, originalPrice: 199.90,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
      'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80',
      'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&q=80',
    ],
    badge: 'sale', isNew: false, isBestseller: true,
    description: 'Anel solitário clássico com zircônia lapidada, acabamento ouro 18k. Atemporal e sofisticado para qualquer ocasião.',
    material: 'Prata 925 com banho ouro 18k e zircônia', rating: 5, reviews: 38,
  },
  {
    id: 4, name: 'Pulseira Elo Dourado', category: 'pulseiras',
    price: 219.90, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
      'https://images.unsplash.com/photo-1573408301185-9519f94e9c0f?w=600&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    ],
    badge: null, isNew: true, isBestseller: false,
    description: 'Pulseira de elo oval banhada a ouro 18k, fecho tipo lagosta. Um clássico reinventado com acabamento premium.',
    material: 'Latão com banho ouro 18k', rating: 5, reviews: 29,
  },
  {
    id: 5, name: 'Colar Constelação', category: 'colares',
    price: 249.90, originalPrice: 299.90,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
    ],
    badge: 'sale', isNew: false, isBestseller: false,
    description: 'Colar delicado com pingentes de estrelas em diferentes tamanhos, criando um efeito de constelação. Banhado a ouro 18k.',
    material: 'Prata 925 com banho ouro 18k', rating: 5, reviews: 21,
  },
  {
    id: 6, name: 'Brinco Argola Slim', category: 'brincos',
    price: 99.90, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1573408301185-9519f94e9c0f?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9519f94e9c0f?w=600&q=80',
      'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80',
    ],
    badge: null, isNew: true, isBestseller: true,
    description: 'Argola minimalista com espessura fina e acabamento polido ouro 18k. Versátil, leve e contemporânea.',
    material: 'Latão com banho ouro 18k', rating: 4.9, reviews: 84,
  },
  {
    id: 7, name: 'Anel Flor do Deserto', category: 'aneis',
    price: 179.90, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
      'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&q=80',
    ],
    badge: 'new', isNew: true, isBestseller: false,
    description: 'Anel com design floral delicado, pétalas trabalhadas à mão e pedras de zircônia. Feminilidade e exclusividade.',
    material: 'Prata 925 com banho ouro 18k e zircônia', rating: 5, reviews: 17,
  },
  {
    id: 8, name: 'Pulseira Riviera Dourada', category: 'pulseiras',
    price: 289.90, originalPrice: 349.90,
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
      'https://images.unsplash.com/photo-1573408301185-9519f94e9c0f?w=600&q=80',
    ],
    badge: 'sale', isNew: false, isBestseller: true,
    description: 'Pulseira riviera com 15 zircônias lapidadas em ouro 18k. Elegância que brilha em qualquer luz.',
    material: 'Prata 925, ouro 18k e zircônia cúbica', rating: 5, reviews: 43,
  },
  {
    id: 9, name: 'Colar Chuva de Ouro', category: 'colares',
    price: 199.90, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80',
    ],
    badge: null, isNew: false, isBestseller: false,
    description: 'Colar com múltiplas correntes finas em diferentes comprimentos, criando efeito cascata dourado.',
    material: 'Latão com banho ouro 18k', rating: 4.8, reviews: 33,
  },
  {
    id: 10, name: 'Brinco Pétala de Rosa', category: 'brincos',
    price: 149.90, originalPrice: 179.90,
    image: 'https://images.unsplash.com/photo-1561828995-aa79a2db86dd?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1561828995-aa79a2db86dd?w=600&q=80',
      'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80',
      'https://images.unsplash.com/photo-1573408301185-9519f94e9c0f?w=600&q=80',
    ],
    badge: null, isNew: true, isBestseller: false,
    description: 'Brinco em formato de pétala de rosa com acabamento acetinado, banhado a ouro rosé 18k. Romanticismo refinado.',
    material: 'Latão com banho ouro rosé 18k', rating: 5, reviews: 26,
  },
  {
    id: 11, name: 'Anel Minimalista Band', category: 'aneis',
    price: 89.90, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
      'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80',
    ],
    badge: null, isNew: false, isBestseller: true,
    description: 'Anel band minimalista com superfície polida, empilhável e atemporal. Perfeito para combinar com outras peças.',
    material: 'Prata 925 com banho ouro 18k', rating: 4.9, reviews: 91,
  },
  {
    id: 12, name: 'Pulseira Charm Inicial', category: 'pulseiras',
    price: 169.90, originalPrice: null,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
    ],
    badge: 'new', isNew: true, isBestseller: false,
    description: 'Pulseira delicada com pingente de letra inicial, personalizada para você. Corrente fina em ouro 18k.',
    material: 'Prata 925 com banho ouro 18k', rating: 5, reviews: 52,
  },
];

// ============================================
// ESTADO GLOBAL
// ============================================
let cart = JSON.parse(localStorage.getItem('vitorino-cart') || '[]');
let currentProduct = null;
let currentQty = 1;
let currentFilter = 'all';
let currentSort = 'default';

// ============================================
// LOADER — some em 1.5s fixo, nunca bloqueia cliques
// ============================================
function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
  initAnimations();
}

setTimeout(hideLoader, 1500);

// ============================================
// CURSOR: padrão do sistema (removido cursor customizado)
// ============================================

// ============================================
// HEADER SCROLL
// ============================================
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============================================
// MOBILE MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const mobileOverlay = document.getElementById('mobileOverlay');

hamburger.addEventListener('click', () => {
  const isOpen = mobileOverlay.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';

  if (isOpen && !mobileOverlay.querySelector('.nav-link')) {
    const links = [
      { text: 'Home', page: 'home' },
      { text: 'Loja', page: 'shop' },
      { text: 'Sobre', page: 'about' },
      { text: 'Contato', page: 'contact' },
    ];
    links.forEach(l => {
      const a = document.createElement('a');
      a.href = '#'; a.className = 'nav-link'; a.textContent = l.text;
      a.addEventListener('click', e => { e.preventDefault(); navigateTo(l.page); closeMobileMenu(); });
      mobileOverlay.appendChild(a);
    });
  }
});

mobileOverlay.addEventListener('click', e => {
  if (e.target === mobileOverlay) closeMobileMenu();
});

function closeMobileMenu() {
  mobileOverlay.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================
// SEARCH
// ============================================
document.getElementById('searchToggle').addEventListener('click', () => {
  document.getElementById('searchBar').classList.toggle('open');
  if (document.getElementById('searchBar').classList.contains('open')) {
    setTimeout(() => document.getElementById('searchInput').focus(), 300);
  }
});

document.getElementById('searchClose').addEventListener('click', () => {
  document.getElementById('searchBar').classList.remove('open');
});

document.getElementById('searchInput').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  if (q.length > 1) {
    navigateTo('shop');
    currentFilter = 'all';
    renderShopGrid(products.filter(p => p.name.toLowerCase().includes(q) || p.category.includes(q)));
  } else if (q.length === 0) {
    renderShopGrid(getFilteredSorted());
  }
});

// ============================================
// CART
// ============================================
document.getElementById('cartToggle').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCart();
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function addToCart(productId, qty = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty });
  }

  saveCart();
  updateCartCount();
  renderCart();
  showToast('Adicionado ao carrinho ✦');
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
  renderCart();
}

function saveCart() {
  localStorage.setItem('vitorino-cart', JSON.stringify(cart));
}

function updateCartCount() {
  const count = cart.reduce((acc, item) => acc + item.qty, 0);
  const countEl = document.getElementById('cartCount');
  countEl.textContent = count;
  if (count > 0) {
    countEl.classList.add('visible');
  } else {
    countEl.classList.remove('visible');
  }
}

function renderCart() {
  const cartItemsEl = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <p>Seu carrinho está vazio</p>
      </div>`;
    cartFooter.style.display = 'none';
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img" style="overflow:hidden;border-radius:2px;">
        <img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;" />
      </div>
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">R$ ${formatPrice(item.price)} × ${item.qty}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
    </div>
  `).join('');

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  document.getElementById('cartTotal').textContent = 'R$ ' + formatPrice(total);
  cartFooter.style.display = 'flex';
}

function getCartTotal() {
  return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
}

// ============================================
// NAVEGAÇÃO
// ============================================
function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(page).classList.add('active');

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (page === 'shop') {
    renderShopGrid(getFilteredSorted());
  }
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigateTo(link.dataset.page);
  });
});

// ============================================
// RENDERIZAÇÃO DE PRODUTOS
// ============================================
function formatPrice(price) {
  return price.toFixed(2).replace('.', ',');
}

function createProductCard(product) {
  const div = document.createElement('div');
  div.className = 'product-card';
  div.innerHTML = `
    <div class="product-card-img">
      ${product.badge ? `<span class="product-badge ${product.badge}">${product.badge === 'new' ? 'Novo' : 'Sale'}</span>` : ''}
      <img src="${product.image}" alt="${product.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;" />
      <div class="product-card-overlay">
        <button onclick="event.stopPropagation(); addToCart(${product.id})">Adicionar ao Carrinho</button>
      </div>
    </div>
    <div class="product-card-info">
      <div class="product-card-cat">${product.category}</div>
      <div class="product-card-name">${product.name}</div>
      <div class="product-card-price">
        ${product.originalPrice ? `<span class="price-strike">R$ ${formatPrice(product.originalPrice)}</span>` : ''}
        <span class="price-main">R$ ${formatPrice(product.price)}</span>
      </div>
    </div>
  `;
  div.addEventListener('click', () => openProduct(product.id));
  return div;
}

function renderGrid(containerId, productList) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  productList.forEach((product, i) => {
    const card = createProductCard(product);
    card.style.animationDelay = `${i * 0.08}s`;
    card.classList.add('animate-in');
    container.appendChild(card);
  });
}

function renderFeatured() {
  const bestsellers = products.filter(p => p.isBestseller).slice(0, 3);
  renderGrid('featuredGrid', bestsellers);
}

function renderNew() {
  const newOnes = products.filter(p => p.isNew).slice(0, 3);
  renderGrid('newGrid', newOnes);
}

function getFilteredSorted() {
  let list = currentFilter === 'all' ? [...products] : products.filter(p => p.category === currentFilter);
  switch (currentSort) {
    case 'price-asc': list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'popular': list.sort((a, b) => b.reviews - a.reviews); break;
    case 'new': list.sort((a, b) => b.isNew - a.isNew); break;
  }
  return list;
}

function renderShopGrid(list) {
  renderGrid('shopGrid', list || getFilteredSorted());
}

// FILTER BUTTONS
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderShopGrid();
  });
});

// SORT
document.getElementById('sortSelect').addEventListener('change', e => {
  currentSort = e.target.value;
  renderShopGrid();
});

// FILTER FROM HOMEPAGE CATEGORY
function filterCategory(cat) {
  navigateTo('shop');
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === cat);
  });
  renderShopGrid();
}

// ============================================
// PRODUTO INDIVIDUAL
// ============================================
function openProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  currentProduct = product;
  currentQty = 1;

  document.getElementById('breadcrumbName').textContent = product.name;
  document.getElementById('productName').textContent = product.name;
  document.getElementById('productBadge').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
  document.getElementById('priceCurrent').textContent = 'R$ ' + formatPrice(product.price);
  document.getElementById('priceOriginal').textContent = product.originalPrice ? 'R$ ' + formatPrice(product.originalPrice) : '';
  document.getElementById('productDesc').textContent = product.description;
  document.getElementById('productMaterial').textContent = product.material;
  document.getElementById('qtyDisplay').textContent = 1;

  // Gallery
  const galleryMain = document.getElementById('galleryMain');
  galleryMain.innerHTML = `
    <img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;display:block;" />
  `;

  const thumbsContainer = document.getElementById('galleryThumbs');
  thumbsContainer.innerHTML = product.images.map((src, i) => `
    <div class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="selectThumb(this, '${src}')">
      <img src="${src}" alt="${product.name} ${i+1}" style="width:100%;height:100%;object-fit:cover;" />
    </div>
  `).join('');

  document.getElementById('addToCartBtn').onclick = () => {
    addToCart(product.id, currentQty);
    openCart();
  };

  navigateTo('product');
}

function selectThumb(el, imgSrc) {
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const galleryMain = document.getElementById('galleryMain');
  galleryMain.innerHTML = `<img src="${imgSrc}" alt="produto" style="width:100%;height:100%;object-fit:cover;display:block;animation:fadeIn 0.3s ease;" />`;
}

function changeQty(delta) {
  currentQty = Math.max(1, currentQty + delta);
  document.getElementById('qtyDisplay').textContent = currentQty;
}

// ============================================
// CHECKOUT
// ============================================
function showCheckout() {
  closeCart();
  navigateTo('checkout');

  const checkoutItems = document.getElementById('checkoutItems');
  checkoutItems.innerHTML = cart.map(item => `
    <div class="checkout-summary-item">
      <span>${item.name} × ${item.qty}</span>
      <span>R$ ${formatPrice(item.price * item.qty)}</span>
    </div>
  `).join('');

  const total = getCartTotal();
  document.getElementById('checkoutSubtotal').textContent = 'R$ ' + formatPrice(total);
  document.getElementById('checkoutTotal').textContent = 'R$ ' + formatPrice(total);

  // Payment options
  document.querySelectorAll('.payment-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });
}

async function placeOrder() {
  if (cart.length === 0) {
    showModal('Carrinho Vazio', 'Adicione produtos ao carrinho para continuar.');
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/criar-pagamento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart }),
    });

    const data = await res.json();

    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      showModal('Erro no Pagamento', 'Não foi possível processar o pagamento. Tente novamente.');
    }
  } catch (err) {
    console.error(err);
    showModal('Erro de Conexão', 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
  }
}

// ============================================
// CONTACT
// ============================================
function sendMessage() {
  showModal('Mensagem Enviada! ✦', 'Recebemos sua mensagem e entraremos em contato em até 24 horas. Obrigada!');
}

// ============================================
// MODAL
// ============================================
function showModal(title, text) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalText').textContent = text;
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});

// ============================================
// TOAST
// ============================================
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('toast--visible'));

  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.category-card, .feature-item, .testimonial-card, .value-item, .about-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });
}

// ============================================
// TESTIMONIALS SLIDER (mobile)
// ============================================
function initTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  const cards = track.querySelectorAll('.testimonial-card');
  const dotsContainer = document.getElementById('testimonialDots');

  if (window.innerWidth > 768) return;

  let current = 0;
  dotsContainer.innerHTML = Array.from(cards).map((_, i) =>
    `<div class="dot" style="width:6px;height:6px;border-radius:50%;background:${i === 0 ? '#B76E79' : '#D9CEBF'};cursor:pointer;transition:background 0.3s;" data-i="${i}"></div>`
  ).join('');

  dotsContainer.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
      current = parseInt(dot.dataset.i);
      showCard(current);
    });
  });

  function showCard(idx) {
    cards.forEach((c, i) => {
      c.style.display = i === idx ? 'block' : 'none';
    });
    dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
      d.style.background = i === idx ? '#B76E79' : '#D9CEBF';
    });
  }

  if (window.innerWidth <= 768) showCard(0);
}

// ============================================
// LOGO CLICK → HOME
// ============================================
document.querySelector('.nav-logo').addEventListener('click', () => navigateTo('home'));

// ============================================
// INIT
// ============================================
function init() {
  renderFeatured();
  renderNew();
  updateCartCount();
  renderCart();
  initTestimonials();

  // Animate hero text
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(40px)';
    setTimeout(() => {
      heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 300);
  }
}

init();

// ============================================
// RESPONSIVE RESIZE
// ============================================
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

window.addEventListener('resize', debounce(() => {
  initTestimonials();
  if (window.innerWidth > 768) {
    const track = document.getElementById('testimonialsTrack');
    if (track) track.querySelectorAll('.testimonial-card').forEach(c => c.style.display = '');
  }
}, 250));

