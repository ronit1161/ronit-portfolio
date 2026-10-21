/**
 * ============================================================================
 * SWISS EDITORIAL LOADING EXPERIENCE
 * Typographic Identity Reveal with Cinematic Two-Panel Curtain Transition
 * 
 * Sequence:
 * Stage 1: The Blank Canvas & Monogram 'RT.' (150-250ms)
 * Stage 2: The Identity Reveal: 'RONIT TAMBE' + Cobalt Line + Role (400-600ms)
 * Stage 3: The Name Lifts (150-250ms)
 * Stage 4: Two-Panel Curtain Transition: Left & Right Panels Slide Out (500-700ms)
 * Stage 5: Homepage Reveal & Cleanup
 * ============================================================================
 */
function initPreloaderMotion() {
  const overlay = document.getElementById('preloader-overlay');
  const curtainLeft = document.getElementById('curtain-left');
  const curtainRight = document.getElementById('curtain-right');
  const stage = document.getElementById('identity-stage');
  const monogram = document.getElementById('monogram-wrapper');
  const nameEl = document.getElementById('identity-name');
  const lineEl = document.getElementById('identity-line');
  const roleEl = document.getElementById('identity-role');

  if (!overlay || !curtainLeft || !curtainRight || !stage) {
    if (overlay) overlay.style.display = 'none';
    initPageLoadMotion();
    return;
  }

  // Ensure overlay is active and visible
  overlay.style.display = 'block';

  // Session Storage Check: Full experience on initial visit in session
  const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const urlParams = new URLSearchParams(window.location.search);
  const forceIntro = urlParams.get('intro') === 'true' || urlParams.get('reload') === 'true';
  const skipIntro = urlParams.get('skip') === 'true';

  const hasSeenIntro = sessionStorage.getItem('portfolio_editorial_seen');
  if ((hasSeenIntro === 'true' && !forceIntro && !isLocalDev) || skipIntro) {
    overlay.style.display = 'none';
    initPageLoadMotion();
    return;
  }
  sessionStorage.setItem('portfolio_editorial_seen', 'true');

  // Lock scroll while intro is playing
  document.body.classList.add('preloader-active');
  if (typeof lenis !== 'undefined' && lenis) lenis.stop();

  if (typeof gsap === 'undefined') {
    runVanillaEditorialFallback(overlay, curtainLeft, curtainRight, stage, monogram, nameEl, lineEl, roleEl);
    return;
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
  });

  // Initial Setup: Stage centered, elements hidden behind clipping masks
  gsap.set(overlay, { display: 'block', pointerEvents: 'auto' });
  gsap.set(curtainLeft, { xPercent: 0 });
  gsap.set(curtainRight, { xPercent: 0 });
  gsap.set(stage, { y: 0, opacity: 1 });
  gsap.set(monogram, { opacity: 0, y: 12 });
  gsap.set(nameEl, { y: 0, yPercent: 115 });
  gsap.set(lineEl, { scaleX: 0 });
  gsap.set(roleEl, { y: 0, yPercent: 115 });

  // Stage Inspector: freeze at specific sequence stage for visual review
  const pauseStage = urlParams.get('pause');
  if (pauseStage === 'stage1') {
    gsap.set(monogram, { opacity: 1, y: 0 });
    return;
  }
  if (pauseStage === 'stage2') {
    gsap.set(monogram, { opacity: 1, y: 0 });
    gsap.set(nameEl, { y: 0, yPercent: 0 });
    gsap.set(lineEl, { scaleX: 1 });
    gsap.set(roleEl, { y: 0, yPercent: 0 });
    return;
  }
  if (pauseStage === 'stage3') {
    gsap.set(stage, { y: -26, opacity: 1 });
    gsap.set(monogram, { opacity: 0 });
    gsap.set(nameEl, { y: 0, yPercent: 0 });
    gsap.set(lineEl, { scaleX: 1 });
    gsap.set(roleEl, { y: 0, yPercent: 0 });
    return;
  }
  if (pauseStage === 'curtain') {
    gsap.set(curtainLeft, { xPercent: -50 });
    gsap.set(curtainRight, { xPercent: 50 });
    gsap.set(stage, { opacity: 0.25, y: -26 });
    return;
  }

  // Fast-Forward on User Click / Tap
  let isFastForwarded = false;
  overlay.addEventListener('click', () => {
    if (!isFastForwarded) {
      isFastForwarded = true;
      tl.timeScale(3.2);
    }
  });

  // --------------------------------------------------------------------------
  // Stage 1: The Blank Canvas & Monogram 'RT.' (~220ms)
  // --------------------------------------------------------------------------
  tl.to(
    monogram,
    {
      opacity: 1,
      y: 0,
      duration: 0.28,
      ease: 'power3.out',
    },
    0.15
  );

  // --------------------------------------------------------------------------
  // Stage 2: The Identity Reveal (~520ms)
  // --------------------------------------------------------------------------
  // Name 'RONIT TAMBE' uncovered vertically from behind invisible clipping boundary
  tl.to(
    nameEl,
    {
      y: 0,
      yPercent: 0,
      duration: 0.58,
      ease: 'power4.out',
    },
    0.38
  );

  // Thin cobalt line extends smoothly from left to right
  tl.to(
    lineEl,
    {
      scaleX: 1,
      duration: 0.44,
      ease: 'power3.inOut',
    },
    0.62
  );

  // Role subtitle 'FULL STACK DEVELOPER' unmasks vertically
  tl.to(
    roleEl,
    {
      y: 0,
      yPercent: 0,
      duration: 0.46,
      ease: 'power3.out',
    },
    0.72
  );

  // --------------------------------------------------------------------------
  // Stage 3: The Name Lifts (~240ms)
  // --------------------------------------------------------------------------
  // The identity lifts subtly (~26px), monogram fades out cleanly to reduce clutter
  tl.to(
    stage,
    {
      y: -26,
      duration: 0.32,
      ease: 'power3.out',
    },
    1.25
  );

  tl.to(
    monogram,
    {
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in',
    },
    1.25
  );

  // --------------------------------------------------------------------------
  // Stage 4: The Two-Panel Curtain Transition (~600ms)
  // --------------------------------------------------------------------------
  // Left and right warm-white sheets separate to reveal the homepage
  tl.to(
    curtainLeft,
    {
      xPercent: -100,
      duration: 0.68,
      ease: 'power4.inOut',
    },
    1.55
  );

  // Slight 35ms stagger on right panel for organic physical rhythm
  tl.to(
    curtainRight,
    {
      xPercent: 100,
      duration: 0.68,
      ease: 'power4.inOut',
    },
    1.585
  );

  // Fade out identity composition as sheets separate
  tl.to(
    stage,
    {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
    },
    1.56
  );

  // --------------------------------------------------------------------------
  // Stage 5: Homepage Reveal & Cleanup
  // --------------------------------------------------------------------------
  tl.call(
    () => {
      // Re-enable smooth scrolling
      if (typeof lenis !== 'undefined' && lenis) lenis.start();
      // Trigger coordinated hero entrance
      initPageLoadMotion();
    },
    null,
    1.62
  );

  tl.call(
    () => {
      document.body.classList.remove('preloader-active');
      overlay.style.display = 'none';
      overlay.style.pointerEvents = 'none';
    },
    null,
    2.28
  );
}

/**
 * Robust fallback if vendor GSAP is unavailable
 */
function runVanillaEditorialFallback(overlay, curtainLeft, curtainRight, stage, monogram, nameEl, lineEl, roleEl) {
  setTimeout(() => {
    if (monogram) {
      monogram.style.opacity = '1';
      monogram.style.transform = 'translateY(0)';
      monogram.style.transition = 'all 0.28s ease-out';
    }
  }, 150);

  setTimeout(() => {
    if (nameEl) {
      nameEl.style.transform = 'translateY(0)';
      nameEl.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    if (lineEl) {
      lineEl.style.transform = 'scaleX(1)';
      lineEl.style.transition = 'transform 0.44s ease-in-out';
    }
  }, 400);

  setTimeout(() => {
    if (roleEl) {
      roleEl.style.transform = 'translateY(0)';
      roleEl.style.transition = 'transform 0.45s ease-out';
    }
  }, 700);

  setTimeout(() => {
    if (stage) {
      stage.style.transform = 'translateY(-26px)';
      stage.style.transition = 'transform 0.32s ease-out';
    }
    if (monogram) {
      monogram.style.opacity = '0';
      monogram.style.transition = 'opacity 0.22s ease-in';
    }
  }, 1200);

  setTimeout(() => {
    if (curtainLeft) {
      curtainLeft.style.transform = 'translateX(-100%)';
      curtainLeft.style.transition = 'transform 0.68s cubic-bezier(0.76, 0, 0.24, 1)';
    }
    if (curtainRight) {
      curtainRight.style.transform = 'translateX(100%)';
      curtainRight.style.transition = 'transform 0.68s cubic-bezier(0.76, 0, 0.24, 1)';
    }
    if (stage) {
      stage.style.opacity = '0';
      stage.style.transition = 'opacity 0.35s ease-in';
    }
    if (typeof lenis !== 'undefined' && lenis) lenis.start();
    initPageLoadMotion();
  }, 1550);

  setTimeout(() => {
    document.body.classList.remove('preloader-active');
    overlay.style.display = 'none';
  }, 2250);
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
