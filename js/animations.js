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
