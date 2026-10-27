/* Four bounded motion scenes. They observe scrolling; they never intercept it. */
(function(){
 'use strict';
 const deck=document.getElementById('deck');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const finePointer=matchMedia('(hover:hover) and (pointer:fine)');
 const product=document.querySelector('[data-opening-panel="product"]');
 const growth=document.getElementById('s3'),comparison=document.getElementById('s8'),world=document.getElementById('s10');
 const scenes=[product,growth,comparison,world],active=new Set(),animations=new Set(),counters=new Set();
 const messages=()=>window.PYDERIN_TRANSLATIONS[document.documentElement.lang]||window.PYDERIN_TRANSLATIONS.ko;
 function animate(element,frames,options={}){
  if(reduced.matches)return;
  const animation=element.animate(frames,{duration:900,easing:'cubic-bezier(.2,.7,.2,1)',...options});
  animations.add(animation);animation.onfinish=animation.oncancel=()=>animations.delete(animation);
  return animation;
 }
 function count(element,value){
  if(reduced.matches){element.textContent=value.toLocaleString('en-US');return}
  const began=performance.now();let frame,timer;
  const finish=()=>{cancelAnimationFrame(frame);clearTimeout(timer);element.textContent=value.toLocaleString('en-US');counters.delete(finish)};
  function tick(now){const p=Math.min(1,(now-began)/950);element.textContent=Math.round(value*(1-Math.pow(1-p,3))).toLocaleString('en-US');if(p<1)frame=requestAnimationFrame(tick);else finish()}
  counters.add(finish);frame=requestAnimationFrame(tick);timer=setTimeout(finish,1100);
 }
 function settle(){animations.forEach(animation=>animation.finish());counters.forEach(finish=>finish())}
 function makeControl(element,activate,peers,index){
  element.setAttribute('role','button');element.tabIndex=0;element.setAttribute('aria-pressed','false');
  element.addEventListener('click',activate);
  element.addEventListener('keydown',event=>{
   if(event.key==='Enter'||event.key===' '){event.preventDefault();activate()}
   else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){
    event.preventDefault();const direction=['ArrowLeft','ArrowUp'].includes(event.key)?-1:1;
    peers[(index+direction+peers.length)%peers.length].focus({preventScroll:true});
   }
  });
 }

 // 01: one real packshot, a moving light and restrained pointer depth.
 const gallery=product.querySelector('.p-range-art'),productPanel=product.querySelector('.p-gallery-panel');
 const stage=document.createElement('div');stage.className='p-pack-stage';
 [...gallery.querySelectorAll('img')].forEach(img=>stage.append(img));gallery.append(stage);
 const shadow=document.createElement('div');shadow.className='p-pack-shadow';gallery.prepend(shadow);
 const light=document.createElement('div');light.className='p-pack-light';gallery.append(light);
 function lightSweep(){animate(light,[{transform:'translateX(-110%)'},{transform:'translateX(110%)'}],{duration:1100,easing:'cubic-bezier(.2,.5,.3,1)'})}
 function productTone(){productPanel.dataset.productTone=gallery.dataset.selectedProduct;if(active.has(product))lightSweep()}
 new MutationObserver(productTone).observe(gallery,{attributes:true,attributeFilter:['data-selected-product']});productTone();
 gallery.addEventListener('pointermove',event=>{
  if(!finePointer.matches||reduced.matches)return;
  const bounds=gallery.getBoundingClientRect(),x=(event.clientX-bounds.left)/bounds.width-.5,y=(event.clientY-bounds.top)/bounds.height-.5;
  gallery.style.setProperty('--pack-x',`${-y*5}deg`);gallery.style.setProperty('--pack-y',`${x*7}deg`);gallery.style.setProperty('--pack-shift','-4px');gallery.style.setProperty('--shadow-x',`${-x*14}px`);
 });
 function resetProduct(){['--pack-x','--pack-y','--pack-shift','--shadow-x'].forEach(key=>gallery.style.removeProperty(key))}
 gallery.addEventListener('pointerleave',resetProduct);

 // 03: actual retail photographs; a counter and a line connect scale to growth.
 const proof=growth.querySelector('.p-proof-gallery'),photos=[...proof.querySelectorAll('.p-proof-card')];
 proof.removeAttribute('aria-hidden');proof.setAttribute('role','group');
 const controls=document.createElement('div');controls.className='p-proof-controls';
 controls.innerHTML='<span class="p-proof-caption"></span><div class="p-proof-nav"></div>';proof.append(controls);
 const caption=controls.querySelector('.p-proof-caption'),proofNav=controls.querySelector('.p-proof-nav');
 let photoIndex=2;
 const photoButtons=photos.map((photo,index)=>{
  const button=document.createElement('button');button.type='button';button.textContent=String(index+1).padStart(2,'0');
  button.addEventListener('click',()=>selectPhoto(index));button.addEventListener('focus',()=>selectPhoto(index));proofNav.append(button);return button;
 });
 function selectPhoto(index){
  photoIndex=index;proof.dataset.photo=String(index);
  photos.forEach((photo,i)=>{photo.classList.toggle('is-current',i===index);photo.setAttribute('aria-hidden',String(i!==index));photoButtons[i].setAttribute('aria-pressed',String(i===index))});
  caption.textContent=messages()[`s4.cap${index+1}`];
 }
 proof.addEventListener('pointermove',event=>{
  if(!finePointer.matches||event.target.closest('button,.p-proof-controls'))return;
  const bounds=proof.getBoundingClientRect();const index=Math.max(0,Math.min(2,Math.floor((event.clientX-bounds.left)/bounds.width*3)));
  if(index!==photoIndex)selectPhoto(index);
 });
 proofNav.addEventListener('keydown',event=>{
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  event.preventDefault();const index=event.key==='Home'?0:event.key==='End'?2:(photoIndex+(event.key==='ArrowRight'?1:2))%3;photoButtons[index].focus({preventScroll:true});
 });
 const giant=growth.querySelector('.p-giant');giant.setAttribute('aria-label','2,000+');
 giant.innerHTML='<b class="p-counter-digits" aria-hidden="true">2,000</b><span aria-hidden="true">+</span>';
 const growthNumber=giant.querySelector('b'),rule=document.createElement('i');rule.className='p-growth-rule';rule.setAttribute('aria-hidden','true');growth.querySelector('.p-growth-story').prepend(rule);

 // 08: compare any row against PYDERIN, preserving the original values and widths.
 const chart=comparison.querySelector('.p-comparison'),rows=[...chart.querySelectorAll('.p-bar-row')];
 const tableRows=[...comparison.querySelectorAll('tbody tr')],concentration=comparison.querySelector('.p-concentration');
 const concentrationNumber=concentration.querySelector('strong');concentrationNumber.setAttribute('aria-label','10,000');
 const concentrationDigits=document.createElement('span');concentrationDigits.setAttribute('aria-hidden','true');concentrationDigits.textContent='10,000';concentrationNumber.replaceChildren(concentrationDigits);
 let pinnedComparison=-1;
 function highlightComparison(index){
  chart.classList.toggle('is-comparing',index>=0);concentration.classList.toggle('is-comparing',index>=0);chart.dataset.comparedRow=String(index);
  rows.forEach((row,i)=>row.classList.toggle('is-compare-target',index>=0&&(i===0||i===index)));
  tableRows.forEach((row,i)=>row.classList.toggle('is-compare-target',index>=0&&(i===0||i===index)));
 }
 rows.forEach((row,index)=>{
  row.setAttribute('aria-label',`${row.firstElementChild.textContent.trim()}, ${row.querySelector('strong').textContent} ppm`);
  makeControl(row,()=>{pinnedComparison=pinnedComparison===index?-1:index;rows.forEach((item,i)=>item.setAttribute('aria-pressed',String(i===pinnedComparison)));highlightComparison(pinnedComparison)},rows,index);
  row.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch')highlightComparison(index)});
  row.addEventListener('focus',()=>highlightComparison(index));
 });
 chart.addEventListener('pointerleave',()=>highlightComparison(rows.indexOf(document.activeElement)>=0?rows.indexOf(document.activeElement):pinnedComparison));
 chart.addEventListener('focusout',event=>{if(!chart.contains(event.relatedTarget))highlightComparison(pinnedComparison)});

 // 10: locally rendered geographic globe; no continuous off-screen animation.
 const canvas=document.getElementById('globe'),ctx=canvas.getContext('2d'),size=560,radius=204,rad=Math.PI/180;
 const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=size*dpr;canvas.height=size*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
 const markets=[
  [37.5,127,'SEOUL',-1],[31.2,121.5,'CN',0],[25,121.6,'TW',0],[22.3,114.2,'HK',0],
  [10.8,106.7,'VN',0],[-6.2,106.8,'ID',0],[3.1,101.7,'MY',0],[35.7,139.7,'JP',0],
  [34.05,-118.24,'US',1],[51.5,-.13,'UK',2],[47.4,8.5,'CH',2],[-26.2,28,'ZA',3]
 ];
 const vector=(lat,lon)=>[Math.cos(lat*rad)*Math.sin(lon*rad),Math.sin(lat*rad),Math.cos(lat*rad)*Math.cos(lon*rad)];
 markets.forEach(m=>m.push(vector(m[0],m[1])));
 const views=[[25,108],[28,-105],[42,10],[-8,22]],overview=[18,65];
 let land=[],rotation=-overview[1]*rad,tilt=overview[0]*rad,routeProgress=0,globeFrame=0,globeTimer,region=-1,pinnedRegion=-1,globeRun=0;
 const regionList=world.querySelector('.p-regions'),regions=[...world.querySelectorAll('.p-region')];
 function project(v,lift=0){
  const x=v[0]*Math.cos(rotation)+v[2]*Math.sin(rotation),z=v[2]*Math.cos(rotation)-v[0]*Math.sin(rotation);
  const y=v[1]*Math.cos(tilt)-z*Math.sin(tilt),depth=v[1]*Math.sin(tilt)+z*Math.cos(tilt);
  return [size/2+x*radius*(1+lift),size/2-y*radius*(1+lift),depth];
 }
 const routes=markets.slice(1).map(m=>{
  const a=markets[0][4],b=m[4],omega=Math.acos(Math.max(-1,Math.min(1,a.reduce((sum,n,i)=>sum+n*b[i],0))));
  return Array.from({length:65},(_,i)=>{const t=i/64,s=Math.sin(omega);return {v:a.map((n,j)=>(n*Math.sin((1-t)*omega)+b[j]*Math.sin(t*omega))/s),lift:Math.sin(t*Math.PI)*(.12+omega/Math.PI*.32)}});
 });
 function path(points,limit=points.length){
  ctx.beginPath();let begun=false;
  for(let i=0;i<Math.min(limit,points.length);i++){const p=points[i];if(p[2]<0){begun=false;continue}if(!begun){ctx.moveTo(p[0],p[1]);begun=true}else ctx.lineTo(p[0],p[1])}ctx.stroke();
 }
 function drawGlobe(){
  ctx.clearRect(0,0,size,size);ctx.lineWidth=1;ctx.setLineDash([]);
  const sphere=ctx.createRadialGradient(210,180,20,280,280,220);sphere.addColorStop(0,'#ffffff');sphere.addColorStop(1,'#eeeee8');
  ctx.beginPath();ctx.arc(280,280,radius,0,Math.PI*2);ctx.fillStyle=sphere;ctx.fill();ctx.strokeStyle='#d8d9d2';ctx.stroke();
  ctx.strokeStyle='#6b705b14';ctx.lineWidth=.6;
  for(let lat=-60;lat<=60;lat+=30)path(Array.from({length:121},(_,i)=>project(vector(lat,i*3-180))));
  for(let lon=-180;lon<180;lon+=30)path(Array.from({length:61},(_,i)=>project(vector(i*3-90,lon))));
  land.forEach(v=>{const p=project(v);if(p[2]<0)return;ctx.beginPath();ctx.arc(p[0],p[1],1.25+p[2]*.65,0,Math.PI*2);ctx.fillStyle=`rgba(87,94,77,${.25+p[2]*.36})`;ctx.fill()});
  routes.forEach((route,i)=>{
   const market=markets[i+1],selected=region<0||market[3]===region,points=route.map(p=>project(p.v,p.lift));
   ctx.strokeStyle=selected?'#b620321f':'#77776b10';ctx.lineWidth=1;ctx.setLineDash(market[2]==='ZA'?[4,5]:[]);path(points);
   if(!selected)return;
   const progress=Math.max(0,Math.min(1,(routeProgress*1.5-(region<0?i*.045:0))));
   const count=Math.floor(progress*64)+1;ctx.strokeStyle='#b62032b8';ctx.lineWidth=1.5;path(points,count);
   const head=points[Math.min(64,count-1)];if(head[2]>=0&&progress>0&&progress<1){ctx.beginPath();ctx.arc(head[0],head[1],3,0,Math.PI*2);ctx.fillStyle='#b62032';ctx.fill()}
  });
  ctx.setLineDash([]);
  markets.forEach((m,i)=>{
   const p=project(m[4]),selected=i===0||region<0||m[3]===region;if(p[2]<0&&i!==0)return;
   if(i>0&&routeProgress<.08)return;
   ctx.globalAlpha=p[2]<0?.22:selected?1:.25;
   ctx.beginPath();ctx.arc(p[0],p[1],i===0?7:5,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();ctx.strokeStyle=selected?'#b62032':'#93978a';ctx.lineWidth=1.1;ctx.stroke();
   ctx.beginPath();ctx.arc(p[0],p[1],i===0?3:2.5,0,Math.PI*2);ctx.fillStyle=selected?'#b62032':'#93978a';ctx.fill();
   const cssWidth=canvas.clientWidth||480;
   if(i===0||(cssWidth>=320&&region>=0&&m[3]===region)){
    const fontSize=Math.max(i===0?17:14,12*size/cssWidth);
    ctx.font=`500 ${fontSize}px Pretendard, sans-serif`;ctx.fillStyle=i===0?'#b62032':'#4d5148';ctx.textAlign=p[0]>420?'right':'left';
    const offset=i===0?-12:12;ctx.fillText(m[2],p[0]+(p[0]>420?-12:12),p[1]+offset);
   }
   ctx.globalAlpha=1;
  });
 }
 function stopGlobe(){cancelAnimationFrame(globeFrame);clearTimeout(globeTimer);globeFrame=0;globeRun++}
 function globeTo(index,entrance=false){
  stopGlobe();region=index;world.dataset.activeRegion=String(index);
  regions.forEach((item,i)=>item.classList.toggle('is-region-active',i===index));
  const view=index<0?overview:views[index],targetTilt=view[0]*rad;
  let delta=-view[1]*rad-rotation;while(delta>Math.PI)delta-=Math.PI*2;while(delta<-Math.PI)delta+=Math.PI*2;
  const fromRotation=rotation,fromTilt=tilt,began=performance.now(),duration=entrance?1100:850,run=globeRun;
  const finish=()=>{if(run!==globeRun)return;cancelAnimationFrame(globeFrame);clearTimeout(globeTimer);globeFrame=0;rotation=fromRotation+delta;tilt=targetTilt;routeProgress=1;drawGlobe()};
  if(reduced.matches||!active.has(world)){finish();return}
  function tick(now){if(run!==globeRun)return;const p=Math.min(1,(now-began)/duration),ease=1-Math.pow(1-p,3);rotation=fromRotation+delta*ease;tilt=fromTilt+(targetTilt-fromTilt)*ease;routeProgress=p;drawGlobe();if(p<1)globeFrame=requestAnimationFrame(tick);else finish()}
  globeFrame=requestAnimationFrame(tick);globeTimer=setTimeout(finish,duration+100);
 }
 regions.forEach((item,index)=>{
  makeControl(item,()=>{pinnedRegion=pinnedRegion===index?-1:index;regions.forEach((entry,i)=>entry.setAttribute('aria-pressed',String(i===pinnedRegion)));globeTo(pinnedRegion)},regions,index);
  item.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch'&&region!==index)globeTo(index)});
  item.addEventListener('focus',()=>{if(region!==index)globeTo(index)});
 });
 regionList.addEventListener('pointerleave',()=>{const focused=regions.indexOf(document.activeElement),next=focused>=0?focused:pinnedRegion;if(region!==next)globeTo(next)});
 regionList.addEventListener('focusout',event=>{if(!regionList.contains(event.relatedTarget)&&region!==pinnedRegion)globeTo(pinnedRegion)});
 fetch('assets/world-land.json').then(response=>{if(!response.ok)throw new Error('Land asset unavailable');return response.json()}).then(data=>{land=data.points.map(p=>vector(...p));drawGlobe()}).catch(()=>{drawGlobe()});
 drawGlobe();

 function labels(){
  const t=messages();proof.setAttribute('aria-label',t['s4.label']);
  photos.forEach((photo,i)=>{photo.querySelector('img').alt=t[`s4.cap${i+1}`];photoButtons[i].setAttribute('aria-label',t[`s4.cap${i+1}`])});
  selectPhoto(photoIndex);
  regions.forEach((item,i)=>item.setAttribute('aria-label',`${t[`s10.region${i}`]}. ${t[`s10.countries${i}`]}`));
 }
 labels();document.addEventListener('pyderin:language',labels);
 function enter(scene){
  if(scene===product){animate(stage,[{opacity:.4,transform:'translateY(20px) scale(.94)'},{opacity:1,transform:'translateY(0) scale(1)'}]);lightSweep()}
  if(scene===growth){selectPhoto(2);animate(proof,[{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:850});count(growthNumber,2000);animate(rule,[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:600,delay:250,fill:'backwards'})}
  if(scene===comparison){count(concentrationDigits,10000);rows.forEach((row,i)=>animate(row.querySelector('i'),[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:800,delay:i*45,fill:'backwards'}));animate(comparison.querySelector('.p-proof-product'),[{opacity:.4,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:950})}
  if(scene===world)globeTo(pinnedRegion,true);
 }
 let arrivalTimer;
 function checkScenes(){
  const viewport=deck.clientHeight;
  scenes.forEach(scene=>{
   const bounds=scene.getBoundingClientRect(),visible=Math.max(0,Math.min(viewport,bounds.bottom)-Math.max(0,bounds.top));
   const inView=visible>Math.min(viewport,bounds.height)*.6&&bounds.top<120;
   if(inView&&!active.has(scene)){active.add(scene);enter(scene)}
   if(!inView&&active.has(scene)){active.delete(scene);if(scene===world)stopGlobe();if(scene===product)resetProduct()}
  });
 }
 function scheduleArrival(){clearTimeout(arrivalTimer);arrivalTimer=setTimeout(checkScenes,100)}
 deck.addEventListener('scroll',scheduleArrival,{passive:true});window.addEventListener('resize',()=>{drawGlobe();scheduleArrival()});document.addEventListener('pyderin:language',scheduleArrival);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){settle();stopGlobe()}else{drawGlobe();scheduleArrival()}});
 reduced.addEventListener('change',()=>{settle();resetProduct();globeTo(region)});
 scheduleArrival();
})();
