(function () {
  'use strict';
  const dictionaries = window.PYDERIN_TRANSLATIONS;
  const selector = document.getElementById('languageSelect');
  const deck = document.getElementById('deck');
  const header = document.getElementById('topFrame');
  const sections = Array.from(deck.querySelectorAll('.slide'));
  const storageKey = 'pyderin-deck-language';
  let language = 'ko';
  const queryLanguage = new URLSearchParams(location.search).get('lang');
  try { language = localStorage.getItem(storageKey) || language; } catch (_) {}
  if (dictionaries[queryLanguage]) language = queryLanguage;
  if (!dictionaries[language]) language = 'ko';

  function soundLabel() {
    const film = document.getElementById('coverFilm');
    const button = document.getElementById('soundBtn');
    const label = dictionaries[language][film.muted ? 'hero.off' : 'hero.on'];
    button.querySelector('.st').textContent = label;
    button.setAttribute('aria-label', label);
    button.title = label;
    button.setAttribute('aria-pressed', String(!film.muted));
  }
  function applyLanguage(code, preservePosition) {
    const atEnd = deck.scrollTop + deck.clientHeight >= deck.scrollHeight - 2;
    const active = atEnd ? sections[sections.length - 1] : sections.find(section => {
      const box = section.getBoundingClientRect();
      return box.top <= 220 && box.bottom > 220;
    });
    const activeTop = active ? active.getBoundingClientRect().top : 0;
    language = dictionaries[code] ? code : 'ko';
    const messages = dictionaries[language];
    document.documentElement.lang = language;
    selector.value = language;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;
      if (messages[key] !== undefined) element.innerHTML = messages[key];
    });
    const heroKeys = [
      ['#s1 .k-eyebrow', 'hero.eyebrow'],
      ['#s1 .tagline', 'hero.tagline'],
      ['#s1 .line-badge:first-child', 'hero.clinic'],
      ['#s1 .line-badge:last-child', 'hero.pharmacy'],
      ['#s1 .scrollcue > span:first-child', 'hero.enter']
    ];
    heroKeys.forEach(([target, key]) => { document.querySelector(target).textContent = messages[key]; });
    document.getElementById('coverFilm').setAttribute('aria-label', messages['hero.film']);
    document.getElementById('sideNav').setAttribute('aria-label', messages['ui.slides']);
    sections.forEach((section, index) => {
      const label = index === 0 ? messages['ui.hero'] : messages[section.dataset.label];
      section.dataset.title = label;
      const button = document.querySelectorAll('#sideNav button')[index];
      button.setAttribute('aria-label', `${messages['ui.slide']} ${index + 1}: ${label}`);
      button.title = label;
      button.querySelector('.lbl').textContent = label;
    });
    document.querySelectorAll('.p-photo-strip figure').forEach(figure => {
      figure.querySelector('video').setAttribute('aria-label', figure.querySelector('figcaption').textContent);
    });
    soundLabel();
    try { localStorage.setItem(storageKey, language); } catch (_) {}
    if (preservePosition && atEnd) deck.scrollTop = deck.scrollHeight;
    else if (preservePosition && active) deck.scrollTop += active.getBoundingClientRect().top - activeTop;
    updateTheme();
    document.dispatchEvent(new CustomEvent('pyderin:language', { detail: language }));
  }
  function updateTheme() {
    const line = Math.min(220, deck.clientHeight * .3);
    const active = sections.find(section => {
      const bounds = section.getBoundingClientRect();
      return bounds.top <= line && bounds.bottom > line;
    });
    const dark = active && (active.id === 's1' || active.classList.contains('p-feature-dark'));
    header.dataset.theme = active && active.classList.contains('p-feature-dark') ? 'dark' : 'light';
    document.body.classList.toggle('on-dark-section', !!dark && active.id !== 's1');
    const heroBottom = sections[0].getBoundingClientRect().bottom;
    const hideFrame = heroBottom > header.offsetHeight + 1;
    header.classList.toggle('is-hidden', hideFrame);
    header.inert = hideFrame;
    header.setAttribute('aria-hidden', String(hideFrame));
    document.body.classList.toggle('is-hero', hideFrame);
    const pageNumber = document.getElementById('pageNo');
    pageNumber.style.color = dark ? '#ffffff' : '#777d86';
    pageNumber.style.background = dark ? 'rgba(16,17,20,.45)' : 'rgba(255,255,255,.94)';
  }
  function setupScrollReveals() {
    const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
    if (motionPreference.matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { root: deck, threshold: .08, rootMargin: '0px 0px -36px 0px' });
    const selectors = '.p-kicker,h2,.p-lead,.p-metrics,.p-range-art,.p-growth > div,.p-photo-strip figure,.p-inline-proof,.p-step,.p-product,.p-supply,.p-details,.p-concentration,.p-bar-heading,.p-bar-row,.p-study,.p-note,.p-globe,.p-reach,.p-region,.p-entry article,.p-ctas,.p-closing-note,.p-next';
    sections.slice(1).forEach(section => {
      if (section.classList.contains('p-scroll-scene')) return;
      const candidates = Array.from(section.querySelectorAll(selectors));
      const targets = candidates.filter(element => !candidates.some(parent => parent !== element && parent.contains(element)));
      targets.forEach((element, index) => {
        element.classList.add('p-rise');
        element.style.setProperty('--p-reveal-delay', `${Math.min(index * 45, 180)}ms`);
        observer.observe(element);
      });
    });
    document.documentElement.classList.add('motion-ready');
    document.addEventListener('focusin', event => {
      const target = event.target.closest('.p-rise');
      if (target) { target.classList.add('is-revealed'); observer.unobserve(target); }
    });
    motionPreference.addEventListener('change', event => {
      if (!event.matches) return;
      document.documentElement.classList.remove('motion-ready');
      observer.disconnect();
    });
  }
  setupScrollReveals();
  selector.addEventListener('change', event => applyLanguage(event.target.value, true));
  document.getElementById('soundBtn').addEventListener('click', soundLabel);
  document.addEventListener('pyderin:slide', soundLabel);
  document.querySelectorAll('a[href^="#s"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const destination = document.querySelector(anchor.getAttribute('href'));
      if (!destination) return;
      event.preventDefault();
      if (window.PYDERIN_OPENING && window.PYDERIN_OPENING.navigate(destination, matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
      destination.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  });
  deck.addEventListener('scroll', updateTheme, { passive: true });
  window.addEventListener('resize', updateTheme);
  applyLanguage(language, false);
  if (/^#s(?:[1-9]|1[0-2])$/.test(location.hash)) {
    requestAnimationFrame(() => {
      const target = document.querySelector(location.hash);
      if (!window.PYDERIN_OPENING || !window.PYDERIN_OPENING.navigate(target, true)) target.scrollIntoView({ behavior: 'instant' });
    });
  }
})();
