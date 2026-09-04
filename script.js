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

/**
 * ============================================================================
 * 1.5. OPTION 04: KINETIC TYPOGRAPHIC SHUTTER PRELOADER
 * High-speed disciplinary text flips, real-time counter, and dual-shutter reveal
 * ============================================================================
 */
function initPreloaderMotion() {
  const overlay = document.getElementById('preloader-overlay');
  const wordsTrack = document.getElementById('kinetic-words-track');
  const wordItems = wordsTrack ? wordsTrack.querySelectorAll('.kinetic-word-item') : [];
  const progressBar = document.getElementById('kinetic-progress-bar');
  const counterEl = document.getElementById('kinetic-counter');
  const shutterTop = document.getElementById('shutter-top');
  const shutterBottom = document.getElementById('shutter-bottom');
  const kineticStage = document.getElementById('kinetic-stage');

  if (!overlay || !wordsTrack || !wordItems.length) {
    if (overlay) overlay.style.display = 'none';
    initPageLoadMotion();
    return;
  }

  if (isReducedMotion() || typeof gsap === 'undefined') {
    overlay.style.display = 'none';
    initPageLoadMotion();
    return;
  }

  if (lenis) lenis.stop();

  const totalWords = wordItems.length; // 5 items
  const preloaderTl = gsap.timeline({
    defaults: { ease: 'power3.out' },
  });

  // Initial setup
  gsap.set(kineticStage, { opacity: 1, scale: 1 });

  // 1. Kinetic Typographic Steps (0% to -80%)
  const wordStepPercent = 100 / totalWords; // 20%
  const stepDur = 0.28;
  for (let i = 1; i < totalWords; i++) {
    preloaderTl.to(
      wordsTrack,
      {
        yPercent: -(i * wordStepPercent),
        duration: stepDur,
        ease: 'power4.inOut',
      },
      0.35 + (i - 1) * 0.32
    );
  }

  // 2. Counter & Progress Fill (00% to 100%)
  const counterObj = { val: 0 };
  preloaderTl.to(
    counterObj,
    {
      val: 100,
      duration: 1.65,
      ease: 'power2.inOut',
      onUpdate: () => {
        const cur = Math.floor(counterObj.val);
        const formatted = cur < 10 ? `0${cur}%` : `${cur}%`;
        if (counterEl) counterEl.textContent = formatted;
        if (progressBar) progressBar.style.width = `${cur}%`;
      },
    },
    0.1
  );

  // 3. Highlight Flash on Landing ('RONIT TAMBE')
  preloaderTl.to(
    kineticStage,
    {
      scale: 1.04,
      duration: 0.35,
      ease: 'back.out(1.8)',
    },
    1.65
  );

  // 4. Kinetic Stage Fade & Dual Shutter Split Reveal
  preloaderTl
    .to(
      kineticStage,
      {
        opacity: 0,
        scale: 1.1,
        duration: 0.45,
        ease: 'power3.in',
      },
      '+=0.2'
    )
    .to(
      shutterTop,
      {
        yPercent: -100,
        duration: 0.95,
        ease: 'power4.inOut',
        onStart: () => {
          if (lenis) lenis.start();
          initPageLoadMotion();
        },
      },
      '<0.1'
    )
    .to(
      shutterBottom,
      {
        yPercent: 100,
        duration: 0.95,
        ease: 'power4.inOut',
        onComplete: () => {
          overlay.style.display = 'none';
        },
      },
      '<'
    );
}

/**
 * ============================================================================
 * 2. GSAP MASTER PAGE LOAD TIMELINE
 * Powerful, weighted entrance with all hero text appearing from below
 * ============================================================================
 */
function initPageLoadMotion() {
  if (isReducedMotion() || typeof gsap === 'undefined') return;

  const tl = gsap.timeline({
    defaults: {
      ease: 'power4.out',
    },
  });

  // 1. Navigation Bar Entrance
  tl.fromTo(
    '#site-header',
    { opacity: 0, y: -32 },
    { opacity: 1, y: 0, duration: 0.95, ease: 'power3.out' },
    0
  );

  // 2. Monumental Hero Typography (Masked Line Reveal from Below)
  const titleWords = document.querySelectorAll('.hero-line-mask .hero-giant-word');
  if (titleWords.length) {
    tl.fromTo(
      titleWords,
      { yPercent: 140, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.35,
        stagger: 0.16,
        ease: 'power4.out',
      },
      0.15
    );
  }

  // 3. Hero 3D Character Entrance (Scale + Floating Fade In)
  const characterCard = document.querySelector('.hero-character-card');
  if (characterCard) {
    tl.fromTo(
      characterCard,
      { opacity: 0, scale: 0.82, y: 35 },
      { opacity: 1, scale: 1, y: 0, duration: 1.25, ease: 'back.out(1.4)' },
      0.35
    );
  }

  // 4. Hero Statement Narrative (Rising from below)
  const statementText = document.querySelector('.hero-statement-text');
  if (statementText) {
    tl.fromTo(
      statementText,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      0.7
    );
  }

  // 5. Credentials Tag (Rising from below)
  const credentialsTag = document.querySelector('.hero-credentials-tag');
  if (credentialsTag) {
    tl.fromTo(
      credentialsTag,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.05, ease: 'power3.out' },
      0.85
    );
  }

  // 6. Action CTAs & Auxiliary Links (Staggered rise from below)
  const primaryActions = document.querySelectorAll('.hero-primary-actions > *');
  if (primaryActions.length) {
    tl.fromTo(
      primaryActions,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out' },
      0.95
    );
  }

  const auxLinks = document.querySelector('.hero-aux-links');
  if (auxLinks) {
    tl.fromTo(
      auxLinks,
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.95, ease: 'power3.out' },
      1.15
    );
  }
}

/**
 * ============================================================================
 * 3. GSAP SCROLLTRIGGER VIEWPORT REVEALS
 * Precise, weighted viewport entrances across all editorial sections
 * ============================================================================
 */
function initScrollRevealMotion() {
  if (isReducedMotion() || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // A. Section Headers
  document.querySelectorAll('.section-header').forEach((header) => {
    const indexBadge = header.querySelector('.section-index');
    const title = header.querySelector('.section-title');
    const subtitle = header.querySelector('.section-subtitle');

    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    if (indexBadge) {
      headerTl.fromTo(
        indexBadge,
        { opacity: 0, x: -35 },
        { opacity: 1, x: 0, duration: 0.95, ease: 'power3.out' },
        0
      );
    }

    if (title) {
      headerTl.fromTo(
        title,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.25, ease: 'power4.out' },
        0.1
      );
    }

    if (subtitle) {
      headerTl.fromTo(
        subtitle,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.05, ease: 'power3.out' },
        0.22
      );
    }
  });

  // B. Selected Work Project Items & Stacking Overlap Scrub
  const projectCards = gsap.utils.toArray('.project-showcase-item');
  projectCards.forEach((project, index) => {
    const infoElements = project.querySelectorAll(
      '.project-meta-strip, .project-showcase-title, .project-showcase-desc, .project-highlights-list, .project-stack-pills, .project-actions-row'
    );
    const image = project.querySelector('.project-dominant-image');

    // 1. Initial Viewport Entrance Reveal
    const projectTl = gsap.timeline({
      scrollTrigger: {
        trigger: project,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    if (infoElements.length) {
      projectTl.fromTo(
        infoElements,
        { opacity: 0, y: 55 },
        {
          opacity: 1,
          y: 0,
          duration: 1.15,
          stagger: 0.08,
          ease: 'power3.out',
        },
        0.05
      );
    }

    if (image) {
      projectTl.fromTo(
        image,
        { opacity: 0.1, scale: 1.18, y: 40 },
        {
          opacity: 1,
          scale: 1.0,
          y: 0,
          duration: 1.45,
          ease: 'power4.out',
        },
        0.1
      );
    }

  });

  // 3. Final Overlap Curtain: Pin the entire project section so it stays fixed while About slides over it
  const projectsSection = document.getElementById('projects');
  const aboutSection = document.getElementById('about');
  if (projectsSection && aboutSection && !isReducedMotion()) {
    ScrollTrigger.create({
      trigger: projectsSection,
      start: 'bottom bottom',
      endTrigger: aboutSection,
      end: 'top top',
      pin: true,
      pinSpacing: false,
    });
  }

  // C. About Section (Profile & Specification Matrix)
  const profileSection = document.querySelector('.editorial-profile-section');
  if (profileSection) {
    const statement = profileSection.querySelector('.profile-statement-wrap');
    const bio = profileSection.querySelector('.profile-bio-narrative');
    const portraitFrame = profileSection.querySelector('.profile-portrait-frame');
    const specRows = profileSection.querySelectorAll('.profile-spec-row');

    const profileTl = gsap.timeline({
      scrollTrigger: {
        trigger: profileSection,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    if (statement) {
      profileTl.fromTo(
        statement,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.25, ease: 'power4.out' },
        0
      );
    }

    if (bio) {
      profileTl.fromTo(
        bio,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 1.15, ease: 'power3.out' },
        0.15
      );
    }

    if (portraitFrame) {
      profileTl.fromTo(
        portraitFrame,
        { opacity: 0.1, scale: 0.92, y: 55 },
        { opacity: 1, scale: 1.0, y: 0, duration: 1.45, ease: 'power4.out' },
        0.2
      );
    }

    if (specRows.length) {
      profileTl.fromTo(
        specRows,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out' },
        0.25
      );
    }
  }

  // D. Section 03 Continuous Horizontal Marquee Viewport Reveal
  const skillsSection = document.querySelector('.marquee-skills-section');
  if (skillsSection) {
    const marqueeShowcase = skillsSection.querySelector('.marquee-showcase-container');
    if (marqueeShowcase) {
      gsap.fromTo(
        marqueeShowcase,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skillsSection,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }

  // E. Contact Section
  const contactSection = document.querySelector('.contact-section-wrapper');
  if (contactSection) {
    const textCol = contactSection.querySelector('.contact-text-col');
    const dossierPanel = contactSection.querySelector('.contact-dossier-panel');

    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: contactSection,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    if (textCol) {
      contactTl.fromTo(
        textCol,
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: 1.35, ease: 'power4.out' },
        0
      );
    }

    if (dossierPanel) {
      contactTl.fromTo(
        dossierPanel,
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: 1.35, ease: 'power4.out' },
        0.2
      );
    }
  }
}

/**
 * ============================================================================
 * 4. GSAP-POWERED INTERACTIVE HOVER MOTION
 * High-mass micro-interactions with precise physics and deceleration
 * ============================================================================
 */
function initInteractiveHovers() {
  if (isReducedMotion() || typeof gsap === 'undefined') return;

  // A. Directional Arrow Displacements & Button Lift
  document.querySelectorAll('.action-editorial-btn').forEach((btn) => {
    const arrow = btn.querySelector('.btn-arrow');

    btn.addEventListener('mouseenter', () => {
      if (arrow) gsap.to(arrow, { x: 7, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(btn, { y: -4, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    });

    btn.addEventListener('mouseleave', () => {
      if (arrow) gsap.to(arrow, { x: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(btn, { y: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    });
  });

  document.querySelectorAll('.action-editorial-link, .footer-link').forEach((link) => {
    const arrow = link.querySelector('.link-arrow');

    link.addEventListener('mouseenter', () => {
      if (arrow) gsap.to(arrow, { x: 6, y: -6, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
    });

    link.addEventListener('mouseleave', () => {
      if (arrow) gsap.to(arrow, { x: 0, y: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
    });
  });

  // B. Project Visual Hover Scale (Deep Smooth Mass)
  document.querySelectorAll('.project-visual-side').forEach((wrapper) => {
    const img = wrapper.querySelector('.project-dominant-image');
    if (!img) return;

    wrapper.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.06, duration: 0.7, ease: 'power2.out', overwrite: 'auto' });
    });

    wrapper.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1.0, duration: 0.7, ease: 'power2.out', overwrite: 'auto' });
    });
  });

  // C. Project Row Title Shift
  document.querySelectorAll('.project-showcase-item').forEach((item) => {
    const title = item.querySelector('.project-showcase-title');
    if (!title) return;

    item.addEventListener('mouseenter', () => {
      gsap.to(title, { x: 12, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(title, { x: 0, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
    });
  });
}


/**
 * ============================================================================
 * 5B. ABOUT SECTION: SPECIFICATION MATRIX & PORTRAIT BADGE SYNC
 * Dynamic biometric status badge that updates as each spec row scrolls into view
 * ============================================================================
 */
function initProfileSpecScrollTracker() {
  const specRows = document.querySelectorAll('.profile-spec-row');
  const badgeText = document.getElementById('portrait-badge-text');

  if (!specRows.length || typeof ScrollTrigger === 'undefined') return;

  specRows.forEach((row) => {
    const statusMsg = row.getAttribute('data-profile-status');
    if (!statusMsg) return;

    ScrollTrigger.create({
      trigger: row,
      start: 'top 65%',
      end: 'bottom 40%',
      onEnter: () => {
        specRows.forEach((r) => r.classList.remove('is-active'));
        row.classList.add('is-active');
        if (badgeText && typeof gsap !== 'undefined') {
          gsap.to(badgeText, {
            opacity: 0,
            duration: 0.12,
            onComplete: () => {
              badgeText.innerText = statusMsg;
              gsap.to(badgeText, { opacity: 1, duration: 0.2 });
            },
          });
        }
      },
      onEnterBack: () => {
        specRows.forEach((r) => r.classList.remove('is-active'));
        row.classList.add('is-active');
        if (badgeText && typeof gsap !== 'undefined') {
          gsap.to(badgeText, {
            opacity: 0,
            duration: 0.12,
            onComplete: () => {
              badgeText.innerText = statusMsg;
              gsap.to(badgeText, { opacity: 1, duration: 0.2 });
            },
          });
        }
      },
    });
  });
}



/**
 * ============================================================================
 * 5D. CONTACT DOSSIER 3D TACTILE PERSPECTIVE TILT
 * Physics-calibrated 3D mouse tracking on the contact dossier card
 * ============================================================================
 */
function initContactCardTilt() {
  const card = document.getElementById('contact-tilt-card');
  if (!card || isReducedMotion()) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    if (typeof gsap !== 'undefined') {
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  });

  card.addEventListener('mouseleave', () => {
    if (typeof gsap !== 'undefined') {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.65,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  });
}

/**
 * ============================================================================
 * 6. GSAP MOBILE OVERLAY ANIMATION
 * ============================================================================
 */
function initMobileNavMotion() {
  const triggerBtn = document.getElementById('mobile-menu-trigger');
  const overlay = document.getElementById('mobile-nav-overlay');
  const menuText = document.getElementById('menu-text');

  if (!triggerBtn || !overlay) return;

  triggerBtn.addEventListener('click', () => {
    const isOpen = overlay.classList.contains('is-open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close on Escape key
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

  if (lenis) lenis.stop();

  if (typeof gsap !== 'undefined' && !isReducedMotion()) {
    const menuItems = overlay.querySelectorAll('.mobile-nav-item');
    const menuFooter = overlay.querySelector('.mobile-overlay-footer');

    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    if (menuItems.length) {
      gsap.fromTo(
        menuItems,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, delay: 0.1, ease: 'power3.out' }
      );
    }
    if (menuFooter) {
      gsap.fromTo(
        menuFooter,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.55, delay: 0.35, ease: 'power3.out' }
      );
    }
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

  if (lenis) lenis.start();

  if (typeof gsap !== 'undefined' && !isReducedMotion()) {
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.inOut',
      onComplete: () => {
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('drawer-open');
      },
    });
  } else {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
  }
}

/**
 * ============================================================================
 * 7. HEADER SCROLL DETECTION & SCROLL SPY
 * ============================================================================
 */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 24) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-25% 0px -65% 0px',
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
 * ============================================================================
 * 8. CLIPBOARD & NAVIGATION UTILITIES
 * ============================================================================
 */
function copyEmail() {
  const email = 'ronittambe116@gmail.com';
  const copyBtn = document.getElementById('btn-copy-email');

  navigator.clipboard
    .writeText(email)
    .then(() => {
      if (copyBtn) {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'COPIED ✓';
        copyBtn.style.color = '#059669';
        copyBtn.style.borderColor = '#059669';

        setTimeout(() => {
          copyBtn.innerText = originalText;
          copyBtn.style.color = '';
          copyBtn.style.borderColor = '';
        }, 2200);
      }
    })
    .catch((err) => {
      console.error('Failed to copy email:', err);
    });
}

function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, {
      duration: 1.45,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}



/**
 * ============================================================================
 * 8. SECTION 03: INTERACTIVE DRAGGABLE & FLICKABLE CONTINUOUS MARQUEE
 * Powered by GSAP Ticker & Kinetic Throw Physics
 * Features:
 * - Dual-track opposing continuous infinite loops (Track 1 Left, Track 2 Right)
 * - 1:1 Mouse drag and Touch swipe grab interaction
 * - Velocity-based flick/throw momentum physics with realistic inertial decay
 * - Modulo-based gapless wrapping for 100% infinite continuous scrolling
 * ============================================================================
 */
function initInteractiveMarquee() {
  const rows = document.querySelectorAll('.marquee-row-wrapper');
  if (!rows.length || typeof gsap === 'undefined' || isReducedMotion()) return;

  rows.forEach((wrapper, index) => {
    const track = wrapper.querySelector('.marquee-track');
    if (!track) return;

    // Track 1 (top): flows left (negative), Track 2 (bottom): flows right (positive)
    const baseSpeed = index === 0 ? -1.1 : 0.95;
    let currentX = 0;
    let momentum = 0;
    let isDragging = false;
    let isHovered = false;
    let startPointerX = 0;
    let startTrackX = 0;
    let lastPointerX = 0;
    let lastTime = 0;
    let velocityHistory = [];

    // Measure half width (width of single set of cards) for gapless wrapping
    let halfWidth = track.scrollWidth / 2;
    const updateDimensions = () => {
      halfWidth = track.scrollWidth / 2;
    };
    window.addEventListener('resize', updateDimensions);

    // Initial setup check
    setTimeout(updateDimensions, 100);

    // GSAP Ticker frame loop (synced with Lenis & display refresh rate)
    const onTick = () => {
      if (isDragging) return;

      // Inertial momentum decay
      if (Math.abs(momentum) > 0.05) {
        currentX += momentum;
        momentum *= 0.94; // Realistic air/friction deceleration
      } else {
        momentum = 0;
        // If hovered without dragging, slow down to 35% speed for effortless card reading
        const activeSpeed = isHovered ? baseSpeed * 0.35 : baseSpeed;
        currentX += activeSpeed;
      }

      // Modulo wrap around halfWidth
      if (halfWidth > 0) {
        while (currentX <= -halfWidth) currentX += halfWidth;
        while (currentX > 0) currentX -= halfWidth;
      }

      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
    };

    gsap.ticker.add(onTick);

    // Hover slowdown
    wrapper.addEventListener('mouseenter', () => {
      isHovered = true;
    });
    wrapper.addEventListener('mouseleave', () => {
      isHovered = false;
    });

    // Pointer Drag Start
    const onPointerDown = (clientX) => {
      isDragging = true;
      wrapper.classList.add('is-dragging');
      startPointerX = clientX;
      startTrackX = currentX;
      lastPointerX = clientX;
      lastTime = performance.now();
      velocityHistory = [];
      momentum = 0;
    };

    // Pointer Drag Move
    const onPointerMove = (clientX) => {
      if (!isDragging) return;
      const deltaX = clientX - startPointerX;
      currentX = startTrackX + deltaX;

      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 0) {
        const vx = ((clientX - lastPointerX) / dt) * 16.67; // Normalized to 60fps
        velocityHistory.push(vx);
        if (velocityHistory.length > 5) velocityHistory.shift();
      }
      lastPointerX = clientX;
      lastTime = now;

      if (halfWidth > 0) {
        while (currentX <= -halfWidth) {
          currentX += halfWidth;
          startTrackX += halfWidth;
        }
        while (currentX > 0) {
          currentX -= halfWidth;
          startTrackX -= halfWidth;
        }
      }

      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
    };

    // Pointer Drag End (Flick / Throw momentum)
    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      wrapper.classList.remove('is-dragging');

      if (velocityHistory.length > 0) {
        const avgVx = velocityHistory.reduce((a, b) => a + b, 0) / velocityHistory.length;
        // Cap max velocity to maintain controlled, elegant motion
        momentum = Math.max(-28, Math.min(28, avgVx));
      }
    };

    // Mouse Drag Listeners
    wrapper.addEventListener('mousedown', (e) => {
      // Allow dragging from any card or empty area in the row
      e.preventDefault();
      onPointerDown(e.clientX);

      const onMouseMove = (ev) => onPointerMove(ev.clientX);
      const onMouseUp = () => {
        onPointerUp();
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });

    // Touch Drag Listeners (Mobile & Tablet)
    wrapper.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX);
      }
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && isDragging) {
        onPointerMove(e.touches[0].clientX);
      }
    }, { passive: true });

    wrapper.addEventListener('touchend', () => {
      onPointerUp();
    });

    wrapper.addEventListener('touchcancel', () => {
      onPointerUp();
    });
  });
}

/**
 * ============================================================================
 * 9. FLUID INVERSION / DIFFERENCE STENCIL CURSOR ENGINE
 * Smooth inertial following, velocity-based jelly stretch & difference inversion
 * ============================================================================
 */
function initFluidDifferenceCursor() {
  const stencil = document.getElementById('cursor-stencil');
  const dot = document.getElementById('cursor-stencil-dot');

  if (!stencil || !dot || isReducedMotion()) return;

  // Check if fine pointer (desktop mouse)
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  document.body.classList.add('has-custom-cursor');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let isHovering = false;
  let isPressed = false;
  let isVisible = false;

  const setDotX = gsap.quickSetter(dot, 'x', 'px');
  const setDotY = gsap.quickSetter(dot, 'y', 'px');

  // Mouse movement listener
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      gsap.to([stencil, dot], { opacity: 1, duration: 0.3, ease: 'power2.out' });
    }

    setDotX(mouseX);
    setDotY(mouseY);
  });

  // Mouse leave / enter window
  document.addEventListener('mouseleave', () => {
    isVisible = false;
    gsap.to([stencil, dot], { opacity: 0, duration: 0.25 });
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
    gsap.to([stencil, dot], { opacity: 1, duration: 0.25 });
  });

  // Mouse Down / Up click compression
  window.addEventListener('mousedown', () => {
    isPressed = true;
  });

  window.addEventListener('mouseup', () => {
    isPressed = false;
  });

  // 60FPS Fluid Ticker Loop (Lerp + Velocity Jelly Stretch)
  gsap.ticker.add(() => {
    if (!isVisible) return;

    // Smooth Lerp
    const lerpFactor = 0.18;
    currentX += (mouseX - currentX) * lerpFactor;
    currentY += (mouseY - currentY) * lerpFactor;

    // Velocity vector calculation
    const vx = mouseX - currentX;
    const vy = mouseY - currentY;
    const speed = Math.hypot(vx, vy);
    const angle = Math.atan2(vy, vx) * (180 / Math.PI);

    // Dynamic jelly stretch calculation along movement direction
    const stretch = Math.min(speed * 0.0075, 0.65);
    const baseScale = isPressed ? 0.75 : isHovering ? 2.3 : 1.0;
    const scaleX = baseScale * (1 + stretch);
    const scaleY = baseScale * (1 - stretch * 0.45);

    gsap.set(stencil, {
      x: currentX,
      y: currentY,
      rotation: angle,
      scaleX: scaleX,
      scaleY: scaleY,
    });
  });

  // Attach hover listeners to all interactive elements
  const interactiveSelectors = [
    'a',
    'button',
    '.nav-link',
    '.action-editorial-btn',
    '.action-editorial-link',
    '.project-image-clipper',
    '.marquee-row-wrapper',
    '.hero-character-card',
    '.profile-portrait-frame',
    '.profile-spec-row',
    '.tech-pill',
  ];

  document.querySelectorAll(interactiveSelectors.join(',')).forEach((el) => {
    el.addEventListener('mouseenter', () => {
      isHovering = true;
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.out' });
    });

    el.addEventListener('mouseleave', () => {
      isHovering = false;
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2, ease: 'power2.out' });
    });
  });
}


