/**
 * js/scripts.js
 *
 * Custom JavaScript for Sanchez Cleaning site:
 *  - Auto-collapse mobile navbar on link click
 *  - Scrollspy-like active link highlighting
 *  - Structured logging (INFO / DEBUG)
 */

'use strict';

(() => {
  // ─── Logging Utility ──────────────────────────────────────────────────
  const LogLevel = { DEBUG: 1, INFO: 2, WARN: 3, ERROR: 4 };
  // Change this to LogLevel.DEBUG to see debug messages
  const CURRENT_LOG_LEVEL = LogLevel.INFO;

  const Logger = {
    debug: (...args) => {
      if (CURRENT_LOG_LEVEL <= LogLevel.DEBUG) console.debug('[DEBUG]', ...args);
    },
    info: (...args) => {
      if (CURRENT_LOG_LEVEL <= LogLevel.INFO) console.info('[INFO]', ...args);
    },
    warn: (...args) => {
      if (CURRENT_LOG_LEVEL <= LogLevel.WARN) console.warn('[WARN]', ...args);
    },
    error: (...args) => {
      if (CURRENT_LOG_LEVEL <= LogLevel.ERROR) console.error('[ERROR]', ...args);
    },
  };

  document.addEventListener('DOMContentLoaded', () => {
    Logger.info('DOM fully loaded, initializing scripts');

    // ─── Auto-collapse Mobile Navbar ───────────────────────────────────
    const collapseEl = document.getElementById('mainNav');
    if (collapseEl) {
      const bsCollapse = new bootstrap.Collapse(collapseEl, { toggle: false });
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          // Only collapse if the toggler (hamburger) is visible
          const toggler = document.querySelector('.navbar-toggler');
          if (toggler && window.getComputedStyle(toggler).display !== 'none') {
            Logger.debug('Nav link clicked in mobile view — collapsing navbar');
            bsCollapse.hide();
          }
        });
      });
    }

    // ─── Active Link Highlight on Scroll ────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const options = {
      root: null,
      rootMargin: '0px 0px -50% 0px', // when section top crosses middle of viewport
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const navLink = document.querySelector(`.navbar-nav .nav-link[href="#${id}"]`);
        if (entry.isIntersecting) {
          Logger.debug(`Section "${id}" entered viewport — setting active link`);
          document.querySelectorAll('.navbar-nav .nav-link').forEach(link =>
            link.classList.toggle('active', link === navLink)
          );
        }
      });
    }, options);

    sections.forEach(section => observer.observe(section));
    Logger.info('Scrollspy observer initialized for sections:', [...sections].map(s => s.id));
  });
})();
