/* A native-scroll opening. All information remains in the original sections. */
(function () {
  'use strict';
  const root = document.documentElement;
  const deck = document.getElementById('deck');
  const header = document.getElementById('topFrame');
  const intro = document.getElementById('s2');
  const proof = document.getElementById('s3');
  const scenes = [intro, proof];
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = false;
  let initialized = false;
  let frame = 0;
  let renderedSignature = '';
  let headerHeight = header.offsetHeight;
  const clamp = value => Math.max(0, Math.min(1, value));
  const smooth = (start, end, value) => {
    const p = clamp((value - start) / (end - start));
    return p * p * (3 - 2 * p);
  };
  function progress(section) {
    const stage = section.querySelector('.p-scroll-stage');
    return clamp((headerHeight - section.getBoundingClientRect().top) / Math.max(1, section.offsetHeight - stage.offsetHeight));
  }
  function write(section, values) {
    const stage = section.querySelector('.p-scroll-stage');
    Object.entries(values).forEach(([key, value]) => stage.style.setProperty(key, String(value)));
  }
  function paint() {
    frame = 0;
    if (!enabled) return;
    const mobile = deck.clientWidth <= 700;
    const p = progress(intro);
    const q = progress(proof);
    const signature = `${mobile}-${deck.clientWidth}-${Math.round(p * 10000)}-${Math.round(q * 10000)}`;
    if (signature === renderedSignature) return;
    renderedSignature = signature;
    const settle = smooth(.04, .78, p);
    const copy = smooth(.12, .44, p);
    const companions = smooth(.27, .7, p);
    const facts = smooth(.48, .86, p);
    write(intro, {
      '--intro-copy-opacity': copy,
      '--intro-copy-y': `${(1 - copy) * 30}px`,
      '--intro-art-x': `${mobile ? 0 : -(1 - settle) * Math.min(deck.clientWidth * .19, 300)}px`,
      '--intro-art-y': `${(1 - settle) * (mobile ? -12 : 20)}px`,
      '--intro-art-scale': 1 + (1 - settle) * (mobile ? .55 : .5),
      '--intro-cream-x': `${(1 - settle) * deck.clientWidth * (mobile ? .25 : .055)}px`,
      '--intro-cream-rotate': `${-(1 - settle) * 5}deg`,
      '--intro-support-opacity': companions,
      '--intro-serum-y': `${(1 - companions) * 65}px`,
      '--intro-mask-x': `${(1 - companions) * 70}px`,
      '--intro-metric-opacity': facts,
      '--intro-metric-y': `${(1 - facts) * 24}px`,
      '--intro-watermark-opacity': .055 - settle * .025,
      '--intro-hint-opacity': 1 - smooth(.24, .64, p)
    });
    const reveal = smooth(0, .72, q);
    write(proof, {
      '--proof-number-y': `${(1 - reveal) * 20}px`,
      '--proof-number-scale': .86 + reveal * .14,
      '--proof-copy-y': `${(1 - reveal) * 20}px`,
      '--proof-copy-opacity': .68 + reveal * .32,
      '--proof-notes-opacity': .3 + smooth(.12, .78, q) * .7,
      '--proof-photo-opacity': .24 - reveal * .1,
      '--proof-photo-scale': 1.08 - reveal * .08
    });
  }
  function queue() {
    if (!frame && enabled) frame = requestAnimationFrame(paint);
  }
  function navigate(section, instant) {
    if (!enabled || !scenes.includes(section)) return false;
    const stage = section.querySelector('.p-scroll-stage');
    const destination = deck.scrollTop + section.getBoundingClientRect().top - headerHeight + Math.max(0, section.offsetHeight - stage.offsetHeight) * .9;
    deck.scrollTo({ top: destination, behavior: instant ? 'instant' : 'smooth' });
    queue();
    return true;
  }
  function measure() {
    const wasEnabled = enabled;
    const reading = Array.from(deck.querySelectorAll('.slide')).find(section => {
      const box = section.getBoundingClientRect();
      return box.top <= 220 && box.bottom > 220;
    });
    const previousTop = reading ? reading.getBoundingClientRect().top : 0;
    headerHeight = header.offsetHeight;
    root.style.setProperty('--opening-header', `${headerHeight}px`);
    const sufficientSpace = deck.clientWidth > 700 ? deck.clientHeight >= 680 : deck.clientHeight >= 760;
    enabled = !preference.matches && sufficientSpace;
    root.classList.toggle('has-opening-story', enabled);
    if (initialized && wasEnabled !== enabled && reading) {
      if (scenes.includes(reading)) {
        if (!navigate(reading, true)) reading.scrollIntoView({ behavior: 'instant' });
      } else {
        deck.scrollTop += reading.getBoundingClientRect().top - previousTop;
      }
    }
    renderedSignature = '';
    paint();
    initialized = true;
  }
  window.PYDERIN_OPENING = { navigate };
  deck.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', measure);
  preference.addEventListener('change', measure);
  document.addEventListener('focusin', event => {
    const section = event.target.closest('.p-scroll-scene');
    if (section && enabled) navigate(section, true);
  });
  measure();
})();
