// ============================================================
// House of Sweets – Main Script
// ⚠️  Replace WHATSAPP_NUMBER with your real number (digits only, include country code)
// Example: '201234567890' for Egypt +20 123 456 7890
// ============================================================

const WHATSAPP_NUMBER = '905388871072';

// ── NAVBAR ──────────────────────────────────────────────────
const navbar    = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay');

function openMenu() {
  navLinks.classList.add('is-open');
  navOverlay.classList.add('active');
  hamburger.classList.add('is-open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navLinks.classList.remove('is-open');
  navOverlay.classList.remove('active');
  hamburger.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.contains('is-open') ? closeMenu() : openMenu();
  });
}

if (navOverlay) {
  navOverlay.addEventListener('click', closeMenu);
}

// Close on nav link click (mobile)
if (navLinks) {
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('is-open')) closeMenu();
    });
  });
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navLinks && navLinks.classList.contains('is-open')) {
    closeMenu();
  }
});

// Navbar scroll shadow
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── HERO ZOOM ────────────────────────────────────────────────
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('load', () => hero.classList.add('loaded'));
}

// ── SCROLL TO TOP ────────────────────────────────────────────
const scrollTopBtn = document.querySelector('.scroll-top');

if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── INTERSECTION OBSERVER (fade-in) ─────────────────────────
const animEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

if (animEls.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animEls.forEach(el => observer.observe(el));
}

// ── WHATSAPP – data-wa-message buttons ───────────────────────
document.querySelectorAll('[data-wa-message]').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const text = this.dataset.waMessage;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  });
});

// ── SMOOTH SCROLL for anchor links ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || this.dataset.waMessage) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── FAQ ACCORDION ────────────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', function () {
    const item = this.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      this.setAttribute('aria-expanded', 'true');
    }
  });
});

// ── WHATSAPP – Order Form ────────────────────────────────────
const orderForm = document.getElementById('orderForm');

if (orderForm) {
  orderForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const packageName = orderForm.dataset.package || 'Package';
    const name  = document.getElementById('orderName').value.trim();
    const phone = document.getElementById('orderPhone').value.trim();
    const msg   = document.getElementById('orderMessage').value.trim();

    if (!name || !phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const lines = [
      `🍰 *New Order – House of Sweets*`,
      `📦 Package: ${packageName}`,
      `👤 Name: ${name}`,
      `📞 Phone: ${phone}`,
    ];
    if (msg) lines.push(`💬 Message: ${msg}`);

    const waText = lines.join('\n');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`, '_blank');
  });
}
