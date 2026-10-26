/* One vertical gesture advances one reading screen. Oversized content gets extra stops. */
(function(){
 'use strict';
 const deck=document.getElementById('deck');
 const header=document.getElementById('topFrame');
 const panels=[...deck.querySelectorAll('.slide')].flatMap(s=>s.id==='s2'?[...s.querySelectorAll('[data-opening-panel]')]:[s]);
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 let stops=[],frame=0,finishTimer,lastWheel=-Infinity,accumulated=0,gestureUsed=false,lockedUntil=0,resizeFrame=0;
 const topOf=element=>deck.scrollTop+element.getBoundingClientRect().top-deck.getBoundingClientRect().top;
 function measure(){
  const viewport=deck.clientHeight,max=deck.scrollHeight-viewport;
  const stride=Math.max(180,viewport-header.offsetHeight-36);
  stops=[];
  for(const panel of panels){
   const start=topOf(panel);
   const contentBottom=Math.max(start,...[...panel.children].filter(e=>e.getClientRects().length).map(e=>topOf(e)+e.getBoundingClientRect().height));
   const end=Math.max(start,Math.min(start+panel.offsetHeight,contentBottom+24)-viewport);
   stops.push({top:Math.min(max,start),panel});
   for(let pos=start;pos<end-8;){pos=Math.min(pos+stride,end);stops.push({top:Math.min(max,pos),panel})}
  }
  stops=stops.filter((s,i,all)=>i===0||s.top-all[i-1].top>8);
 }
 function nearest(){return stops.reduce((best,s,i)=>Math.abs(s.top-deck.scrollTop)<Math.abs(stops[best].top-deck.scrollTop)?i:best,0)}
 function move(top,instant=false){
  cancelAnimationFrame(frame);clearTimeout(finishTimer);frame=0;
  const start=deck.scrollTop,delta=top-start;
  if(instant||preference.matches||Math.abs(delta)<2){deck.scrollTop=top;lockedUntil=performance.now()+180;return}
  const began=performance.now(),duration=540;lockedUntil=began+duration;
  function tick(now){const p=Math.min(1,(now-began)/duration),e=1-Math.pow(1-p,3);deck.scrollTop=start+delta*e;if(p<1)frame=requestAnimationFrame(tick);else{frame=0;deck.scrollTop=top}}
  frame=requestAnimationFrame(tick);
  // Finish even when a background webview suspends animation frames.
  finishTimer=setTimeout(()=>{cancelAnimationFrame(frame);frame=0;deck.scrollTop=top},duration+80);
 }
 function step(direction){
  measure();if(!stops.length)return;
  const here=deck.scrollTop;
  const target=direction>0?stops.find(s=>s.top>here+8):[...stops].reverse().find(s=>s.top<here-8);
  if(target)move(target.top);
 }
 function navigate(element,instant=false){if(!element)return false;measure();move(Math.min(topOf(element),deck.scrollHeight-deck.clientHeight),instant);return true}
 function nestedScroll(target,delta){
  for(let node=target instanceof Element?target:null;node&&node!==deck;node=node.parentElement){
   const style=getComputedStyle(node);
   if(/auto|scroll/.test(style.overflowY)&&node.scrollHeight>node.clientHeight+2){
    if(delta>0&&node.scrollTop+node.clientHeight<node.scrollHeight-2||delta<0&&node.scrollTop>2)return true;
   }
  }
  return false;
 }
 deck.addEventListener('wheel',event=>{
  if(event.ctrlKey||Math.abs(event.deltaX)>Math.abs(event.deltaY)||!event.deltaY||nestedScroll(event.target,event.deltaY))return;
  if(event.target.closest('select,input,textarea,[contenteditable=true]'))return;
  event.preventDefault();
  const now=performance.now(),gap=now-lastWheel;lastWheel=now;
  if(gap>180){gestureUsed=false;accumulated=0}
  if(gestureUsed||now<lockedUntil)return;
  const amount=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?deck.clientHeight:1);
  if(accumulated&&Math.sign(amount)!==Math.sign(accumulated))accumulated=0;
  accumulated+=amount;
  if(Math.abs(accumulated)<24)return;
  gestureUsed=true;step(Math.sign(accumulated));accumulated=0;
 },{passive:false});
 let touch=null;
 deck.addEventListener('touchstart',event=>{
  if(event.touches.length!==1||event.target.closest('video,input,select,textarea,[contenteditable=true]')){touch=null;return}
  const p=event.touches[0];touch={x:p.clientX,y:p.clientY,target:event.target,vertical:false};
 },{passive:true});
 deck.addEventListener('touchmove',event=>{
  if(!touch||event.touches.length!==1)return;
  const p=event.touches[0],dx=p.clientX-touch.x,dy=p.clientY-touch.y;
  if(Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>8&&!nestedScroll(touch.target,-dy)){touch.vertical=true;event.preventDefault()}
 },{passive:false});
 deck.addEventListener('touchend',event=>{
  if(!touch)return;const dy=touch.y-event.changedTouches[0].clientY;
  if(touch.vertical&&Math.abs(dy)>35&&performance.now()>=lockedUntil)step(Math.sign(dy));touch=null;
 },{passive:true});
 deck.addEventListener('touchcancel',()=>{touch=null},{passive:true});
 window.addEventListener('keydown',event=>{
  if(event.defaultPrevented||event.ctrlKey||event.metaKey||event.altKey||(event.target instanceof Element&&event.target.closest('button,select,input,textarea,summary,a,video,[contenteditable=true]')))return;
  const keys=['ArrowDown','ArrowUp','PageDown','PageUp',' ','Home','End'];if(!keys.includes(event.key))return;
  event.preventDefault();if(event.repeat||performance.now()<lockedUntil)return;
  if(event.key==='Home')navigate(panels[0]);else if(event.key==='End'){measure();move(stops.at(-1).top)}
  else step(['ArrowUp','PageUp'].includes(event.key)||event.key===' '&&event.shiftKey?-1:1);
 });
 function queueMeasure(){cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(measure)}
 new ResizeObserver(queueMeasure).observe(deck);
 panels.forEach(panel=>new ResizeObserver(queueMeasure).observe(panel));
 document.addEventListener('pyderin:language',queueMeasure);
 document.addEventListener('toggle',queueMeasure,true);
 window.addEventListener('resize',()=>{cancelAnimationFrame(frame);clearTimeout(finishTimer);frame=0;queueMeasure()});
 deck.addEventListener('pointerdown',event=>{if(event.target===deck){cancelAnimationFrame(frame);clearTimeout(finishTimer);frame=0;lockedUntil=0}});
 preference.addEventListener('change',()=>{if(preference.matches){cancelAnimationFrame(frame);clearTimeout(finishTimer);frame=0;measure();if(stops.length)move(stops[nearest()].top,true)}});
 window.PYDERIN_PAGER={navigate,step,refresh:measure};
 document.documentElement.classList.add('paging-ready');measure();
 const requested=document.querySelector(/^#s(?:[1-9]|1[0-2])$/.test(location.hash)?location.hash:'#s1');
 navigate(requested,true);
})();
