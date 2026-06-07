/* ══════════════════════════════════════════════════
   OCD — Okanagan Car Detail | main.js
   ══════════════════════════════════════════════════ */

// ── Navbar: scroll + hamburger ──────────────────────
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const navLinkItems = navLinks.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveLink();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Active nav link on scroll ───────────────────────
function updateActiveLink() {
  const sections = ['home','services','about','gallery','links','contact'];
  const scrollPos = window.scrollY + 100;

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (!section) return;
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ── Intersection Observer: fade-in animations ───────
const fadeEls = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => observer.observe(el));

// Trigger hero elements immediately
document.querySelectorAll('.hero .fade-up').forEach(el => {
  setTimeout(() => el.classList.add('visible'), 100);
});

// ── Smooth scroll for anchor links ──────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Contact form ─────────────────────────────────────
const contactForm   = document.getElementById('contactForm');
const formSuccess   = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Simulate async send (replace with real endpoint)
    setTimeout(() => {
      contactForm.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1200);
  });
}

// ── Gallery placeholder shimmer effect ───────────────
document.querySelectorAll('.gallery-placeholder').forEach((el, i) => {
  const hue = 0; // monochrome
  const lightness = 15 + (i * 3 % 10);
  el.style.background = `hsl(${hue}, 0%, ${lightness}%)`;
});
