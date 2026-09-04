/**
 * ============================================================================
 * 8. SECTION 03: INTERACTIVE DRAGGABLE & FLICKABLE CONTINUOUS MARQUEE
 * Powered by GSAP Ticker & Kinetic Throw Physics
 * Features:
 * - Dual-track opposing continuous infinite loops (Track 1 Left, Track 2 Right)
 * - 1:1 Mouse drag and Touch swipe grab interaction
 * - Velocity-based flick/throw momentum physics with realistic inertial decay
 * - Modulo-based gapless wrapping for 100% infinite continuous scrolling
 * ============================================================================
 */
function initInteractiveMarquee() {
  const rows = document.querySelectorAll('.marquee-row-wrapper');
  if (!rows.length || typeof gsap === 'undefined' || isReducedMotion()) return;

  rows.forEach((wrapper, index) => {
    const track = wrapper.querySelector('.marquee-track');
    if (!track) return;

    // Track 1 (top): flows left (negative), Track 2 (bottom): flows right (positive)
    const baseSpeed = index === 0 ? -1.1 : 0.95;
    let currentX = 0;
    let momentum = 0;
    let isDragging = false;
    let isHovered = false;
    let startPointerX = 0;
    let startTrackX = 0;
    let lastPointerX = 0;
    let lastTime = 0;
    let velocityHistory = [];

    // Measure half width (width of single set of cards) for gapless wrapping
    let halfWidth = track.scrollWidth / 2;
    const updateDimensions = () => {
      halfWidth = track.scrollWidth / 2;
    };
    window.addEventListener('resize', updateDimensions);

    // Initial setup check
    setTimeout(updateDimensions, 100);

    // GSAP Ticker frame loop (synced with Lenis & display refresh rate)
    const onTick = () => {
      if (isDragging) return;

      // Inertial momentum decay
      if (Math.abs(momentum) > 0.05) {
        currentX += momentum;
        momentum *= 0.94; // Realistic air/friction deceleration
      } else {
        momentum = 0;
        // If hovered without dragging, slow down to 35% speed for effortless card reading
        const activeSpeed = isHovered ? baseSpeed * 0.35 : baseSpeed;
        currentX += activeSpeed;
      }

      // Modulo wrap around halfWidth
      if (halfWidth > 0) {
        while (currentX <= -halfWidth) currentX += halfWidth;
        while (currentX > 0) currentX -= halfWidth;
      }

      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
    };

    gsap.ticker.add(onTick);

    // Hover slowdown
    wrapper.addEventListener('mouseenter', () => {
      isHovered = true;
    });
    wrapper.addEventListener('mouseleave', () => {
      isHovered = false;
    });

    // Pointer Drag Start
    const onPointerDown = (clientX) => {
      isDragging = true;
      wrapper.classList.add('is-dragging');
      startPointerX = clientX;
      startTrackX = currentX;
      lastPointerX = clientX;
      lastTime = performance.now();
      velocityHistory = [];
      momentum = 0;
    };

    // Pointer Drag Move
    const onPointerMove = (clientX) => {
      if (!isDragging) return;
      const deltaX = clientX - startPointerX;
      currentX = startTrackX + deltaX;

      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 0) {
        const vx = ((clientX - lastPointerX) / dt) * 16.67; // Normalized to 60fps
        velocityHistory.push(vx);
        if (velocityHistory.length > 5) velocityHistory.shift();
      }
      lastPointerX = clientX;
      lastTime = now;

      if (halfWidth > 0) {
        while (currentX <= -halfWidth) {
          currentX += halfWidth;
          startTrackX += halfWidth;
        }
        while (currentX > 0) {
          currentX -= halfWidth;
          startTrackX -= halfWidth;
        }
      }

      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
    };

    // Pointer Drag End (Flick / Throw momentum)
    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      wrapper.classList.remove('is-dragging');

      if (velocityHistory.length > 0) {
        const avgVx = velocityHistory.reduce((a, b) => a + b, 0) / velocityHistory.length;
        // Cap max velocity to maintain controlled, elegant motion
        momentum = Math.max(-28, Math.min(28, avgVx));
      }
    };

    // Mouse Drag Listeners
    wrapper.addEventListener('mousedown', (e) => {
      // Allow dragging from any card or empty area in the row
      e.preventDefault();
      onPointerDown(e.clientX);

      const onMouseMove = (ev) => onPointerMove(ev.clientX);
      const onMouseUp = () => {
        onPointerUp();
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });

    // Touch Drag Listeners (Mobile & Tablet)
    wrapper.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX);
      }
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && isDragging) {
        onPointerMove(e.touches[0].clientX);
      }
    }, { passive: true });

    wrapper.addEventListener('touchend', () => {
      onPointerUp();
    });

    wrapper.addEventListener('touchcancel', () => {
      onPointerUp();
    });
  });
}
