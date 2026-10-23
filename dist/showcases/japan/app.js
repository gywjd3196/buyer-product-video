const reels=[
 {id:'DcV3-w5xa9s',creator:'seri_challenge',views:'81.5만',likes:'990',src:'https://pyderin-japan-reels-showcase.tambeautyofficial.chatgpt.site/assets/DcV3-w5xa9s.mp4',poster:'assets/DcV3-w5xa9s.jpg',url:'https://www.instagram.com/p/DcV3-w5xa9s/',products:['reju']},
 {id:'DaVBW_MS3QL',creator:'urchin.sh',views:'45.6만',likes:'2,470',src:'https://pyderin-japan-reels-showcase.tambeautyofficial.chatgpt.site/assets/urchin-japan.mp4',poster:'assets/urchin-japan-poster.jpg',url:'https://www.instagram.com/p/DaVBW_MS3QL/',products:['reju','clear']},
 {id:'DaZ9pv2TFOY',creator:'uranishihikaru',views:'15.7만',likes:'1,154',src:'https://pyderin-japan-reels-showcase.tambeautyofficial.chatgpt.site/assets/DaZ9pv2TFOY.mp4',poster:'assets/DaZ9pv2TFOY.jpg',url:'https://www.instagram.com/p/DaZ9pv2TFOY/',products:['reju','clear']},
 {id:'DXEl4BGj4t5',creator:'minamikato_0115',views:'11.1만',likes:'1,470',src:'https://pyderin-japan-reels-showcase.tambeautyofficial.chatgpt.site/assets/DXEl4BGj4t5.mp4',poster:'assets/DXEl4BGj4t5.jpg',url:'https://www.instagram.com/p/DXEl4BGj4t5/',products:['reju']},
 {id:'DcbKzsiBlQl',creator:'nachos_kimono',views:'10.9만',likes:null,likesHidden:true,src:'https://pyderin-japan-reels-showcase.tambeautyofficial.chatgpt.site/assets/DcbKzsiBlQl.mp4',poster:'assets/DcbKzsiBlQl.jpg',url:'https://www.instagram.com/p/DcbKzsiBlQl/',products:['clear']}
];
const productCatalog={reju:{image:'assets/reju-cream.jpg',nameKo:'리쥬부스터 크림',nameJa:'リジュブースタークリーム',line:'REJUVUSTER',url:'https://pyderin.com/product-detail?id=rejuvuster'},clear:{image:'assets/clear-mask.jpg',nameKo:'클리어부스터 마스크팩',nameJa:'クリアブースターマスクパック',line:'CLEARVUSTER',url:'https://pyderin.com/product-detail?id=pyderin-clearvuster-pdrn-skin-reset-mineral-mask'}};
const translations={
  "ko": {
    "officialSite": "공식 사이트",
    "title": "일본에서 만나는 <strong>PYDERIN</strong>",
    "creator": "아이디",
    "views": "조회수",
    "likes": "좋아요",
    "pendingMetric": "확인 예정",
    "hiddenMetric": "비공개",
    "viewOriginal": "Instagram 원본 보기",
    "reels": "REELS · JAPAN",
    "featuredVideo": "FEATURED VIDEO",
    "videoTitle": "일본 크리에이터가<br><strong>소개한 피더린</strong>",
    "platform": "Instagram Reels · 일본",
    "introducedProducts": "영상 속 소개 제품",
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
  "ja": {
    "officialSite": "公式サイト",
    "title": "日本で出会う <strong>PYDERIN</strong>",
    "creator": "ID",
    "views": "再生回数",
    "likes": "いいね",
    "pendingMetric": "確認予定",
    "hiddenMetric": "非公開",
    "viewOriginal": "Instagramで見る",
    "reels": "REELS · JAPAN",
    "featuredVideo": "FEATURED VIDEO",
    "videoTitle": "日本のクリエイターが<br><strong>紹介するPYDERIN</strong>",
    "platform": "Instagram Reels · 日本",
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
    "title": "Discover <strong>PYDERIN</strong> in Japan",
    "reels": "REELS · JAPAN",
    "videoTitle": "Japan’s creators<br><strong>introduce PYDERIN</strong>",
    "platform": "Instagram Reels · Japan"
  },
  "zh": {
    "officialSite": "官方網站",
    "title": "在日本遇見 <strong>PYDERIN</strong>",
    "creator": "帳號",
    "views": "觀看次數",
    "likes": "按讚數",
    "pendingMetric": "確認中",
    "hiddenMetric": "未公開",
    "viewOriginal": "前往 Instagram",
    "reels": "REELS · JAPAN",
    "featuredVideo": "FEATURED VIDEO",
    "videoTitle": "日本創作者<br><strong>推薦的 PYDERIN</strong>",
    "platform": "Instagram Reels · 日本",
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
  }
};
const storyTitles={
  "ko": [
    "81만 회 이상이 확인한<br><strong>일본 시장의 반응</strong>",
    "45만 회가 증명한<br><strong>일본 시장의 관심</strong>",
    "현지 영향력으로 넓히는<br><strong>PYDERIN의 접점</strong>",
    "일상의 경험으로 전하는<br><strong>제품의 가치</strong>",
    "신뢰도 높은 콘텐츠로<br><strong>이어지는 구매 관심</strong>"
  ],
  "ja": [
    "81万回以上が示す<br><strong>日本市場の反応</strong>",
    "45万回再生が示す<br><strong>日本市場の関心</strong>",
    "現地発信で広がる<br><strong>PYDERINとの接点</strong>",
    "日常から伝わる<br><strong>製品の価値</strong>",
    "信頼が生み出す<br><strong>購買への関心</strong>"
  ],
  "en": [
    "Over 810,000 views reflect<br><strong>Japan’s response</strong>",
    "450,000 views reflect<br><strong>interest in Japan</strong>",
    "Local voices expand<br><strong>PYDERIN’s reach</strong>",
    "Everyday experiences reveal<br><strong>the value of each product</strong>",
    "Trusted content inspires<br><strong>interest in the products</strong>"
  ],
  "zh": [
    "超過81萬次觀看<br><strong>展現日本市場反應</strong>",
    "45萬次觀看<br><strong>見證日本市場關注</strong>",
    "在地影響力<br><strong>拓展 PYDERIN 接觸點</strong>",
    "真實使用體驗<br><strong>傳遞產品價值</strong>",
    "值得信賴的內容<br><strong>帶動購買興趣</strong>"
  ]
};
const localeMap={'ko':'ko','ja':'ja','zh-TW':'zh','en-US':'en'};
let lang=localeMap[new URLSearchParams(location.search).get('lang')]||'ko',active=0;
const track=document.querySelector('#reel-track');
const formatViews=r=>{const n=parseFloat(r.views)*10000;if(lang==='ja')return `${r.viewsExact?'':'約'}${r.views.replace('만','万')}回`;if(lang==='zh')return `${r.viewsExact?'':'約'}${r.views.replace('만','萬')}次`;if(lang==='en')return `${r.viewsExact?'':'~'}${new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:2}).format(n)}`;return r.viewsExact?`${r.views}회`:`약 ${r.views}`;};
function build(){track.replaceChildren();const t=translations[lang];reels.forEach((r,i)=>{const card=document.createElement('article');card.className='reel-card'+(i===active?' is-active':'');card.dataset.index=i;card.tabIndex=0;if(r.src){const video=document.createElement('video');video.src=r.src;video.poster=r.poster;video.muted=true;video.loop=true;video.playsInline=true;video.preload=i<2?'metadata':'none';card.append(video)}else{card.classList.add('instagram-card');card.innerHTML=`<div class="instagram-card-mark"><span>Instagram</span><strong>@${r.creator}</strong><small>${t.viewOriginal}</small></div>`}const top=document.createElement('div');top.className='card-top';top.innerHTML=`<span>${String(i+1).padStart(2,'0')}</span><b>↗</b>`;const cap=document.createElement('div');cap.className='card-caption';cap.innerHTML=`<small>${t.reels}</small><h2>@${r.creator}</h2>`;card.append(top,cap);card.addEventListener('click',()=>window.open(r.url,'_blank','noopener,noreferrer'));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();window.open(r.url,'_blank','noopener,noreferrer')}});track.append(card)});requestAnimationFrame(()=>center(active,false))}
function center(index){setActive((index+reels.length)%reels.length)}
function setActive(index){active=(index+reels.length)%reels.length;[...track.children].forEach((c,i)=>{let offset=i-active;if(offset>reels.length/2)offset-=reels.length;if(offset<-reels.length/2)offset+=reels.length;const distance=Math.abs(offset);c.style.setProperty('--offset',offset);c.style.setProperty('--distance',distance);c.style.zIndex=10-distance;c.classList.toggle('is-active',i===active)});const r=reels[active],t=translations[lang];document.querySelector('#active-creator').textContent='@'+r.creator;document.querySelector('#active-views').textContent=formatViews(r);document.querySelector('#active-likes').textContent=r.likes??(r.likesHidden?t.hiddenMetric:t.pendingMetric);const link=document.querySelector('#active-link');link.href=r.url;const impact=document.querySelector('#impact');impact.classList.remove('rise');void impact.offsetWidth;impact.classList.add('rise');document.querySelectorAll('.reel-card video').forEach(v=>{const card=v.closest('.reel-card');if(Number(card.dataset.index)===active)v.play().catch(()=>{});else v.pause()})}
let heroIsVisible=true;
const heroObserver=new IntersectionObserver(([entry])=>{heroIsVisible=entry.isIntersecting},{threshold:.2});
heroObserver.observe(document.querySelector('#top'));
setInterval(()=>{if(heroIsVisible&&document.visibilityState==='visible')center(active+1)},3000);
let touchStartX=0;track.addEventListener('touchstart',e=>{touchStartX=e.touches[0].clientX},{passive:true});track.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-touchStartX;if(Math.abs(dx)>35)center(active+(dx<0?1:-1))},{passive:true});
document.querySelector('.prev').addEventListener('click',()=>center(active-1));document.querySelector('.next').addEventListener('click',()=>center(active+1));
function buildStories(){const container=document.querySelector('#creator-stories'),t=translations[lang];container.replaceChildren();reels.forEach((r,i)=>{const productCards=r.products.map(key=>{const p=productCatalog[key],name=translations[lang][key==='reju'?'rejuProduct':'clearProduct'];return `<a class="story-product" href="${p.url}" target="_blank" rel="noopener noreferrer"><img src="${p.image}" alt="${name}" loading="lazy"><span><small>${p.line}</small><strong>${name}</strong></span><b>↗</b></a>`}).join('');const productBlock=productCards?`<div class="story-products"><p>${t.introducedProducts}</p><div>${productCards}</div></div>`:'';const media=r.src?`<video src="${r.src}" poster="${r.poster}" controls playsinline preload="metadata" aria-label="@${r.creator} Instagram Reels"></video>`:`<a class="story-instagram-card" href="${r.url}" target="_blank" rel="noopener noreferrer"><span>Instagram</span><strong>@${r.creator}</strong><small>${t.viewOriginal}</small></a>`;const section=document.createElement('section');section.className='creator-story';section.innerHTML=`<div class="story-copy"><small>${t.featuredVideo} · ${String(i+1).padStart(2,'0')}</small><h2>${storyTitles[lang][i]}</h2><div class="story-stats"><div><span>${t.creator}</span><strong>@${r.creator}</strong></div><div><span>${t.views}</span><strong>${formatViews(r)}</strong></div><div><span>${t.likes}</span><strong>${r.likes??(r.likesHidden?t.hiddenMetric:t.pendingMetric)}</strong></div></div>${productBlock}<a href="${r.url}" target="_blank" rel="noopener noreferrer"><span>${t.viewOriginal}</span></a></div><div class="story-video">${media}</div>`;container.append(section)})}
function applyLanguage(next){lang=next;localStorage.setItem('pyderin-reels-lang',lang);document.documentElement.lang=lang;document.querySelector('#language').value=lang;const t=translations[lang];document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t[el.dataset.i18n]);document.querySelectorAll('[data-i18n-html]').forEach(el=>el.innerHTML=t[el.dataset.i18nHtml]);if(!track.children.length){buildStories();build();setActive(active)}else{document.querySelectorAll('.card-caption small').forEach(el=>el.textContent=t.reels);document.querySelector('#active-views').textContent=formatViews(reels[active]);document.querySelector('#active-likes').textContent=reels[active].likes??(reels[active].likesHidden?t.hiddenMetric:t.pendingMetric);document.querySelectorAll('.creator-story').forEach((section,i)=>{const r=reels[i];section.querySelector('.story-copy>small').textContent=t.featuredVideo+' · '+String(i+1).padStart(2,'0');section.querySelector('h2').innerHTML=storyTitles[lang][i];const metrics=section.querySelectorAll('.story-stats>div');['creator','views','likes'].forEach((key,j)=>metrics[j].querySelector('span').textContent=t[key]);metrics[1].querySelector('strong').textContent=formatViews(r);metrics[2].querySelector('strong').textContent=r.likes??(r.likesHidden?t.hiddenMetric:t.pendingMetric);section.querySelector('.story-products>p').textContent=t.introducedProducts;section.querySelectorAll('.story-product').forEach((link,j)=>{const name=t[r.products[j]==='reju'?'rejuProduct':'clearProduct'];link.querySelector('strong').textContent=name;link.querySelector('img').alt=name});section.querySelector('.story-copy>a>span').textContent=t.viewOriginal})}}
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
