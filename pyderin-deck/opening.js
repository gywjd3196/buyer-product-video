/* Product selection stays in place; reading chapters are regular document sections. */
(function(){
 'use strict';
 const intro=document.getElementById('s2');
 const gallery=intro.querySelector('.p-range-art');
 const controls=intro.querySelector('.p-gallery-controls');
 const keys=['opening.cream','opening.serum','opening.mask'];
 let selected=0;
 const messages=()=>window.PYDERIN_TRANSLATIONS[document.documentElement.lang]||window.PYDERIN_TRANSLATIONS.ko;
 function labels(){
  const t=messages();
  intro.querySelector('.p-active-product').textContent=t[keys[selected]];
  controls.setAttribute('role','group');controls.setAttribute('aria-label',t['opening.choose']);
  intro.querySelector('.p-product-prev').setAttribute('aria-label',t['opening.prev']);
  intro.querySelector('.p-product-next').setAttribute('aria-label',t['opening.next']);
 }
 function select(index){
  selected=(index+keys.length)%keys.length;gallery.dataset.selectedProduct=String(selected);labels();
 }
 intro.querySelector('.p-product-prev').addEventListener('click',()=>select(selected-1));
 intro.querySelector('.p-product-next').addEventListener('click',()=>select(selected+1));
 controls.addEventListener('keydown',e=>{
  let i=selected;if(e.key==='ArrowRight')i++;else if(e.key==='ArrowLeft')i--;else if(e.key==='Home')i=0;else if(e.key==='End')i=keys.length-1;else return;
  e.preventDefault();select(i);
 });
 let swipe=null;
 gallery.addEventListener('touchstart',e=>{swipe=e.touches.length===1?{x:e.touches[0].clientX,y:e.touches[0].clientY}:null},{passive:true});
 gallery.addEventListener('touchend',e=>{
  if(!swipe)return;const p=e.changedTouches[0],dx=p.clientX-swipe.x,dy=p.clientY-swipe.y;
  if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5)select(selected+(dx<0?1:-1));swipe=null;
 },{passive:true});
 gallery.addEventListener('touchcancel',()=>{swipe=null},{passive:true});
 document.addEventListener('pyderin:language',labels);
 select(0);
})();
