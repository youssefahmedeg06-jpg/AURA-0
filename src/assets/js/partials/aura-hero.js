/**
 * AURA hero: the halo light follows the visitor's pointer.
 * Only for fine pointers (mouse / trackpad) and when reduced motion is not requested.
 * The easing itself is done in CSS (registered --aura-x / --aura-y properties).
 */
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function bind(hero) {
  if (hero.dataset.auraBound) return;
  hero.dataset.auraBound = '1';

  let frame = null;
  hero.addEventListener('pointermove', (event) => {
    if (!finePointer.matches || reducedMotion.matches) return;
    const box = hero.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * 100;
    const y = ((event.clientY - box.top) / box.height) * 100;
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      hero.style.setProperty('--aura-x', `${x.toFixed(1)}%`);
      hero.style.setProperty('--aura-y', `${y.toFixed(1)}%`);
    });
  });

  hero.addEventListener('pointerleave', () => {
    hero.style.removeProperty('--aura-x');
    hero.style.removeProperty('--aura-y');
  });
}

export default function initAuraHero() {
  document.querySelectorAll('[data-aura-hero]').forEach(bind);
}
