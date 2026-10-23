export const languages = [
 {code:'ko',label:'한국어'}, {code:'ja',label:'日本語'},
 {code:'zh-TW',label:'繁體中文'}, {code:'en-US',label:'English (US)'}
];
let language='ko';
try {const saved=localStorage.getItem('pyderin-buyer-language');if(languages.some(l=>l.code===saved))language=saved;} catch {}
export const getLanguage=()=>language;
export function setLanguage(next){if(!languages.some(l=>l.code===next))return;language=next;try{localStorage.setItem('pyderin-buyer-language',next);}catch{}}
// Korean is the source language. Each row contains Japanese, Traditional Chinese (Taiwan), and US English.
export const messages={
 '크리에이터':['クリエイター','創作者','Creator'],
 '확인 중':['確認中','確認中','Pending'],
 '인스타 원본 보기':['Instagramで見る','查看 Instagram 原文','View on Instagram'],
 '조회수 기준':['再生数について','觀看次數說明','About view counts'],
 '영상 {count}개':['動画 {count}件','{count} 支影片','{count} videos'],
 '게시물이 표시되지 않으면 아래 인스타 원본을 확인해 주세요.':['投稿が表示されない場合は、下のInstagramリンクからご覧ください。','若貼文未顯示，請透過下方連結查看 Instagram 原文。','If the post does not appear, open the Instagram post below.'],
 '언어 선택':['言語を選択','選擇語言','Select language'],
 '주 메뉴':['メインメニュー','主選單','Main menu'],
 'PYDERIN 처음으로':['PYDERIN ホーム','PYDERIN 首頁','PYDERIN home'],
 '본문으로 바로가기':['本文へスキップ','跳至主要內容','Skip to content'],
 '공식 사이트 ↗':['公式サイト ↗','官方網站 ↗','Official site ↗'],
 '제품과 시장을 연결하는 크리에이터 콘텐츠':['製品と市場をつなぐクリエイターコンテンツ','串聯產品與市場的創作者內容','Creator content connecting products and markets'],
 '영상 닫기':['動画を閉じる','關閉影片','Close video'],
 'Instagram에서 원본 보기 ↗':['Instagramで見る ↗','在 Instagram 查看原始貼文 ↗','View original on Instagram ↗'],
 '영상 라이브러리를 불러오고 있습니다…':['動画ライブラリを読み込んでいます…','正在載入影片資料庫…','Loading the video library…'],
 '홈':['ホーム','首頁','Home'], '제품별':['製品別','依產品','Products'], '국가별':['国別','依國家','Markets'],
 '현재 위치':['現在地','目前位置','Breadcrumb'],
 '인플루언서가 전하는 피더린':['クリエイターが伝えるPYDERIN','創作者眼中的 PYDERIN','PYDERIN through creators’ eyes'],
 '제품별·국가별 마케팅 영상':['製品別・国別マーケティング動画','依產品・國家探索行銷影片','Marketing videos by product & market'],
 '탐색 방식 선택':['探し方を選択','選擇探索方式','Choose how to explore'],
 '제품별 영상':['製品別の動画','產品影片','Product videos'],
 '국가별 영상':['国別の動画','國家影片','Market videos'],
 '피더린의 제품을 소개하는 크리에이터 콘텐츠.':['クリエイターが紹介するPYDERINの製品。','透過創作者的內容，認識 PYDERIN 產品。','Discover PYDERIN products through creator content.'],
 '관심 있는 제품의 대표 영상을 만나보세요.':['気になる製品の動画をご覧ください。','探索您感興趣產品的精選影片。','Explore selected videos for each product.'],
 '일본과 대만의 크리에이터가 전하는 피더린.':['日本と台湾のクリエイターが伝えるPYDERIN。','日本與台灣創作者分享的 PYDERIN。','PYDERIN stories from creators in Japan and Taiwan.'],
 '현지의 생생한 브랜드 이야기를 살펴보세요.':['現地のリアルなブランドストーリーへ。','感受來自在地的真實品牌故事。','Experience the brand from a local perspective.'],
 '살펴보기':['詳しく見る','探索內容','Explore'],
 '제품의 매력을, 영상으로.':['製品の魅力を、動画で。','用影片感受產品魅力。','Products, brought to life.'],
 '세계의 시선으로 만나는 피더린.':['世界の視点で出会うPYDERIN。','從世界的視角認識 PYDERIN。','PYDERIN, seen around the world.'],
 '어떤 제품이 궁금하세요?':['気になる製品はどれですか？','想探索哪款產品？','Find your product.'],
 '제품을 선택하면 조회수가 기록된 영상부터 최대 3개의 콘텐츠를 보여드립니다.':['製品を選ぶと、再生数が記録された動画を優先して最大3件のコンテンツを表示します。','選擇產品，即可查看最多 3 則內容，優先呈現已記錄觀看次數的影片。','Choose a product to see up to 3 pieces of content, starting with videos that have recorded view counts.'],
 '제품 라인 필터':['製品ラインの絞り込み','產品系列篩選','Filter product lines'],
 '전체 제품':['すべての製品','所有產品','All products'],
 '리쥬부스터':['リジュブスター','REJUVUSTER','REJUVUSTER'],
 '하이드로부스터':['ハイドロブスター','HYDROVUSTER','HYDROVUSTER'],
 '클리어부스터':['クリアブスター','CLEARVUSTER','CLEARVUSTER'],
 '제품 목록':['製品一覧','產品列表','Product collection'],
 '조회수 높은 영상 최대 3개':['再生数上位の動画を最大3件','最多 3 則高觀看次數影片','Up to 3 top-viewed videos'],
 '등록 콘텐츠 최대 3개':['登録コンテンツを最大3件','最多 3 則已登錄內容','Up to 3 listed posts'],
 '영상 보기':['動画を見る','觀看影片','View videos'],
 '세계의 시선으로 만나는 피더린':['世界の視点で出会うPYDERIN','從世界的視角認識 PYDERIN','PYDERIN around the world.'],
 '일본과 대만, 현지 크리에이터가 전하는 피더린의 이야기를 만나보세요.':['日本と台湾のクリエイターによるPYDERINのストーリーをご覧ください。','探索日本與台灣在地創作者分享的 PYDERIN 故事。','Explore PYDERIN stories told by local creators in Japan and Taiwan.'],
 '국가별 쇼케이스':['国別ショーケース','各國精選展示','Market showcases'],
 '일본':['日本','日本','Japan'], '대만':['台湾','台灣','Taiwan'],
 '크리에이터 영상 {count}개':['クリエイター動画 {count}件','{count} 支創作者影片','{count} creator videos'],
 '{market}에서 만나는 PYDERIN':['{market}で出会うPYDERIN','在{market}遇見 PYDERIN','Meet PYDERIN in {market}'],
 '국가 선택':['国を選択','選擇國家','Select market'],
 '새 창에서 보기 ↗':['新しいウィンドウで見る ↗','在新視窗開啟 ↗','Open in new window ↗'],
 'PYDERIN {market} 크리에이터 영상 쇼케이스':['PYDERIN {market}クリエイター動画ショーケース','PYDERIN {market}創作者影片展示','PYDERIN {market} creator video showcase'],
 '쇼케이스 안내':['ショーケース内では現地語と韓国語を選択できます。大きく表示するには、新しいウィンドウで開いてください。','展示頁面內可選擇當地語言或韓文。如需更大的畫面，請在新視窗開啟。','The embedded showcase offers its local language and Korean. Open it in a new window for a larger view.'],
 '약 ':['約','約','Approx. '], '회':['回','次',''],
 '{creator} 영상 미리보기':['{creator}の動画プレビュー','{creator} 的影片預覽','Video preview by {creator}'],
 '영상 재생':['動画を再生','播放影片','Play video'], '게시물 보기':['投稿を見る','查看貼文','View post'],
 '등록 콘텐츠':['登録コンテンツ','已登錄內容','LISTED CONTENT'],
 '연관 제품 이미지':['関連製品の画像','相關產品圖片','Related product image'],
 'Instagram에서 콘텐츠 확인':['Instagramでコンテンツを見る','在 Instagram 查看內容','View content on Instagram'],
 '조회수':['再生数','觀看次數','Views'], '조회수 확인 예정':['再生数を確認予定','觀看次數待確認','View count pending'],
 '원본 보기 ↗':['原本を見る ↗','查看原始貼文 ↗','View original ↗'],
 '{creator} Instagram 원본 보기':['{creator}のInstagram投稿を見る','查看 {creator} 的 Instagram 原始貼文','View {creator} on Instagram'],
 '쇼케이스 기록':['ショーケース記録','展示頁面記錄','Showcase record'], '조회수 확인':['再生数確認日','觀看次數確認日期','Views checked'], '출처 ↗':['出典 ↗','資料來源 ↗','Source ↗'],
 '제품별 최대 3개 콘텐츠':['製品ごとに最大3件','每款產品最多 3 則內容','Up to 3 posts per product'],
 '공식 제품 정보 ↗':['公式製品情報 ↗','官方產品資訊 ↗','Official product details ↗'],
 '영상으로 만나는 {product}':['動画で見る{product}','透過影片認識 {product}','Discover {product} in action'],
 '영상 국가 필터':['動画の国を絞り込み','影片國家篩選','Filter videos by market'],
 '전체 국가':['すべての国','所有國家','All markets'],
 '자료 기준 {date} · 기록된 조회수가 높은 순':['データ基準日 {date} · 記録された再生数の多い順','資料截至 {date}・依已記錄觀看次數排序','As of {date} · Sorted by recorded views'],
 '다른 제품 둘러보기 →':['ほかの製品を見る →','探索其他產品 →','Explore other products →'],
 '조회수가 기록된 영상부터 높은 순으로 선별했습니다.':['再生数が記録された動画を多い順に選びました。','優先選出已記錄觀看次數的影片，並依次數排序。','Videos with recorded view counts are shown first, from highest to lowest.'],
 '조회수 미확인 콘텐츠는 뒤에 표시됩니다.':['再生数未確認のコンテンツは後に表示されます。','尚未確認觀看次數的內容顯示在後。','Posts with unverified view counts follow.'],
 '전체 영상의 확정 순위는 아닙니다.':['すべての動画の確定順位ではありません。','此排序並非所有影片的最終排名。','This is not a definitive ranking of all videos.'],
 '이 제품은 조회수를 확인 중입니다. 시트에 등록된 관련 콘텐츠를 먼저 보여드립니다.':['この製品の再生数は確認中です。シートに登録された関連コンテンツを先に表示しています。','此產品的觀看次數仍在確認中，先提供試算表中已登錄的相關內容。','View counts for this product are being checked. Related content listed in the sheet is shown for now.'],
 '이 국가의 콘텐츠를 준비하고 있습니다.':['この国のコンテンツを準備しています。','此國家的內容準備中。','Content for this market is coming soon.'],
 '전체 국가 또는 다른 국가를 선택해 주세요.':['すべての国、またはほかの国を選択してください。','請選擇所有國家或其他國家。','Choose all markets or another market.'],
 '{creator} 크리에이터 영상':['{creator}のクリエイター動画','{creator} 的創作者影片','Creator video by {creator}'],
 '영상을 불러오지 못했습니다. 아래 Instagram 원본 링크에서 확인해 주세요.':['動画を読み込めませんでした。下のInstagramリンクでご覧ください。','無法載入影片，請透過下方 Instagram 連結觀看原始內容。','The video could not load. Use the Instagram link below to view the original.'],
 '재생 버튼을 눌러 영상을 감상하세요.':['再生ボタンを押して動画をご覧ください。','請按播放鍵觀看影片。','Press play to watch the video.'],
 'Instagram 게시물 · {creator}':['Instagram投稿 · {creator}','Instagram 貼文 · {creator}','Instagram post · {creator}'],
 'Instagram 설정에 따라 로그인이 필요할 수 있습니다. 표시되지 않으면 원본 보기를 이용해 주세요.':['Instagramの設定によりログインが必要な場合があります。表示されない場合は原本リンクをご利用ください。','依 Instagram 設定，可能需要登入。若無法顯示，請開啟原始貼文。','Instagram may require you to sign in. If the post does not appear, use the original link.'],
 '페이지를 찾을 수 없습니다.':['ページが見つかりません。','找不到頁面。','Page not found.'],
 '홈으로 돌아가기 →':['ホームに戻る →','返回首頁 →','Back to home →'],
 '쇼케이스':['ショーケース','精選展示','Showcase'], '바이어 영상 라이브러리':['バイヤー向け動画ライブラリ','買家影片資料庫','Buyer Video Library'],
 '데이터를 불러오지 못했습니다.':['データを読み込めませんでした。','無法載入資料。','Unable to load the library.'],
 '잠시 후 페이지를 새로고침해 주세요.':['しばらくしてからページを再読み込みしてください。','請稍後重新整理頁面。','Please refresh the page in a moment.'],
 '다시 불러오기':['再読み込み','重新載入','Retry']
};
export function t(key,values={}){
 const index={'ja':0,'zh-TW':1,'en-US':2}[language];
 let value=language==='ko'?key:(messages[key]?.[index]??key);
 if(key==='쇼케이스 안내'&&language==='ko')value='쇼케이스 내부에서는 현지 언어·한국어를 선택할 수 있습니다. 크게 보려면 새 창에서 열어 주세요.';
 return value.replace(/\{(\w+)\}/g,(_,key)=>String(values[key]??''));
}
const productNames={
 'reju-cream':[['リジュブスター クリーム','PDRN リジュビネイティングクリーム'],['REJUVUSTER 乳霜','PDRN 賦活乳霜'],['REJUVUSTER Cream','PDRN Rejuvenating Cream']],
 'reju-serum':[['リジュブスター セラム','PDRN アンチオックス ユースブースターセラム'],['REJUVUSTER 精華液','PDRN 抗氧青春精華液'],['REJUVUSTER Serum','PDRN Anti-Ox Youth Booster Serum']],
 'reju-mask':[['リジュブスター マスク','PDRN リジュビネイティングクリームマスク'],['REJUVUSTER 面膜','PDRN 賦活乳霜面膜'],['REJUVUSTER Mask','PDRN Rejuvenating Cream Mask']],
 'hydro-cream':[['ハイドロブスター クリーム','PDRN リバリア スージングクリーム'],['HYDROVUSTER 乳霜','PDRN 屏障舒緩乳霜'],['HYDROVUSTER Cream','PDRN Re-Barrier Soothing Cream']],
 'hydro-serum':[['ハイドロブスター セラム','PDRN SOS ダーマスージングセラム'],['HYDROVUSTER 精華液','PDRN SOS 肌膚舒緩精華液'],['HYDROVUSTER Serum','PDRN SOS Derma Soothing Serum']],
 'hydro-mask':[['ハイドロブスター マスク','PDRN SOS ヒアルスージングマスク'],['HYDROVUSTER 面膜','PDRN SOS 玻尿酸舒緩面膜'],['HYDROVUSTER Mask','PDRN SOS Hyal Soothing Mask']],
 'clear-mask':[['クリアブスター マスク','PDRN スキンリセット ミネラルマスク'],['CLEARVUSTER 面膜','PDRN 肌膚淨化礦物面膜'],['CLEARVUSTER Mask','PDRN Skin Reset Mineral Mask']]
};
export function localizeProduct(product){
 if(!product||language==='ko')return product;
 const translated=productNames[product.id]?.[{'ja':0,'zh-TW':1,'en-US':2}[language]];
 return translated?{...product,name:translated[0],fullName:translated[1]}:product;
}
