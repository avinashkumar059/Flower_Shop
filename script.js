
// ===== PRODUCTS DATA =====
const PRODUCTS = [
  { id:1, cat:'flowers', name:'Crimson Rose Bloom', desc:'Handpicked crimson roses, perfect for expressing deep love and admiration.', img:'https://images.unsplash.com/photo-1455185316-6d3d2b813b44?w=400&q=80', badge:'Fresh' },
  { id:2, cat:'flowers', name:'Sunflower Radiance', desc:'Bright yellow sunflowers to bring warmth, joy, and sunshine into any space.', img:'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&q=80', badge:'Popular' },
  { id:3, cat:'flowers', name:'Lavender Dreams', desc:'Soft lavender bunches with a calming fragrance — pure elegance and serenity.', img:'https://images.unsplash.com/photo-1499956827185-0d63ee78a910?w=400&q=80', badge:'Seasonal' },
  { id:4, cat:'flowers', name:'White Lily Serenity', desc:'Pristine white lilies symbolizing purity, grace, and heartfelt devotion.', img:'https://images.unsplash.com/photo-1490750967868-88df5691cc45?w=400&q=80', badge:'Elegant' },
  { id:5, cat:'bouquets', name:'Romantic Pink Bouquet', desc:'A lush arrangement of pink roses and peonies — the ultimate romantic gesture.', img:'https://images.unsplash.com/photo-1487530811015-780de46a66f7?w=400&q=80', badge:'Bestseller' },
  { id:6, cat:'bouquets', name:'Rainbow Wildflower Mix', desc:'A vibrant, cheerful mix of seasonal wildflowers bursting with color and life.', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', badge:'Colorful' },
  { id:7, cat:'bouquets', name:'White Elegance Bouquet', desc:'Refined white blooms wrapped in satin — timeless beauty for every occasion.', img:'https://images.unsplash.com/photo-1533616688419-b7a585564566?w=400&q=80', badge:'Classic' },
  { id:8, cat:'bouquets', name:'Tropical Paradise Blooms', desc:'Exotic tropical flowers in bold hues for a truly unforgettable impression.', img:'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=400&q=80', badge:'Exotic' },
  { id:9, cat:'cakes', name:'Rose Petal Fantasy Cake', desc:'A dreamy floral cake adorned with edible rose petals and rich cream frosting.', img:'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&q=80', badge:'Custom' },
  { id:10, cat:'cakes', name:'Chocolate Bloom Delight', desc:'Indulgent dark chocolate cake with floral décor — the perfect celebration treat.', img:'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80', badge:'Delicious' },
  { id:11, cat:'cakes', name:'Pastel Garden Cake', desc:'A whimsical pastel-themed cake for birthdays, baby showers, and sweet celebrations.', img:'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80', badge:'Cute' },
  { id:12, cat:'cakes', name:'Golden Anniversary Tier', desc:'Elegant multi-tier cake draped in gold fondant and fresh floral sprays.', img:'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=400&q=80', badge:'Premium' },
  { id:13, cat:'combos', name:'Love & Bloom Hamper', desc:'Roses, chocolates, and a surprise note — everything you need to make them feel special.', img:'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80', badge:'Gift Set' },
  { id:14, cat:'combos', name:'Birthday Bliss Bundle', desc:'A curated birthday hamper with cake, flowers, balloons, and sweet treats all in one.', img:'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80', badge:'Bundle' },
  { id:15, cat:'combos', name:'Pamper & Petal Set', desc:'Self-care gift set with fresh flowers, candles, and premium skincare goodies.', img:'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&q=80', badge:'Self-Care' },
  { id:16, cat:'combos', name:'Corporate Thank You Gift', desc:'An elegant gift set for clients and team members — flowers, gourmet snacks, and more.', img:'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80', badge:'Corporate' },
];

let currentFilter = 'all';

function filterProducts(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(cat);
}

function renderProducts(cat) {
  const grid = document.getElementById('productsGrid');
  const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <span class="product-badge">${p.badge}</span>
        <button class="product-heart" onclick="heartClick(this)">🤍</button>
      </div>
      <div class="product-body">
        <div class="product-cat">${p.cat.charAt(0).toUpperCase()+p.cat.slice(1)}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-actions">
          <a href="https://wa.me/message/35QEKO7T64MQO1 I'd like to order: ${encodeURIComponent(p.name)}" target="_blank" class="btn-buy">🛍️ Buy Now</a>
        </div>
      </div>
    </div>
  `).join('');
  observeReveal();
}

function heartClick(btn) {
  const isLiked = btn.textContent === '❤️';
  btn.textContent = isLiked ? '🤍' : '❤️';
  btn.style.transform = 'scale(1.3)';
  setTimeout(() => btn.style.transform = '', 250);
}

// ===== SEARCH =====
function toggleSearch() {
  const overlay = document.getElementById('searchOverlay');
  overlay.classList.toggle('open');
  if (overlay.classList.contains('open')) {
    setTimeout(() => document.getElementById('searchInput').focus(), 300);
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
    document.getElementById('searchResults').innerHTML = '';
    document.getElementById('searchInput').value = '';
  }
}

function handleSearch(val) {
  const results = document.getElementById('searchResults');
  if (!val.trim()) { results.innerHTML = ''; return; }
  const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(val.toLowerCase()) || p.cat.toLowerCase().includes(val.toLowerCase()) || p.desc.toLowerCase().includes(val.toLowerCase()));
  if (matches.length === 0) {
    results.innerHTML = '<p style="color:var(--text-muted)">No products found. Try a different term.</p>';
    return;
  }
  results.innerHTML = matches.slice(0,5).map(p => `
    <div style="display:flex;align-items:center;gap:12px;padding:8px;border-radius:10px;cursor:pointer;transition:background 0.2s;" onmouseover="this.style.background='var(--pink-light)'" onmouseout="this.style.background=''" onclick="goToShop('${p.cat}')">
      <img src="${p.img}" style="width:44px;height:44px;object-fit:cover;border-radius:8px;" alt="${p.name}">
      <div>
        <div style="font-weight:600;font-size:0.9rem;color:var(--text)">${p.name}</div>
        <div style="font-size:0.78rem;color:var(--rose);text-transform:capitalize">${p.cat}</div>
      </div>
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
  setTimeout(() => {
    document.querySelector('#shop').scrollIntoView({ behavior: 'smooth' });
    const tabMap = { flowers: 1, bouquets: 2, cakes: 3, combos: 4 };
    const tabs = document.querySelectorAll('.shop-tab');
    const idx = tabMap[cat];
    if (idx !== undefined) tabs[idx].click();
  }, 400);
}

document.getElementById('searchOverlay').addEventListener('click', function(e) {
  if (e.target === this) toggleSearch();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') { const o = document.getElementById('searchOverlay'); if (o.classList.contains('open')) toggleSearch(); } });

// ===== THEME =====
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('themeBtn').textContent = isDark ? '🌙' : '☀️';
  localStorage.setItem('bgtheme', isDark ? 'light' : 'dark');
}
(function() {
  const saved = localStorage.getItem('bgtheme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  document.getElementById('themeBtn').textContent = saved === 'dark' ? '☀️' : '🌙';
})();

// ===== MOBILE MENU =====
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ===== FORMS =====
function handleContactForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  btn.textContent = '✅ Message Sent!';
  btn.style.background = 'linear-gradient(135deg,var(--green-dark),var(--green))';
  setTimeout(() => { btn.textContent = 'Send Message 🌸'; btn.style.background = ''; e.target.reset(); }, 3500);
}
function handleNewsletter(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const orig = btn.textContent;
  btn.textContent = '✅ Subscribed!';
  btn.style.background = '#fff'; btn.style.color = 'var(--green-dark)';
  e.target.querySelector('input').value = '';
  setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.style.color = ''; }, 3500);
}

// ===== SCROLL EFFECTS =====
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  const nav = document.getElementById('navbar');
  nav.style.boxShadow = window.scrollY > 20 ? 'var(--shadow-soft)' : 'none';
});

// ===== REVEAL ANIMATION =====
function observeReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  observeReveal();
});