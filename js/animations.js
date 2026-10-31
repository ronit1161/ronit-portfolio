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
        '.quote-line, .quote-line-inner, .bridge-forward-lead, .bridge-structural-line, .serif-italic'
      ),
      { clearProps: 'all' }
    );
    return;
  }

  heroTransitionMM = gsap.matchMedia();

  // Desktop & Tablet (> 768px): Coordinated Pinned Scrubbed Transition
  heroTransitionMM.add('(min-width: 769px)', () => {
    document.documentElement.classList.add('js-transition-ready');
    const siteHeader = document.getElementById('site-header');

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
    const forwardLead = bridgeSection.querySelector('.bridge-forward-lead');
    const axisLine = bridgeSection.querySelector('.axis-line');
    const axisNode = bridgeSection.querySelector('.axis-node');

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
    if (forwardLead) {
      gsap.set(forwardLead, { opacity: 0, y: 16 });
    }
    if (axisLine) {
      gsap.set(axisLine, { scaleY: 0, transformOrigin: 'top center' });
    }
    if (axisNode) {
      gsap.set(axisNode, { scale: 0 });
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

    // Forward indicator enters
    if (axisLine) {
      tl.to(axisLine, { scaleY: 1, duration: 0.18, ease: 'power2.out' }, 0.50);
    }
    if (axisNode) {
      tl.to(axisNode, { scale: 1, duration: 0.15, ease: 'back.out(2)' }, 0.54);
    }
    if (forwardLead) {
      tl.to(forwardLead, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }, 0.54);
    }

    // ------------------------------------------------------------------------
    // STAGE D: Stationary Reading Plateau (0.56 -> 0.74)
    // Generous breathing window: text remains static in center as user scrolls
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    // STAGE E: Upward exit as user scrolls down to next section (0.70 -> 0.86)
    // "after scrolling down to next section make the text go upward opposite like it was coming up initially"
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

    if (forwardLead) {
      tl.to(forwardLead, { opacity: 0, y: -24, duration: 0.14, ease: 'power2.in' }, 0.70);
    }
    if (axisLine) {
      tl.to(axisLine, { scaleY: 0, transformOrigin: 'top center', duration: 0.14, ease: 'power2.in' }, 0.70);
    }
    if (axisNode) {
      tl.to(axisNode, { scale: 0, duration: 0.10, ease: 'power2.in' }, 0.72);
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
      if (siteHeader) siteHeader.classList.remove('is-dark');
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
        forwardLead,
        axisLine,
        axisNode,
        ...bridgeLines,
      ].filter(Boolean);
      gsap.set(allSub, { clearProps: 'all' });
    };
  });

  // Mobile Fallback (<= 768px): Natural Vertical Flow & Viewport Reveals
  heroTransitionMM.add('(max-width: 768px)', () => {
    document.documentElement.classList.remove('js-transition-ready');
    gsap.set([heroStage, bridgeSection], { clearProps: 'all' });
    const siteHeaderMobile = document.getElementById('site-header');
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
    const lead = bridgeSection.querySelector('.bridge-forward-lead');

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

    if (lead) {
      gsap.fromTo(
        lead,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.25,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bridgeSection,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      instantBgTriggerMobile.kill();
      if (siteHeaderMobile) siteHeaderMobile.classList.remove('is-dark');
      gsap.set(
        [heroStage, bridgeSection, container, document.body, document.documentElement, workSectionMobile, ...quoteInners, lead].filter(Boolean),
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
        const primaryLink = row.querySelector('.row-actions a');
        if (primaryLink && primaryLink.href) {
          window.open(primaryLink.href, '_blank', 'noopener,noreferrer');
        }
      }
    });

    // Keyboard accessibility
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const primaryLink = row.querySelector('.row-actions a');
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

// Backward-compatibility aliases & Global Window Exposure
function initProjectStripsAnimation() {
  initEditorialProjects();
}
function initProjectStackAnimation() {
  initEditorialProjects();
}
function initHorizontalGallery() {
  initEditorialProjects();
}

window.initEditorialProjects = initEditorialProjects;
window.initProjectStripsAnimation = initEditorialProjects;
window.initProjectStackAnimation = initEditorialProjects;
window.initHorizontalGallery = initEditorialProjects;

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
 * - Smooth background transition from dark (#0A0A0C, from #work) to white
 *   (#FFFFFF, for #skills), fully scrubbed and bi-directional.
 * - Header reverts from dark mode back to frosted light mode in sync.
 */
function initSkillsMarquee() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const section = document.getElementById('skills');
  if (!section) return;

  const track1 = document.getElementById('skills-track-1');
  const track2 = document.getElementById('skills-track-2');
  const track3 = document.getElementById('skills-track-3');
  const siteHeader = document.getElementById('site-header');
  const workSection = document.getElementById('work');

  // ── Unified Pristine White Canvas ─────────────────────────────────────────
  // Both #work and #skills share a seamless white canvas — no jarring seams or cuts.
  gsap.set([document.body, document.documentElement, section, workSection].filter(Boolean), {
    backgroundColor: '#FFFFFF',
  });

  if (isReducedMotion()) return;

  // ── Horizontal Marquee Scroll Motion ─────────────────────────────────────
  // Each track moves left proportionally as the section scrolls through viewport.
  // The scrub amount and travel distance differ per row for a layered parallax.
  // Using section as the trigger (no pin), so the user scrolls naturally through.

  const isMobile = window.innerWidth <= 768;
  const travelBase = isMobile ? -30 : -42; // vw units of leftward travel

  if (track1) {
    gsap.to(track1, {
      xPercent: travelBase * 1.0, // Row 1: base speed
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
      xPercent: travelBase * 1.4, // Row 2: 40% faster (deeper parallax)
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
      xPercent: travelBase * 0.7, // Row 3: 30% slower (near-plane)
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
 * 5. ABOUT — CINEMATIC SCROLL EXPERIENCE
 * Moved to js/about.js — initAboutTypoSection() is defined there.
 * ============================================================================
 */

/**
 * ============================================================================
 * 5b. LEGACY SCROLL REVEAL MOTION (SKILLS + CONTACT + FOOTER)
 * ── The about block is now handled by initAboutTypoSection() above ──
 * ============================================================================
 */
function initScrollRevealMotion() {
  if (isReducedMotion() || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  // --------------------------------------------------------------------------
  // A. SECTION 4: THE ARCHITECTURAL INDEX (SKILLS) — now replaced, skip
  // --------------------------------------------------------------------------
  const indexHeader = document.querySelector('.index-intro-header');
  if (indexHeader) {
    const badge = indexHeader.querySelector('.index-badge');
    const title = indexHeader.querySelector('.index-display-title');
    const statement = indexHeader.querySelector('.index-statement-text');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: indexHeader,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    if (badge) {
      tl.fromTo(
        badge,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        0
      );
    }
    if (title) {
      tl.fromTo(
        title,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        0.08
      );
    }
    if (statement) {
      tl.fromTo(
        statement,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0.16
      );
    }
  }

  // Four Engineering Domains: vertical numeral masks, top accent lines & manifests
  const domainColumns = document.querySelectorAll('.domain-column');
  domainColumns.forEach((col, idx) => {
    const numeral = col.querySelector('.domain-numeral');
    const accentLine = col.querySelector('.domain-accent-line');
    const title = col.querySelector('.domain-title');
    const summary = col.querySelector('.domain-summary');
    const items = col.querySelectorAll('.domain-tech-item');

    const dtl = gsap.timeline({
      scrollTrigger: {
        trigger: col,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    });

    // Top accent line draws in
    if (accentLine) {
      dtl.fromTo(
        accentLine,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.45, ease: 'power3.out' },
        0
      );
    }

    // Large domain numeral vertical mask reveal
    if (numeral) {
      dtl.fromTo(
        numeral,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.65, ease: 'power4.out' },
        0.06
      );

      // Subtle scroll-linked vertical parallax shift as user scrolls through the matrix
      gsap.to(numeral, {
        y: -16,
        ease: 'none',
        scrollTrigger: {
          trigger: col,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    if (title) {
      dtl.fromTo(
        title,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.14
      );
    }

    if (summary) {
      dtl.fromTo(
        summary,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.2
      );
    }

    if (items.length) {
      dtl.fromTo(
        items,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: 'power2.out' },
        0.24
      );
    }
  });

  // --------------------------------------------------------------------------
  // C. SECTION 6: CONTACT & FOOTER MONUMENT
  // Moved to js/contact.js — initContactSection() is defined there.
  // --------------------------------------------------------------------------
}

/**
 * ============================================================================
 * 5. WINDOW RESIZE & MEDIA QUERY LISTENER
 * ============================================================================
 */
let resizeTimeout = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    initHorizontalGallery();
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }, 150);
});
