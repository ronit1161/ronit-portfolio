/**
 * ============================================================================
 * GSAP SCROLLTRIGGER ANIMATION ENGINE — PHASE 9 IMMERSIVE SCROLL SYSTEM
 *
 * Core Responsibilities:
 * 1. Hero: Kinetic Typography entrance (~0.8–1.0s) & scroll-linked recede
 * 2. Editorial Transition: Cinematic scroll-driven bi-directional timeline
 * 3. Project Gallery: Three animated horizontal chapters with containerAnimation
 * 4. Technical Expertise: Animated index with domain masks & numeral shifts
 * 5. About, Education & Experience: Portrait clip-path reveal, parallax & ledgers
 * 6. Contact & Footer: Line-by-line masked typography & monumental resolution
 * ============================================================================
 */

// Register GSAP ScrollTrigger
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Accessibility guard: respects user's OS preference
const isReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * ============================================================================
 * 1. HERO: KINETIC TYPOGRAPHY ENTRANCE & SCROLL INTERACTION
 * ============================================================================
 * Initial entrance:
 * - Reveal RONIT TAMBE with rhythmic word-level masked reveals.
 * - Architectural divider lines draw in using scale transforms.
 * - Narrative and actions enter in coordinated sequence (~0.8–1.0s total).
 */
function initHeroEntrance() {
  if (typeof gsap === 'undefined') return;

  const words = document.querySelectorAll('.seb-word-inner');
  const sticker = document.querySelector('.seb-avatar-sticker');
  const regMark = document.querySelector('.seb-registered-mark');
  const microTags = document.querySelectorAll('.seb-micro-tag');
  const portraitCard = document.querySelector('.seb-portrait-card');
  const adjacentLinks = document.querySelector('.seb-adjacent-links');
  const bottomCluster = document.querySelector('.seb-hero-bottom-cluster');

  const allHeroElements = [
    ...words,
    sticker,
    regMark,
    ...microTags,
    portraitCard,
    adjacentLinks,
    bottomCluster,
  ].filter(Boolean);

  // Reduced motion guard
  if (isReducedMotion()) {
    gsap.set(allHeroElements, { opacity: 1, y: 0, yPercent: 0, x: 0, xPercent: 0, scale: 1 });
    return;
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
  });

  // 1. Display typography masked entrance
  if (words.length) {
    tl.fromTo(
      words,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.05,
        ease: 'power4.out',
      },
      0.05
    );
  }

  // 2. Avatar sticker springs into line 1
  if (sticker) {
    tl.fromTo(
      sticker,
      { scale: 0, rotate: -25, opacity: 0 },
      { scale: 1, rotate: -8, opacity: 1, duration: 0.5, ease: 'back.out(2)' },
      0.22
    );
  }

  // 3. Registered tag
  if (regMark) {
    tl.fromTo(
      regMark,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)' },
      0.3
    );
  }

  // 4. Micro-tags
  if (microTags.length) {
    tl.fromTo(
      microTags,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' },
      0.32
    );
  }

  // 5. Docked Black Portrait Card slides up
  if (portraitCard) {
    const isMobile = window.innerWidth <= 991;
    tl.fromTo(
      portraitCard,
      { yPercent: isMobile ? 0 : 35, y: isMobile ? 24 : 0, opacity: 0 },
      { yPercent: 0, y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      0.25
    );
  }

  // 6. Adjacent links and bottom cluster
  if (adjacentLinks) {
    tl.fromTo(
      adjacentLinks,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' },
      0.35
    );
  }

  if (bottomCluster) {
    tl.fromTo(
      bottomCluster,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      0.32
    );
  }
}

let heroTransitionMM = null;

/**
 * ============================================================================
 * 2. EDITORIAL TRANSITION: CINEMATIC SCROLL SEQUENCE
 * ============================================================================
 * Pinned scrubbed timeline linking Hero to Work Gallery:
 * 1. Hero composition recedes (main typography moves up with restrained scale).
 * 2. Editorial statement enters using line-by-line masked reveals.
 * 3. Selected italic words receive subtle scale / emphasis.
 * 4. Architectural lines draw across the composition.
 * 5. 01 / SELECTED WORK indicator enters before releasing into the gallery.
 */
function initHeroToWorkTransition() {
  const container = document.getElementById('hero-transition-scene');
  const heroStage = document.getElementById('hero');
  const bridgeSection = document.getElementById('editorial-bridge');

  if (
    !container ||
    !heroStage ||
    !bridgeSection ||
    typeof gsap === 'undefined' ||
    typeof ScrollTrigger === 'undefined'
  ) {
    return;
  }

  // Clean up existing matchMedia instance if reinitializing
  if (heroTransitionMM) {
    heroTransitionMM.revert();
  }

  // Reduced motion guard
  if (isReducedMotion()) {
    document.documentElement.classList.remove('js-transition-ready');
    gsap.set([heroStage, bridgeSection], { clearProps: 'all' });
    gsap.set(
      document.querySelectorAll(
        '.quote-line, .quote-line-inner, .bridge-structural-line, .serif-italic'
      ),
      { clearProps: 'all' }
    );
    return;
  }

  heroTransitionMM = gsap.matchMedia();

  // Desktop & Tablet (> 768px): Coordinated Pinned Scrubbed Transition
  heroTransitionMM.add('(min-width: 769px)', () => {
    document.documentElement.classList.add('js-transition-ready');

    const heroCanvas = heroStage.querySelector('.seb-hero-canvas');
    const upperCluster = heroStage.querySelector('.seb-hero-upper-cluster');
    const bottomCluster = heroStage.querySelector('.seb-hero-bottom-cluster');
    const portraitCard = heroStage.querySelector('.seb-portrait-card');
    const adjacentLinks = heroStage.querySelector('.seb-adjacent-links');
    const displayLines = heroStage.querySelectorAll('.seb-display-line');

    const bridgeLines = bridgeSection.querySelectorAll('.bridge-structural-line');
    const quoteWrap = bridgeSection.querySelector('.bridge-statement-wrap');
    const quoteInners = bridgeSection.querySelectorAll('.quote-line-inner');
    const italicWords = bridgeSection.querySelectorAll('.serif-italic');

    // Initial state before Stage C
    gsap.set(bridgeSection, { opacity: 0, pointerEvents: 'none' });
    if (bridgeLines.length) {
      gsap.set(bridgeLines, { scaleX: 0, transformOrigin: 'center center' });
    }
    if (quoteInners.length) {
      gsap.set(quoteInners, { yPercent: 110, opacity: 0 });
    }
    if (italicWords.length) {
      gsap.set(italicWords, { scale: 1 });
    }

    // Master Scrubbed Timeline with extended scroll distance for spacious reading
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=240%',
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // ------------------------------------------------------------------------
    // STAGE A: Hero elements recede & Background transitions from Orange to White
    // "when user scroll 1px change the background" -> tight timing at immediate scroll onset (0.00 -> 0.02)
    // ------------------------------------------------------------------------
    const bgTargets = [heroCanvas, heroStage, container].filter(Boolean);
    if (bgTargets.length) {
      tl.to(
        bgTargets,
        { backgroundColor: '#FFFFFF', duration: 0.02, ease: 'power2.out' },
        0
      );
    }

    // Immediate 1px ScrollTrigger: changes background to white as soon as scrollY >= 1px
    const instantBgTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: '1px top',
      onEnter: () => {
        gsap.to(bgTargets, {
          backgroundColor: '#FFFFFF',
          duration: 0.22,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      },
      onLeaveBack: () => {
        gsap.to(bgTargets, {
          backgroundColor: '#FE3C01',
          duration: 0.22,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      },
    });

    if (upperCluster) {
      tl.to(
        upperCluster,
        { yPercent: -22, scale: 0.94, duration: 0.22, ease: 'power1.inOut' },
        0
      );
    }
    if (displayLines.length) {
      displayLines.forEach((line, index) => {
        const xOffset = index % 2 === 0 ? -15 : 20;
        tl.to(
          line,
          { xPercent: xOffset, duration: 0.22, ease: 'power1.inOut' },
          0.015 * index
        );
      });
    }
    if (portraitCard) {
      tl.to(portraitCard, { yPercent: 40, opacity: 0, duration: 0.22, ease: 'power1.out' }, 0.02);
    }
    if (adjacentLinks) {
      tl.to(adjacentLinks, { opacity: 0, y: 15, duration: 0.18, ease: 'power1.out' }, 0);
    }
    if (bottomCluster) {
      tl.to(bottomCluster, { opacity: 0, x: 40, duration: 0.2, ease: 'power1.out' }, 0.02);
    }

    // ------------------------------------------------------------------------
    // STAGE B: Hero fades & Hero stage exits (0.20 -> 0.30)
    // ------------------------------------------------------------------------
    if (upperCluster) {
      tl.to(
        upperCluster,
        { yPercent: -50, opacity: 0, scale: 0.88, duration: 0.18, ease: 'power2.in' },
        0.20
      );
    }
    tl.to(heroStage, { opacity: 0, pointerEvents: 'none', duration: 0.14 }, 0.24);

    // ------------------------------------------------------------------------
    // STAGE C: Editorial statement emerges with line-by-line reveals (0.28 -> 0.56)
    // "add some more time in that animation"
    // ------------------------------------------------------------------------
    tl.to(bridgeSection, { opacity: 1, pointerEvents: 'auto', duration: 0.14 }, 0.28);

    if (bridgeLines.length) {
      tl.to(
        bridgeLines,
        { scaleX: 1, opacity: 1, duration: 0.24, ease: 'power2.out' },
        0.30
      );
    }

    // Line-by-line masked reveals — generous duration for graceful entrance
    if (quoteInners.length) {
      quoteInners.forEach((inner, idx) => {
        tl.to(
          inner,
          { yPercent: 0, opacity: 1, duration: 0.24, ease: 'power3.out' },
          0.32 + idx * 0.07
        );
      });
    }

    // Restrained emphasis on selected italic words
    if (italicWords.length) {
      tl.to(
        italicWords,
        { scale: 1.05, duration: 0.2, ease: 'power1.out' },
        0.48
      );
    }

    // ------------------------------------------------------------------------
    // STAGE D: Stationary Reading Plateau (0.56 -> 0.74)
    // Generous breathing window: text remains static in center as user scrolls
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    // STAGE E: Upward exit as user scrolls down to next section (0.70 -> 0.86)
    // ------------------------------------------------------------------------
    if (quoteInners.length) {
      quoteInners.forEach((inner, idx) => {
        tl.to(
          inner,
          { yPercent: -130, opacity: 0, duration: 0.16, ease: 'power2.in' },
          0.70 + idx * 0.04
        );
      });
    }

    if (italicWords.length) {
      tl.to(
        italicWords,
        { scale: 1, duration: 0.14, ease: 'power1.in' },
        0.70
      );
    }

    if (quoteWrap) {
      tl.to(
        quoteWrap,
        { y: -40, duration: 0.18, ease: 'power2.in' },
        0.72
      );
    }

    const workSection = document.getElementById('work');
    const whiteCanvasTargets = [
      container,
      bridgeSection,
      document.body,
      document.documentElement,
      workSection,
    ].filter(Boolean);

    // Maintain consistent white background throughout
    gsap.set(whiteCanvasTargets, { backgroundColor: '#FFFFFF' });

    if (bridgeLines.length) {
      tl.to(
        bridgeLines,
        {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          scaleX: 0.6,
          opacity: 0,
          duration: 0.16,
          ease: 'power2.in',
        },
        0.76
      );
    }

    tl.set(bridgeSection, { pointerEvents: 'none' }, 0.90);

    // Teardown
    return () => {
      instantBgTrigger.kill();
      document.documentElement.classList.remove('js-transition-ready');
      gsap.set(
        [heroStage, bridgeSection, container, heroCanvas, document.body, document.documentElement, workSection].filter(Boolean),
        { clearProps: 'all' }
      );
      const allSub = [
        upperCluster,
        bottomCluster,
        portraitCard,
        adjacentLinks,
        ...displayLines,
        quoteWrap,
        ...quoteInners,
        ...italicWords,
        ...bridgeLines,
      ].filter(Boolean);
      gsap.set(allSub, { clearProps: 'all' });
    };
  });

  // Mobile Fallback (<= 768px): Natural Vertical Flow & Viewport Reveals
  heroTransitionMM.add('(max-width: 768px)', () => {
    document.documentElement.classList.remove('js-transition-ready');
    gsap.set([heroStage, bridgeSection], { clearProps: 'all' });
    const workSectionMobile = document.getElementById('work');

    const bgTargetsMobile = [heroStage, container].filter(Boolean);
    const instantBgTriggerMobile = ScrollTrigger.create({
      trigger: document.documentElement,
      start: '1px top',
      onEnter: () => {
        gsap.to(bgTargetsMobile, {
          backgroundColor: '#FFFFFF',
          duration: 0.22,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      },
      onLeaveBack: () => {
        gsap.to(bgTargetsMobile, {
          backgroundColor: '#FE3C01',
          duration: 0.22,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      },
    });

    const quoteInners = bridgeSection.querySelectorAll('.quote-line-inner');

    if (quoteInners.length) {
      // Opening with more time
      gsap.fromTo(
        quoteInners,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bridgeSection,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Upward exit when scrolling down to next section
      gsap.to(quoteInners, {
        yPercent: -120,
        opacity: 0,
        stagger: 0.08,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: bridgeSection,
          start: 'bottom 60%',
          end: 'bottom 15%',
          scrub: true,
        },
      });
    }

    return () => {
      instantBgTriggerMobile.kill();
      gsap.set(
        [heroStage, bridgeSection, container, document.body, document.documentElement, workSectionMobile, ...quoteInners].filter(Boolean),
        { clearProps: 'all' }
      );
    };
  });
}

/**
 * ============================================================================
 * 3. PROJECT SECTION: EDITORIAL DIRECTORY & FLOATING CURSOR PREVIEW
 * ============================================================================
 * Creative Direction:
 * - Minimal, spacious, typography-driven list with thin separators.
 * - Left: Monumental project name with category subtitle.
 * - Middle: Subtle keyword / technology pill tags.
 * - Right: Large distinctive diagonal arrow + direct action links.
 * - Hover Interaction: Floating screenshot container smoothly follows cursor
 *   with GSAP quickTo physics, velocity-based rotation tilt, and scale entrance.
 * - Active Row: Typography & arrow shift to signature accent, sibling rows dim.
 * - Transitions: Fluid GSAP animations across rows.
 * - Mobile / Touch: Cursor-following disabled, tap toggles active state & reveals preview.
 */
function initEditorialProjects() {
  const section = document.getElementById('work');
  const list = document.getElementById('editorial-projects-list');
  const preview = document.getElementById('project-floating-preview');
  const rows = section ? Array.from(section.querySelectorAll('.editorial-project-row')) : [];
  const previewCards = preview ? Array.from(preview.querySelectorAll('.preview-card')) : [];

  if (!section || !list || rows.length === 0 || typeof gsap === 'undefined') {
    return;
  }

  // Handle Touch Devices (<= 768px or no hover capability)
  const isTouchDevice = () => window.matchMedia('(hover: none), (max-width: 768px)').matches;

  rows.forEach((row) => {
    // Click handling:
    // If user clicked directly on a link inside the row, let browser follow the link.
    // On touch device: tapping row toggles its active state and inline media.
    // On desktop: clicking row navigates to the primary project URL.
    row.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;

      if (isTouchDevice()) {
        const isCurrentActive = row.classList.contains('is-active');
        rows.forEach((r) => r.classList.remove('is-active'));
        if (!isCurrentActive) {
          row.classList.add('is-active');
        }
      } else {
        const primaryLink = row.querySelector('.project-title-link') || row.querySelector('a[href]');
        if (primaryLink && primaryLink.href) {
          window.open(primaryLink.href, '_blank', 'noopener,noreferrer');
        }
      }
    });
  });

  if (!preview || previewCards.length === 0) return;

  // Floating Cursor Follower Logic (Desktop)
  let isVisible = false;
  let activeIndex = -1;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let velocityX = 0;
  let rotTween = null;
  let scaleTween = null;

  // Center preview on cursor anchor
  gsap.set(preview, {
    xPercent: -50,
    yPercent: -50,
    transformOrigin: 'center center',
    opacity: 0,
    scale: 0.82,
    rotation: 0,
    pointerEvents: 'none',
  });

  // GSAP quickTo creates high-performance 60fps springs
  const setX = gsap.quickTo(preview, 'x', { duration: 0.38, ease: 'power3.out' });
  const setY = gsap.quickTo(preview, 'y', { duration: 0.38, ease: 'power3.out' });

  function onMouseMove(e) {
    if (isTouchDevice()) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    setX(mouseX);
    setY(mouseY);

    velocityX = mouseX - prevMouseX;
    prevMouseX = mouseX;
    prevMouseY = mouseY;

    // Fluid subtle tilt based on horizontal velocity (clamped between -7deg and 7deg)
    const targetRot = gsap.utils.clamp(-7, 7, velocityX * 0.32);
    if (rotTween) rotTween.kill();
    rotTween = gsap.to(preview, {
      rotation: targetRot,
      duration: 0.38,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }

  function setActiveRow(index) {
    if (isTouchDevice()) return;
    if (index === activeIndex) return;

    activeIndex = index;
    list.classList.add('has-active-row');

    rows.forEach((row, idx) => {
      if (idx === index) {
        row.classList.add('is-active');
        row.setAttribute('aria-selected', 'true');
      } else {
        row.classList.remove('is-active');
        row.setAttribute('aria-selected', 'false');
      }
    });

    previewCards.forEach((card, idx) => {
      if (idx === index) {
        card.classList.add('is-active');
        const img = card.querySelector('.preview-img');
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.08 },
            { scale: 1, duration: 0.45, ease: 'power2.out', overwrite: 'auto' }
          );
        }
      } else {
        card.classList.remove('is-active');
      }
    });

    if (!isVisible) {
      isVisible = true;
      if (scaleTween) scaleTween.kill();
      scaleTween = gsap.to(preview, {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    } else {
      // Elegant micro-pulse when sliding between rows
      if (scaleTween) scaleTween.kill();
      scaleTween = gsap.fromTo(
        preview,
        { scale: 0.95 },
        { scale: 1, duration: 0.32, ease: 'power2.out', overwrite: 'auto' }
      );
    }
  }

  function clearActive() {
    if (isTouchDevice()) return;

    activeIndex = -1;
    list.classList.remove('has-active-row');
    rows.forEach((row) => {
      row.classList.remove('is-active');
      row.setAttribute('aria-selected', 'false');
    });
    previewCards.forEach((card) => card.classList.remove('is-active'));

    if (isVisible) {
      isVisible = false;
      if (scaleTween) scaleTween.kill();
      scaleTween = gsap.to(preview, {
        opacity: 0,
        scale: 0.82,
        rotation: 0,
        duration: 0.28,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });
    }
  }

  // Row Hover Listeners
  const handleRowEnter = (idx, e) => {
    if (isTouchDevice()) return;
    if (!isVisible) {
      const clientX = e?.clientX ?? (window.innerWidth / 2);
      const clientY = e?.clientY ?? (window.innerHeight / 2);
      gsap.set(preview, { x: clientX, y: clientY });
      prevMouseX = clientX;
      prevMouseY = clientY;
    }
    setActiveRow(idx);
  };

  rows.forEach((row, idx) => {
    row.addEventListener('mouseenter', (e) => handleRowEnter(idx, e));
    row.addEventListener('pointerenter', (e) => handleRowEnter(idx, e));
  });

  // Delegated pointerover on list for ultra-responsive hover detection
  list.addEventListener('pointerover', (e) => {
    if (isTouchDevice()) return;
    const targetRow = e.target.closest('.editorial-project-row');
    if (targetRow) {
      const idx = rows.indexOf(targetRow);
      if (idx !== -1 && idx !== activeIndex) {
        handleRowEnter(idx, e);
      }
    }
  });

  // Track cursor across the entire section
  section.addEventListener('mousemove', onMouseMove, { passive: true });
  section.addEventListener('pointermove', onMouseMove, { passive: true });
  section.addEventListener('mouseleave', clearActive);
  list.addEventListener('mouseleave', clearActive);

  // Scroll Entrance Reveal Animation for Editorial Rows
  if (typeof ScrollTrigger !== 'undefined' && !isReducedMotion()) {
    gsap.fromTo(
      rows,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: list,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  }
}

window.initEditorialProjects = initEditorialProjects;

/**
 * ============================================================================
 * 4. SKILLS SECTION: CINEMATIC HORIZONTAL MARQUEE STRIPS
 * ============================================================================
 * Creative Direction:
 * - 3 horizontal rows of monumental Aeonik skill text (Java / Spring Boot /
 *   Microservices | React.js / Next.js / JavaScript | MySQL / REST APIs / Docker)
 * - Each row's track translates LEFT as the user scrolls through the section.
 * - Each row has a different parallax speed for depth/overlap feel.
 * - NO section pinning — user scrolls freely through without stopping.
 */
function initSkillsMarquee() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const section = document.getElementById('skills');
  if (!section) return;

  const track1 = document.getElementById('skills-track-1');
  const track2 = document.getElementById('skills-track-2');
  const track3 = document.getElementById('skills-track-3');
  const workSection = document.getElementById('work');

  // ── Unified Pristine White Canvas ─────────────────────────────────────────
  gsap.set([document.body, document.documentElement, section, workSection].filter(Boolean), {
    backgroundColor: '#FFFFFF',
  });

  if (isReducedMotion()) return;

  const isMobile = window.innerWidth <= 768;
  const travelBase = isMobile ? -30 : -42;

  if (track1) {
    gsap.to(track1, {
      xPercent: travelBase * 1.0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });
  }

  if (track2) {
    gsap.to(track2, {
      xPercent: travelBase * 1.4,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });
  }

  if (track3) {
    gsap.to(track3, {
      xPercent: travelBase * 0.7,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });
  }
}

/**
 * ============================================================================
 * 5. WINDOW RESIZE LISTENER (Recalibrates ScrollTrigger cleanly)
 * ============================================================================
 */
let resizeTimeout = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }, 150);
});
