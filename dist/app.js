import {selectPosts, verified} from './ranking.js';
const app = document.querySelector('#app');
const dialog = document.querySelector('#video-dialog');
let data;
let lastTrigger;
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const format = n => new Intl.NumberFormat('ko-KR').format(n);
const product = id => data.products.find(p => p.id === id);
const image = p => `<img src="${escape(p.image)}" alt="${escape(p.name)}" loading="lazy" width="600" height="600">`;
const crumb = text => `<nav class="breadcrumb" aria-label="현재 위치"><a href="#">홈</a><span>/</span>${text}</nav>`;
const recorded = id => data.posts.filter(p => !p.unavailable && p.productIds.includes(id) && verified(p)).length;
const productCard = p => `<a href="#product/${p.id}" class="product-card ${p.tone}"><div class="product-art">${image(p)}<span class="card-arrow" aria-hidden="true">↗</span></div><div class="product-info"><span class="eyebrow">${p.line}</span><h3>${p.name}</h3><p>${p.fullName}</p><div class="card-bottom"><span>${recorded(p.id) ? '조회수 높은 영상 최대 3개' : '등록 콘텐츠 최대 3개'}</span><span>영상 보기 →</span></div></div></a>`;

function home() {
 app.innerHTML = `<section class="intro"><div class="eyebrow"><span class="green-dot"></span> GLOBAL MARKETING LIBRARY</div><h1>피더린의 매력을,<br><span>세계의 시선으로.</span></h1><p>제품별로 살펴보거나, 관심 있는 시장을 선택하세요.<br>크리에이터가 전하는 PYDERIN의 이야기가 시작됩니다.</p></section><section class="entry-grid" aria-label="탐색 방식 선택"><a href="#products" class="entry-card entry-products"><div class="entry-copy"><span class="eyebrow">01 / EXPLORE BY PRODUCT</span><h2>제품별 영상 보기</h2><p>관심 있는 제품을 선택하고<br>대표 콘텐츠를 만나보세요.</p><span class="round-arrow" aria-hidden="true">↗</span></div><div class="product-collage" aria-hidden="true">${image(product('reju-cream'))}${image(product('hydro-serum'))}${image(product('clear-mask'))}</div><span class="entry-bottom">${data.products.length} PRODUCTS <span>제품별 최대 3개 콘텐츠 →</span></span></a><a href="#countries" class="entry-card entry-countries"><div class="entry-copy"><span class="eyebrow">02 / EXPLORE BY MARKET</span><h2>국가별 영상 보기</h2><p>일본과 대만의 크리에이터가<br>소개하는 피더린을 만나보세요.</p><span class="round-arrow" aria-hidden="true">↗</span></div><div class="country-art" aria-hidden="true"><div class="country-disc japan"><i></i><span>JAPAN</span></div><div class="country-disc taiwan"><i>✦</i><span>TAIWAN</span></div><div class="orbit"></div></div><span class="entry-bottom">2 MARKETS <span>일본 · 대만 쇼케이스 →</span></span></a></section><div class="home-note"><span>One brand. Different perspectives.</span><p>PYDERIN · BUYER VIDEO COLLECTION</p></div>`;
}
function products() {
 app.innerHTML = `${crumb('제품별')}<section class="page-intro"><div><span class="eyebrow">EXPLORE BY PRODUCT</span><h1>어떤 제품이 궁금하세요?<span class="title-count">${data.products.length}</span></h1><p>제품을 선택하면 조회수가 기록된 영상부터 최대 3개의 콘텐츠를 보여드립니다.</p></div><span class="small-label">PYDERIN COLLECTION</span></section><div class="filter-bar" role="group" aria-label="제품 라인 필터">${[['all','전체 제품'],['REJUVUSTER','리쥬부스터'],['HYDROVUSTER','하이드로부스터'],['CLEARVUSTER','클리어부스터']].map(([id,n],i)=>`<button data-filter="${id}" aria-pressed="${i===0}">${n}</button>`).join('')}</div><section id="product-grid" class="product-grid" aria-label="제품 목록">${data.products.map(productCard).join('')}</section>`;
 app.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  app.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  document.querySelector('#product-grid').innerHTML=data.products.filter(p=>button.dataset.filter==='all'||p.line===button.dataset.filter).map(productCard).join('');
 }));
}
function countries() {
 app.innerHTML = `${crumb('국가별')}<section class="page-intro"><div><span class="eyebrow">EXPLORE BY MARKET</span><h1>어느 시장을 살펴볼까요?</h1><p>국가를 선택하면 현지 크리에이터 영상과 제품을 한 페이지에서 볼 수 있습니다.</p></div><span class="small-label">2 LOCAL SHOWCASES</span></section><section class="market-grid">${data.markets.map(m=>`<a href="#country/${m.code}" class="market-card"><div class="market-visual ${m.code==='JP'?'japan':'taiwan'}"><div class="flag ${m.code==='JP'?'japan':'taiwan'}" aria-hidden="true">${m.code==='JP'?'<i></i>':'<i>☀</i>'}</div><span>${m.code}</span></div><div class="market-info"><span class="eyebrow">${m.english} SHOWCASE</span><h2>${m.name} <small>${m.native}</small><span aria-hidden="true">↗</span></h2><p>크리에이터 영상 ${m.featuredCount}개 · ${m.code==='JP'?'日本語':'繁體中文'} / 한국어</p><div class="market-action">쇼케이스 둘러보기 <span>→</span></div></div></a>`).join('')}</section>`;
}
function marketDetail(code) {
 const market=data.markets.find(m=>m.code===code);
 if(!market) return missing();
 app.classList.add('showcase-main');
 app.innerHTML = `${crumb(`<a href="#countries">국가별</a><span>/</span>${market.name}`)}<section class="showcase-toolbar"><div><span class="eyebrow">LOCAL SHOWCASE</span><h1>${market.name}에서 만나는 PYDERIN</h1></div><div class="showcase-actions"><nav class="market-tabs" aria-label="국가 선택">${data.markets.map(m=>`<a href="#country/${m.code}" ${m.code===code?'aria-current="page"':''}>${m.name}</a>`).join('')}</nav><a class="external-link" href="${market.url}" target="_blank" rel="noopener noreferrer">새 창에서 보기 ↗</a></div></section><div class="showcase-frame-wrap"><iframe class="showcase-frame" src="${market.url}" title="PYDERIN ${market.name} 크리에이터 영상 쇼케이스" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><p class="showcase-note">기존 ${market.name} 쇼케이스입니다. 크게 보려면 <a href="${market.url}" target="_blank" rel="noopener noreferrer">새 창에서 보기 ↗</a>를 선택하세요.</p>`;
}
function viewsText(post) {
 return `${post.viewsApproximate?'약 ':''}${post.viewsDisplay || format(post.views)}${post.viewsDisplay?.includes('만')?'':'회'}`;
}
function videoCard(post,index,ranked=false) {
 const p=product(post.productIds[0]);
 const cover=post.poster?`<img class="real-poster" src="${escape(post.poster)}" alt="${escape(post.creator)} 영상 미리보기" loading="lazy">`:p?image(p):'<span class="archive-mark">PYDERIN<span>CREATOR CONTENT</span></span>';
 return `<article class="video-card"><button class="video-cover ${p?.tone||'neutral'}" data-play="${post.id}" aria-label="${escape(post.creator)} ${ranked?'영상 재생':'게시물 보기'}">${cover}<span class="video-label">${ranked?'CREATOR FILM':'등록 콘텐츠'}</span><span class="play" aria-hidden="true">▶</span>${ranked?`<span class="rank">${String(index+1).padStart(2,'0')}</span>`:''}${!post.poster?`<span class="image-credit">${p?'연관 제품 이미지':'Instagram에서 콘텐츠 확인'}</span>`:''}</button><div class="video-meta"><span class="eyebrow">${post.country==='일본'?'JAPAN':'TAIWAN'} · INSTAGRAM</span><h3>@${escape(post.creator)}</h3><p>${post.productIds.map(id=>escape(product(id)?.name)).filter(Boolean).join(' · ')}</p><div class="video-bottom"><span>${ranked?`조회수 <strong>${viewsText(post)}</strong>`:'조회수 확인 예정'}</span><a href="${escape(post.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(post.creator)} Instagram 원본 보기">원본 보기 ↗</a></div>${ranked?`<small>${post.metricBasis==='showcase'?'쇼케이스 기록':'조회수 확인'} ${escape(post.viewsCheckedAt)} · <a href="${escape(post.metricSource)}" target="_blank" rel="noopener noreferrer">출처 ↗</a></small>`:''}</div></article>`;
}
function productDetail(id) {
 const p=product(id);
 if(!p) return missing();
 app.innerHTML = `${crumb(`<a href="#products">제품별</a><span>/</span>${p.name}`)}<section class="detail-hero ${p.tone}"><div class="detail-image">${image(p)}</div><div class="detail-copy"><span class="eyebrow">${p.line}</span><h1>${p.name}</h1><p>${p.fullName}</p><div class="detail-tags"><span>제품별 최대 3개 콘텐츠</span><a href="${escape(p.source)}" target="_blank" rel="noopener noreferrer">공식 제품 정보 ↗</a></div></div></section><section class="videos-section"><div class="section-heading"><div><span class="eyebrow">CREATOR SELECTION</span><h2>영상으로 만나는 ${p.name}</h2></div></div><div class="selection-bar"><div class="filter-bar" role="group" aria-label="영상 국가 필터">${[['','전체 국가'],['일본','일본'],['대만','대만']].map(([value,name],i)=>`<button data-country="${value}" aria-pressed="${i===0}">${name}</button>`).join('')}</div><span id="selection-count" class="small-label" aria-live="polite"></span></div><div id="selection-notice"></div><div id="video-grid" class="video-grid"></div><div class="detail-foot"><span>자료 기준 ${data.snapshotDate} · 기록된 조회수가 높은 순</span><a href="#products">다른 제품 둘러보기 →</a></div></section>`;
 function update(country='') {
  const selection=selectPosts(data.posts,{productId:id,country,limit:3});
  const cards=selection.selected;
  document.querySelector('#selection-count').textContent=`${cards.length} CONTENTS`;
  document.querySelector('#selection-notice').innerHTML=selection.ranked.length?`<p class="selection-note">조회수가 기록된 영상부터 높은 순으로 선별했습니다.${selection.references.length?' 조회수 미확인 콘텐츠는 뒤에 표시됩니다.':''} 전체 영상의 확정 순위는 아닙니다.</p>`:`<p class="selection-note">이 제품은 조회수를 확인 중입니다. 시트에 등록된 관련 콘텐츠를 먼저 보여드립니다.</p>`;
  document.querySelector('#video-grid').innerHTML=cards.length?cards.map((post,i)=>videoCard(post,i,verified(post))).join(''):'<div class="empty-state"><h3>이 국가의 콘텐츠를 준비하고 있습니다.</h3><p>전체 국가 또는 다른 국가를 선택해 주세요.</p></div>';
  app.querySelectorAll('[data-play]').forEach(b=>b.addEventListener('click',()=>play(b.dataset.play,b)));
 }
 app.querySelectorAll('[data-country]').forEach(button=>button.addEventListener('click',()=>{
  app.querySelectorAll('[data-country]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  update(button.dataset.country);
 }));
 update();
}
function play(id,trigger) {
 const post=data.posts.find(p=>p.id===id);
 if(!post) return;
 lastTrigger=trigger;
 document.querySelector('#dialog-title').textContent='@'+post.creator;
 document.querySelector('#original-link').href=post.url;
 const note=document.querySelector('.embed-note');
 let media;
 if(post.videoSrc){
  media=document.createElement('video');media.src=post.videoSrc;media.controls=true;media.playsInline=true;media.preload='metadata';
  if(post.poster) media.poster=post.poster;
  media.setAttribute('aria-label',post.creator+' 크리에이터 영상');
  media.addEventListener('error',()=>{note.textContent='영상을 불러오지 못했습니다. 아래 Instagram 원본 링크에서 확인해 주세요.'});
  note.textContent='재생 버튼을 눌러 영상을 감상하세요.';
 }else{
  media=document.createElement('iframe');media.src=post.url+'embed/';media.title='Instagram 게시물 · '+post.creator;media.allow='autoplay; encrypted-media; picture-in-picture';media.referrerPolicy='strict-origin-when-cross-origin';
  note.textContent='Instagram 설정에 따라 로그인이 필요할 수 있습니다. 표시되지 않으면 원본 보기를 이용해 주세요.';
 }
 document.querySelector('#embed').replaceChildren(media);dialog.showModal();
}
function missing() {app.innerHTML='<div class="empty-state"><h1>페이지를 찾을 수 없습니다.</h1><a href="#">홈으로 돌아가기 →</a></div>';}
function route() {
 if(dialog.open) dialog.close();
 app.classList.remove('showcase-main');
 const [view,id]=location.hash.slice(1).split('/');
 document.querySelectorAll('[data-nav]').forEach(a=>{
  const active=a.dataset.nav==='products'?(view==='products'||view==='product'):(view==='countries'||view==='country');
  if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
 });
 if(!view) home();else if(view==='products') products();else if(view==='countries') countries();else if(view==='product') productDetail(id);else if(view==='country') marketDetail(id);else missing();
 document.title=(view==='product'&&product(id)?product(id).name:view==='country'?data.markets.find(m=>m.code===id)?.name+' 쇼케이스':view==='products'?'제품별 영상':view==='countries'?'국가별 쇼케이스':'바이어 영상 라이브러리')+' · PYDERIN';
 window.scrollTo({top:0});app.focus({preventScroll:true});
}
document.querySelector('.skip-link').addEventListener('click',e=>{e.preventDefault();app.focus();});
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.querySelector('#embed video')?.pause();document.querySelector('#embed').replaceChildren();if(lastTrigger?.isConnected)lastTrigger.focus();});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
try{const response=await fetch('catalog.json');if(!response.ok)throw Error();data=await response.json();window.addEventListener('hashchange',route);route();}catch{app.innerHTML='<div class="empty-state"><h1>데이터를 불러오지 못했습니다.</h1><p>잠시 후 페이지를 새로고침해 주세요.</p><button id="retry-load">다시 불러오기</button></div>';document.querySelector('#retry-load').addEventListener('click',()=>location.reload());}
