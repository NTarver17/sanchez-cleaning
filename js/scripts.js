// js/scripts.js
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // 1) Initialize AOS (Animate On Scroll) if loaded
  if (window.AOS) {
    AOS.init({
      duration: 700,
      once: true
    });
  }

  // 2) Before/After Slider Logic
  document.querySelectorAll('.ba-slider').forEach(slider => {
    const resize   = slider.querySelector('.resize');
    const handle   = slider.querySelector('.handle');
    let   active   = false;

    // Set initial position at 50%
    const initPos = slider.offsetWidth / 2;
    resize.style.width = initPos + 'px';
    handle.style.left  = initPos + 'px';

    // Start dragging
    const startDrag = e => {
      active = true;
      moveDrag(e);
    };

    // Stop dragging
    const endDrag = () => {
      active = false;
    };

    // While dragging, update widths
    const moveDrag = e => {
      if (!active) return;
      e.preventDefault();
      const rect = slider.getBoundingClientRect();
      let x = (e.clientX || e.touches[0].clientX) - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      resize.style.width = x + 'px';
      handle.style.left  = x + 'px';
    };

    // Mouse events
    handle.addEventListener('mousedown', startDrag);
    slider.addEventListener('mousedown', startDrag);
    window.addEventListener('mouseup', endDrag);
    slider.addEventListener('mouseup', endDrag);
    slider.addEventListener('mouseleave', endDrag);
    slider.addEventListener('mousemove', moveDrag);

    // Touch events
    slider.addEventListener('touchstart', startDrag);
    slider.addEventListener('touchend', endDrag);
    slider.addEventListener('touchmove', moveDrag);
  });

  // 3) Collapse mobile navbar on link click
  const navCollapseEl = document.getElementById('mainNav');
  if (navCollapseEl) {
    const bsCollapse = new bootstrap.Collapse(navCollapseEl, { toggle: false });
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        const toggler = document.querySelector('.navbar-toggler');
        if (toggler && getComputedStyle(toggler).display !== 'none') {
          bsCollapse.hide();
        }
      });
    });
  }

  // 4) Highlight active nav-link based on current page
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});
