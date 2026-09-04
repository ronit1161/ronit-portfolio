/**
 * ============================================================================
 * 9. FLUID INVERSION / DIFFERENCE STENCIL CURSOR ENGINE
 * Smooth inertial following, velocity-based jelly stretch & difference inversion
 * ============================================================================
 */
function initFluidDifferenceCursor() {
  const stencil = document.getElementById('cursor-stencil');
  const dot = document.getElementById('cursor-stencil-dot');

  if (!stencil || !dot || isReducedMotion()) return;

  // Check if fine pointer (desktop mouse)
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  document.body.classList.add('has-custom-cursor');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let isHovering = false;
  let isPressed = false;
  let isVisible = false;

  const setDotX = gsap.quickSetter(dot, 'x', 'px');
  const setDotY = gsap.quickSetter(dot, 'y', 'px');

  // Mouse movement listener
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      gsap.to([stencil, dot], { opacity: 1, duration: 0.3, ease: 'power2.out' });
    }

    setDotX(mouseX);
    setDotY(mouseY);
  });

  // Mouse leave / enter window
  document.addEventListener('mouseleave', () => {
    isVisible = false;
    gsap.to([stencil, dot], { opacity: 0, duration: 0.25 });
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
    gsap.to([stencil, dot], { opacity: 1, duration: 0.25 });
  });

  // Mouse Down / Up click compression
  window.addEventListener('mousedown', () => {
    isPressed = true;
  });

  window.addEventListener('mouseup', () => {
    isPressed = false;
  });

  // 60FPS Fluid Ticker Loop (Lerp + Velocity Jelly Stretch)
  gsap.ticker.add(() => {
    if (!isVisible) return;

    // Smooth Lerp
    const lerpFactor = 0.18;
    currentX += (mouseX - currentX) * lerpFactor;
    currentY += (mouseY - currentY) * lerpFactor;

    // Velocity vector calculation
    const vx = mouseX - currentX;
    const vy = mouseY - currentY;
    const speed = Math.hypot(vx, vy);
    const angle = Math.atan2(vy, vx) * (180 / Math.PI);

    // Dynamic jelly stretch calculation along movement direction
    const stretch = Math.min(speed * 0.0075, 0.65);
    const baseScale = isPressed ? 0.75 : isHovering ? 2.3 : 1.0;
    const scaleX = baseScale * (1 + stretch);
    const scaleY = baseScale * (1 - stretch * 0.45);

    gsap.set(stencil, {
      x: currentX,
      y: currentY,
      rotation: angle,
      scaleX: scaleX,
      scaleY: scaleY,
    });
  });

  // Attach hover listeners to all interactive elements
  const interactiveSelectors = [
    'a',
    'button',
    '.nav-link',
    '.action-editorial-btn',
    '.action-editorial-link',
    '.project-image-clipper',
    '.marquee-row-wrapper',
    '.hero-character-card',
    '.profile-portrait-frame',
    '.profile-spec-row',
    '.tech-pill',
  ];

  document.querySelectorAll(interactiveSelectors.join(',')).forEach((el) => {
    el.addEventListener('mouseenter', () => {
      isHovering = true;
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.out' });
    });

    el.addEventListener('mouseleave', () => {
      isHovering = false;
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2, ease: 'power2.out' });
    });
  });
}
