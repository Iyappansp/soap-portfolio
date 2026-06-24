/* ============================================================
   NATURELLE SUPPLY CO — main.js  v2.0
   Header · Footer · Theme · RTL · Cursor · Reveal · Counters
   FAQ · Tabs · Bubbles · Particles · Loader · Back-To-Top
   ============================================================ */
(function () {
  'use strict';

  /* ── NAV LINKS ──────────────────────────────────────────── */
  const NAV = [
    {
      label: 'Home',
      dropdown: [
        { label: 'Home 1 (Classic)', href: 'index.html' },
        { label: 'Home 2 (Creative Split)', href: 'home-2.html' }
      ]
    },  
        { label: 'About', href: 'about.html' },

    { label: 'Products', href: 'products.html' },
    { label: 'Soaps', href: 'soaps.html' },
    { label: 'Bath Bombs', href: 'bath-bombs.html' },
    { label: 'Private Label', href: 'private-label.html' },
    { label: 'Wholesale', href: 'wholesale-program.html' },
    { label: 'Blog', href: 'blog.html' },
    { label: 'Contact', href: 'contact.html' },
  ];

  function activeCls(href) {
    const p = (location.pathname.split('/').pop() || 'index.html');
    return p === href ? ' active' : '';
  }

  function isHero() {
    const p = (location.pathname.split('/').pop() || 'index.html');
    return !['404.html', 'coming-soon.html', 'login.html', 'signup.html'].includes(p);
  }

  /* ── BUILD HEADER ───────────────────────────────────────── */
  function buildHeader() {
    const el = document.getElementById('main-header');
    if (!el) return;

    const links = NAV.map(l => {
      if (l.dropdown) {
        const isDActive = l.dropdown.some(sub => activeCls(sub.href));
        const subLinks = l.dropdown.map(sub => `<a class="dropdown-item${activeCls(sub.href)}" href="${sub.href}">${sub.label}</a>`).join('');
        return `
      <div class="nav-dropdown">
        <a class="nav-item dropdown-toggle${isDActive ? ' active' : ''}" href="#">${l.label} <svg class="chevron-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-inline-start:4px;transition:transform .3s ease;"><polyline points="6 9 12 15 18 9"/></svg></a>
        <div class="nav-dropdown-menu">
          ${subLinks}
        </div>
      </div>`;
      }
      return `<a class="nav-item${activeCls(l.href)}" href="${l.href}">${l.label}</a>`;
    }).join('');

    const dLinks = NAV.map(l => {
      if (l.dropdown) {
        const isDActive = l.dropdown.some(sub => activeCls(sub.href));
        const subLinks = l.dropdown.map(sub => `<a class="nd-sub-link${activeCls(sub.href)}" href="${sub.href}">${sub.label}</a>`).join('');
        return `
      <div class="nd-dropdown">
        <button class="nd-link nd-dropdown-toggle${isDActive ? ' active' : ''}" aria-expanded="false">${l.label} <svg class="chevron-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-inline-start:4px;transition:transform .3s ease;"><polyline points="6 9 12 15 18 9"/></svg></button>
        <div class="nd-dropdown-menu">
          ${subLinks}
        </div>
      </div>`;
      }
      return `<a class="nd-link${activeCls(l.href)}" href="${l.href}">${l.label}</a>`;
    }).join('');

    el.innerHTML = `
  <nav class="navbar" id="navbar">
    <div class="ns-container">
      <div class="nav-wrap">
        <a class="nav-logo" href="index.html" aria-label="Naturelle Supply Co">
          <img src="assets/logo1.png" alt="Naturelle Logo" class="logo-img">
        </a>
        <div class="nav-links">${links}</div>
        <div class="nav-ctrl">
          <button class="nav-ctrl-btn" id="theme-toggle" aria-label="Toggle theme" title="Toggle dark/light mode">
            <svg id="ico-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            <svg id="ico-sun"  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          </button>
          <button class="nav-ctrl-btn" id="rtl-toggle" aria-label="Toggle RTL" title="Toggle RTL/LTR layout">RTL</button>
          <a class="nav-login-btn nav-auth-desktop" href="login.html">Login</a>
          <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu" aria-expanded="false">
            <span class="hbg-bar"></span>
            <span class="hbg-bar"></span>
            <span class="hbg-bar"></span>
          </button>
        </div>
      </div>
    </div>
  </nav>
  <div class="nav-drawer" id="nav-drawer" aria-hidden="true">
    ${dLinks}
    <div class="nd-ctas">
      <a class="btn btn-primary" href="login.html">Login</a>
    </div>
  </div>`;
  }

  /* ── NAV BEHAVIOUR ──────────────────────────────────────── */
  function initNav() {
    const navbar = document.getElementById('navbar');
    const burger = document.getElementById('nav-hamburger');
    const drawer = document.getElementById('nav-drawer');
    const themeBtn = document.getElementById('theme-toggle');
    const rtlBtn = document.getElementById('rtl-toggle');
    const themeBtnMobile = document.getElementById('mobile-theme-toggle');
    const rtlBtnMobile = document.getElementById('mobile-rtl-toggle');
    const icoMoon = document.getElementById('ico-moon');
    const icoSun = document.getElementById('ico-sun');

    // Sticky
    if (navbar) {
      const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // Burger
    if (burger && drawer) {
      burger.addEventListener('click', () => {
        const open = burger.classList.toggle('open');
        drawer.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', open);
        drawer.setAttribute('aria-hidden', !open);
        if (open) {
          document.body.classList.add('menu-open');
          document.documentElement.classList.add('menu-open');
        } else {
          document.body.classList.remove('menu-open');
          document.documentElement.classList.remove('menu-open');
        }
      });

      drawer.querySelectorAll('.nd-link:not(.nd-dropdown-toggle), .nd-sub-link').forEach(l => l.addEventListener('click', () => {
        burger.classList.remove('open');
        drawer.classList.remove('open');
        document.body.classList.remove('menu-open');
        document.documentElement.classList.remove('menu-open');
      }));

      document.addEventListener('click', e => {
        if (navbar && !navbar.contains(e.target) && !drawer.contains(e.target)) {
          burger.classList.remove('open');
          drawer.classList.remove('open');
          document.body.classList.remove('menu-open');
          document.documentElement.classList.remove('menu-open');
        }
      });

      // Mobile drawer dropdown toggle
      drawer.querySelectorAll('.nd-dropdown-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const menu = btn.nextElementSibling;
          const isOpen = menu.classList.toggle('open');
          btn.classList.toggle('open', isOpen);
          btn.setAttribute('aria-expanded', isOpen);
        });
      });
    }

    // Theme
    function applyTheme(dark) {
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
      if (icoMoon) icoMoon.style.display = dark ? 'none' : 'block';
      if (icoSun) icoSun.style.display = dark ? 'block' : 'none';
      
      const icoMoonM = document.querySelector('.ico-moon-m');
      const icoSunM = document.querySelector('.ico-sun-m');
      const themeText = document.querySelector('.theme-text');
      if (icoMoonM) icoMoonM.style.display = dark ? 'none' : 'block';
      if (icoSunM) icoSunM.style.display = dark ? 'block' : 'none';
      if (themeText) themeText.textContent = dark ? 'Light Mode' : 'Dark Mode';

      localStorage.setItem('ns-theme', dark ? 'dark' : 'light');
    }
    applyTheme(localStorage.getItem('ns-theme') === 'dark');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark'));
    }
    if (themeBtnMobile) {
      themeBtnMobile.addEventListener('click', () => applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark'));
    }

    // RTL
    function applyDir(rtl) {
      document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
      localStorage.setItem('ns-dir', rtl ? 'rtl' : 'ltr');
      
      const rtlText = document.querySelector('#mobile-rtl-toggle span');
      if (rtlText) {
        rtlText.textContent = rtl ? 'LTR Layout' : 'RTL Layout';
      }

      const rtlBtn = document.getElementById('rtl-toggle');
      if (rtlBtn) {
        rtlBtn.textContent = rtl ? 'LTR' : 'RTL';
      }

      const rtlBtnMobile = document.getElementById('mobile-rtl-toggle');
      if (rtlBtnMobile) {
        rtlBtnMobile.textContent = rtl ? 'LTR' : 'RTL';
      }
    }
    applyDir(localStorage.getItem('ns-dir') === 'rtl');
    if (rtlBtn) {
      rtlBtn.addEventListener('click', () => applyDir(document.documentElement.getAttribute('dir') !== 'rtl'));
    }
    if (rtlBtnMobile) {
      rtlBtnMobile.addEventListener('click', () => applyDir(document.documentElement.getAttribute('dir') !== 'rtl'));
    }
  }

  /* ── BUILD FOOTER ───────────────────────────────────────── */
  function buildFooter() {
    const el = document.getElementById('main-footer');
    if (!el) return;
    el.innerHTML = `
  <div class="footer-top">
    <div class="ns-container">
      <div class="row g-4 g-lg-5">
        <div class="col-12 col-md-6 col-lg-4">
          <div class="footer-brand">
            <div class="f-logo">
              <a href="index.html" aria-label="Naturelle Supply Co" style="display: block;">
                <img src="assets/logo1.png" alt="Naturelle Logo" class="logo-img footer-logo-img">
              </a>
            </div>
            <p class="f-desc">Premium handmade soap and bath bomb wholesale supplier. Crafted naturally, supplied professionally since 2010. 580+ partners in 32 countries.</p>
            <div class="f-social">
              <a class="f-social-btn" href="index.html" aria-label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a class="f-social-btn" href="index.html" aria-label="X (formerly Twitter)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a class="f-social-btn" href="index.html" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="3"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3 col-lg-2">
          <p class="f-col-title">Products</p>
          <div class="f-links">
            <a class="f-link" href="soaps.html">Handmade Soaps</a>
            <a class="f-link" href="bath-bombs.html">Bath Bombs</a>
            <a class="f-link" href="products.html">Gift Collections</a>
            <a class="f-link" href="ingredients.html">Ingredients</a>
            <a class="f-link" href="fragrance-development.html">Fragrances</a>
          </div>
        </div>
        <div class="col-6 col-md-3 col-lg-2">
          <p class="f-col-title">Services</p>
          <div class="f-links">
            <a class="f-link" href="private-label.html">Private Label</a>
            <a class="f-link" href="wholesale-program.html">Wholesale</a>
            <a class="f-link" href="industries-served.html">Industries</a>
            <a class="f-link" href="about.html">About Us</a>
            <a class="f-link" href="faq.html">FAQ</a>
            <a class="f-link" href="blog.html">Blog</a>
            <a class="f-link" href="contact.html">Contact</a>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <p class="f-col-title">Stay Updated</p>
          <p style="font-size:.85rem;color:rgba(255,255,255,.45);margin-bottom:1rem;line-height:1.75;">New collections, wholesale updates &amp; industry insights. Join 2,400+ business subscribers.</p>
          <input class="f-nl-input" type="email" placeholder="Your business email" aria-label="Newsletter email">
          <button class="btn btn-primary w-100" style="border-radius:var(--radius-md);">Subscribe to Updates</button>
          <p style="font-size:.72rem;color:rgba(255,255,255,.28);margin-top:.5rem;">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="ns-container">
    <div class="footer-bottom">
      <span class="f-copy">© 2026 Naturelle Supply Co. All rights reserved. Crafted with care in London, UK.</span>
      <div class="f-bl">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookie Policy</a>
      </div>
    </div>
  </div>`;
  }

  /* ── CUSTOM CURSOR ──────────────────────────────────────── */
  function initCursor() {
    // Custom cursor animation disabled
  }

  /* ── SCROLL REVEAL ──────────────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
  }

  /* ── COUNTERS ───────────────────────────────────────────── */
  function initCounters() {
    const els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const end = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1800; const step = 16;
        const inc = end / (dur / step);
        let cur = 0;
        const t = setInterval(() => {
          cur += inc;
          if (cur >= end) { cur = end; clearInterval(t); }
          el.textContent = (Number.isInteger(end) ? Math.floor(cur) : cur.toFixed(0)).toLocaleString() + suffix;
        }, step);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(el => io.observe(el));
  }

  /* ── FAQ ────────────────────────────────────────────────── */
  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
      const q = item.querySelector('.faq-q');
      if (!q) return;
      q.addEventListener('click', () => {
        const open = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
        if (!open) item.classList.add('open');
      });
    });
  }

  /* ── TABS ───────────────────────────────────────────────── */
  function initTabs() {
    document.querySelectorAll('.tab-bar:not([data-filter])').forEach(bar => {
      bar.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.tab;
          const wrap = btn.closest('.tabs-wrap') || document;
          bar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          wrap.querySelectorAll('.tab-pane').forEach(p => p.classList.toggle('active', p.dataset.tab === target));
        });
      });
    });
  }

  /* ── PRODUCT FILTER ─────────────────────────────────────── */
  function initFilter() {
    const bar = document.querySelector('.tab-bar[data-filter]');
    if (!bar) return;
    bar.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        bar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        document.querySelectorAll('[data-category]').forEach(card => {
          const show = f === 'all' || card.dataset.category === f;
          card.style.display = show ? '' : 'none';
          if (show) { card.style.animation = 'none'; void card.offsetHeight; card.style.animation = ''; }
        });
      });
    });
  }

  /* ── BUBBLE CANVAS ──────────────────────────────────────── */
  function initBubbles(id) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, bubs = [];
    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
    window.addEventListener('resize', resize, { passive: true });
    resize();
    function Bub() {
      this.reset = function () {
        this.x = Math.random() * W;
        this.y = H + 20 + Math.random() * 50;
        this.r = 3 + Math.random() * 20;
        this.vx = (Math.random() - .5) * .5;
        this.vy = -(0.35 + Math.random() * 1.0);
        this.op = 0.06 + Math.random() * 0.2;
        this.wob = Math.random() * Math.PI * 2;
        this.ws = 0.012 + Math.random() * .018;
      };
      this.reset();
      this.y = Math.random() * H;
    }
    for (let i = 0; i < 42; i++) { bubs.push(new Bub()); }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      bubs.forEach(b => {
        b.wob += b.ws; b.x += b.vx + Math.sin(b.wob) * .3; b.y += b.vy;
        if (b.y + b.r < 0) b.reset();
        ctx.save();
        ctx.globalAlpha = b.op;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        const g = ctx.createRadialGradient(b.x - b.r * .3, b.y - b.r * .3, b.r * .1, b.x, b.y, b.r);
        g.addColorStop(0, 'rgba(255,255,255,.9)');
        g.addColorStop(.45, 'rgba(201,138,91,.45)');
        g.addColorStop(1, 'rgba(201,138,91,.03)');
        ctx.fillStyle = g;
        ctx.fill();
        ctx.strokeStyle = 'rgba(201,138,91,.3)';
        ctx.lineWidth = .8;
        ctx.stroke();
        ctx.restore();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ── SOAP PARTICLES ─────────────────────────────────────── */
  function initSoapParticles(id) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, parts = [];
    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
    window.addEventListener('resize', resize, { passive: true });
    resize();
    const cols = ['rgba(201,138,91,', 'rgba(244,228,212,', 'rgba(162,103,69,', 'rgba(255,255,255,'];
    function P() {
      this.reset = function () {
        this.x = Math.random() * W; this.y = -20;
        this.r = 2 + Math.random() * 5;
        this.vx = (Math.random() - .5) * .7;
        this.vy = .3 + Math.random() * .7;
        this.rot = Math.random() * Math.PI * 2;
        this.rs = (Math.random() - .5) * .025;
        this.op = .12 + Math.random() * .25;
        this.c = cols[Math.floor(Math.random() * cols.length)];
        this.sh = Math.random() > .5 ? 0 : 1;
      };
      this.reset(); this.y = Math.random() * H;
    }
    for (let i = 0; i < 32; i++)parts.push(new P());
    function draw() {
      ctx.clearRect(0, 0, W, H);
      parts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.rot += p.rs;
        if (p.y > H + 20) p.reset();
        ctx.save(); ctx.globalAlpha = p.op;
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.c + p.op + ')';
        if (p.sh === 0) { ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.fill(); }
        else { ctx.fillRect(-p.r, -p.r * .55, p.r * 2, p.r * 1.1); }
        ctx.restore();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ── BACK TO TOP ────────────────────────────────────────── */
  function initBTT() {
    const btn = document.createElement('button');
    btn.id = 'btt'; btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
    document.body.appendChild(btn);
    window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 400), { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── PAGE LOADER ────────────────────────────────────────── */
  function initLoader() {
    const l = document.getElementById('ns-loader');
    if (!l) return;
    function hide() { l.classList.add('done'); }
    if (document.readyState === 'complete') { setTimeout(hide, 300); }
    else { window.addEventListener('load', () => setTimeout(hide, 350)); }
  }

  /* ── FORM VALIDATION ────────────────────────────────────── */
  function initForms() {
    document.querySelectorAll('form[data-validate]').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        let valid = true;
        form.querySelectorAll('[required]').forEach(inp => {
          if (!inp.value.trim()) {
            valid = false;
            inp.style.borderColor = '#EF4444';
            inp.style.boxShadow = '0 0 0 3px rgba(239,68,68,.12)';
            setTimeout(() => { inp.style.borderColor = ''; inp.style.boxShadow = ''; }, 2500);
          }
        });
        if (valid) {
          const btn = form.querySelector('[type="submit"]');
          if (btn) {
            const orig = btn.innerHTML;
            btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Sent!';
            btn.disabled = true;
            btn.style.background = 'var(--success)';
            btn.style.borderColor = 'var(--success)';
            setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; btn.style.background = ''; btn.style.borderColor = ''; }, 3500);
          }
        }
      });
    });
  }

  /* ── SMOOTH ANCHOR ──────────────────────────────────────── */
  function initAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (!t) return;
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
        const top = t.getBoundingClientRect().top + window.scrollY - offset - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ── STAGGER CHILDREN ───────────────────────────────────── */
  function initStagger() {
    document.querySelectorAll('[data-stagger]').forEach(parent => {
      parent.querySelectorAll(':scope > *').forEach((child, i) => {
        child.setAttribute('data-reveal', 'up');
        child.setAttribute('data-delay', String(Math.min(i * 100, 600)));
      });
    });
  }

  /* ── PASSWORD TOGGLE ────────────────────────────────────── */
  function initPasswordToggle() {
    document.querySelectorAll('.pass-input-container').forEach(container => {
      const input = container.querySelector('input');
      const btn = container.querySelector('.pass-toggle-btn');
      if (!input || !btn) return;
      
      const eyeOn = btn.querySelector('.eye-icon');
      const eyeOff = btn.querySelector('.eye-icon-off');
      
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isPass = input.type === 'password';
        input.type = isPass ? 'text' : 'password';
        
        if (eyeOn && eyeOff) {
          eyeOn.style.display = isPass ? 'none' : 'block';
          eyeOff.style.display = isPass ? 'block' : 'none';
        }
      });
    });
  }

  /* ── RE-INIT CURSOR AFTER BUILD ─────────────────────────── */
  function reCursor() {
    // Custom cursor animation disabled
  }

  /* ── MAIN INIT ──────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    buildHeader();
    buildFooter();
    initNav();
    initCursor();
    initReveal();
    initCounters();
    initFAQ();
    initTabs();
    initFilter();
    initBTT();
    initLoader();
    initForms();
    initAnchors();
    initStagger();
    initPasswordToggle();
    reCursor();

    // Canvases
    initBubbles('bubble-canvas');
    initBubbles('bubble-canvas-2');
    initSoapParticles('soap-particles');
  });

  // Expose for inline use
  window.NS = { initBubbles, initSoapParticles };

})();
