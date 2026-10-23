/**
 * ============================================================================
 * PURPOSEFUL TYPOGRAPHIC ENTRANCE (SCENE 0)
 * Monogram "RT." Reveals Name & Curtains Open Smoothly (≤ 800ms)
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
    return;
  }

  // Check reduced motion, skip query param, or previous session view
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasSeenIntro = sessionStorage.getItem('ronit_intro_viewed');
  const shouldSkip = new URLSearchParams(window.location.search).has('skip_intro');

  if (isReduced || hasSeenIntro || shouldSkip) {
    overlay.style.display = 'none';
    document.body.classList.remove('preloader-active');
    return;
  }

  sessionStorage.setItem('ronit_intro_viewed', 'true');
  document.body.classList.add('preloader-active');

  // Fast skip on click or tap
  let isSkipped = false;
  function dismissIntro() {
    if (isSkipped) return;
    isSkipped = true;
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    document.body.classList.remove('preloader-active');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 300);
  }

  overlay.addEventListener('click', dismissIntro);

  // If GSAP is available, orchestrate a brief 750ms entrance timeline
  if (typeof gsap !== 'undefined') {
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove('preloader-active');
        overlay.style.display = 'none';
      },
    });

    // Initial states
    gsap.set(overlay, { display: 'block' });
    gsap.set(monogram, { opacity: 0, y: 14 });
    gsap.set(nameEl, { yPercent: 100 });
    gsap.set(lineEl, { scaleX: 0 });
    gsap.set(roleEl, { yPercent: 100 });

    // 1. Monogram in
    tl.to(monogram, {
      opacity: 1,
      y: 0,
      duration: 0.25,
      ease: 'power3.out',
    });

    // 2. Name & divider expand
    tl.to(nameEl, {
      yPercent: 0,
      duration: 0.35,
      ease: 'power4.out',
    }, '-=0.1');

    tl.to(lineEl, {
      scaleX: 1,
      duration: 0.3,
      ease: 'power2.out',
    }, '-=0.25');

    tl.to(roleEl, {
      yPercent: 0,
      duration: 0.3,
      ease: 'power3.out',
    }, '-=0.2');

    // 3. Stage lifts & curtains open smoothly
    tl.to(stage, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
    }, '+=0.1');

    tl.to(curtainLeft, {
      xPercent: -100,
      duration: 0.45,
      ease: 'power4.inOut',
    }, '-=0.15');

    tl.to(curtainRight, {
      xPercent: 100,
      duration: 0.45,
      ease: 'power4.inOut',
    }, '<');
  } else {
    // Graceful CSS fallback
    setTimeout(dismissIntro, 600);
  }
}
