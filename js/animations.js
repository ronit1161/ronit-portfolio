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
    // STAGE E: Upward exit as user scrolls down to next section (0.74 -> 0.98)
    // "after scrolling down to next section make the text go upward opposite like it was coming up initially"
    // ------------------------------------------------------------------------
    if (quoteInners.length) {
      quoteInners.forEach((inner, idx) => {
        tl.to(
          inner,
          { yPercent: -130, opacity: 0, duration: 0.22, ease: 'power2.in' },
          0.74 + idx * 0.06
        );
      });
    }

    if (italicWords.length) {
      tl.to(
        italicWords,
        { scale: 1, duration: 0.16, ease: 'power1.in' },
        0.74
      );
    }

    if (quoteWrap) {
      tl.to(
        quoteWrap,
        { y: -36, duration: 0.24, ease: 'power2.in' },
        0.76
      );
    }

    if (forwardLead) {
      tl.to(forwardLead, { opacity: 0, y: -24, duration: 0.16, ease: 'power2.in' }, 0.76);
    }
    if (axisLine) {
      tl.to(axisLine, { scaleY: 0, transformOrigin: 'top center', duration: 0.16, ease: 'power2.in' }, 0.76);
    }
    if (axisNode) {
      tl.to(axisNode, { scale: 0, duration: 0.12, ease: 'power2.in' }, 0.78);
    }

    if (bridgeLines.length) {
      tl.to(
        bridgeLines,
        { scaleX: 0.6, opacity: 0, duration: 0.18, ease: 'power2.in' },
        0.82
      );
    }

    tl.to(bridgeSection, { opacity: 0, pointerEvents: 'none', duration: 0.12 }, 0.90);

    // Teardown
    return () => {
      instantBgTrigger.kill();
      document.documentElement.classList.remove('js-transition-ready');
      gsap.set([heroStage, bridgeSection, container, heroCanvas].filter(Boolean), { clearProps: 'all' });
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
      gsap.set([heroStage, bridgeSection, container, ...quoteInners, lead].filter(Boolean), {
        clearProps: 'all',
      });
    };
  });
}

let horizontalTriggerInstance = null;
let horizontalMM = null;

/**
 * ============================================================================
 * 3. PROJECT GALLERY: THREE ANIMATED CHAPTERS
 * ============================================================================
 * Primary driver: Desktop pinned horizontal track tween.
 * Child scroll effects: containerAnimation coordinates child scene timelines.
 * - Scene 01: Title overflow mask, image controlled directional translation,
 *             staggered manifest, deliberate exit transition.
 * - Scene 02: Restrained panoramic image expansion, coordinated title/manifest,
 *             internal parallax shift.
 * - Scene 03: Opposing directions reveal, divider line draw, handoff indicator.
 */
function initHorizontalGallery() {
  const section = document.querySelector('.horizontal-gallery-section');
  const track = document.getElementById('horizontal-track');

  if (
    !section ||
    !track ||
    typeof gsap === 'undefined' ||
    typeof ScrollTrigger === 'undefined'
  ) {
    return;
  }

  // Clean up existing instances
  if (horizontalTriggerInstance) {
    horizontalTriggerInstance.kill();
    horizontalTriggerInstance = null;
  }
  if (horizontalMM) {
    horizontalMM.revert();
  }
  gsap.set(track, { clearProps: 'all' });

  // Reduced motion guard: keep clean vertical layout
  if (isReducedMotion()) {
    gsap.set(track, { clearProps: 'all' });
    return;
  }

  horizontalMM = gsap.matchMedia();

  // Desktop Pinned Horizontal Scroll (> 768px)
  horizontalMM.add('(min-width: 769px)', () => {
    // Exact travel distance: track scroll width minus visible viewport width
    const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const tween = gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
    });

    horizontalTriggerInstance = ScrollTrigger.create({
      trigger: section,
      pin: true,
      start: 'top top',
      end: () => `+=${getDistance()}`,
      scrub: 0.8,
      invalidateOnRefresh: true,
      animation: tween,
      anticipatePin: 1,
    });

    // ------------------------------------------------------------------------
    // SCENE 01: FREELANCE MARKETPLACE
    // ------------------------------------------------------------------------
    const scene1 = track.querySelector('.scene-freelance');
    const scene2 = track.querySelector('.scene-food');
    const scene3 = track.querySelector('.scene-expense');

    const childTriggers = [];

    if (scene1) {
      const s1Title = scene1.querySelector('.scene-title-inner');
      const s1ImageFrame = scene1.querySelector('.scene-image-frame');
      const s1Desc = scene1.querySelector('.scene-project-description');
      const s1Manifest = scene1.querySelector('.scene-tech-manifest');
      const s1Actions = scene1.querySelector('.scene-actions-strip');

      // Title masked reveal
      if (s1Title) {
        gsap.fromTo(
          s1Title,
          { yPercent: 105 },
          {
            yPercent: 0,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: scene1,
              containerAnimation: tween,
              start: 'left center',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Controlled directional translation & subtle scale
      if (s1ImageFrame) {
        gsap.fromTo(
          s1ImageFrame,
          { x: 36, scale: 1.04 },
          {
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: scene1,
              containerAnimation: tween,
              start: 'left center',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Description & manifest stagger
      const s1Items = [s1Desc, s1Manifest, s1Actions].filter(Boolean);
      if (s1Items.length) {
        gsap.fromTo(
          s1Items,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: scene1,
              containerAnimation: tween,
              start: 'left center',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Deliberate exit transition as track scrolls to Scene 02
      if (scene2) {
        gsap.to(scene1, {
          opacity: 0.38,
          scale: 0.985,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: scene2,
            containerAnimation: tween,
            start: 'left 85%',
            end: 'left 25%',
            scrub: true,
          },
        });
      }
    }

    // ------------------------------------------------------------------------
    // SCENE 02: FOOD ORDERING PLATFORM
    // ------------------------------------------------------------------------
    if (scene2) {
      const s2ImageFrame = scene2.querySelector('.scene-visual-monolith .scene-image-frame');
      const s2Image = scene2.querySelector('.scene-visual-monolith .scene-image');
      const s2Title = scene2.querySelector('.scene-title-inner');
      const s2StackedLower = scene2.querySelector('.scene-stacked-lower');

      // Panoramic monolith image expansion
      if (s2ImageFrame) {
        gsap.fromTo(
          s2ImageFrame,
          { scale: 0.94, opacity: 0.85 },
          {
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: scene2,
              containerAnimation: tween,
              start: 'left 90%',
              end: 'left 35%',
              scrub: true,
            },
          }
        );
      }

      // Internal subtle parallax within panoramic frame
      if (s2Image) {
        gsap.fromTo(
          s2Image,
          { xPercent: -5 },
          {
            xPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: scene2,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      }

      // Coordinated reveal of title and lower dual-column manifest
      if (s2Title) {
        gsap.fromTo(
          s2Title,
          { yPercent: 105 },
          {
            yPercent: 0,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: scene2,
              containerAnimation: tween,
              start: 'left 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (s2StackedLower) {
        gsap.fromTo(
          s2StackedLower,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: scene2,
              containerAnimation: tween,
              start: 'left 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Smooth departure as Scene 03 arrives
      if (scene3) {
        gsap.to(scene2, {
          opacity: 0.4,
          scale: 0.985,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: scene3,
            containerAnimation: tween,
            start: 'left 85%',
            end: 'left 25%',
            scrub: true,
          },
        });
      }
    }

    // ------------------------------------------------------------------------
    // SCENE 03: EXPENSE TRACKER
    // ------------------------------------------------------------------------
    if (scene3) {
      const s3Visual = scene3.querySelector('.scene-visual-column');
      const s3Editorial = scene3.querySelector('.scene-editorial-column');
      const s3Title = scene3.querySelector('.scene-title-inner');
      const handoffLine = scene3.querySelector('.handoff-line');
      const handoffWrap = scene3.querySelector('.scene-gallery-handoff');

      // Opposing directions reveal: visual from right, editorial from left
      if (s3Visual) {
        gsap.fromTo(
          s3Visual,
          { x: 44, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: scene3,
              containerAnimation: tween,
              start: 'left 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (s3Editorial) {
        gsap.fromTo(
          s3Editorial,
          { x: -36, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: scene3,
              containerAnimation: tween,
              start: 'left 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (s3Title) {
        gsap.fromTo(
          s3Title,
          { yPercent: 105 },
          {
            yPercent: 0,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: scene3,
              containerAnimation: tween,
              start: 'left 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Draw handoff divider line and reveal indicator
      if (handoffLine) {
        gsap.fromTo(
          handoffLine,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: scene3,
              containerAnimation: tween,
              start: 'left 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (handoffWrap) {
        gsap.fromTo(
          handoffWrap,
          { opacity: 0, x: -14 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: scene3,
              containerAnimation: tween,
              start: 'left 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }

    return () => {
      if (horizontalTriggerInstance) {
        horizontalTriggerInstance.kill();
        horizontalTriggerInstance = null;
      }
      gsap.set(track, { clearProps: 'all' });
      gsap.set(
        document.querySelectorAll(
          '.project-scene, .scene-title-inner, .scene-image-frame, .scene-image, .scene-stacked-lower, .scene-visual-column, .scene-editorial-column, .handoff-line, .scene-gallery-handoff'
        ),
        { clearProps: 'all' }
      );
    };
  });

  // Mobile Fallback (<= 768px): Natural Vertical Sequence
  horizontalMM.add('(max-width: 768px)', () => {
    gsap.set(track, { clearProps: 'all' });

    const scenes = track.querySelectorAll('.project-scene');
    scenes.forEach((scene) => {
      const title = scene.querySelector('.scene-title-inner');
      const img = scene.querySelector('.scene-image-frame');
      const desc = scene.querySelector('.scene-project-description');

      if (title) {
        gsap.fromTo(
          title,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: scene,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (img) {
        gsap.fromTo(
          img,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: scene,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (desc) {
        gsap.fromTo(
          desc,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: scene,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => {
      gsap.set(track, { clearProps: 'all' });
    };
  });
}

/**
 * ============================================================================
 * 4. TECHNICAL EXPERTISE, ABOUT & CONTACT VIEWPORT REVEALS
 * ============================================================================
 */
function initScrollRevealMotion() {
  if (isReducedMotion() || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  // --------------------------------------------------------------------------
  // A. SECTION 4: THE ARCHITECTURAL INDEX (SKILLS)
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
  // B. SECTION 5: ABOUT, EDUCATION & EXPERIENCE
  // --------------------------------------------------------------------------
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const aboutHeader = aboutSection.querySelector('.about-intro-header');
    const portraitFrame = aboutSection.querySelector('.about-portrait-frame');
    const bioBlock = aboutSection.querySelector('.about-bio-block');
    const ledgerSections = aboutSection.querySelectorAll('.about-ledger-section');

    if (aboutHeader) {
      gsap.from(aboutHeader, {
        opacity: 0,
        y: 28,
        duration: 0.95,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: aboutSection,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // On scroll down to next section, glide header upward
      gsap.to(aboutHeader, {
        y: -30,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: aboutSection,
          start: 'bottom 65%',
          end: 'bottom 15%',
          scrub: true,
        },
      });
    }

    // Portrait: clip-path / frame reveal, subtle scroll parallax, corner ticks
    if (portraitFrame) {
      const wrapper = portraitFrame.querySelector('.portrait-image-wrapper');
      const photo = portraitFrame.querySelector('.about-portrait-photo');
      const ticks = portraitFrame.querySelectorAll('.frame-tick-top-left, .frame-tick-bottom-right');
      const caption = portraitFrame.querySelector('.about-portrait-caption');

      const ptl = gsap.timeline({
        scrollTrigger: {
          trigger: portraitFrame,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      if (wrapper) {
        ptl.fromTo(
          wrapper,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85, ease: 'power3.inOut' },
          0
        );
      }

      if (ticks.length) {
        ptl.fromTo(
          ticks,
          { scale: 0 },
          { scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.5)' },
          0.45
        );
      }

      if (caption) {
        ptl.fromTo(
          caption,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          0.55
        );
      }

      // Subtle scroll parallax on photo within frame
      if (photo) {
        gsap.fromTo(
          photo,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: portraitFrame,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }

    // Biography: masked heading and narrative with extended duration & upward scroll exit
    if (bioBlock) {
      const bioHeadingInner = bioBlock.querySelector('.bio-heading-inner');
      const bioText = bioBlock.querySelector('.about-bio-text p');

      const bioTl = gsap.timeline({
        scrollTrigger: {
          trigger: bioBlock,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      if (bioHeadingInner) {
        bioTl.fromTo(
          bioHeadingInner,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: 'power3.out' },
          0
        );

        // When scrolling down to next section (contact), make bio heading glide upward opposite
        gsap.to(bioHeadingInner, {
          yPercent: -100,
          opacity: 0,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: aboutSection,
            start: 'bottom 60%',
            end: 'bottom 15%',
            scrub: true,
          },
        });
      }

      if (bioText) {
        bioTl.fromTo(
          bioText,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out', clearProps: 'opacity,transform' },
          0.16
        );
      }
    }

    // Education & Experience ledgers: divider lines draw, records stagger
    ledgerSections.forEach((sec) => {
      const line = sec.querySelector('.ledger-line');
      const entries = sec.querySelectorAll('.ledger-entry');

      const ltl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: 'top 84%',
          toggleActions: 'play none none none',
        },
      });

      if (line) {
        ltl.fromTo(
          line,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.55, ease: 'power3.out' },
          0
        );
      }

      if (entries.length) {
        ltl.fromTo(
          entries,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
          },
          0.1
        );
      }
    });
  }

  // --------------------------------------------------------------------------
  // C. SECTION 6: CONTACT & FOOTER MONUMENT
  // --------------------------------------------------------------------------
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const contactBadge = contactSection.querySelector('.contact-badge');
    const contactLineInners = contactSection.querySelectorAll('.contact-line-inner');
    const contactSentence = contactSection.querySelector('.contact-supporting-sentence');
    const contactActionCol = contactSection.querySelector('.contact-action-col');

    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: contactSection,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    if (contactBadge) {
      contactTl.from(
        contactBadge,
        { opacity: 0, x: -16, duration: 0.45, ease: 'power2.out', clearProps: 'opacity,transform' },
        0
      );
    }

    // Line-by-line reveal of LET'S BUILD / SOMETHING GOOD.
    if (contactLineInners.length) {
      contactTl.fromTo(
        contactLineInners,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power4.out',
          clearProps: 'transform',
        },
        0.06
      );
    }

    if (contactSentence) {
      contactTl.from(
        contactSentence,
        { opacity: 0, y: 18, duration: 0.65, ease: 'power2.out', clearProps: 'opacity,transform' },
        0.18
      );
    }

    if (contactActionCol) {
      contactTl.from(
        contactActionCol,
        { opacity: 0, y: 22, duration: 0.7, ease: 'power2.out', clearProps: 'opacity,transform' },
        0.22
      );
    }
  }

  // Footer metadata & monumental wordmark
  const footerRow = document.querySelector('.footer-restrained-row');
  if (footerRow) {
    gsap.from(footerRow, {
      opacity: 0,
      y: 16,
      duration: 0.65,
      ease: 'power2.out',
      clearProps: 'opacity,transform',
      scrollTrigger: {
        trigger: '.site-footer',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  }

  const wordmark = document.getElementById('footer-wordmark');
  if (wordmark) {
    gsap.fromTo(
      wordmark,
      { opacity: 0.15, y: 24, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: 'power2.out',
        clearProps: 'opacity,transform,scale',
        scrollTrigger: {
          trigger: '.footer-monument-stage',
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      }
    );
  }
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
