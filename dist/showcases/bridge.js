/* Both country pages are served from the library's own origin. */
window.setShowcaseLanguage=locale=>{
 const next=localeMap[locale]||'ko';
 if(next!==lang)applyLanguage(next);
};
window.parent.postMessage({type:'pyderin:showcase-ready'},location.origin);
