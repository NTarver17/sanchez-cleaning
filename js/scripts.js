// js/scripts.js
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // 1) Initialize AOS (Animate On Scroll)
  if (window.AOS) {
    AOS.init({
      duration: 700,
      once: true
    });
  }

  // 2) Animated stats counter
  const stats = document.querySelectorAll('.stat-number');
  if (stats.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.target;
        let count = 0;
        const step = Math.ceil(target / 100);
        const update = () => {
          count += step;
          if (count < target) {
            el.textContent = count;
            requestAnimationFrame(update);
          } else {
            el.textContent = target;
          }
        };
        update();
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    stats.forEach(el => observer.observe(el));
  }

  // 3) Collapse mobile navbar on link click
  const navEl = document.getElementById('mainNav');
  if (navEl) {
    const bsCollapse = new bootstrap.Collapse(navEl, { toggle: false });
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        const toggler = document.querySelector('.navbar-toggler');
        if (toggler && getComputedStyle(toggler).display !== 'none') {
          bsCollapse.hide();
        }
      });
    });
  }

  // 4) Highlight active nav‐link
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});
