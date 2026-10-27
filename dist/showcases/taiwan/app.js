// Updated 2026-10-27. Views: retained showcase counts + user-provided replacements.
// Likes: public Instagram post/embed counts. 24K is rounded; _qqsheep hides likes.
// Hero carousel and stories share the same view-ranked order.
const reels=[
  {
    "id": "Dbr8U3Oy9qz",
    "creator": "_yk_yuan",
    "viewsCount": 303000,
    "likes": 24000,
    "likesApproximate": true,
    "products": [
      "reju",
      "clear"
    ],
    "src": "https://storage.googleapis.com/creo-studio-app-media/videos/instagram/Dbr8U3Oy9qz.mp4",
    "poster": "assets/Dbr8U3Oy9qz.jpg",
    "url": "https://www.instagram.com/reel/Dbr8U3Oy9qz/"
  },
  {
    "id": "DcaKhUxpTJh",
    "creator": "lois06277",
    "viewsCount": 276000,
    "likes": 4576,
    "products": [
      "reju",
      "clear"
    ],
    "src": "https://storage.googleapis.com/creo-studio-app-media/videos/instagram/DcaKhUxpTJh.mp4",
    "poster": "assets/DcaKhUxpTJh.jpg",
    "url": "https://www.instagram.com/reel/DcaKhUxpTJh/"
  },
  {
    "id": "Db8FMjJoDYY",
    "creator": "lala._.0412",
    "viewsCount": 65000,
    "likes": 3812,
    "products": [
      "reju"
    ],
    "src": "https://storage.googleapis.com/creo-studio-app-media/videos/instagram/Db8FMjJoDYY.mp4",
    "poster": "assets/Db8FMjJoDYY.jpg",
    "url": "https://www.instagram.com/reel/Db8FMjJoDYY/"
  },
  {
    "id": "Dd6RHNRp0_K",
    "creator": "_qqsheep",
    "viewsCount": 25000,
    "likes": null,
    "likesHidden": true,
    "products": [
      "reju"
    ],
    "src": "https://storage.googleapis.com/creo-studio-app-media/videos/instagram/Dd6RHNRp0_K.mp4",
    "poster": "assets/Dd6RHNRp0_K.jpg",
    "url": "https://www.instagram.com/reel/Dd6RHNRp0_K/"
  },
  {
    "id": "DdTvW_XAvIy",
    "creator": "inesinesw",
    "viewsCount": 12000,
    "likes": 2181,
    "products": [
      "reju",
      "clear"
    ],
    "src": "https://storage.googleapis.com/creo-studio-app-media/videos/instagram/DdTvW_XAvIy.mp4",
    "poster": "assets/DdTvW_XAvIy.jpg",
    "url": "https://www.instagram.com/reel/DdTvW_XAvIy/"
  }
].sort((a,b)=>b.viewsCount-a.viewsCount);
const productCatalog={reju:{image:'assets/reju-cream.jpg',nameKo:'리쥬부스터 크림',nameZh:'REJUVUSTER 活膚修護霜',line:'REJUVUSTER',url:'https://pyderin.com/product-detail?id=rejuvuster'},clear:{image:'assets/clear-mask.jpg',nameKo:'클리어부스터 마스크팩',nameZh:'CLEARVUSTER 淨膚面膜',line:'CLEARVUSTER',url:'https://pyderin.com/product-detail?id=pyderin-clearvuster-pdrn-skin-reset-mineral-mask'}};
const translations={
  "ko": {
    "officialSite": "공식 사이트",
    "title": "대만에서 만나는 <strong>PYDERIN</strong>",
    "creator": "아이디",
    "views": "조회수",
    "likes": "좋아요",
    "pendingMetric": "확인 예정",
    "hiddenMetric": "비공개",
    "viewOriginal": "Instagram 원본 보기",
    "reels": "REELS · TAIWAN",
    "featuredVideo": "FEATURED VIDEO",
    "videoTitle": "대만 크리에이터가<br><strong>소개한 피더린</strong>",
    "platform": "Instagram Reels · 대만",
    "introducedProducts": "영상 속 추천 제품",
    "featuredProducts": "FEATURED PRODUCTS",
    "productTitle": "영상에서 소개된<br><strong>피더린 제품</strong>",
    "productDesc": "영상에서 확인할 수 있는 피더린의 주요 제품을 만나보세요.",
    "allProducts": "전체 제품 보기",
    "productLink": "제품 정보 보기",
    "rejuProduct": "리쥬부스터 크림",
    "clearProduct": "클리어부스터 마스크팩",
    "mediaTitle": "한국에서 쌓아온 브랜드 경험을, 글로벌 시장으로.",
    "mediaDesc": "PYDERIN은 전문가 네트워크, 오프라인 채널, 소비자 캠페인과 다양한 브랜드 활동을<br>통해 국내에서 브랜드 접점을 확대해가고 있습니다.",
    "businessInquiry": "비즈니스 문의",
    "bizInfo": "사업자 정보",
    "bizCompany": "(주)피더린",
    "bizAddressLabel": "주소",
    "bizAddress": "06127 서울특별시 강남구 봉은사로22길 18",
    "bizEmail": "이메일",
    "bizCeo": "대표자명",
    "bizCeoName": "김영훈",
    "bizPrivacy": "개인정보보호책임자",
    "copied": "복사됨"
  },
  "zh": {
    "officialSite": "官方網站",
    "title": "在台灣遇見 <strong>PYDERIN</strong>",
    "creator": "帳號",
    "views": "觀看次數",
    "likes": "按讚數",
    "pendingMetric": "確認中",
    "hiddenMetric": "未公開",
    "viewOriginal": "前往 Instagram",
    "reels": "REELS · TAIWAN",
    "featuredVideo": "FEATURED VIDEO",
    "videoTitle": "台灣創作者<br><strong>推薦的 PYDERIN</strong>",
    "platform": "Instagram Reels · 台灣",
    "introducedProducts": "影片中的推薦產品",
    "featuredProducts": "FEATURED PRODUCTS",
    "productTitle": "影片中介紹的<br><strong>PYDERIN 產品</strong>",
    "productDesc": "探索影片中亮相的 PYDERIN 主要產品。",
    "allProducts": "查看所有產品",
    "productLink": "查看產品資訊",
    "rejuProduct": "REJUVUSTER 活膚修護霜",
    "clearProduct": "CLEARVUSTER 淨膚面膜",
    "mediaTitle": "從韓國累積的品牌經驗，走向全球市場。",
    "mediaDesc": "PYDERIN 透過專業人士網絡、線下通路、消費者活動與多元品牌行銷，<br>持續拓展品牌與消費者的接觸點。",
    "businessInquiry": "商務洽詢",
    "bizInfo": "公司資訊",
    "bizCompany": "PYDERIN 股份有限公司",
    "bizAddressLabel": "地址",
    "bizAddress": "06127 韓國首爾特別市江南區奉恩寺路22街18",
    "bizEmail": "電子郵件",
    "bizCeo": "負責人",
    "bizCeoName": "金榮勳",
    "bizPrivacy": "個資保護負責人",
    "copied": "已複製"
  },
  "en": {
    "officialSite": "Official website",
    "creator": "ID",
    "views": "Views",
    "likes": "Likes",
    "pendingMetric": "Pending",
    "hiddenMetric": "Private",
    "viewOriginal": "View on Instagram",
    "featuredVideo": "FEATURED VIDEO",
    "introducedProducts": "Products in this video",
    "featuredProducts": "FEATURED PRODUCTS",
    "productTitle": "PYDERIN products<br><strong>featured in the videos</strong>",
    "productDesc": "Discover the PYDERIN products featured by our creators.",
    "allProducts": "View all products",
    "productLink": "View product details",
    "rejuProduct": "Rejuvuster Cream",
    "clearProduct": "Clearvuster Mask",
    "mediaTitle": "Brand experiences built in Korea, shared with the world.",
    "mediaDesc": "Through expert networks, offline channels, consumer campaigns and brand activities,<br>PYDERIN continues to expand its presence in Korea.",
    "businessInquiry": "Business inquiries",
    "bizInfo": "Company information",
    "bizCompany": "PYDERIN Co., Ltd.",
    "bizAddressLabel": "Address",
    "bizAddress": "18, Bongeunsa-ro 22-gil, Gangnam-gu, Seoul 06127, South Korea",
    "bizEmail": "Email",
    "bizCeo": "CEO",
    "bizCeoName": "Kim Young-hoon",
    "bizPrivacy": "Privacy officer",
    "copied": "Copied",
    "title": "Discover <strong>PYDERIN</strong> in Taiwan",
    "reels": "REELS · TAIWAN",
    "videoTitle": "Taiwan’s creators<br><strong>introduce PYDERIN</strong>",
    "platform": "Instagram Reels · Taiwan"
  },
  "ja": {
    "officialSite": "公式サイト",
    "title": "台湾で出会う <strong>PYDERIN</strong>",
    "creator": "ID",
    "views": "再生回数",
    "likes": "いいね",
    "pendingMetric": "確認予定",
    "hiddenMetric": "非公開",
    "viewOriginal": "Instagramで見る",
    "reels": "REELS · TAIWAN",
    "featuredVideo": "FEATURED VIDEO",
    "videoTitle": "台湾のクリエイターが<br><strong>紹介するPYDERIN</strong>",
    "platform": "Instagram Reels · 台湾",
    "introducedProducts": "動画で紹介した製品",
    "featuredProducts": "FEATURED PRODUCTS",
    "productTitle": "動画で紹介された<br><strong>PYDERIN製品</strong>",
    "productDesc": "動画に登場するPYDERINの主要製品をご覧ください。",
    "allProducts": "全製品を見る",
    "productLink": "製品情報を見る",
    "rejuProduct": "リジュブースタークリーム",
    "clearProduct": "クリアブースターマスクパック",
    "mediaTitle": "韓国で培ったブランド体験を、グローバル市場へ。",
    "mediaDesc": "PYDERINは、専門家ネットワーク、オフラインチャネル、消費者キャンペーンなど多様なブランド活動を<br>通じて、韓国でブランド接点を拡大しています。",
    "businessInquiry": "ビジネスお問い合わせ",
    "bizInfo": "事業者情報",
    "bizCompany": "株式会社PYDERIN",
    "bizAddressLabel": "住所",
    "bizAddress": "06127 ソウル特別市江南区奉恩寺路22キル18",
    "bizEmail": "メール",
    "bizCeo": "代表者",
    "bizCeoName": "キム・ヨンフン",
    "bizPrivacy": "個人情報保護責任者",
    "copied": "コピーしました"
  }
};
const storyTitles={
  "ko": [
    "30만 회 이상의 조회수로 만나는<br><strong>대만 시장의 관심</strong>",
    "현지 영향력으로 넓히는<br><strong>PYDERIN의 접점</strong>",
    "일상의 경험으로 전하는<br><strong>제품의 가치</strong>",
    "신뢰도 높은 콘텐츠로<br><strong>이어지는 구매 관심</strong>",
    "크리에이터의 언어로<br><strong>완성한 제품 발견</strong>"
  ],
  "zh": [
    "逾30萬次觀看<br><strong>見證台灣市場關注</strong>",
    "在地影響力<br><strong>拓展 PYDERIN 接觸點</strong>",
    "真實使用體驗<br><strong>傳遞產品價值</strong>",
    "值得信賴的內容<br><strong>帶動購買興趣</strong>",
    "創作者的語言<br><strong>開啟產品新發現</strong>"
  ],
  "en": [
    "Over 300,000 views reflect<br><strong>interest in Taiwan</strong>",
    "Local voices expand<br><strong>PYDERIN’s reach</strong>",
    "Everyday experiences reveal<br><strong>the value of each product</strong>",
    "Trusted content inspires<br><strong>interest in the products</strong>",
    "A creator’s perspective<br><strong>on product discovery</strong>"
  ],
  "ja": [
    "30万回以上の再生が示す<br><strong>台湾市場の関心</strong>",
    "現地発信で広がる<br><strong>PYDERINとの接点</strong>",
    "日常から伝わる<br><strong>製品の価値</strong>",
    "信頼が生み出す<br><strong>購買への関心</strong>",
    "クリエイターの視点で<br><strong>出会う製品の魅力</strong>"
  ]
};
const localeMap={'ko':'ko','ja':'ja','zh-TW':'zh','en-US':'en'};
let lang=localeMap[new URLSearchParams(location.search).get('lang')]||'ko',active=0;
const track=document.querySelector('#reel-track');
const numberLocale=()=>({ko:'ko-KR',zh:'zh-TW',ja:'ja-JP',en:'en-US'}[lang]);
const formatViews=r=>new Intl.NumberFormat(numberLocale(),{notation:'compact',maximumFractionDigits:1}).format(r.viewsCount)+({ko:'회',zh:'次',ja:'回',en:''}[lang]);
const formatLikes=r=>r.likes==null?translations[lang][r.likesHidden?'hiddenMetric':'pendingMetric']:new Intl.NumberFormat(numberLocale(),r.likesApproximate?{notation:'compact',maximumFractionDigits:1}:{}).format(r.likes);
function build(){track.replaceChildren();const t=translations[lang];reels.forEach((r,i)=>{const card=document.createElement('article');card.className='reel-card'+(i===active?' is-active':'');card.dataset.index=i;card.tabIndex=0;if(r.pending){card.classList.add('placeholder');card.innerHTML=`<div class="placeholder-inner"><b>+</b><span>${t.next}</span></div>`}else{const video=document.createElement('video');video.src=r.src;video.poster=r.poster;video.muted=true;video.loop=true;video.playsInline=true;video.preload=i<2?'metadata':'none';card.append(video);const top=document.createElement('div');top.className='card-top';top.innerHTML=`<span>${String(i+1).padStart(2,'0')}</span><b>↗</b>`;const cap=document.createElement('div');cap.className='card-caption';cap.innerHTML=`<small>${t.reels}</small><h2>@${r.creator}</h2>`;card.append(top,cap)}card.addEventListener('click',()=>{if(!r.pending)window.open(r.url,'_blank','noopener,noreferrer')});card.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!r.pending){e.preventDefault();window.open(r.url,'_blank','noopener,noreferrer')}});track.append(card)});requestAnimationFrame(()=>center(active,false))}
function center(index){setActive((index+reels.length)%reels.length)}
function setActive(index){active=(index+reels.length)%reels.length;[...track.children].forEach((c,i)=>{let offset=i-active;if(offset>reels.length/2)offset-=reels.length;if(offset<-reels.length/2)offset+=reels.length;const distance=Math.abs(offset);c.style.setProperty('--offset',offset);c.style.setProperty('--distance',distance);c.style.zIndex=10-distance;c.classList.toggle('is-active',i===active)});const r=reels[active],t=translations[lang];document.querySelector('#active-creator').textContent='@'+r.creator;document.querySelector('#active-views').textContent=formatViews(r);document.querySelector('#active-likes').textContent=formatLikes(r);const link=document.querySelector('#active-link');link.href=r.url;const impact=document.querySelector('#impact');impact.classList.remove('rise');void impact.offsetWidth;impact.classList.add('rise');document.querySelectorAll('.reel-card video').forEach((v,i)=>{if(i===active)v.play().catch(()=>{});else v.pause()})}
let heroIsVisible=true;
const heroObserver=new IntersectionObserver(([entry])=>{heroIsVisible=entry.isIntersecting},{threshold:.2});
heroObserver.observe(document.querySelector('#top'));
setInterval(()=>{if(heroIsVisible&&document.visibilityState==='visible')center(active+1)},3000);
let touchStartX=0;track.addEventListener('touchstart',e=>{touchStartX=e.touches[0].clientX},{passive:true});track.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-touchStartX;if(Math.abs(dx)>35)center(active+(dx<0?1:-1))},{passive:true});
document.querySelector('.prev').addEventListener('click',()=>center(active-1));document.querySelector('.next').addEventListener('click',()=>center(active+1));
function buildStories(){const container=document.querySelector('#creator-stories'),t=translations[lang];container.replaceChildren();reels.forEach((r,i)=>{const productCards=r.products.map(key=>{const p=productCatalog[key],name=translations[lang][key==='reju'?'rejuProduct':'clearProduct'];return `<a class="story-product" href="${p.url}" target="_blank" rel="noopener noreferrer"><img src="${p.image}" alt="${name}" loading="lazy"><span><small>${p.line}</small><strong>${name}</strong></span><b>↗</b></a>`}).join('');const section=document.createElement('section');section.className='creator-story';section.innerHTML=`<div class="story-copy"><small>${t.featuredVideo} · ${String(i+1).padStart(2,'0')}</small><h2>${storyTitles[lang][i]}</h2><div class="story-stats"><div><span>${t.creator}</span><strong>@${r.creator}</strong></div><div><span>${t.views}</span><strong>${formatViews(r)}</strong></div><div><span>${t.likes}</span><strong>${formatLikes(r)}</strong></div></div><div class="story-products"><p>${t.introducedProducts}</p><div>${productCards}</div></div><a href="${r.url}" target="_blank" rel="noopener noreferrer"><span>${t.viewOriginal}</span></a></div><div class="story-video"><video src="${r.src}" poster="${r.poster}" controls playsinline preload="metadata" aria-label="@${r.creator} Instagram Reels"></video></div>`;container.append(section)})}
function applyLanguage(next){lang=next;localStorage.setItem('pyderin-taiwan-reels-lang',lang);document.documentElement.lang=lang;document.querySelector('#language').value=lang;const t=translations[lang];document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t[el.dataset.i18n]);document.querySelectorAll('[data-i18n-html]').forEach(el=>el.innerHTML=t[el.dataset.i18nHtml]);if(!track.children.length){buildStories();build();setActive(active)}else{document.querySelectorAll('.card-caption small').forEach(el=>el.textContent=t.reels);document.querySelector('#active-views').textContent=formatViews(reels[active]);document.querySelector('#active-likes').textContent=formatLikes(reels[active]);document.querySelectorAll('.creator-story').forEach((section,i)=>{const r=reels[i];section.querySelector('.story-copy>small').textContent=t.featuredVideo+' · '+String(i+1).padStart(2,'0');section.querySelector('h2').innerHTML=storyTitles[lang][i];const metrics=section.querySelectorAll('.story-stats>div');['creator','views','likes'].forEach((key,j)=>metrics[j].querySelector('span').textContent=t[key]);metrics[1].querySelector('strong').textContent=formatViews(r);metrics[2].querySelector('strong').textContent=formatLikes(r);section.querySelector('.story-products>p').textContent=t.introducedProducts;section.querySelectorAll('.story-product').forEach((link,j)=>{const name=t[r.products[j]==='reju'?'rejuProduct':'clearProduct'];link.querySelector('strong').textContent=name;link.querySelector('img').alt=name});section.querySelector('.story-copy>a>span').textContent=t.viewOriginal})}}
document.querySelector('#language').addEventListener('change',e=>applyLanguage(e.target.value));applyLanguage(lang);
const brandVideos=document.querySelectorAll('.brand-reel video');
const mobileBrandVideos=matchMedia('(max-width:800px)').matches;
const playBrandVideo=video=>{video.muted=true;video.defaultMuted=true;video.playsInline=true;video.setAttribute('muted','');video.setAttribute('playsinline','');video.setAttribute('webkit-playsinline','');if(video.readyState===0)video.load();video.play().catch(()=>{})};
const brandVideoObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)playBrandVideo(entry.target);else entry.target.pause()})},{threshold:.2});
brandVideos.forEach(video=>{if(mobileBrandVideos)video.controls=true;brandVideoObserver.observe(video)});
const biz=document.querySelector('#biz'),bizToggle=document.querySelector('#bizToggle'),bizBody=document.querySelector('#bizBody');
bizToggle.addEventListener('click',()=>{const closed=biz.classList.toggle('closed');bizBody.inert=closed;bizToggle.setAttribute('aria-expanded',String(!closed))});
const bizMail=document.querySelector('#bizMail'),bizMailCopy=document.querySelector('#bizMailCopy'),bizMailDone=document.querySelector('#bizMailDone');
let bizCopyTimer;
bizMailCopy.addEventListener('click',async()=>{const value=bizMail.textContent.trim();let copied=false;try{await navigator.clipboard.writeText(value);copied=true}catch{const area=Object.assign(document.createElement('textarea'),{value,readOnly:true});area.style.cssText='position:fixed;top:0;left:0;opacity:0;font-size:16px';document.body.append(area);area.select();area.setSelectionRange(0,value.length);try{copied=document.execCommand('copy')}catch{}area.remove();bizMailCopy.focus()}if(!copied){getSelection().selectAllChildren(bizMail);return}bizMailCopy.classList.add('copied');bizMailDone.textContent=translations[lang].copied;clearTimeout(bizCopyTimer);bizCopyTimer=setTimeout(()=>{bizMailCopy.classList.remove('copied');bizMailDone.textContent=''},1600)});
