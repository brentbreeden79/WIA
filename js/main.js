/* ===== WAI-CRC Main JS ===== */

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  // Back to top
  const btt = document.getElementById('back-to-top');
  if (btt) {
    if (window.scrollY > 400) btt.classList.add('visible');
    else btt.classList.remove('visible');
  }
});

// Mobile nav toggle
if (toggle) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// Back to top
const btt = document.getElementById('back-to-top');
if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Accordion
document.querySelectorAll('.accordion-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.accordion-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Toast notification
function showToast(msg, icon = '✓') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('.toast-msg').textContent = msg;
  toast.querySelector('.toast-icon').textContent = icon;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// Generic form handler — posts to Netlify Forms
function handleForm(formId, successMsg) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg> Sending…';
    btn.disabled = true;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    })
      .then(() => {
        form.reset();
        showToast(successMsg);
        const alert = document.getElementById(formId + '-success');
        if (alert) { alert.classList.add('show'); setTimeout(() => alert.classList.remove('show'), 5000); }
      })
      .catch(() => showToast('Something went wrong — please email us directly.', '!'))
      .finally(() => { btn.innerHTML = original; btn.disabled = false; });
  });
}

handleForm('volunteer-form', 'Thank you! We\'ll be in touch soon.');
handleForm('contact-form', 'Message sent! We\'ll respond within 2 business days.');

// Set active nav link
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html') || (path === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// Load social links from settings.json and apply to every page
fetch('data/settings.json')
  .then(r => r.json())
  .then(settings => {
    const map = {
      'Facebook':  settings.facebook_url,
      'Instagram': settings.instagram_url,
      'YouTube':   settings.youtube_url,
      'Twitter/X': settings.twitter_url,
    };
    document.querySelectorAll('.social-link[aria-label]').forEach(link => {
      const url = map[link.getAttribute('aria-label')];
      if (url) {
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener';
      }
    });
  })
  .catch(() => {}); // silently ignore if settings not available
