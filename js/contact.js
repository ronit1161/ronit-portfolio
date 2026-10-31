/**
 * ============================================================================
 * RONIT TAMBE — CONTACT & MONUMENTAL CONCLUSION (AWWWARDS EDITORIAL)
 * Typography: Anton (Display / Headlines / Wordmark) + Instrument Sans
 * Palette: Dark #0B0B0C · Off-white #EFEDE8 · Cobalt Blue #4D5BFF
 * ============================================================================
 */

function initContactSection() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  var contactSec = document.getElementById('contact');
  if (!contactSec) return;

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Live Pune Clock (formatted with Intl.DateTimeFormat in Asia/Kolkata)
  var clockEl = document.getElementById('clock');
  if (clockEl) {
    try {
      var fmt = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata'
      });
      var tick = function() {
        clockEl.textContent = 'PUNE · ' + fmt.format(new Date()) + ' IST';
      };
      tick();
      setInterval(tick, 20000);
    } catch (e) {
      clockEl.textContent = 'PUNE · IST';
    }
  }

  // 2. Direct copy-to-clipboard functionality with feedback & fallback
  var copyBtn = document.getElementById('copy');
  var addr = 'ronittambe116@gmail.com';
  if (copyBtn) {
    copyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      function done(ok) {
        copyBtn.textContent = ok ? 'Copied ✓' : 'Press Ctrl+C on email';
        setTimeout(function() {
          copyBtn.textContent = 'Copy email ⎘';
        }, 1800);
      }
      function fallback() {
        try {
          var t = document.createElement('textarea');
          t.value = addr;
          t.style.cssText = 'position:fixed;opacity:0';
          document.body.appendChild(t);
          t.select();
          var ok = document.execCommand('copy');
          t.remove();
          done(ok);
        } catch (err) {
          done(false);
        }
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(addr).then(function() { done(true); }, fallback);
      } else {
        fallback();
      }
    });
  }

  // 3. Back to top smooth scroll
  var topBtn = document.getElementById('top');
  if (topBtn) {
    topBtn.addEventListener('click', function(e) {
      e.preventDefault();
      var lenis = window._lenis;
      if (lenis && !reduce) {
        if (lenis.isStopped) lenis.start();
        lenis.scrollTo(0, { duration: 1.6 });
      } else {
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      }
    });
  }

  if (reduce) return; // Exit animations for prefers-reduced-motion

  // 4. Scene 1 — Heading lines masked reveal & opposing drift
  gsap.fromTo('#contact .h-xl .in',
    { yPercent: 112, skewY: 7 },
    {
      yPercent: 0,
      skewY: 0,
      stagger: 0.14,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: { trigger: '#contact .h-xl', start: 'top 85%' }
    }
  );

  // Dynamic scrubbed fill on "good."
  gsap.fromTo('#contact .gd .f',
    { clipPath: 'inset(100% 0 0 0)' },
    {
      clipPath: 'inset(0% 0 0 0)',
      ease: 'none',
      scrollTrigger: {
        trigger: '#contact .h-xl',
        start: 'top 35%',
        end: 'bottom 50%',
        scrub: true
      }
    }
  );

  // Subtle opposing scroll drift on heading lines 1 and 3
  gsap.to('#contact .h-xl .ln:nth-child(1)', {
    xPercent: -6,
    ease: 'none',
    scrollTrigger: { trigger: '#contact .h-xl', start: 'top 60%', end: 'bottom top', scrub: true }
  });

  gsap.to('#contact .h-xl .ln:nth-child(3)', {
    xPercent: 6,
    ease: 'none',
    scrollTrigger: { trigger: '#contact .h-xl', start: 'top 60%', end: 'bottom top', scrub: true }
  });

  // Supporting statement reveal
  gsap.fromTo('#contact .intro',
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#contact .intro', start: 'top 88%' }
    }
  );

  // 5. Scene 2 — Email row hairline & elements
  var mt = gsap.timeline({
    scrollTrigger: { trigger: '#contact .mailrow', start: 'top 80%' }
  });
  mt.fromTo('#contact .mailrow > i',
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: 'expo.out' }
    )
    .fromTo('#contact .mail .b',
      { yPercent: 60, opacity: 0 },
      { yPercent: 0, opacity: 0.5, duration: 1, ease: 'power3.out' },
      '<0.2'
    )
    .fromTo('#contact .acts, #contact .send',
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out' },
      '<0.3'
    );

  // 6. Magnetic button physics (hover & pointer:fine only)
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    contactSec.querySelectorAll('.mag').forEach(function(el) {
      var qx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
      var qy = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
      el.addEventListener('pointermove', function(e) {
        var r = el.getBoundingClientRect();
        qx((e.clientX - r.left - r.width / 2) * 0.35);
        qy((e.clientY - r.top - r.height / 2) * 0.35);
      });
      el.addEventListener('pointerleave', function() {
        qx(0);
        qy(0);
      });
    });
  }

  // 7. Scene 3 — Network links & monumental scrubbed wordmark
  gsap.fromTo('#contact .net > *',
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#contact .net', start: 'top 90%' }
    }
  );

  gsap.fromTo('#contact .wm .ch',
    { yPercent: 105 },
    {
      yPercent: 0,
      stagger: 0.08,
      ease: 'none',
      scrollTrigger: {
        trigger: '#contact .wm',
        start: 'top 105%',
        end: 'bottom 85%',
        scrub: true
      }
    }
  );

  gsap.fromTo('#contact .wm sup',
    { opacity: 0 },
    {
      opacity: 0.8,
      duration: 0.6,
      scrollTrigger: { trigger: '#contact .wm', start: 'top 60%', toggleActions: 'play none none reverse' }
    }
  );

  // Footer metadata entrance
  gsap.fromTo('#contact .foot',
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: '#contact .foot', start: 'top 95%' }
    }
  );

  window.addEventListener('load', function() { ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function() { ScrollTrigger.refresh(); });
  }
}

// Export for main.js lifecycle
window.initContactSection = initContactSection;
