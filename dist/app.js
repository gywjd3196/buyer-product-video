import {selectPosts, verified} from './ranking.js';
const app = document.querySelector('#app');
const dialog = document.querySelector('dialog');
let data;
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const format = n => new Intl.NumberFormat('ko-KR').format(n);
const product = id => data.products.find(p => p.id === id);
const image = p => `<img src="${p.image}" alt="${escape(p.name)}" loading="lazy" width="600" height="600">`;
const crumb = text => `<nav class="breadcrumb" aria-label="현재 위치"><a href="#">라이브러리</a><span>/</span>${text}</nav>`;
const count = id => data.posts.filter(p => p.productIds.includes(id)).length;
const productCard = p => `<a href="#product/${p.id}" class="product-card ${p.tone}"><div class="product-art">${image(p)}<span class="card-arrow">↗</span></div><div class="product-info"><span class="eyebrow">${p.line}</span><h3>${p.name}</h3><p>${p.fullName}</p><div class="card-bottom"><span>연결 게시물 ${count(p.id)}개</span><span>영상 보기 →</span></div></div></a>`;
function home() {
 app.innerHTML = `<section class="intro"><div class="eyebrow"><span class="green-dot"></span> PYDERIN CONTENT ARCHIVE</div><h1>제품의 매력,<br><span>영상으로 만나다.</span></h1><p>제품부터, 또는 국가부터.<br class="mobile-only"> 원하는 방식으로 크리에이터 콘텐츠를 살펴보세요.</p></section><section class="entry-grid" aria-label="탐색 방식 선택"><a href="#products" class="entry-card entry-products"><div class="entry-copy"><span class="eyebrow">01 / BY PRODUCT</span><h2>제품별</h2><p>제품을 고르고<br>관련 영상을 한눈에.</p><span class="round-arrow">↗</span></div><div class="product-collage">${image(product('reju-cream'))}${image(product('hydro-serum'))}${image(product('clear-mask'))}</div><span class="entry-bottom">${data.products.length} PRODUCTS <span>제품 카탈로그 둘러보기 →</span></span></a><a href="#countries" class="entry-card entry-countries"><div class="entry-copy"><span class="eyebrow">02 / BY COUNTRY</span><h2>국가별</h2><p>일본과 대만,<br>시장별 콘텐츠를 발견하세요.</p><span class="round-arrow">↗</span></div><div class="country-art" aria-hidden="true"><div class="country-disc japan"><i></i><span>JAPAN</span></div><div class="country-disc taiwan"><i>✦</i><span>TAIWAN</span></div><div class="orbit"></div></div><span class="entry-bottom">2 MARKETS <span>국가별 영상 둘러보기 →</span></span></a></section><div class="home-note"><span>선별된 제품, 다양한 시선.</span><p>공유 시트에 등록된 제품과 공개 게시물을 모았습니다.</p></div>`;
}
function products() {
 app.innerHTML = `${crumb('제품별')}<section class="page-intro"><div><span class="eyebrow">BY PRODUCT</span><h1>제품 카탈로그<span class="title-count">${data.products.length}</span></h1><p>궁금한 제품을 선택하고 크리에이터 콘텐츠를 확인하세요.</p></div><span class="small-label">PYDERIN COLLECTION</span></section><div class="filter-bar" role="group" aria-label="제품 라인 필터">${[['all','전체 제품'],['REJUVUSTER','리쥬부스터'],['HYDROVUSTER','하이드로부스터'],['CLEARVUSTER','클리어부스터']].map(([id,n],i)=>`<button data-filter="${id}" aria-pressed="${i===0}">${n}</button>`).join('')}</div><section id="product-grid" class="product-grid" aria-label="제품 목록">${data.products.map(productCard).join('')}</section>`;
 app.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  app.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  document.querySelector('#product-grid').innerHTML=data.products.filter(p=>button.dataset.filter==='all'||p.line===button.dataset.filter).map(productCard).join('');
 }));
}
function countries() {
 app.innerHTML = `${crumb('국가별')}<section class="page-intro"><div><span class="eyebrow">BY COUNTRY</span><h1>어느 시장이 궁금하세요?</h1><p>시트에 등록된 크리에이터의 국적을 기준으로 분류했습니다.</p></div></section><section class="market-grid">${[['일본','JAPAN','JP','japan'],['대만','TAIWAN','TW','taiwan']].map(([name,en,code,cls])=>`<a href="#country/${code}" class="market-card"><div class="market-visual ${cls}"><div class="flag ${cls}" aria-hidden="true">${cls==='japan'?'<i></i>':'<i>☀</i>'}</div><span>${code}</span></div><div class="market-info"><span class="eyebrow">${en}</span><h2>${name} <span>↗</span></h2><p>연결 게시물 ${data.posts.filter(p=>p.country===name).length}개</p></div></a>`).join('')}</section>`;
}
function videoCard(post,index,ranked=false) {
 const p=product(post.productIds[0]);
 return `<article class="video-card"><button class="video-cover ${p?.tone||'neutral'}" data-play="${post.id}" aria-label="${escape(post.creator)} 게시물 열기">${p?image(p):'<span class="archive-mark">PYDERIN<span>CREATOR CONTENT</span></span>'}<span class="video-label">${ranked?'영상':'Instagram 게시물'}</span><span class="play">▶</span>${ranked?`<span class="rank">${String(index+1).padStart(2,'0')}</span>`:''}<span class="image-credit">${p?'연관 제품 이미지':'원본에서 콘텐츠 확인'}</span></button><div class="video-meta"><span class="eyebrow">${post.country==='일본'?'JAPAN':'TAIWAN'} · INSTAGRAM</span><h3>@${escape(post.creator)}</h3><p>${post.productIds.length?post.productIds.map(id=>product(id)?.name).filter(Boolean).join(' · '):'제품 정보 미기재'}</p><div class="video-bottom"><span>${ranked?`조회수 <strong>${format(post.views)}</strong>`:'조회수 미확인'}</span><a href="${post.url}" target="_blank" rel="noopener noreferrer" aria-label="${escape(post.creator)} Instagram 원본 보기">원본 보기 ↗</a></div>${ranked?`<small>확인: ${escape(post.viewsCheckedAt)} · <a href="${escape(post.metricSource)}" target="_blank" rel="noopener noreferrer">조회수 출처</a></small>`:''}</div></article>`;
}
function detail(type,id) {
 const isProduct=type==='product'; const p=isProduct?product(id):null;
 const country=id==='JP'?'일본':id==='TW'?'대만':null;
 if ((isProduct&&!p)||(!isProduct&&!country)) return missing();
 const selection=selectPosts(data.posts,{productId:p?.id,country:isProduct?null:country,limit:isProduct?3:5});
 const title=p?.name||country; const limit=isProduct?3:5;
 app.innerHTML = `${crumb(`<a href="#${isProduct?'products':'countries'}">${isProduct?'제품별':'국가별'}</a><span>/</span>${title}`)}<section class="detail-hero ${p?.tone||'neutral'}">${p?`<div class="detail-image">${image(p)}</div>`:`<div class="detail-country"><span>${id}</span><div class="flag ${id==='JP'?'japan':'taiwan'}">${id==='JP'?'<i></i>':'<i>☀</i>'}</div></div>`}<div class="detail-copy"><span class="eyebrow">${p?.line||'BY COUNTRY / '+(id==='JP'?'JAPAN':'TAIWAN')}</span><h1>${title}</h1><p>${p?.fullName||'이 시장의 크리에이터 콘텐츠를 살펴보세요.'}</p><div class="detail-tags"><span>연결 게시물 ${selection.candidates.length}개</span><span>조회수 확인 ${selection.candidates.filter(verified).length}개</span></div></div></section><section class="videos-section"><div class="section-heading"><div><span class="eyebrow">VIDEO SELECTION</span><h2>${selection.ranked.length?(selection.complete?`조회수 TOP ${limit}`:'조회수가 확인된 영상'):'영상 둘러보기'}</h2></div><span class="small-label">${selection.ranked.length?'조회수 높은 순':'조회수 확인 대기'}</span></div><div class="data-notice"><span aria-hidden="true">ⓘ</span><p>${selection.complete?'기록된 조회수를 기준으로 정렬했습니다. 실제 조회수는 이후 달라질 수 있습니다.':`원본 시트에 조회수가 없어 ${isProduct?'제품별 TOP 3':'국가별 TOP 5'} 순위는 아직 확정되지 않았습니다. ${selection.ranked.length?'아래 순위는 조회수가 확인된 영상만을 대상으로 합니다.':'아래는 시트 등록 순서의 참고 게시물이며, 영상 여부와 조회수 확인이 필요합니다.'}`}</p></div>${selection.ranked.length?`<div class="video-grid">${selection.ranked.map((v,i)=>videoCard(v,i,true)).join('')}</div>`:''}${selection.references.length?`${selection.ranked.length?'<h3 class="reference-title">조회수 미확인 참고 게시물</h3>':''}<div class="video-grid">${selection.references.map((v,i)=>videoCard(v,i)).join('')}</div>`:''}${!selection.candidates.length?'<div class="empty-state">아직 연결된 공개 게시물이 없습니다.</div>':''}<div class="detail-foot"><span>시트 확인일 ${data.snapshotDate} · 동일 게시물 중복 제거</span><a href="#${isProduct?'products':'countries'}">${isProduct?'다른 제품':'다른 국가'} 둘러보기 →</a></div></section>`;
 app.querySelectorAll('[data-play]').forEach(b=>b.addEventListener('click',()=>play(b.dataset.play)));
}
function play(id) {
 const post=data.posts.find(p=>p.id===id);
 document.querySelector('#dialog-title').textContent='@'+post.creator;
 document.querySelector('#original-link').href=post.url;
 const frame=document.createElement('iframe'); frame.src=post.url+'embed/'; frame.title='Instagram 게시물 · '+post.creator; frame.allow='autoplay; encrypted-media; picture-in-picture'; frame.referrerPolicy='strict-origin-when-cross-origin';
 document.querySelector('#embed').replaceChildren(frame); dialog.showModal();
}
function missing() {app.innerHTML='<div class="empty-state"><h1>페이지를 찾을 수 없습니다.</h1><a href="#">라이브러리로 돌아가기 →</a></div>';}
function route() {
 const [view,id]=location.hash.slice(1).split('/');
 if (!view) home(); else if(view==='products') products(); else if(view==='countries') countries(); else if(view==='product'||view==='country') detail(view,id); else missing();
 window.scrollTo({top:0}); app.focus({preventScroll:true});
}
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>document.querySelector('#embed').replaceChildren());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
try {const response=await fetch('catalog.json'); if(!response.ok) throw Error(); data=await response.json();window.addEventListener('hashchange',route);route();} catch {app.innerHTML='<div class="empty-state"><h1>데이터를 불러오지 못했습니다.</h1><p>잠시 후 페이지를 새로고침해 주세요.</p><button onclick="location.reload()">다시 불러오기</button></div>';}
