/* Native scroll + product controls. The original film and all business content remain intact. */
(function () {
  'use strict';
  const root = document.documentElement;
  const deck = document.getElementById('deck');
  const header = document.getElementById('topFrame');
  const intro = document.getElementById('s2');
  const proof = document.getElementById('s3');
  const scenes = [intro, proof];
  const productPanel = intro.querySelector('.p-product-panel');
  const sciencePanel = intro.querySelector('.p-science-panel');
  const gallery = intro.querySelector('.p-range-art');
  const images = Array.from(gallery.querySelectorAll('img'));
  const productButtons = Array.from(intro.querySelectorAll('[data-product-select]'));
  const chapterButtons = Array.from(intro.querySelectorAll('[data-opening-chapter]'));
  const productKeys = ['opening.cream', 'opening.serum', 'opening.mask'];
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = false;
  let initialized = false;
  let frame = 0;
  let signature = '';
  let selected = 0;
  let headerHeight = header.offsetHeight;
  const clamp = value => Math.max(0, Math.min(1, value));
  const smooth = (start, end, value) => {
    const p = clamp((value - start) / (end - start));
    return p * p * (3 - 2 * p);
  };
  function messages() { return window.PYDERIN_TRANSLATIONS[root.lang] || window.PYDERIN_TRANSLATIONS.ko; }
  function updateLabels() {
    const t = messages();
    intro.querySelector('.p-active-product').textContent = t[productKeys[selected]];
    intro.querySelector('.p-product-switcher').setAttribute('aria-label', t['opening.choose']);
    intro.querySelector('.p-stage-tabs').setAttribute('aria-label', t['opening.chapters']);
    intro.querySelector('.p-product-prev').setAttribute('aria-label', t['opening.prev']);
    intro.querySelector('.p-product-next').setAttribute('aria-label', t['opening.next']);
    productButtons.forEach((button, index) => { button.title = t[productKeys[index]]; });
  }
  function renderGallery() {
    const width = gallery.clientWidth;
    images.forEach((image, index) => {
      let delta = (index - selected + 3) % 3;
      if (delta === 2) delta = -1;
      const active = delta === 0;
      image.style.setProperty('--card-x', `${delta * width * .34}px`);
      image.style.setProperty('--card-y', `${active ? 0 : 16}px`);
      image.style.setProperty('--card-r', `${delta * 8}deg`);
      image.style.setProperty('--card-scale', active ? '1.12' : '.64');
      image.style.setProperty('--card-opacity', active ? '1' : '.38');
      image.style.setProperty('--card-z', active ? '3' : '1');
    });
    gallery.dataset.selectedProduct = String(selected);
    productButtons.forEach((button, index) => {
      button.setAttribute('aria-pressed', String(index === selected));
      button.tabIndex = index === selected ? 0 : -1;
    });
  }
  function selectProduct(index, focus) {
    selected = (index + images.length) % images.length;
    renderGallery();
    updateLabels();
    if (focus) productButtons[selected].focus({ preventScroll: true });
  }
  function progress(section) {
    const stage = section.querySelector('.p-scroll-stage');
    return clamp((headerHeight - section.getBoundingClientRect().top) / Math.max(1, section.offsetHeight - stage.offsetHeight));
  }
  function write(section, values) {
    const stage = section.querySelector('.p-scroll-stage');
    Object.entries(values).forEach(([key, value]) => stage.style.setProperty(key, String(value)));
  }
  function setChapter(science) {
    chapterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.openingChapter === (science ? 'science' : 'product'))));
    productPanel.inert = enabled && science;
    sciencePanel.inert = enabled && !science;
    if (enabled) {
      productPanel.setAttribute('aria-hidden', String(science));
      sciencePanel.setAttribute('aria-hidden', String(!science));
    } else {
      productPanel.removeAttribute('aria-hidden');
      sciencePanel.removeAttribute('aria-hidden');
    }
  }
  function paint() {
    frame = 0;
    if (!enabled) return;
    const mobile = deck.clientWidth <= 700;
    const p = progress(intro);
    const q = progress(proof);
    const key = `${mobile}-${deck.clientWidth}-${Math.round(p * 10000)}-${Math.round(q * 10000)}`;
    if (key === signature) return;
    signature = key;
    const settle = smooth(.02, .24, p);
    const copy = smooth(.05, .22, p);
    const slide = smooth(.3, .56, p);
    const stageWidth = intro.querySelector('.p-scroll-stage').clientWidth;
    write(intro, {
      '--chapter-x': `${-slide * stageWidth}px`,
      '--chapter-progress': `${p * 100}%`,
      '--product-copy-opacity': copy,
      '--product-copy-x': `${-(1 - copy) * 60}px`,
      '--gallery-x': `${mobile ? 0 : -(1 - settle) * Math.min(deck.clientWidth * .23, 340)}px`,
      '--gallery-y': `${mobile ? -(1 - settle) * 28 : 0}px`,
      '--gallery-scale': 1 + (1 - settle) * (mobile ? .08 : .28),
      '--gallery-mobile-top': `${36 + settle * 196}px`,
      '--science-first-opacity': smooth(.38, .62, p),
      '--science-first-y': `${(1 - smooth(.38, .62, p)) * 54}px`,
      '--science-second-opacity': smooth(.58, .76, p),
      '--science-second-y': `${(1 - smooth(.58, .76, p)) * 42}px`,
      '--science-third-opacity': smooth(.72, .92, p),
      '--science-third-y': `${(1 - smooth(.72, .92, p)) * 42}px`
    });
    setChapter(slide > .5);
    const reveal = smooth(.04, .65, q);
    write(proof, {
      '--proof-value-x': `${mobile ? 0 : (1 - reveal) * proof.querySelector('.p-scroll-stage').clientWidth * .2}px`,
      '--proof-value-y': `${mobile ? (1 - reveal) * 72 : 0}px`,
      '--proof-value-scale': 1 + (1 - reveal) * (mobile ? .06 : .22),
      '--proof-copy-x': `${(1 - reveal) * (mobile ? 0 : 76)}px`,
      '--proof-copy-opacity': smooth(.12, .6, q),
      '--proof-notes-opacity': smooth(.38, .84, q),
      '--proof-gallery-opacity': .28 + smooth(0, .45, q) * .12,
      '--proof-strip-x': `${deck.clientWidth * (.25 - q * .65)}px`
    });
  }
  function queue() { if (!frame && enabled) frame = requestAnimationFrame(paint); }
  function goProgress(section, value, instant) {
    const stage = section.querySelector('.p-scroll-stage');
    const top = deck.scrollTop + section.getBoundingClientRect().top - headerHeight + Math.max(0, section.offsetHeight - stage.offsetHeight) * value;
    deck.scrollTo({ top, behavior: instant ? 'instant' : 'smooth' });
    queue();
  }
  function navigate(section, instant) {
    if (!enabled || !scenes.includes(section)) return false;
    goProgress(section, section === intro ? .24 : .92, instant);
    return true;
  }
  function measure() {
    const wasEnabled = enabled;
    const reading = Array.from(deck.querySelectorAll('.slide')).find(section => {
      const box = section.getBoundingClientRect();
      return box.top <= 220 && box.bottom > 220;
    });
    const oldTop = reading ? reading.getBoundingClientRect().top : 0;
    headerHeight = header.offsetHeight;
    root.style.setProperty('--opening-header', `${headerHeight}px`);
    const sufficientSpace = deck.clientWidth > 700 ? deck.clientHeight >= 680 : deck.clientHeight >= 760;
    enabled = !preference.matches && sufficientSpace;
    root.classList.toggle('has-opening-story', enabled);
    if (initialized && wasEnabled !== enabled && reading) {
      if (scenes.includes(reading)) {
        if (!navigate(reading, true)) reading.scrollIntoView({ behavior: 'instant' });
      } else deck.scrollTop += reading.getBoundingClientRect().top - oldTop;
    }
    signature = '';
    renderGallery();
    if (!enabled) setChapter(false);
    paint();
    initialized = true;
  }
  productButtons.forEach((button, index) => button.addEventListener('click', () => selectProduct(index, false)));
  intro.querySelector('.p-product-prev').addEventListener('click', () => selectProduct(selected - 1, false));
  intro.querySelector('.p-product-next').addEventListener('click', () => selectProduct(selected + 1, false));
  intro.querySelector('.p-product-switcher').addEventListener('keydown', event => {
    let index = selected;
    if (event.key === 'ArrowRight') index++;
    else if (event.key === 'ArrowLeft') index--;
    else if (event.key === 'Home') index = 0;
    else if (event.key === 'End') index = images.length - 1;
    else return;
    event.preventDefault();
    selectProduct(index, true);
  });
  chapterButtons.forEach(button => button.addEventListener('click', () => {
    if (enabled) goProgress(intro, button.dataset.openingChapter === 'science' ? .96 : .24, false);
  }));
  gallery.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || preference.matches) return;
    const box = gallery.getBoundingClientRect();
    gallery.style.setProperty('--pointer-x', `${((event.clientX - box.left) / box.width - .5) * 5}deg`);
    gallery.style.setProperty('--pointer-y', `${-((event.clientY - box.top) / box.height - .5) * 3}deg`);
  }, { passive: true });
  gallery.addEventListener('pointerleave', () => {
    gallery.style.setProperty('--pointer-x', '0deg');
    gallery.style.setProperty('--pointer-y', '0deg');
  });
  document.addEventListener('pyderin:language', updateLabels);
  deck.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', measure);
  preference.addEventListener('change', measure);
  window.PYDERIN_OPENING = { navigate };
  updateLabels();
  measure();
})();
