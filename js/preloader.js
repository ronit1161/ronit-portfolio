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
