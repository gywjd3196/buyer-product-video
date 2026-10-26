/* Product selection stays in place; reading chapters are regular document sections. */
(function(){
 'use strict';
 const intro=document.getElementById('s2');
 const gallery=intro.querySelector('.p-range-art');
 const buttons=[...intro.querySelectorAll('[data-product-select]')];
 const chapters=[...intro.querySelectorAll('[data-opening-chapter]')];
 const keys=['opening.cream','opening.serum','opening.mask'];
 let selected=0;
 const messages=()=>window.PYDERIN_TRANSLATIONS[document.documentElement.lang]||window.PYDERIN_TRANSLATIONS.ko;
 function labels(){
  const t=messages();
  intro.querySelector('.p-active-product').textContent=t[keys[selected]];
  intro.querySelector('.p-product-switcher').setAttribute('aria-label',t['opening.choose']);
  intro.querySelector('.p-stage-tabs').setAttribute('aria-label',t['opening.chapters']);
  intro.querySelector('.p-product-prev').setAttribute('aria-label',t['opening.prev']);
  intro.querySelector('.p-product-next').setAttribute('aria-label',t['opening.next']);
  buttons.forEach((b,i)=>b.title=t[keys[i]]);
 }
 function select(index,focus){
  selected=(index+buttons.length)%buttons.length;gallery.dataset.selectedProduct=String(selected);
  buttons.forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===selected));b.tabIndex=i===selected?0:-1});
  labels();if(focus)buttons[selected].focus({preventScroll:true});
 }
 buttons.forEach((button,i)=>button.addEventListener('click',()=>select(i,false)));
 intro.querySelector('.p-product-prev').addEventListener('click',()=>select(selected-1,false));
 intro.querySelector('.p-product-next').addEventListener('click',()=>select(selected+1,false));
 intro.querySelector('.p-product-switcher').addEventListener('keydown',e=>{
  let i=selected;if(e.key==='ArrowRight')i++;else if(e.key==='ArrowLeft')i--;else if(e.key==='Home')i=0;else if(e.key==='End')i=buttons.length-1;else return;
  e.preventDefault();select(i,true);
 });
 const tabs=intro.querySelector('.p-stage-tabs');intro.querySelector('.p-opening-copy').append(tabs);
 chapters.forEach(b=>b.addEventListener('click',()=>window.PYDERIN_PAGER.navigate(intro.querySelector(`[data-opening-panel="${b.dataset.openingChapter}"]`))));
 document.addEventListener('pyderin:language',labels);
 select(0,false);
})();
