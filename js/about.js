/**
 * ============================================================================
 * RONIT TAMBE — ABOUT SECTION (AWWWARDS EDITORIAL & PINNED STORYTELLING)
 * Exact Animation Engine from Claude Artifact Design
 * ============================================================================
 */

function initAboutTypoSection() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  var root = document.documentElement;
  var aboutSec = document.getElementById('about');
  if (!aboutSec) return;

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return; // static, fully readable layout

  // Smooth scroll (Lenis) synced with ScrollTrigger
  var lenis = window._lenis;
  if (!lenis && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.1 });
    window._lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function(t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // Hook anchor clicks to Lenis scrollTo
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var href = a.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      if (typeof window.closeMobileMenu === 'function') {
        window.closeMobileMenu();
      }
      if (lenis) {
        if (lenis.isStopped) lenis.start();
        lenis.scrollTo(target, { offset: -64, force: true });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Mobile menu pause/resume
  var menuOverlay = document.getElementById('mobile-nav-overlay');
  if (menuOverlay && lenis) {
    var observer = new MutationObserver(function() {
      if (menuOverlay.classList.contains('is-open')) lenis.stop();
      else lenis.start();
    });
    observer.observe(menuOverlay, { attributes: true, attributeFilter: ['class'] });
  }

  // Custom cursor hover over portrait
  var stencil = document.getElementById('cursor-stencil');
  var portraitFrame = aboutSec.querySelector('.pw');
  if (stencil && portraitFrame) {
    portraitFrame.addEventListener('mouseenter', function() { stencil.classList.add('cursor--portrait'); });
    portraitFrame.addEventListener('mouseleave', function() { stencil.classList.remove('cursor--portrait'); });
  }

  // split headings into masked characters
  function chars(h) {
    if (!h) return [];
    if (h.dataset.charsSplit) return h.querySelectorAll('.ch');
    h.dataset.charsSplit = 'true';
    h.querySelectorAll('.ln').forEach(function(l) {
      var t = l.textContent;
      l.textContent = '';
      l.setAttribute('aria-hidden', 'true');
      [].forEach.call(t, function(c) {
        var s = document.createElement('span');
        s.className = 'ch';
        s.textContent = c === ' ' ? '\u00A0' : c;
        l.appendChild(s);
      });
    });
    return h.querySelectorAll('.ch');
  }

  // split paragraph into words (keeps <b> highlights)
  function words(el) {
    if (!el) return [];
    if (el.dataset.wordsWrapped) return el.querySelectorAll('.about-word');
    el.dataset.wordsWrapped = 'true';
    var out = [];
    (function walk(n) {
      [].slice.call(n.childNodes).forEach(function(c) {
        if (c.nodeType === 3) {
          var f = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function(t) {
            if (!t) return;
            if (/^\s+$/.test(t)) {
              f.appendChild(document.createTextNode(t));
              return;
            }
            var s = document.createElement('span');
            s.className = 'about-word';
            s.textContent = t;
            f.appendChild(s);
            out.push(s);
          });
          c.replaceWith(f);
        } else if (c.nodeType === 1) {
          walk(c);
        }
      });
    })(el);
    return out;
  }

  // Scene 1 — giant heading, masked char reveal + opposite drift
  var c1 = chars(aboutSec.querySelector('.h-xl'));
  gsap.fromTo(c1,
    { yPercent: 115, rotate: 6 },
    {
      yPercent: 0,
      rotate: 0,
      stagger: 0.03,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: { trigger: '#about .s1', start: 'top 70%' }
    }
  );
  gsap.fromTo('#about .s1 .lab i',
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: { trigger: '#about .s1', start: 'top 80%' }
    }
  );
  gsap.fromTo('#about .sub',
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#about .s1', start: 'top 70%' }
    }
  );
  ['-9', '9'].forEach(function(x, i) {
    gsap.to('#about .h-xl .ln:nth-child(' + (i + 1) + ')', {
      xPercent: +x,
      ease: 'none',
      scrollTrigger: { trigger: '#about .s1', start: 'top 60%', end: 'bottom top', scrub: true }
    });
  });

  // Scene 2 — portrait mask, heading, scrubbed word fill, rotating badge
  gsap.fromTo('#about .pic',
    { clipPath: 'inset(100% 0 0 0)' },
    { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'expo.inOut', scrollTrigger: { trigger: '#about .s2', start: 'top 70%' } }
  );
  gsap.fromTo('#about .ph-img',
    { scale: 1.4 },
    { scale: 1, ease: 'none', scrollTrigger: { trigger: '#about .s2', start: 'top 85%', end: 'top 20%', scrub: true } }
  );
  gsap.fromTo(chars(aboutSec.querySelector('.h3')),
    { yPercent: 115, rotate: 5 },
    {
      yPercent: 0,
      rotate: 0,
      stagger: 0.02,
      duration: 1.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: '#about .h3', start: 'top 85%' }
    }
  );

  var bioEl = aboutSec.querySelector('.bio');
  var w = words(bioEl);
  gsap.set(w, { opacity: 0.15 });
  var bt = gsap.timeline({
    scrollTrigger: { trigger: '#about .bio', start: 'top 80%', end: 'bottom 45%', scrub: true }
  });
  bt.to(w, { opacity: 1, stagger: 0.1, ease: 'none' });
  bt.fromTo('#about .bio b',
    { backgroundSize: '0% 3px' },
    { backgroundSize: '100% 3px', stagger: 0.3, ease: 'none' },
    '>-0.6'
  );

  gsap.to('#about .badge', {
    rotation: 360,
    ease: 'none',
    scrollTrigger: { trigger: '#about .s2', start: 'top bottom', end: 'bottom top', scrub: true }
  });

  // Scene 3 — pinned chapters (desktop) / simple reveals (mobile)
  }

window.initAboutTypoSection = initAboutTypoSection;
