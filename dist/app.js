import {selectPosts, verified} from './ranking.js';
import {getLanguage,setLanguage,t,localizeProduct} from './i18n.js?v=6955e036e9';
const app=document.querySelector('#app');
const languageSelect=document.querySelector('#site-language');
let data,loadFailed=false,activeProductFilter='all',activeCountryFilter='';
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const format=n=>new Intl.NumberFormat(getLanguage()).format(n);
const product=id=>localizeProduct(data.products.find(p=>p.id===id));
const image=p=>`<img src="${escape(p.image)}" alt="${escape(p.name)}" loading="lazy" width="600" height="600">`;
const productCard=raw=>{const p=localizeProduct(raw);return `<a href="#product/${p.id}" class="product-card ${p.tone}"><div class="product-art">${image(p)}<span class="card-arrow"><span class="card-arrow-label">${t('영상 보기')}</span><span class="card-arrow-icon" aria-hidden="true">↗</span></span></div><div class="product-info"><h3>${p.name}</h3></div></a>`;};
function home(){
 const japan=data.posts.find(p=>p.id==='DaVBW_MS3QL'),taiwan=data.posts.find(p=>p.id==='DYhb86Woyrw');
 app.innerHTML=`<section class="fork-hero" aria-labelledby="hero-title">
  <h1 id="hero-title"><span>${t('인플루언서가 전하는 피더린')}</span><span>${t('제품별·국가별 마케팅 영상')}</span></h1>
  <div class="hero-paths" aria-label="${t('탐색 방식 선택')}">
   <a class="hero-path hero-path-products" href="#products" aria-labelledby="product-path-title">
    <div class="hero-path-copy"><h2 id="product-path-title">${t('제품별 영상')}</h2><span class="hero-path-cta">${t('살펴보기')}<span aria-hidden="true">↗</span></span></div>
    <div class="product-path-art" aria-hidden="true"><div class="hero-product-shelf">${['reju-cream','hydro-serum','clear-mask'].map(id=>`<div class="hero-product-cutout ${id}"><img src="assets/cutouts/${id}.png" alt="" width="1280" height="1280"></div>`).join('')}</div></div>
   </a>
   <a class="hero-path hero-path-markets" href="#countries" aria-labelledby="market-path-title">
    <div class="hero-path-copy"><h2 id="market-path-title">${t('국가별 영상')}</h2><span class="hero-path-cta">${t('살펴보기')}<span aria-hidden="true">↗</span></span></div>
    <div class="market-path-art" aria-hidden="true"><div class="creator-film film-japan"><img src="${escape(japan?.poster||product('reju-cream').image)}" alt="" fetchpriority="high"></div><div class="creator-film film-taiwan"><img src="${escape(taiwan?.poster||product('clear-mask').image)}" alt=""></div></div>
   </a>
  </div>
 </section>`;
}
function products(){
 app.innerHTML=`<section class="page-intro product-list-intro"><div><h1>${t('어떤 제품이 궁금하세요?')}</h1><p>${t('제품을 선택하면 조회수가 기록된 영상부터 최대 3개의 콘텐츠를 보여드립니다.')}</p></div></section><div class="filter-bar product-line-filters" role="group" aria-label="${t('제품 라인 필터')}">${[['all','전체 제품'],['REJUVUSTER','리쥬부스터'],['HYDROVUSTER','하이드로부스터'],['CLEARVUSTER','클리어부스터']].map(([id,n])=>`<button data-filter="${id}" aria-pressed="${id===activeProductFilter}">${t(n)}</button>`).join('')}</div><section id="product-grid" class="product-grid" aria-label="${t('제품 목록')}">${data.products.filter(p=>activeProductFilter==='all'||p.line===activeProductFilter).map(productCard).join('')}</section>`;
 app.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  activeProductFilter=button.dataset.filter;
  app.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  document.querySelector('#product-grid').innerHTML=data.products.filter(p=>activeProductFilter==='all'||p.line===activeProductFilter).map(productCard).join('');
 }));
}
function countries(){
 app.innerHTML=`<section class="page-intro market-list-intro"><div><h1>${t('세계의 시선으로 만나는 피더린')}</h1><p>${t('일본과 대만, 현지 크리에이터가 전하는 피더린의 이야기를 만나보세요.')}</p></div></section><section class="market-grid" aria-label="${t('국가별 쇼케이스')}">${data.markets.map(m=>{
  const ids=m.code==='JP'?['DaZ9pv2TFOY','DaVBW_MS3QL','DXEl4BGj4t5']:['Da9nhtcvTN4','DYhb86Woyrw','DXlzlduEvyu'];
  return `<a href="${escape(m.url)}" class="market-card ${m.code==='JP'?'japan':'taiwan'}"><div class="market-visual" aria-hidden="true"><div class="market-reels">${ids.map(id=>data.posts.find(p=>p.id===id)).filter(Boolean).map(p=>`<div class="market-reel"><img src="${escape(p.poster)}" alt="" loading="lazy"></div>`).join('')}</div></div><div class="market-info"><h2>${t(m.name)}</h2><span class="market-link-arrow" aria-hidden="true">↗</span></div></a>`;
 }).join('')}</section>`;
}
function marketDetail(code){
 const market=data.markets.find(m=>m.code===code);if(!market)return missing();
 const name=t(market.name);app.classList.add('showcase-main');
 app.innerHTML=`<section class="showcase-toolbar"><div><span class="eyebrow">LOCAL SHOWCASE</span><h1>${t('{market}에서 만나는 PYDERIN',{market:name})}</h1></div><div class="showcase-actions"><nav class="market-tabs" aria-label="${t('국가 선택')}">${data.markets.map(m=>`<a href="#country/${m.code}" ${m.code===code?'aria-current="page"':''}>${t(m.name)}</a>`).join('')}</nav><a class="external-link" href="${market.url}" target="_blank" rel="noopener noreferrer">${t('새 창에서 보기 ↗')}</a></div></section><div class="showcase-frame-wrap"><iframe class="showcase-frame" src="${market.url}" title="${t('PYDERIN {market} 크리에이터 영상 쇼케이스',{market:name})}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><p class="showcase-note">${t('쇼케이스 안내')} <a href="${market.url}" target="_blank" rel="noopener noreferrer">${t('새 창에서 보기 ↗')}</a></p>`;
}
function viewsText(post){
 return new Intl.NumberFormat(getLanguage(),{notation:'compact',maximumFractionDigits:getLanguage()==='en-US'?2:1}).format(post.views);
}
function videoCover(post){
 const p=product(post.productIds[0]);
 const cover=post.poster?`<img class="real-poster" src="${escape(post.poster)}" alt="${escape(t('{creator} 영상 미리보기',{creator:post.creator}))}" loading="lazy">`:p?image(p):'<span class="archive-mark">PYDERIN</span>';
 return `<button class="video-cover" data-play="${escape(post.id)}" aria-label="${escape(post.creator+' '+t(post.videoSrc?'영상 재생':'게시물 보기'))}">${cover}<span class="play" aria-hidden="true">${post.videoSrc?'▶':'↗'}</span>${!post.poster?`<span class="image-credit">${t(p?'연관 제품 이미지':'Instagram에서 콘텐츠 확인')}</span>`:''}</button>`;
}
function videoCard(post){
 const ranked=verified(post);
 return `<article class="video-card" data-post="${escape(post.id)}"><div class="video-stage">${videoCover(post)}</div><div class="video-feedback" role="status" hidden></div><div class="video-meta"><div class="video-stats"><div class="creator-identity"><span class="metric-label">${t('크리에이터')}</span><h3>@${escape(post.creator)}</h3></div><div class="view-metric"><span class="metric-label">${t('조회수')}</span><div class="view-value" ${ranked?`title="${escape(format(post.views))}"`:''}>${ranked?`<strong>${viewsText(post)}</strong>`:`<span class="metric-pending">${t('확인 중')}</span>`}</div></div></div><a class="instagram-button" href="${escape(post.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(t('{creator} Instagram 원본 보기',{creator:post.creator}))}"><span>${t('인스타 원본 보기')}</span><span aria-hidden="true">↗</span></a></div></article>`;
}
function productDetail(id){
 const p=product(id);if(!p)return missing();
 app.innerHTML=`<section class="detail-hero ${p.tone}"><div class="detail-image">${image(p)}</div><div class="detail-copy"><h1>${p.name}</h1><p>${p.fullName}</p><div class="detail-tags"><a href="${escape(p.source)}" target="_blank" rel="noopener noreferrer">${t('공식 제품 정보 ↗')}</a></div></div></section><section class="videos-section"><div class="section-heading"><div><h2>${t('영상으로 만나는 {product}',{product:p.name})}</h2></div></div><div class="selection-bar"><div class="filter-bar" role="group" aria-label="${t('영상 국가 필터')}">${[['','전체 국가'],['일본','일본'],['대만','대만']].map(([value,name])=>`<button data-country="${value}" aria-pressed="${value===activeCountryFilter}">${t(name)}</button>`).join('')}</div><span id="selection-count" class="small-label" aria-live="polite"></span></div><div id="video-grid" class="video-grid"></div><div id="selection-notice"></div><div class="detail-foot"><span>${t('자료 기준 {date} · 기록된 조회수가 높은 순',{date:data.snapshotDate})}</span><a href="#products">${t('다른 제품 둘러보기 →')}</a></div></section>`;
 function update(country=''){
  stopInlineMedia();
  const selection=selectPosts(data.posts,{productId:id,country,limit:3}),cards=selection.selected;
  document.querySelector('#selection-count').textContent=t('영상 {count}개',{count:cards.length});
  const note=selection.ranked.length?`${t('조회수가 기록된 영상부터 높은 순으로 선별했습니다.')} ${selection.references.length?t('조회수 미확인 콘텐츠는 뒤에 표시됩니다.')+' ':''}${t('전체 영상의 확정 순위는 아닙니다.')}`:t('이 제품은 조회수를 확인 중입니다. 시트에 등록된 관련 콘텐츠를 먼저 보여드립니다.');
  const sources=cards.filter(verified).map(post=>`<li><span>@${escape(post.creator)} · ${escape(post.viewsCheckedAt)}</span><a href="${escape(post.metricSource)}" target="_blank" rel="noopener noreferrer">${t('출처 ↗')}</a></li>`).join('');
  document.querySelector('#selection-notice').innerHTML=`<details class="metric-note"><summary>${t('조회수 기준')}</summary><p>${note}</p>${sources?`<ul>${sources}</ul>`:''}</details>`;
  document.querySelector('#video-grid').innerHTML=cards.length?cards.map(videoCard).join(''):`<div class="empty-state"><h3>${t('이 국가의 콘텐츠를 준비하고 있습니다.')}</h3><p>${t('전체 국가 또는 다른 국가를 선택해 주세요.')}</p></div>`;
 }
 app.querySelectorAll('[data-country]').forEach(button=>button.addEventListener('click',()=>{
  activeCountryFilter=button.dataset.country;
  app.querySelectorAll('[data-country]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));update(activeCountryFilter);
 }));update(activeCountryFilter);
}
function stopInlineMedia(exceptStage){
 app.querySelectorAll('.video-stage video').forEach(video=>{if(video.parentElement!==exceptStage)video.pause();});
 app.querySelectorAll('.video-stage iframe').forEach(frame=>{
  const stage=frame.parentElement;if(stage===exceptStage)return;
  const card=stage.closest('.video-card'),post=data?.posts.find(p=>p.id===card.dataset.post);
  if(post){stage.innerHTML=videoCover(post);card.querySelector('.video-feedback').hidden=true;}
 });
}
function playInline(id,trigger){
 const post=data.posts.find(p=>p.id===id);if(!post)return;
 const stage=trigger.closest('.video-stage'),note=stage.parentElement.querySelector('.video-feedback');
 stopInlineMedia(stage);note.hidden=true;note.textContent='';
 if(post.videoSrc){
  const media=document.createElement('video');media.controls=true;media.playsInline=true;media.preload='metadata';media.tabIndex=0;media.src=post.videoSrc;if(post.poster)media.poster=post.poster;
  media.setAttribute('aria-label',t('{creator} 크리에이터 영상',{creator:post.creator}));
  const showError=()=>{if(!media.isConnected)return;note.textContent=t('영상을 불러오지 못했습니다. 아래 Instagram 원본 링크에서 확인해 주세요.');note.hidden=false;};
  media.addEventListener('error',showError);
  media.addEventListener('play',()=>stopInlineMedia(stage));
  media.addEventListener('playing',()=>{note.hidden=true;});
  stage.replaceChildren(media);media.focus({preventScroll:true});
  media.play().catch(error=>{if(!media.isConnected||error.name==='AbortError')return;if(error.name==='NotAllowedError'){note.textContent=t('재생 버튼을 눌러 영상을 감상하세요.');note.hidden=false;}else showError();});
 }else{
  const frame=document.createElement('iframe');frame.src=post.url.replace(/\/?$/,'/')+'embed/';frame.title=t('Instagram 게시물 · {creator}',{creator:post.creator});frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';
  stage.replaceChildren(frame);frame.focus({preventScroll:true});note.textContent=t('게시물이 표시되지 않으면 아래 인스타 원본을 확인해 주세요.');note.hidden=false;
 }
}
function applyShellLanguage(){
 document.documentElement.lang=getLanguage();languageSelect.value=getLanguage();
 languageSelect.setAttribute('aria-label',t('언어 선택'));
 document.querySelector('.language-label').textContent=t('언어 선택');
 document.querySelector('.wordmark').setAttribute('aria-label',t('PYDERIN 처음으로'));
 document.querySelector('.header-nav').setAttribute('aria-label',t('주 메뉴'));
 document.querySelector('.official-link').textContent=t('공식 사이트 ↗');
 document.querySelector('.skip-link').textContent=t('본문으로 바로가기');
 document.querySelector('footer>span:last-child').textContent=t('제품과 시장을 연결하는 크리에이터 콘텐츠');
 document.querySelector('meta[name="description"]').content='PYDERIN · '+t('바이어 영상 라이브러리');
}
function missing(){app.innerHTML=`<div class="empty-state"><h1>${t('페이지를 찾을 수 없습니다.')}</h1><a href="#">${t('홈으로 돌아가기 →')}</a></div>`;}
function route(options={}){
 if(!data)return;const position=window.scrollY;stopInlineMedia();app.classList.remove('showcase-main');
 if(!options.preservePosition){activeProductFilter='all';activeCountryFilter='';}
 const [view,id]=location.hash.slice(1).split('/');document.body.classList.toggle('is-home',!view);
 const isMarket=view==='countries'||view==='country';document.body.classList.toggle('is-market',isMarket);document.querySelector('meta[name="theme-color"]').content='#ffffff';
 if(!view)home();else if(view==='products')products();else if(view==='countries')countries();else if(view==='product')productDetail(id);else if(view==='country')marketDetail(id);else missing();
 document.title=(view==='product'&&product(id)?product(id).name:view==='country'?t(data.markets.find(m=>m.code===id)?.name||'')+' '+t('쇼케이스'):view==='products'?t('제품별 영상'):view==='countries'?t('국가별 쇼케이스'):t('바이어 영상 라이브러리'))+' · PYDERIN';
 window.scrollTo({top:options.preservePosition?position:0});if(!options.preservePosition)app.focus({preventScroll:true});
}
function loadError(){app.innerHTML=`<div class="empty-state"><h1>${t('데이터를 불러오지 못했습니다.')}</h1><p>${t('잠시 후 페이지를 새로고침해 주세요.')}</p><button id="retry-load">${t('다시 불러오기')}</button></div>`;document.querySelector('#retry-load').addEventListener('click',()=>location.reload());}
languageSelect.addEventListener('change',()=>{setLanguage(languageSelect.value);applyShellLanguage();if(data)route({preservePosition:true});else if(loadFailed)loadError();else document.querySelector('.loading').textContent=t('영상 라이브러리를 불러오고 있습니다…');});
document.querySelector('.skip-link').addEventListener('click',e=>{e.preventDefault();app.focus();});
app.addEventListener('click',event=>{const trigger=event.target.closest('button[data-play]');if(trigger)playInline(trigger.dataset.play,trigger);});
applyShellLanguage();document.querySelector('.loading').textContent=t('영상 라이브러리를 불러오고 있습니다…');
try{const response=await fetch('catalog.json');if(!response.ok)throw Error();data=await response.json();window.addEventListener('hashchange',route);route();}catch{loadFailed=true;loadError();}
