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

  // Phase 2: Cinematic Hero-to-Work Transition
  if (typeof initHeroToWorkTransition === 'function') {
    initHeroToWorkTransition();
  }

  // Phase 3: Editorial Interactive Directory & Cursor Follower
  if (typeof initEditorialProjects === 'function') {
    initEditorialProjects();
  }

  // Phase 5a: About — Typography-driven editorial scroll experience (initializes Lenis)
  if (typeof initAboutTypoSection === 'function') {
    initAboutTypoSection();
  }

  // Phase 6: Contact — Awwwards editorial scroll experience
  if (typeof initContactSection === 'function') {
    initContactSection();
  }

  // Phase 4: Skills Cinematic Marquee + dark→white transition
  if (typeof initSkillsMarquee === 'function') {
    initSkillsMarquee();
  }

  // Utilities & Listeners
  initHeaderScroll();
  initScrollSpy();
  initMobileNav();
  initCopyrightYear();

  // Scene 0 / Hero Opening: Run Editorial Landing Loader or fall back to instant Hero Entrance
  const loaderRunning =
    typeof initLandingLoader === 'function' ? initLandingLoader() : false;

  if (!loaderRunning && typeof initHeroEntrance === 'function') {
    initHeroEntrance();
  }
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
  if (window._lenis) {
    window._lenis.stop();
  }
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
  if (window._lenis) {
    window._lenis.start();
  }
}
window.closeMobileMenu = closeMobileMenu;

/**
 * 4. DYNAMIC COPYRIGHT YEAR
 */
function initCopyrightYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
