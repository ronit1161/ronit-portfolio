/**
 * ============================================================================
 * PRECISION RETICLE CURSOR ENGINE
 * Aesthetic: Minimal Inverted Stencil Reticle for Fine Pointers
 * ============================================================================
 */

function initPrecisionCursor() {
  const stencil = document.getElementById('cursor-stencil');
  const dot = document.getElementById('cursor-stencil-dot');

  if (!stencil || !dot) return;

  // Check reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    stencil.style.display = 'none';
    dot.style.display = 'none';
    return;
  }

  // Check if fine pointer (desktop mouse)
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) {
    stencil.style.display = 'none';
    dot.style.display = 'none';
    return;
  }

  document.body.classList.add('has-custom-cursor');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let isVisible = false;

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      stencil.style.opacity = '1';
      dot.style.opacity = '1';
    }

    // Direct dot positioning (0 lag)
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  }, { passive: true });

  // Smooth lerp follow for the outer reticle ring
  function renderCursor() {
    if (isVisible) {
      currentX += (mouseX - currentX) * 0.22;
      currentY += (mouseY - currentY) * 0.22;
      stencil.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Mouse leave / enter window
  document.addEventListener('mouseleave', () => {
    isVisible = false;
    stencil.style.opacity = '0';
    dot.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
    stencil.style.opacity = '1';
    dot.style.opacity = '1';
  });

  // Interactive Hover Expansion
  const interactiveSelector =
    'a, button, input, [role="button"], [tabindex="0"], .scene-image-frame, .domain-column, .about-portrait-frame, .email-display-wrap';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      stencil.classList.add('is-hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      stencil.classList.remove('is-hovering');
    }
  });
}
