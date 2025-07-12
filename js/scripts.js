/**
 * Collapse mobile navbar on nav-link click
 * Highlight the “active” link based on the current page
 * Simple INFO/DEBUG logger
 */
'use strict';
(() => {
  const LogLevel = { DEBUG: 1, INFO: 2, WARN: 3, ERROR: 4 };
  const CURRENT_LOG_LEVEL = LogLevel.INFO;
  const Logger = {
    debug: (...a) => { if (CURRENT_LOG_LEVEL <= LogLevel.DEBUG) console.debug('[DEBUG]', ...a); },
    info:  (...a) => { if (CURRENT_LOG_LEVEL <= LogLevel.INFO)  console.info('[INFO]',  ...a); },
    warn:  (...a) => { if (CURRENT_LOG_LEVEL <= LogLevel.WARN)  console.warn('[WARN]',  ...a); },
    error: (...a) => { if (CURRENT_LOG_LEVEL <= LogLevel.ERROR) console.error('[ERROR]', ...a); }
  };

  document.addEventListener('DOMContentLoaded', () => {
    Logger.info('Scripts initialized');

    // Collapse mobile menu on link click
    const collapseEl = document.getElementById('mainNav');
    if (collapseEl) {
      const bsCollapse = new bootstrap.Collapse(collapseEl, { toggle: false });
      document.querySelectorAll('.navbar-nav .nav-link')
        .forEach(link => {
          link.addEventListener('click', () => {
            const toggler = document.querySelector('.navbar-toggler');
            if (toggler && getComputedStyle(toggler).display !== 'none') {
              Logger.debug('Collapsing navbar');
              bsCollapse.hide();
            }
          });
        });
    }

    // Highlight active nav link
    const page = location.pathname.split('/').pop() || 'index.html';
    Logger.debug('Current page:', page);
    document.querySelectorAll('.navbar-nav .nav-link')
      .forEach(link => {
        if (link.getAttribute('href') === page) {
          link.classList.add('active');
          Logger.debug('Set active:', page);
        }
      });
  });
})();
