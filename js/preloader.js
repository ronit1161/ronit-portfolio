/**
 * ============================================================================
 * RONIT TAMBE — EDITORIAL LANDING LOADER ENGINE (SCENE 0)
 * Exact choreography adapted from Ronit — Landing Loader demo:
 *  - 4 giant corner Aeonik Black typographic anchors (HELLO, / I'M RONIT® / LET'S BUILD / 000)
 *  - Smooth 000 → 100 easeInOutQuad counter (2900ms)
 *  - Centered pill photo FLIP-morphing directly into .seb-portrait-image-wrapper
 *  - Seamless character-split masked wave into live Hero typography & metadata bar
 * ============================================================================
 */

function initLandingLoader(onComplete) {
  const html = document.documentElement;
  const loader = document.getElementById('landing-loader');
  const hero = document.getElementById('hero');

  const isReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(window.location.search);
  const shouldSkip = params.has('skip_intro') || params.has('scroll') || params.has('goto');

  if (!loader || !hero || isReducedMotion || shouldSkip || !html.classList.contains('loader-active')) {
    html.classList.remove('loader-active', 'loader-hero-primed');
    if (loader) loader.style.display = 'none';
    if (typeof onComplete === 'function') onComplete(false);
    return false;
  }

  // Keep viewport pinned to top and pause Lenis while loader runs
  window.scrollTo(0, 0);
  if (window._lenis) {
    window._lenis.stop();
  }

  const ldPhoto = document.getElementById('ld-photo');
  const ldPhotoImg = document.getElementById('ld-photo-img');
  const ldNum = document.getElementById('ld-num');
  const ldCorners = Array.from(loader.querySelectorAll('.ld-big'));
  const ldCornerTexts = Array.from(loader.querySelectorAll('.ld-big:not(#ld-cnt)'));

  const heroRows = Array.from(hero.querySelectorAll('.seb-typo-row'));
  const yearStamp = hero.querySelector('.seb-year-stamp');
  const talkCta = hero.querySelector('.seb-talk-cta');
  const adjacentLinks = hero.querySelector('.seb-adjacent-links');
  const portraitCard = hero.querySelector('.seb-portrait-card');
  const portraitImgWrap = hero.querySelector('.seb-portrait-image-wrapper');
  const portraitMeta = hero.querySelector('.seb-portrait-meta');

  if (!ldPhoto || !ldPhotoImg || !ldNum || !portraitImgWrap) {
    html.classList.remove('loader-active', 'loader-hero-primed');
    loader.style.display = 'none';
    if (window._lenis) window._lenis.start();
    if (typeof onComplete === 'function') onComplete(false);
    return false;
  }

  // Utility: Split all descendant text nodes inside `root` into .ld-w > .ld-c masked chars
  function splitTextNodes(root, counter) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (
          parent.closest('.seb-micro-tag') ||
          parent.closest('.seb-avatar-sticker') ||
          parent.closest('.ld-w')
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const textNodes = [];
    let current;
    while ((current = walker.nextNode())) {
      textNodes.push(current);
    }

    textNodes.forEach((node) => {
      const text = node.nodeValue.replace(/\s+/g, ' ');
      const trimmed = text.trim();
      if (!trimmed) return;

      const frag = document.createDocumentFragment();
      const leadingSpace = /^\s/.test(text);
      const trailingSpace = /\s$/.test(text);

      if (leadingSpace && node.previousSibling) {
        frag.appendChild(document.createTextNode(' '));
      }

      trimmed.split(/(\s+)/).forEach((token) => {
        if (!token) return;
        if (/^\s+$/.test(token)) {
          frag.appendChild(document.createTextNode(' '));
          return;
        }
        const wordSpan = document.createElement('span');
        wordSpan.className = 'ld-w';
        for (const ch of token) {
          const charSpan = document.createElement('span');
          charSpan.className = 'ld-c';
          charSpan.textContent = ch;
          charSpan.style.setProperty('--i', counter.i++);
          wordSpan.appendChild(charSpan);
        }
        frag.appendChild(wordSpan);
      });

      if (trailingSpace && node.nextSibling) {
        frag.appendChild(document.createTextNode(' '));
      }

      node.parentNode.replaceChild(frag, node);
    });
  }

  // Utility: Unwrap all .ld-w spans inside #hero back to pristine text nodes
  function unwrapHeroText() {
    const wrappers = Array.from(hero.querySelectorAll('.ld-w'));
    wrappers.forEach((w) => {
      const parent = w.parentNode;
      if (!parent) return;
      parent.replaceChild(document.createTextNode(w.textContent || ''), w);
      parent.normalize();
    });
  }

  // 1. Split corner words inside #landing-loader
  ldCornerTexts.forEach((el) => {
    splitTextNodes(el, { i: 0 });
  });

  // 2. Split live Hero elements so they reveal seamlessly in-place
  heroRows.forEach((row) => {
    row.classList.add('ld-rv');
    const displayLine = row.querySelector('.seb-display-line');
    if (displayLine) {
      splitTextNodes(displayLine, { i: 0 });
    }
  });

  if (yearStamp) {
    yearStamp.classList.add('ld-rv');
    splitTextNodes(yearStamp, { i: 0 });
  }

  if (talkCta) {
    talkCta.classList.add('ld-rv');
    splitTextNodes(talkCta, { i: 0 });
  }

  // Force reflow before priming so initial translateY(112%) states commit without transitioning
  void document.body.offsetWidth;
  html.classList.add('loader-hero-primed');

  // State tracking for timers, animations, and cleanup
  const timers = [];
  const animations = [];
  let countRaf = null;
  let morphStarted = false;
  let isFinished = false;

  function at(ms, fn) {
    timers.push(setTimeout(fn, ms));
  }

  function computeMorphMetrics() {
    const r = portraitImgWrap.getBoundingClientRect();
    ldPhoto.style.left = r.left + 'px';
    ldPhoto.style.top = r.top + 'px';
    ldPhoto.style.width = r.width + 'px';
    ldPhoto.style.height = r.height + 'px';

    const sw = Math.max(140, window.innerWidth * 0.12);
    const s = r.width > 0 ? sw / r.width : 0.3;
    const tx = window.innerWidth / 2 - sw / 2 - r.left;
    const ty = window.innerHeight / 2 - (r.height * s) / 2 - r.top;
    const radius = Math.round(Math.min(r.width, r.height) / 2);

    return {
      t0: `translate(${tx}px, ${ty}px) scale(${s})`,
      c0: `inset(0 round ${radius}px)`,
    };
  }

  function applyCenteredPhoto() {
    if (morphStarted || isFinished) return;
    const { t0, c0 } = computeMorphMetrics();
    ldPhoto.style.transform = t0;
    ldPhoto.style.clipPath = c0;
  }

  function runCounter() {
    const start = performance.now();
    const duration = 2900;
    function frame(now) {
      if (isFinished) return;
      const p = Math.min((now - start) / duration, 1);
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      ldNum.textContent = String(Math.round(eased * 100)).padStart(3, '0');
      if (p < 1) {
        countRaf = requestAnimationFrame(frame);
      }
    }
    countRaf = requestAnimationFrame(frame);
  }

  function finishLoader() {
    if (isFinished) return;
    isFinished = true;

    timers.forEach(clearTimeout);
    if (countRaf) cancelAnimationFrame(countRaf);
    animations.forEach((a) => {
      try {
        a.cancel();
      } catch (e) {}
    });

    window.removeEventListener('resize', applyCenteredPhoto);
    document.removeEventListener('keydown', onKeyDown);

    // Restore pristine Hero DOM
    unwrapHeroText();
    heroRows.forEach((row) => row.classList.remove('ld-rv', 'ld-show'));
    if (yearStamp) yearStamp.classList.remove('ld-rv', 'ld-show');
    if (talkCta) talkCta.classList.remove('ld-rv', 'ld-show');
    if (adjacentLinks) adjacentLinks.classList.remove('ld-show');
    if (portraitImgWrap) portraitImgWrap.classList.remove('ld-img-show');
    if (portraitMeta) portraitMeta.classList.remove('ld-cap-show');

    // Remove loader lock and hide overlay
    html.classList.remove('loader-active', 'loader-hero-primed');
    loader.style.display = 'none';

    // Resume Lenis smooth scrolling & recalibrate ScrollTrigger
    if (window._lenis) {
      window._lenis.start();
    }
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }

    if (typeof onComplete === 'function') {
      onComplete(true);
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      finishLoader();
    }
  }

  window.addEventListener('resize', applyCenteredPhoto);
  document.addEventListener('keydown', onKeyDown);

  function startSequence() {
    if (isFinished) return;

    // Ensure Lenis stays paused if initialized asynchronously
    if (window._lenis) {
      window._lenis.stop();
    }

    // Place centered pill photo before fading in
    applyCenteredPhoto();
    void ldPhoto.offsetWidth;

    // t = 100ms: Centered circular/pill portrait fades in
    at(100, () => {
      ldPhoto.style.opacity = '1';
    });

    // t = 300ms: Top-left "HELLO," + bottom-right "000" reveal & counter begins
    at(300, () => {
      const tl = loader.querySelector('.ld-tl');
      const cnt = document.getElementById('ld-cnt');
      if (tl) tl.classList.add('ld-show');
      if (cnt) cnt.classList.add('ld-show');
      runCounter();
    });

    // t = 1100ms: Top-right "I’M RONIT®" reveals
    at(1100, () => {
      const tr = loader.querySelector('.ld-tr');
      if (tr) tr.classList.add('ld-show');
    });

    // t = 1900ms: Bottom-left "LET’S BUILD" reveals
    at(1900, () => {
      const bl = loader.querySelector('.ld-bl');
      if (bl) bl.classList.add('ld-show');
    });

    // t = 3400ms: All 4 corner blocks exit upward out of their masks
    at(3400, () => {
      ldCorners.forEach((el) => el.classList.add('ld-out'));
    });

    // t = 3600ms: Centered pill photo FLIP-morphs cleanly into docked portrait frame
    at(3600, () => {
      morphStarted = true;
      const { t0, c0 } = computeMorphMetrics();
      const opts = {
        duration: 1400,
        easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
        fill: 'forwards',
      };

      const revealLivePortrait = () => {
        if (isFinished) return;
        portraitImgWrap.classList.add('ld-img-show');
        requestAnimationFrame(() => {
          ldPhoto.style.display = 'none';
        });
      };

      if (typeof ldPhoto.animate === 'function') {
        const photoAnim = ldPhoto.animate(
          [
            { transform: t0, clipPath: c0 },
            { transform: 'translate(0px, 0px) scale(1)', clipPath: 'inset(0 round 0px)' },
          ],
          opts
        );
        const imgAnim = ldPhotoImg.animate(
          [{ transform: 'scale(1.4)' }, { transform: 'scale(1)' }],
          opts
        );
        animations.push(photoAnim, imgAnim);
        photoAnim.onfinish = revealLivePortrait;
      } else {
        ldPhoto.style.transition =
          'transform 1.4s cubic-bezier(0.76, 0, 0.24, 1), clip-path 1.4s cubic-bezier(0.76, 0, 0.24, 1)';
        ldPhotoImg.style.transition = 'transform 1.4s cubic-bezier(0.76, 0, 0.24, 1)';
        ldPhoto.style.transform = 'translate(0px, 0px) scale(1)';
        ldPhoto.style.clipPath = 'inset(0 round 0px)';
        ldPhotoImg.style.transform = 'scale(1)';
        at(1420, revealLivePortrait);
      }
    });

    // t = 4300ms: Live Hero 5 rows cascade in sequentially (130ms apart)
    at(4300, () => {
      heroRows.forEach((row, index) => {
        at(index * 130, () => {
          row.classList.add('ld-show');
        });
      });
    });

    // t = 4800ms: "RONIT®—’25" reveals
    at(4800, () => {
      if (yearStamp) yearStamp.classList.add('ld-show');
    });

    // t = 5000ms: Slide up portrait meta bar + reveal CTA & adjacent links
    at(5000, () => {
      if (portraitMeta) portraitMeta.classList.add('ld-cap-show');
      if (talkCta) talkCta.classList.add('ld-show');
      if (adjacentLinks) adjacentLinks.classList.add('ld-show');
    });

    // t = 6100ms: Final cleanup after meta bar (900ms) and CTA char stagger finish
    at(6100, () => {
      finishLoader();
    });
  }

  // Wait for Aeonik fonts + portrait image readiness (with 1200ms safety timeout)
  const fontsReady =
    document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();

  const imgReady = ldPhotoImg.complete
    ? Promise.resolve()
    : new Promise((resolve) => {
        ldPhotoImg.addEventListener('load', resolve, { once: true });
        ldPhotoImg.addEventListener('error', resolve, { once: true });
      });

  const safetyCap = new Promise((resolve) => setTimeout(resolve, 1200));

  Promise.race([Promise.all([fontsReady, imgReady]), safetyCap]).then(() => {
    requestAnimationFrame(startSequence);
  });

  return true;
}

window.initLandingLoader = initLandingLoader;
