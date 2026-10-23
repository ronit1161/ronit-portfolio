/**
 * ============================================================================
 * RONIT TAMBE — APPLICATION CONTROLLER & LIFECYCLE ENGINE
 * ============================================================================
 */

let isAppInitialized = false;

function initApp() {
  if (isAppInitialized) return;
  isAppInitialized = true;

  // Initialize Interaction & Physics Subsystems
  if (typeof initPrecisionCursor === 'function') {
    initPrecisionCursor();
  }

  // Hero Opening Sequence (TYPE AS ARCHITECTURE, ~600-800ms)
  if (typeof initHeroEntrance === 'function') {
    initHeroEntrance();
  }

  // Phase 2: Cinematic Hero-to-Work Transition
  if (typeof initHeroToWorkTransition === 'function') {
    initHeroToWorkTransition();
  }

  if (typeof initHorizontalGallery === 'function') {
    initHorizontalGallery();
  }

  if (typeof initScrollRevealMotion === 'function') {
    initScrollRevealMotion();
  }

  // Utilities & Listeners
  initHeaderScroll();
  initScrollSpy();
  initMobileNav();
  initFooterMonumentScale();
  initCopyrightYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Ensure ScrollTrigger recalibrates after all images and fonts load
window.addEventListener('load', () => {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
  const params = new URLSearchParams(window.location.search);
  const scrollVal = params.get('scroll');
  const gotoVal = params.get('goto');
  if (scrollVal) {
    window.scrollTo(0, parseInt(scrollVal, 10));
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  } else if (gotoVal) {
    const el = document.getElementById(gotoVal);
    if (el) {
      el.scrollIntoView();
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }
  }
});

/**
 * 1. HEADER SCROLL DETECTION
 */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    // Only reveal persistent navbar once user scrolls past the full-screen hero canvas
    const heroThreshold = window.innerHeight * 0.65;
    if (window.scrollY > heroThreshold) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 2. SCROLL SPY FOR ACTIVE NAVIGATION LINKS
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/**
 * 3. MOBILE NAVIGATION CONTROLS
 */
function initMobileNav() {
  const triggerBtn = document.getElementById('mobile-menu-trigger');
  const overlay = document.getElementById('mobile-nav-overlay');

  if (!triggerBtn || !overlay) return;

  triggerBtn.addEventListener('click', () => {
    const isOpen = overlay.classList.contains('is-open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });
}

function openMobileMenu() {
  const triggerBtn = document.getElementById('mobile-menu-trigger');
  const overlay = document.getElementById('mobile-nav-overlay');
  const menuText = document.getElementById('menu-text');

  if (!triggerBtn || !overlay) return;

  triggerBtn.classList.add('is-open');
  triggerBtn.setAttribute('aria-expanded', 'true');
  if (menuText) menuText.innerText = 'Close';
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('drawer-open');
}

function closeMobileMenu() {
  const triggerBtn = document.getElementById('mobile-menu-trigger');
  const overlay = document.getElementById('mobile-nav-overlay');
  const menuText = document.getElementById('menu-text');

  if (!triggerBtn || !overlay) return;

  triggerBtn.classList.remove('is-open');
  triggerBtn.setAttribute('aria-expanded', 'false');
  if (menuText) menuText.innerText = 'Menu';
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('drawer-open');
}
window.closeMobileMenu = closeMobileMenu;

/**
 * 4. CLIPBOARD & TOAST UTILITY
 */
function showToast(message) {
  let toast = document.getElementById('ui-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'ui-toast';
    toast.className = 'ui-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-icon">✓</span><span>${message}</span>`;
  toast.classList.add('is-visible');

  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2600);
}

function copyEmail() {
  const email = 'ronittambe116@gmail.com';
  const copyBtn = document.getElementById('btn-copy-email');
  const copyLabel = copyBtn ? copyBtn.querySelector('.btn-copy-label') || copyBtn : null;

  function setSuccess() {
    if (copyLabel) copyLabel.textContent = 'COPIED ✓';
    if (copyBtn) copyBtn.classList.add('is-copied');
    showToast('Email address copied to clipboard');

    setTimeout(() => {
      if (copyLabel) copyLabel.textContent = 'Copy Email';
      if (copyBtn) copyBtn.classList.remove('is-copied');
    }, 2400);
  }

  function setFallback() {
    // Graceful fallback: select text on screen so user can copy manually
    const textEl = document.getElementById('email-address-val');
    if (textEl && window.getSelection) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(textEl);
      selection.removeAllRanges();
      selection.addRange(range);
      showToast('Press Cmd+C / Ctrl+C to copy email');
    } else {
      showToast('ronittambe116@gmail.com');
    }
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(email)
      .then(setSuccess)
      .catch((err) => {
        console.warn('Clipboard writeText failed, using fallback:', err);
        setFallback();
      });
  } else {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = email;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        setSuccess();
      } else {
        setFallback();
      }
    } catch (e) {
      setFallback();
    }
  }
}
window.copyEmail = copyEmail;

function scrollToTop() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  });
}
window.scrollToTop = scrollToTop;

function initCopyrightYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * 5. FOOTER MONUMENT WORDMARK AUTO-SCALER
 * Measures and sizes "RONIT TAMBE" to fit 100% of viewport width without clipping.
 */
function initFooterMonumentScale() {
  const stage = document.querySelector('.footer-monument-stage');
  const text = document.querySelector('.footer-monument-text');
  if (!stage || !text) return;

  function fitMonument() {
    text.style.fontSize = '';
    const stageWidth = stage.clientWidth;
    if (stageWidth <= 0) return;

    const usableWidth = stageWidth * 0.98;
    const currentTextWidth = text.scrollWidth;

    if (currentTextWidth > 0) {
      const currentFontSize = parseFloat(window.getComputedStyle(text).fontSize);
      const scale = usableWidth / currentTextWidth;
      const targetFontSize = Math.floor(currentFontSize * scale);
      text.style.fontSize = `${targetFontSize}px`;
    }
  }

  window.addEventListener('resize', fitMonument);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitMonument);
  }
  setTimeout(fitMonument, 100);
  setTimeout(fitMonument, 500);
  fitMonument();
}
