/* =============================================
   RANKED — Interactions
   ============================================= */

// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Counter animation
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stats__num');
      nums.forEach(num => {
        const target = +num.dataset.target;
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          num.textContent = Math.floor(current);
          if (current >= target) clearInterval(timer);
        }, 16);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) counterObserver.observe(statsSection);

// Mobile menu
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.cssText = open
      ? ''
      : 'display:flex;flex-direction:column;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(8,8,8,0.97);justify-content:center;align-items:center;gap:2.5rem;z-index:99;';
    if (!open) {
      navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => { navLinks.style.cssText = ''; }, { once: true });
      });
    }
  });
}

// Stagger service cards on reveal
document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 60}ms`;
});
