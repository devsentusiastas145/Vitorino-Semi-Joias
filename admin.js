'use strict';

/* ============================================
   CONFIGURAÇÃO
   ============================================ */
const API = '';
const ADMIN_CREDENTIALS = { user: 'camilaadmin', pass: 'camila1234' };
const SESSION_KEY = 'vitorino_admin_session';

/* ============================================
   DADOS MOCK (fallback quando API offline)
   ============================================ */
const MOCK_ORDERS = [
  {
    id: 1001,
    customer_name: 'Ana Carolina Mendes',
    customer_email: 'ana.mendes@email.com',
    cpf: '123.456.789-00',
    address: 'Rua das Flores, 123, Apto 45 – Jardins, São Paulo, SP – 01310-100',
    total: 319.80,
    status: 'completed',
    created_at: '2025-04-18T14:30:00',
    items: [
      { name: 'Colar Lua Crescente', qty: 1, price: 189.90 },
      { name: 'Brinco Argola Slim',  qty: 1, price: 99.90  },
    ],
  },
  {
    id: 1002,
    customer_name: 'Juliana Freitas',
    customer_email: 'juliana.f@email.com',
    cpf: '987.654.321-11',
    address: 'Av. Atlântica, 500, Bloco B – Copacabana, Rio de Janeiro, RJ – 22010-000',
    total: 219.90,
    status: 'pending',
    created_at: '2025-04-20T09:15:00',
    items: [
      { name: 'Pulseira Elo Dourado', qty: 1, price: 219.90 },
    ],
  },
  {
    id: 1003,
    customer_name: 'Mariana Santos',
    customer_email: 'mari.santos@email.com',
    cpf: '456.789.123-22',
    address: 'Rua Ouro Preto, 88 – Savassi, Belo Horizonte, MG – 30130-170',
    total: 449.80,
    status: 'processing',
    created_at: '2025-04-19T16:45:00',
    items: [
      { name: 'Pulseira Riviera Dourada', qty: 1, price: 289.90 },
      { name: 'Brinco Gota de Luz',       qty: 1, price: 129.90 },
    ],
  },
  {
    id: 1004,
    customer_name: 'Fernanda Luz',
    customer_email: 'fern.luz@email.com',
    cpf: '321.654.987-33',
    address: 'Rua XV de Novembro, 210 – Centro, Curitiba, PR – 80020-310',
    total: 159.90,
    status: 'completed',
    created_at: '2025-04-15T11:00:00',
    items: [
      { name: 'Anel Solitário Eterno', qty: 1, price: 159.90 },
    ],
  },
  {
    id: 1005,
    customer_name: 'Patricia Oliveira',
    customer_email: 'patricia.o@email.com',
    cpf: '654.321.987-44',
    address: 'Rua Augusta, 1500, Cj 72 – Consolação, São Paulo, SP – 01304-001',
    total: 269.80,
    status: 'completed',
    created_at: '2025-04-12T13:20:00',
    items: [
      { name: 'Colar Constelação',   qty: 1, price: 249.90 },
      { name: 'Anel Minimalista Band', qty: 1, price: 89.90 },
    ],
  },
  {
    id: 1006,
    customer_name: 'Camila Rodrigues',
    customer_email: 'cami.rod@email.com',
    cpf: '789.012.345-55',
    address: 'Av. Boa Viagem, 3000 – Recife, PE – 51011-000',
    total: 179.90,
    status: 'cancelled',
    created_at: '2025-04-10T08:55:00',
    items: [
      { name: 'Anel Flor do Deserto', qty: 1, price: 179.90 },
    ],
  },
  {
    id: 1007,
    customer_name: 'Leticia Alves',
    customer_email: 'leti.alves@email.com',
    cpf: '112.233.445-66',
    address: 'Rua da Paz, 45 – Funcionários, Belo Horizonte, MG – 30140-113',
    total: 169.90,
    status: 'pending',
    created_at: '2025-04-22T10:30:00',
    items: [
      { name: 'Pulseira Charm Inicial', qty: 1, price: 169.90 },
    ],
  },
  {
    id: 1008,
    customer_name: 'Beatriz Costa',
    customer_email: 'bia.costa@email.com',
    cpf: '998.877.665-77',
    address: 'Rua Haddock Lobo, 595 – Cerqueira César, São Paulo, SP – 01414-001',
    total: 399.80,
    status: 'completed',
    created_at: '2025-04-08T15:40:00',
    items: [
      { name: 'Colar Chuva de Ouro',     qty: 1, price: 199.90 },
      { name: 'Brinco Pétala de Rosa',   qty: 1, price: 149.90 },
    ],
  },
];

const MOCK_CUSTOMERS = [
  { id: 1, name: 'Ana Carolina Mendes', email: 'ana.mendes@email.com', cpf: '123.456.789-00', address: 'Rua das Flores, 123 – São Paulo, SP', order_count: '3', total_spent: '879.60' },
  { id: 2, name: 'Juliana Freitas',     email: 'juliana.f@email.com',  cpf: '987.654.321-11', address: 'Av. Atlântica, 500 – Rio de Janeiro, RJ', order_count: '2', total_spent: '569.80' },
  { id: 3, name: 'Mariana Santos',      email: 'mari.santos@email.com',cpf: '456.789.123-22', address: 'Rua Ouro Preto, 88 – Belo Horizonte, MG', order_count: '4', total_spent: '1240.50' },
  { id: 4, name: 'Fernanda Luz',        email: 'fern.luz@email.com',   cpf: '321.654.987-33', address: 'Rua XV de Novembro, 210 – Curitiba, PR', order_count: '1', total_spent: '159.90' },
  { id: 5, name: 'Patricia Oliveira',   email: 'patricia.o@email.com', cpf: '654.321.987-44', address: 'Rua Augusta, 1500 – São Paulo, SP', order_count: '2', total_spent: '509.70' },
  { id: 6, name: 'Camila Rodrigues',    email: 'cami.rod@email.com',   cpf: '789.012.345-55', address: 'Av. Boa Viagem, 3000 – Recife, PE', order_count: '1', total_spent: '179.90' },
  { id: 7, name: 'Leticia Alves',       email: 'leti.alves@email.com', cpf: '112.233.445-66', address: 'Rua da Paz, 45 – Belo Horizonte, MG', order_count: '1', total_spent: '169.90' },
  { id: 8, name: 'Beatriz Costa',       email: 'bia.costa@email.com',  cpf: '998.877.665-77', address: 'Rua Haddock Lobo, 595 – São Paulo, SP', order_count: '3', total_spent: '1098.70' },
];

const MOCK_PRODUCTS = [
  { id:1,  name:'Colar Lua Crescente',    category:'colares',   price:189.90, original_price:239.90, badge:'new',  is_new:true,  is_bestseller:true,  description:'Delicado colar com pingente lua crescente, banhado a ouro 18k. Corrente ajustável de 45 a 50cm.', material:'Prata 925 com banho ouro 18k', image:'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80', images:['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80'] },
  { id:2,  name:'Brinco Gota de Luz',     category:'brincos',   price:129.90, original_price:null,   badge:null,   is_new:false, is_bestseller:true,  description:'Brinco pendente em forma de gota com cristal austríaco, banhado a ouro 18k.', material:'Latão com banho ouro 18k e cristal', image:'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80', images:['https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80'] },
  { id:3,  name:'Anel Solitário Eterno',  category:'aneis',     price:159.90, original_price:199.90, badge:'sale', is_new:false, is_bestseller:true,  description:'Anel solitário clássico com zircônia lapidada, acabamento ouro 18k.', material:'Prata 925 com banho ouro 18k e zircônia', image:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80', images:['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80'] },
  { id:4,  name:'Pulseira Elo Dourado',   category:'pulseiras', price:219.90, original_price:null,   badge:null,   is_new:true,  is_bestseller:false, description:'Pulseira de elo oval banhada a ouro 18k, fecho tipo lagosta.', material:'Latão com banho ouro 18k', image:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80', images:['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80'] },
  { id:5,  name:'Colar Constelação',      category:'colares',   price:249.90, original_price:299.90, badge:'sale', is_new:false, is_bestseller:false, description:'Colar delicado com pingentes de estrelas em diferentes tamanhos.', material:'Prata 925 com banho ouro 18k', image:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80', images:['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80'] },
  { id:6,  name:'Brinco Argola Slim',     category:'brincos',   price:99.90,  original_price:null,   badge:null,   is_new:true,  is_bestseller:true,  description:'Argola minimalista com espessura fina e acabamento polido ouro 18k.', material:'Latão com banho ouro 18k', image:'https://images.unsplash.com/photo-1573408301185-9519f94e9c0f?w=600&q=80', images:['https://images.unsplash.com/photo-1573408301185-9519f94e9c0f?w=600&q=80'] },
  { id:7,  name:'Anel Flor do Deserto',   category:'aneis',     price:179.90, original_price:null,   badge:'new',  is_new:true,  is_bestseller:false, description:'Anel com design floral delicado, pétalas trabalhadas à mão e pedras de zircônia.', material:'Prata 925 com banho ouro 18k e zircônia', image:'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80', images:['https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80'] },
  { id:8,  name:'Pulseira Riviera Dourada',category:'pulseiras',price:289.90, original_price:349.90, badge:'sale', is_new:false, is_bestseller:true,  description:'Pulseira riviera com 15 zircônias lapidadas em ouro 18k.', material:'Prata 925, ouro 18k e zircônia cúbica', image:'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80', images:['https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80'] },
  { id:9,  name:'Colar Chuva de Ouro',    category:'colares',   price:199.90, original_price:null,   badge:null,   is_new:false, is_bestseller:false, description:'Colar com múltiplas correntes finas em diferentes comprimentos.', material:'Latão com banho ouro 18k', image:'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80', images:['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80'] },
  { id:10, name:'Brinco Pétala de Rosa',  category:'brincos',   price:149.90, original_price:179.90, badge:null,   is_new:true,  is_bestseller:false, description:'Brinco em formato de pétala de rosa com acabamento acetinado, banhado a ouro rosé 18k.', material:'Latão com banho ouro rosé 18k', image:'https://images.unsplash.com/photo-1561828995-aa79a2db86dd?w=600&q=80', images:['https://images.unsplash.com/photo-1561828995-aa79a2db86dd?w=600&q=80'] },
  { id:11, name:'Anel Minimalista Band',  category:'aneis',     price:89.90,  original_price:null,   badge:null,   is_new:false, is_bestseller:true,  description:'Anel band minimalista com superfície polida, empilhável e atemporal.', material:'Prata 925 com banho ouro 18k', image:'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&q=80', images:['https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&q=80'] },
  { id:12, name:'Pulseira Charm Inicial', category:'pulseiras', price:169.90, original_price:null,   badge:'new',  is_new:true,  is_bestseller:false, description:'Pulseira delicada com pingente de letra inicial, personalizada para você.', material:'Prata 925 com banho ouro 18k', image:'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80', images:['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80'] },
];

/* ============================================
   ESTADO
   ============================================ */
let allOrders    = [];
let allProducts  = [];
let allCustomers = [];
let usingMock    = false;
let deleteTargetId = null;
let tempImages   = [];  // URLs das fotos adicionais
let mainImageUrl = '';  // URL da foto principal

/* ============================================
   AUTENTICAÇÃO
   ============================================ */
function checkSession() {
  return localStorage.getItem(SESSION_KEY) === 'active';
}

function login(user, pass) {
  return user === ADMIN_CREDENTIALS.user && pass === ADMIN_CREDENTIALS.pass;
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
  document.getElementById('adminPanel').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
}

/* ============================================
   LOGIN FORM
   ============================================ */
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  const errEl = document.getElementById('loginError');

  if (login(user, pass)) {
    errEl.classList.remove('show');
    localStorage.setItem(SESSION_KEY, 'active');
    showAdminPanel();
  } else {
    errEl.classList.add('show');
    document.getElementById('loginPass').value = '';
  }
});

function togglePass() {
  const input = document.getElementById('loginPass');
  const icon  = document.getElementById('eyeIcon');
  if (input.type === 'password') {
    input.type = 'text';
    icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
  } else {
    input.type = 'password';
    icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  }
}

document.getElementById('logoutBtn').addEventListener('click', logout);

/* ============================================
   INICIALIZAÇÃO DO PAINEL
   ============================================ */
async function showAdminPanel() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminPanel').style.display = 'flex';
  updateDate();
  await loadAllData();
}

function updateDate() {
  const now = new Date();
  const opts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  document.getElementById('topbarDate').textContent =
    now.toLocaleDateString('pt-BR', opts);
}

async function loadAllData() {
  try {
    const [statsRes, ordersRes, customersRes, productsRes] = await Promise.all([
      fetch(`${API}/admin/stats`),
      fetch(`${API}/admin/pedidos`),
      fetch(`${API}/admin/clientes`),
      fetch(`${API}/produtos`),
    ]);

    if (!statsRes.ok || !ordersRes.ok) throw new Error('API offline');

    const stats     = await statsRes.json();
    allOrders       = await ordersRes.json();
    allCustomers    = await customersRes.json();
    const rawProds  = await productsRes.json();
    allProducts = rawProds.map(normalizeProduct);
    usingMock = false;

    renderStats(stats);
  } catch {
    useMockData();
  }

  renderAllSections();
}

function useMockData() {
  usingMock    = true;
  allOrders    = MOCK_ORDERS;
  allCustomers = MOCK_CUSTOMERS;
  allProducts  = MOCK_PRODUCTS;

  const pending  = allOrders.filter(o => o.status === 'pending').length;
  const revenue  = allOrders.filter(o => o.status === 'completed').reduce((s, o) => s + parseFloat(o.total), 0);

  renderStats({
    totalOrders:    allOrders.length,
    totalRevenue:   revenue,
    totalCustomers: allCustomers.length,
    totalProducts:  allProducts.length,
    pendingOrders:  pending,
  });
}

function normalizeProduct(p) {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    price: parseFloat(p.price),
    original_price: p.original_price ? parseFloat(p.original_price) : null,
    badge: p.badge,
    is_new: p.is_new,
    is_bestseller: p.is_bestseller,
    description: p.description,
    material: p.material,
    image: p.image,
    images: p.images || [p.image],
  };
}

/* ============================================
   STATS / KPIs
   ============================================ */
function renderStats(stats) {
  const pending = stats.pendingOrders ?? allOrders.filter(o => o.status === 'pending').length;

  animateCount('statOrders',    parseInt(stats.totalOrders),    0);
  animateCount('statRevenue',   parseFloat(stats.totalRevenue), 0, true);
  animateCount('statCustomers', parseInt(stats.totalCustomers), 0);
  animateCount('statProducts',  parseInt(stats.totalProducts),  0);

  const badge = document.getElementById('pendingBadge');
  if (pending > 0) {
    badge.textContent = pending;
    badge.style.display = 'flex';
  }
}

function animateCount(id, target, from, isCurrency = false) {
  const el = document.getElementById(id);
  if (!el) return;
  const duration = 800;
  const start = Date.now();
  function step() {
    const progress = Math.min((Date.now() - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = from + (target - from) * ease;
    el.textContent = isCurrency
      ? 'R$ ' + value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      : Math.round(value);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ============================================
   RENDER ALL SECTIONS
   ============================================ */
function renderAllSections() {
  renderRecentOrders();
  renderCategoryBars();
  renderOrdersTable(allOrders);
  renderProductsGrid(allProducts);
  renderCustomersTable(allCustomers);
}

/* ============================================
   NAVIGATION
   ============================================ */
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const section = item.dataset.section;
    switchSection(section);
    closeSidebar();
  });
});

function switchSection(section) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.toggle('active', i.dataset.section === section));
  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
  document.getElementById(`section-${section}`).classList.add('active');

  const titles = { dashboard: 'Dashboard', orders: 'Pedidos', products: 'Produtos', customers: 'Clientes' };
  document.getElementById('pageTitle').textContent = titles[section] || section;
}

/* ============================================
   SIDEBAR TOGGLE (mobile)
   ============================================ */
document.getElementById('sidebarToggle').addEventListener('click', () => {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebarOverlay');
  sb.classList.toggle('open');
  ov.classList.toggle('active');
});

document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('active');
}

/* ============================================
   DASHBOARD – RECENT ORDERS
   ============================================ */
function renderRecentOrders() {
  const tbody = document.getElementById('recentOrdersBody');
  const recent = [...allOrders].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);

  if (!recent.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty-row">Nenhum pedido encontrado</td></tr>';
    return;
  }

  tbody.innerHTML = recent.map(o => `
    <tr>
      <td><span style="font-size:0.72rem;color:var(--text-light);">#${o.id}</span></td>
      <td class="cell-name">${o.customer_name}</td>
      <td style="color:var(--rose-dark);font-weight:400;">${fmtPrice(o.total)}</td>
      <td>${statusBadge(o.status)}</td>
      <td style="font-size:0.72rem;color:var(--text-light);">${fmtDate(o.created_at)}</td>
    </tr>
  `).join('');
}

function renderCategoryBars() {
  const container = document.getElementById('categoryStats');
  const cats = ['colares', 'brincos', 'aneis', 'pulseiras'];
  const labels = { colares: 'Colares', brincos: 'Brincos', aneis: 'Anéis', pulseiras: 'Pulseiras' };

  const counts = {};
  let max = 0;
  cats.forEach(c => {
    counts[c] = allProducts.filter(p => p.category === c).length;
    if (counts[c] > max) max = counts[c];
  });

  container.innerHTML = cats.map(c => {
    const pct = max ? Math.round((counts[c] / max) * 100) : 0;
    return `
      <div class="cat-bar-item">
        <div class="cat-bar-header">
          <span class="cat-bar-name">${labels[c]}</span>
          <span class="cat-bar-count">${counts[c]} produto${counts[c] !== 1 ? 's' : ''}</span>
        </div>
        <div class="cat-bar-track">
          <div class="cat-bar-fill" style="width:${pct}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

/* ============================================
   ORDERS TABLE
   ============================================ */
function renderOrdersTable(orders) {
  const tbody = document.getElementById('ordersBody');

  if (!orders.length) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty-row">Nenhum pedido encontrado</td></tr>';
    return;
  }

  tbody.innerHTML = orders.map(o => {
    const itemsText = (o.items || []).map(i => `${i.name} ×${i.qty}`).join('<br>');
    return `
      <tr>
        <td><span style="font-size:0.72rem;color:var(--text-light);">#${o.id}</span></td>
        <td class="cell-name">${esc(o.customer_name)}</td>
        <td class="cell-email">${esc(o.customer_email)}</td>
        <td class="cell-items">${itemsText || '–'}</td>
        <td style="color:var(--rose-dark);font-weight:400;white-space:nowrap;">${fmtPrice(o.total)}</td>
        <td>
          <select class="status-select" onchange="updateOrderStatus(${o.id}, this.value)" data-order="${o.id}">
            ${statusOptions(o.status)}
          </select>
        </td>
        <td style="font-size:0.72rem;color:var(--text-light);white-space:nowrap;">${fmtDate(o.created_at)}</td>
        <td>
          <div class="action-btns">
            <button class="btn-icon" title="Ver detalhes" onclick="openOrderModal(${o.id})">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function statusOptions(current) {
  const opts = [
    { v: 'pending',    l: 'Pendente'   },
    { v: 'processing', l: 'Processando'},
    { v: 'completed',  l: 'Concluído'  },
    { v: 'cancelled',  l: 'Cancelado'  },
  ];
  return opts.map(o => `<option value="${o.v}"${o.v === current ? ' selected' : ''}>${o.l}</option>`).join('');
}

async function updateOrderStatus(orderId, status) {
  try {
    if (!usingMock) {
      const res = await fetch(`${API}/admin/pedidos/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
    }
    const order = allOrders.find(o => o.id === orderId);
    if (order) order.status = status;
    renderRecentOrders();
    updatePendingBadge();
    showToast('Status atualizado com sucesso', 'success');
  } catch {
    showToast('Erro ao atualizar status', 'error');
  }
}

function updatePendingBadge() {
  const pending = allOrders.filter(o => o.status === 'pending').length;
  const badge   = document.getElementById('pendingBadge');
  badge.textContent = pending;
  badge.style.display = pending > 0 ? 'flex' : 'none';
}

function filterOrders() {
  const q     = document.getElementById('orderSearch').value.toLowerCase();
  const status = document.getElementById('statusFilter').value;

  const filtered = allOrders.filter(o => {
    const matchQ = !q || o.customer_name.toLowerCase().includes(q) || o.customer_email.toLowerCase().includes(q);
    const matchS = !status || o.status === status;
    return matchQ && matchS;
  });
  renderOrdersTable(filtered);
}

/* ============================================
   ORDER DETAIL MODAL
   ============================================ */
function openOrderModal(orderId) {
  const order = allOrders.find(o => o.id === orderId);
  if (!order) return;

  document.getElementById('orderModalId').textContent = `#${order.id}`;
  document.getElementById('orderModalContent').innerHTML = `
    <div class="order-detail">
      <div>
        <div class="order-section-title">Cliente</div>
        <div class="order-info-grid">
          <div class="order-info-item">
            <span class="order-info-label">Nome</span>
            <span class="order-info-value">${esc(order.customer_name)}</span>
          </div>
          <div class="order-info-item">
            <span class="order-info-label">E-mail</span>
            <span class="order-info-value">${esc(order.customer_email)}</span>
          </div>
          <div class="order-info-item">
            <span class="order-info-label">CPF</span>
            <span class="order-info-value">${esc(order.cpf || '–')}</span>
          </div>
          <div class="order-info-item">
            <span class="order-info-label">Data do Pedido</span>
            <span class="order-info-value">${fmtDateFull(order.created_at)}</span>
          </div>
          <div class="order-info-item" style="grid-column:1/-1;">
            <span class="order-info-label">Endereço de Entrega</span>
            <span class="order-info-value">${esc(order.address || '–')}</span>
          </div>
        </div>
      </div>
      <div>
        <div class="order-section-title">Itens do Pedido</div>
        <div class="order-items-list">
          ${(order.items || []).map(item => `
            <div class="order-item-row">
              <div>
                <div class="order-item-name">${esc(item.name)}</div>
                <div class="order-item-qty">Qtd: ${item.qty}</div>
              </div>
              <div class="order-item-price">${fmtPrice(item.price * item.qty)}</div>
            </div>
          `).join('')}
        </div>
        <div class="order-total-row">
          <span class="order-total-label">Total do Pedido</span>
          <span class="order-total-value">${fmtPrice(order.total)}</span>
        </div>
      </div>
      <div>
        <div class="order-section-title">Status</div>
        <div class="order-status-form">
          <label>Alterar status:</label>
          <select class="status-select" style="padding:0.5rem 1rem;" onchange="updateOrderStatus(${order.id}, this.value); closeOrderModal();">
            ${statusOptions(order.status)}
          </select>
        </div>
      </div>
    </div>
  `;

  document.getElementById('orderModal').classList.add('open');
}

function closeOrderModal() {
  document.getElementById('orderModal').classList.remove('open');
}

/* ============================================
   PRODUCTS GRID
   ============================================ */
function renderProductsGrid(products) {
  const container = document.getElementById('productsAdminGrid');

  if (!products.length) {
    container.innerHTML = '<p class="empty-row" style="padding:3rem;text-align:center;">Nenhum produto encontrado</p>';
    return;
  }

  container.innerHTML = products.map(p => {
    const tags = [];
    if (p.is_new) tags.push('Novidade');
    if (p.is_bestseller) tags.push('Mais Vendida');

    return `
      <div class="product-admin-card">
        <div class="pac-img">
          ${p.badge ? `<span class="pac-badge ${p.badge}">${p.badge === 'new' ? 'Novo' : 'Oferta'}</span>` : ''}
          <img src="${p.image}" alt="${esc(p.name)}" loading="lazy" onerror="this.style.display='none'" />
        </div>
        <div class="pac-body">
          <div class="pac-cat">${p.category}</div>
          <div class="pac-name">${esc(p.name)}</div>
          <div>
            <span class="pac-price">${fmtPrice(p.price)}</span>
            ${p.original_price ? `<span class="pac-price-orig">${fmtPrice(p.original_price)}</span>` : ''}
          </div>
          ${tags.length ? `<div class="pac-tags">${tags.map(t => `<span class="pac-tag">${t}</span>`).join('')}</div>` : ''}
        </div>
        <div class="pac-actions">
          <button class="btn-icon" title="Editar" onclick="openEditModal(${p.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="btn-icon delete" title="Excluir" onclick="confirmDelete(${p.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function filterProducts() {
  const q   = document.getElementById('productSearch').value.toLowerCase();
  const cat = document.getElementById('catFilter').value;

  const filtered = allProducts.filter(p => {
    const matchQ   = !q || p.name.toLowerCase().includes(q);
    const matchCat = !cat || p.category === cat;
    return matchQ && matchCat;
  });
  renderProductsGrid(filtered);
}

/* ============================================
   PRODUCT MODAL – OPEN (ADD)
   ============================================ */
function openProductModal() {
  document.getElementById('productModalTitle').textContent = 'Novo Produto';
  document.getElementById('editProductId').value = '';
  document.getElementById('pName').value = '';
  document.getElementById('pCategory').value = 'colares';
  document.getElementById('pPrice').value = '';
  document.getElementById('pOriginalPrice').value = '';
  document.getElementById('pBadge').value = '';
  document.getElementById('pMaterial').value = '';
  document.getElementById('pDescription').value = '';
  document.getElementById('pIsNew').checked = false;
  document.getElementById('pIsBestseller').checked = false;
  tempImages = [];
  resetMainUploadZone();
  renderExtraImages();
  document.getElementById('productModal').classList.add('open');
}

/* ============================================
   PRODUCT MODAL – OPEN (EDIT)
   ============================================ */
function openEditModal(productId) {
  const p = allProducts.find(p => p.id === productId);
  if (!p) return;

  document.getElementById('productModalTitle').textContent = 'Editar Produto';
  document.getElementById('editProductId').value = p.id;
  document.getElementById('pName').value = p.name;
  document.getElementById('pCategory').value = p.category;
  document.getElementById('pPrice').value = p.price;
  document.getElementById('pOriginalPrice').value = p.original_price || '';
  document.getElementById('pBadge').value = p.badge || '';
  document.getElementById('pMaterial').value = p.material || '';
  document.getElementById('pDescription').value = p.description || '';
  document.getElementById('pIsNew').checked = p.is_new;
  document.getElementById('pIsBestseller').checked = p.is_bestseller;

  setMainUploadZone(p.image || '');
  tempImages = Array.isArray(p.images) ? p.images.filter(img => img !== p.image) : [];
  renderExtraImages();

  document.getElementById('productModal').classList.add('open');
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('open');
}

/* ============================================
   UPLOAD DE IMAGENS
   ============================================ */

async function uploadImage(file) {
  if (usingMock) {
    // Sem servidor: cria URL temporária local só para preview
    return URL.createObjectURL(file);
  }
  const form = new FormData();
  form.append('image', file);
  const res = await fetch(`${API}/admin/upload`, { method: 'POST', body: form });
  if (!res.ok) throw new Error('Falha no upload');
  const { url } = await res.json();
  return url;
}

async function handleMainUpload(input) {
  const file = input.files[0];
  if (!file) return;
  input.value = ''; // permite re-selecionar o mesmo arquivo

  const zone    = document.getElementById('mainUploadZone');
  const loader  = document.getElementById('mainImgLoader');
  const preview = document.getElementById('mainImgPreview');

  loader.style.display = 'flex';
  zone.style.pointerEvents = 'none';

  try {
    const url = await uploadImage(file);
    mainImageUrl = url;
    document.getElementById('pImage').value = url;
    preview.src = url;
    zone.classList.add('has-image');
  } catch {
    showToast('Erro ao enviar foto. Tente novamente.', 'error');
  } finally {
    loader.style.display = 'none';
    zone.style.pointerEvents = '';
  }
}

async function handleExtraUpload(input) {
  const file = input.files[0];
  if (!file) return;
  input.value = '';

  const addBtn = document.querySelector('.add-extra-btn');
  if (addBtn) addBtn.style.opacity = '0.5';

  try {
    const url = await uploadImage(file);
    tempImages.push(url);
    renderExtraImages();
  } catch {
    showToast('Erro ao enviar foto adicional.', 'error');
  } finally {
    if (addBtn) addBtn.style.opacity = '';
  }
}

function renderExtraImages() {
  const wrap = document.getElementById('extraImagesWrap');
  const imgs = tempImages.map((url, i) => `
    <div class="extra-img-item">
      <img src="${url}" alt="Foto adicional ${i + 1}" />
      <button class="extra-img-remove" onclick="removeExtraImage(${i})" title="Remover">×</button>
    </div>
  `).join('');

  const addBtn = `
    <div class="add-extra-btn" onclick="document.getElementById('extraImgFile').click()" title="Adicionar foto">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    </div>
  `;
  wrap.innerHTML = imgs + addBtn;
}

function removeExtraImage(idx) {
  tempImages.splice(idx, 1);
  renderExtraImages();
}

function resetMainUploadZone() {
  mainImageUrl = '';
  document.getElementById('pImage').value = '';
  document.getElementById('mainImgPreview').src = '';
  document.getElementById('mainUploadZone').classList.remove('has-image');
}

function setMainUploadZone(url) {
  if (!url) { resetMainUploadZone(); return; }
  mainImageUrl = url;
  document.getElementById('pImage').value = url;
  document.getElementById('mainImgPreview').src = url;
  document.getElementById('mainUploadZone').classList.add('has-image');
}

/* ============================================
   SAVE PRODUCT
   ============================================ */
async function saveProduct() {
  const name     = document.getElementById('pName').value.trim();
  const category = document.getElementById('pCategory').value;
  const price    = parseFloat(document.getElementById('pPrice').value);
  const image    = mainImageUrl || document.getElementById('pImage').value.trim();

  if (!name || !category || !price || !image) {
    showToast('Preencha o nome, categoria, preço e adicione a foto principal (*)', 'error');
    return;
  }

  const productData = {
    name,
    category,
    price,
    original_price: parseFloat(document.getElementById('pOriginalPrice').value) || null,
    badge:          document.getElementById('pBadge').value || null,
    material:       document.getElementById('pMaterial').value.trim(),
    description:    document.getElementById('pDescription').value.trim(),
    is_new:         document.getElementById('pIsNew').checked,
    is_bestseller:  document.getElementById('pIsBestseller').checked,
    image,
    images: [image, ...tempImages],
  };

  const editId = document.getElementById('editProductId').value;
  const isEdit = !!editId;

  try {
    if (!usingMock) {
      const url    = isEdit ? `${API}/admin/produtos/${editId}` : `${API}/admin/produtos`;
      const method = isEdit ? 'PUT' : 'POST';
      const res    = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error();
      if (!isEdit) {
        const json = await res.json();
        productData.id = json.id;
      }
    }

    if (isEdit) {
      const idx = allProducts.findIndex(p => p.id === parseInt(editId));
      if (idx >= 0) allProducts[idx] = { ...allProducts[idx], ...productData, id: parseInt(editId) };
    } else {
      const newId = Math.max(0, ...allProducts.map(p => p.id)) + 1;
      allProducts.push({ ...productData, id: newId });
    }

    renderProductsGrid(allProducts);
    animateCount('statProducts', allProducts.length, allProducts.length - (isEdit ? 0 : 1));
    closeProductModal();
    showToast(isEdit ? 'Produto atualizado com sucesso' : 'Produto adicionado com sucesso', 'success');
  } catch {
    showToast('Erro ao salvar produto', 'error');
  }
}

/* ============================================
   DELETE PRODUCT
   ============================================ */
function confirmDelete(productId) {
  deleteTargetId = productId;
  document.getElementById('confirmModal').classList.add('open');
}

function closeConfirmModal() {
  document.getElementById('confirmModal').classList.remove('open');
  deleteTargetId = null;
}

document.getElementById('confirmDeleteBtn').addEventListener('click', async () => {
  if (!deleteTargetId) return;
  try {
    if (!usingMock) {
      const res = await fetch(`${API}/admin/produtos/${deleteTargetId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
    }
    allProducts = allProducts.filter(p => p.id !== deleteTargetId);
    renderProductsGrid(allProducts);
    animateCount('statProducts', allProducts.length, allProducts.length + 1);
    closeConfirmModal();
    showToast('Produto excluído com sucesso', 'success');
  } catch {
    showToast('Erro ao excluir produto', 'error');
    closeConfirmModal();
  }
});

/* ============================================
   CUSTOMERS TABLE
   ============================================ */
function renderCustomersTable(customers) {
  const tbody = document.getElementById('customersBody');

  if (!customers.length) {
    tbody.innerHTML = '<tr><td colspan="7" class="empty-row">Nenhum cliente encontrado</td></tr>';
    return;
  }

  tbody.innerHTML = customers.map((c, i) => `
    <tr>
      <td><span style="font-size:0.72rem;color:var(--text-light);">#${c.id}</span></td>
      <td class="cell-name">${esc(c.name)}</td>
      <td class="cell-email">${esc(c.email)}</td>
      <td style="font-size:0.78rem;color:var(--text-light);">${c.cpf || '–'}</td>
      <td style="font-size:0.78rem;color:var(--text-mid);max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${esc(c.address || '')}">${esc(c.address || '–')}</td>
      <td style="text-align:center;font-weight:400;color:var(--text-dark);">${c.order_count ?? 0}</td>
      <td style="color:var(--rose-dark);font-weight:400;">${c.total_spent ? fmtPrice(parseFloat(c.total_spent)) : 'R$ 0,00'}</td>
    </tr>
  `).join('');
}

function filterCustomers() {
  const q = document.getElementById('customerSearch').value.toLowerCase();
  const filtered = allCustomers.filter(c =>
    !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
  );
  renderCustomersTable(filtered);
}

/* ============================================
   MODAL CLOSE ON OVERLAY CLICK
   ============================================ */
['productModal', 'orderModal', 'confirmModal'].forEach(id => {
  document.getElementById(id).addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.remove('open');
      if (id === 'confirmModal') deleteTargetId = null;
    }
  });
});

/* ============================================
   UTILITIES
   ============================================ */
function fmtPrice(val) {
  return 'R$ ' + parseFloat(val).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function fmtDate(dateStr) {
  if (!dateStr) return '–';
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function fmtDateFull(dateStr) {
  if (!dateStr) return '–';
  return new Date(dateStr).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function statusBadge(status) {
  const map = {
    pending:    { label: 'Pendente',    cls: 'status-pending'   },
    processing: { label: 'Processando', cls: 'status-processing' },
    completed:  { label: 'Concluído',   cls: 'status-completed'  },
    cancelled:  { label: 'Cancelado',   cls: 'status-cancelled'  },
  };
  const s = map[status] || { label: status, cls: 'status-pending' };
  return `<span class="status-badge ${s.cls}">${s.label}</span>`;
}

function showToast(message, type = '') {
  const toast = document.getElementById('adminToast');
  toast.textContent  = message;
  toast.className    = `admin-toast show ${type}`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ============================================
   ENTRY POINT
   ============================================ */
if (checkSession()) {
  showAdminPanel();
}