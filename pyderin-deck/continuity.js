/* Small scroll accents; no additional pinned scenes or scroll interception. */
(function () {
  'use strict';
  const deck = document.getElementById('deck');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const accents = ['s6', 's8', 's10', 's12'].map(id => document.getElementById(id));
  const steps = Array.from(document.querySelectorAll('#s5 .p-step'));
  let frame = 0;
  function paint() {
    frame = 0;
    const height = deck.clientHeight;
    accents.forEach(section => {
      const box = section.getBoundingClientRect();
      if (box.bottom < 0 || box.top > height) return;
      const progress = Math.max(-1, Math.min(1, (height / 2 - (box.top + box.height / 2)) / height));
      section.style.setProperty('--drift', `${preference.matches ? 0 : progress * 34}px`);
    });
    let closest = null;
    let distance = Infinity;
    steps.forEach(step => {
      const box = step.getBoundingClientRect();
      const current = Math.abs(box.top + box.height / 2 - height * .5);
      if (current < distance) { closest = step; distance = current; }
    });
    steps.forEach(step => step.classList.toggle('is-current', step === closest));
  }
  function queue() { if (!frame) frame = requestAnimationFrame(paint); }
  deck.addEventListener('scroll', queue, { passive:true });
  window.addEventListener('resize', queue);
  preference.addEventListener('change', () => {
    if (preference.matches) accents.forEach(section => section.style.setProperty('--drift','0px'));
    queue();
  });
  paint();
})();
