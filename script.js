// ===== PRODUCT DATA =====
const PRODUCTS = [
  { id:1, cat:'flowers', name:'Crimson Rose Bloom', desc:'Handpicked crimson roses, perfect for expressing deep love and admiration.', img:'https://images.unsplash.com/photo-1455185316-6d3d2b813b44?w=400&q=80', badge:'Fresh' },
  { id:2, cat:'flowers', name:'Sunflower Radiance', desc:'Bright yellow sunflowers to bring warmth, joy, and sunshine into any space.', img:'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&q=80', badge:'Popular' },
  { id:3, cat:'flowers', name:'Lavender Dreams', desc:'Soft lavender bunches with a calming fragrance — pure elegance and serenity.', img:'https://images.unsplash.com/photo-1499956827185-0d63ee78a910?w=400&q=80', badge:'Seasonal' },
  { id:4, cat:'flowers', name:'White Lily Serenity', desc:'Pristine white lilies symbolizing purity, grace, and heartfelt devotion.', img:'https://images.unsplash.com/photo-1490750967868-88df5691cc45?w=400&q=80', badge:'Elegant' },
  { id:5, cat:'bouquets', name:'Romantic Pink Bouquet', desc:'A lush arrangement of pink roses and peonies — the ultimate romantic gesture.', img:'https://images.unsplash.com/photo-1487530811015-780de46a66f7?w=400&q=80', badge:'Bestseller' },
  { id:6, cat:'bouquets', name:'Rainbow Wildflower Mix', desc:'A vibrant, cheerful mix of seasonal wildflowers bursting with color and life.', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', badge:'Colorful' },
  { id:7, cat:'bouquets', name:'White Elegance Bouquet', desc:'Refined white blooms wrapped in satin — timeless beauty for every occasion.', img:'https://images.unsplash.com/photo-1533616688419-b7a585564566?w=400&q=80', badge:'Classic' },
  { id:8, cat:'bouquets', name:'Tropical Paradise Blooms', desc:'Exotic tropical flowers in bold hues for a truly unforgettable impression.', img:'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=400&q=80', badge:'Exotic' },
  { id:9, cat:'combos', name:'Love & Bloom Hamper', desc:'Roses, chocolates, and a surprise note — everything you need to make them feel special.', img:'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80', badge:'Gift Set' },
  { id:10, cat:'combos', name:'Birthday Bliss Bundle', desc:'A curated birthday hamper with cake, flowers, balloons, and sweet treats all in one.', img:'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80', badge:'Bundle' },
  { id:11, cat:'combos', name:'Pamper & Petal Set', desc:'Self-care gift set with fresh flowers, candles, and premium skincare goodies.', img:'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&q=80', badge:'Self-Care' },
  { id:12, cat:'combos', name:'Corporate Thank You Gift', desc:'An elegant gift set for clients and team members — flowers, gourmet snacks, and more.', img:'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80', badge:'Corporate' },
];

let currentFilter = 'all';

function renderProducts(cat) {
  const grid = document.getElementById('productsGrid');
  const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <span class="product-badge">${p.badge}</span>
        <button class="product-heart" onclick="window.heartClick(this)">🤍</button>
      </div>
      <div class="product-body">
        <div class="product-cat">${p.cat.charAt(0).toUpperCase()+p.cat.slice(1)}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-actions">
          <a href="https://wa.me/9779804877448 like to order: ${encodeURIComponent(p.name)}" target="_blank" class="btn-buy">🛍️ Buy Now</a>
        </div>
      </div>
    </div>
  `).join('');
  observeReveal();
}

function filterProducts(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(cat);
}

function heartClick(btn) {
  btn.textContent = btn.textContent === '❤️' ? '🤍' : '❤️';
}

function toggleSearch() {
  const overlay = document.getElementById('searchOverlay');
  overlay.classList.toggle('open');
  document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  if (!overlay.classList.contains('open')) {
    document.getElementById('searchResults').innerHTML = '';
    document.getElementById('searchInput').value = '';
  }
}

function handleSearch(val) {
  const results = document.getElementById('searchResults');
  if (!val.trim()) { results.innerHTML = ''; return; }
  const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(val.toLowerCase()));
  if (!matches.length) { results.innerHTML = '<p>No products found.</p>'; return; }
  results.innerHTML = matches.slice(0,5).map(p => `
    <div style="display:flex;align-items:center;gap:12px;padding:8px;cursor:pointer;" onclick="window.goToShop('${p.cat}')">
      <img src="${p.img}" style="width:44px;height:44px;object-fit:cover;border-radius:8px;">
      <div><strong>${p.name}</strong> <small>(${p.cat})</small></div>
    </div>
  `).join('');
}

function doSearch() {
  const val = document.getElementById('searchInput').value;
  if (!val.trim()) return;
  toggleSearch();
  document.querySelector('#shop').scrollIntoView({ behavior: 'smooth' });
}

function goToShop(cat) {
  toggleSearch();
  const tabs = document.querySelectorAll('.shop-tab');
  const map = { flowers: 1, bouquets: 2, combos: 4 };
  tabs[map[cat]]?.click();
  document.querySelector('#shop').scrollIntoView({ behavior: 'smooth' });
}

function toggleTheme() {
  const html = document.documentElement;
  const dark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', dark ? 'light' : 'dark');
  document.getElementById('themeBtn').textContent = dark ? '🌙' : '☀️';
  localStorage.setItem('bgtheme', dark ? 'light' : 'dark');
}

function toggleMenu(e) {
  if (e) e.stopPropagation();
  document.getElementById('mobileMenu').classList.toggle('open');
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// Close menu on outside click / escape
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  if (menu.classList.contains('open') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
    closeMobileMenu();
  }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMobileMenu(); });

// Scroll to top button
window.addEventListener('scroll', () => {
  const btn = document.getElementById('scrollTop');
  btn.classList.toggle('visible', window.scrollY > 400);
});

// Reveal animations
function observeReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el));
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  observeReveal();
  const saved = localStorage.getItem('bgtheme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  document.getElementById('themeBtn').textContent = saved === 'dark' ? '☀️' : '🌙';
});

// ===== EXPOSE ALL FUNCTIONS TO WINDOW =====
window.filterProducts = filterProducts;
window.renderProducts = renderProducts;
window.heartClick = heartClick;
window.toggleSearch = toggleSearch;
window.handleSearch = handleSearch;
window.doSearch = doSearch;
window.goToShop = goToShop;
window.toggleTheme = toggleTheme;
window.toggleMenu = toggleMenu;
window.closeMobileMenu = closeMobileMenu;

// redirect to the whatsapp message
function renderProducts(cat) {
  const grid = document.getElementById('productsGrid');
  const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <span class="product-badge">${p.badge}</span>
        <button class="product-heart" onclick="window.heartClick(this)">🤍</button>
      </div>
      <div class="product-body">
        <div class="product-cat">${p.cat.charAt(0).toUpperCase()+p.cat.slice(1)}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-actions">
          <a href="https://wa.me/9779804877448?text=Hello%20Bloom%20%26%20Gift%20House!%20I%20would%20like%20to%20order%3A%20${encodeURIComponent(p.name)}.%0A%0AProduct%20Image%3A%20${encodeURIComponent(p.img)}" target="_blank" class="btn-buy">🛍️ Buy Now</a>
        </div>
      </div>
    </div>
  `).join('');
  observeReveal();
}
