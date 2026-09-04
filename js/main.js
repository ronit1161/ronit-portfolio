/**
 * ============================================================================
 * RONIT TAMBE — EDITORIAL MOTION & INTERACTION ENGINE
 * Powered by GSAP (GreenSock Animation Platform 3.12.5), ScrollTrigger & Lenis
 * Aesthetic: Contemporary Swiss Studio / High-End Publication Engineering
 * ============================================================================
 */

// Register GSAP Plugins
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Global Lenis Smooth Scroll Instance
let lenis = null;

// Check if user has requested reduced motion
const isReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
window.isReducedMotion = isReducedMotion;

// Lifecycle Initialization
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScrolling();
  initHeaderScroll();
  initScrollSpy();

  if (typeof gsap !== 'undefined') {
    initFluidDifferenceCursor();
    initPreloaderMotion();
    initScrollRevealMotion();
    initInteractiveHovers();
    initProfileSpecScrollTracker();
    initContactCardTilt();
    initInteractiveMarquee();
  } else {
    initPageLoadMotion();
  }

  initMobileNavMotion();
});

/**
 * ============================================================================
 * 1. LENIS SMOOTH SCROLLING & GSAP SCROLLTRIGGER SYNCHRONIZATION
 * Studio-grade momentum scrolling bound directly to GSAP's internal ticker
 * ============================================================================
 */
function initSmoothScrolling() {
  if (isReducedMotion() || typeof Lenis === 'undefined') return;

  lenis = new Lenis({
    duration: 1.45,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Deep exponential decay
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.4,
    infinite: false,
  });

  // Synchronize Lenis with GSAP ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Intercept all internal anchor navigation for smooth inertial glide
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;

      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl, {
          offset: -64,
          duration: 1.45,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        if (typeof closeMobileMenu === 'function') {
          closeMobileMenu();
        }
      }
    });
  });

  window.lenisInstance = lenis;
}
