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
    button.setAttribute('aria-pressed', String(!film.muted));
  }
  function applyLanguage(code, preservePosition) {
    const active = sections.find(section => {
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
    if (preservePosition && active) deck.scrollTop += active.getBoundingClientRect().top - activeTop;
    updateTheme();
  }
  function updateTheme() {
    const line = Math.min(220, deck.clientHeight * .3);
    const active = sections.find(section => {
      const bounds = section.getBoundingClientRect();
      return bounds.top <= line && bounds.bottom > line;
    });
    const dark = !active || active.id === 's1' || active.classList.contains('wine');
    header.dataset.theme = dark ? 'dark' : 'light';
    const pageNumber = document.getElementById('pageNo');
    pageNumber.style.color = dark ? '#e8c5d0' : '#684251';
    pageNumber.style.background = dark ? 'rgba(66,24,42,.9)' : 'rgba(248,245,239,.94)';
  }
  selector.addEventListener('change', event => applyLanguage(event.target.value, true));
  document.getElementById('soundBtn').addEventListener('click', soundLabel);
  document.addEventListener('pyderin:slide', soundLabel);
  document.querySelectorAll('a[href^="#s"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const destination = document.querySelector(anchor.getAttribute('href'));
      if (!destination) return;
      event.preventDefault();
      destination.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  });
  deck.addEventListener('scroll', updateTheme, { passive: true });
  window.addEventListener('resize', updateTheme);
  applyLanguage(language, false);
  if (/^#s(?:[1-9]|1[0-2])$/.test(location.hash)) {
    requestAnimationFrame(() => document.querySelector(location.hash).scrollIntoView({ behavior: 'instant' }));
  }
})();
