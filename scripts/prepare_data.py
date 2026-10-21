"""Read an exported workbook's sanitized intermediate and retain public catalog fields only."""
import collections, concurrent.futures, json, re, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'dist'
(OUT / 'assets').mkdir(parents=True, exist_ok=True)
source = json.loads(Path('/tmp/buyer-sheets.json').read_text())
definitions = [
 ('reju-cream','리쥬부스터 크림','REJUVUSTER','리쥬비네이팅 크림','rejuvuster','rose'),
 ('reju-serum','리쥬부스터 세럼','REJUVUSTER','안티 옥스 유스 부스터 세럼','pyderin-rejuvuster-pdrn-anti-ox-youth-booster-serum','rose'),
 ('reju-mask','리쥬부스터 마스크팩','REJUVUSTER','리쥬비네이팅 크림 마스크','pyderin-rejuvuster-pdrn-rejuvenating-cream-mask','rose'),
 ('hydro-cream','하이드로부스터 크림','HYDROVUSTER','리베리어 수딩 크림','pyderin-hydrovuster-pdrn-re-barrier-soothing-cream','blue'),
 ('hydro-serum','하이드로부스터 세럼','HYDROVUSTER','에스오에스 더마 수딩 세럼','pyderin-pdrn-hydro-booster-sos-derma-soothing-serum','blue'),
 ('hydro-mask','하이드로부스터 마스크팩','HYDROVUSTER','에스오에스 히알 수딩 마스크','pyderin-hydrovuster-pdrn-sos-hyal-soothing-mask','blue'),
 ('clear-mask','클리어부스터 마스크팩','CLEARVUSTER','스킨 리셋 미네랄 마스크','pyderin-clearvuster-pdrn-skin-reset-mineral-mask','sage'),
]
html = Path('/tmp/pyderin.html').read_text()
ld = json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>', html).group(1))
official = {x['item']['url'].split('id=')[-1]:x['item'] for x in ld['itemListElement']}
products = []
for pid, name, line, full, slug, tone in definitions:
    product = official[slug]
    path = OUT / 'assets' / (pid+'.jpg')
    url = urllib.parse.quote(product['image'], safe=':/?=&%')
    urllib.request.urlretrieve(url, path)
    products.append(dict(id=pid,name=name,line=line,fullName=full,tone=tone,image='assets/'+pid+'.jpg',source=product['url']))

def map_products(text):
    s = re.sub(r'\s','',text).replace('리쥬뷰스터','리쥬부스터')
    found = set()
    for part in s.split(','):
        line = 'hydro' if '하이드로' in part else 'reju' if '리쥬' in part else 'clear' if ('클리어' in part or '리셋미네랄' in part) else None
        if line:
            for word, suffix in [('크림','cream'),('세럼','serum'),('마스크','mask')]:
                if word in part: found.add(line+'-'+suffix)
        elif part in ['세럼','마스크팩','마스크'] and '하이드로' in s and '리쥬' not in s:
            found.add('hydro-'+('serum' if part=='세럼' else 'mask'))
    return sorted(found & {p['id'] for p in products})

posts, excluded = {}, collections.Counter()
for index in [0,2,4,7,8,9,11,12,18]:
    sheet = source[index]
    for row in sheet['rows']:
        r = {re.sub(r'\d','',k):v for k,v in row.items()}
        country = r.get('A','').strip()
        if country not in ['일본','대만']: continue
        link_col = 'G' if index==2 else 'N' if index==18 else 'O'
        product_col = None if index==2 else 'F' if index==4 else 'L' if index==7 else 'E'
        raw_product = r.get(product_col,'') if product_col else ''
        ids = map_products(raw_product)
        creator = r.get('D' if index==4 else 'B','').strip()
        for url in re.findall(r'https?://[^\s,]+',r.get(link_col,'')):
            match = re.search(r'instagram\.com/(?:[^/]+/)?(?:p|reel|reels)/([\w-]+)',url)
            if not match:
                excluded['direct_messages' if '/direct/' in url else 'other_platforms'] += 1
                continue
            code=match.group(1)
            if code not in posts:
                posts[code]=dict(id=code,url=f'https://www.instagram.com/p/{code}/',creator=creator,country=country,productIds=ids,productLabel=raw_product,views=None,viewsCheckedAt=None,metricSource=None,mediaType='unverified',sources=[])
            elif posts[code]['country']!=country:
                excluded['country_conflicts']+=1
                continue
            else: posts[code]['productIds']=sorted(set(posts[code]['productIds']+ids))
            posts[code]['sources'].append(dict(sheet=sheet['name'],cell=next((k for k in row if re.sub(r'\d','',k)==link_col),'')))

data=dict(title='바이어 제품 영상',snapshotDate='2026-10-21',sourceUrl='https://docs.google.com/spreadsheets/d/1J1pAbmN_d5wqdFQKnq5V9kgUJ2t_5o-uji7B4xXO3Zs/edit',products=products,posts=list(posts.values()),audit=dict(sheetCount=len(source),excluded=dict(excluded),rankingStatus='awaiting_verified_views'))
(OUT/'catalog.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
print(json.dumps(dict(products=len(products),posts=len(posts),countries=dict(collections.Counter(p['country'] for p in posts.values())),mapped=sum(bool(p['productIds']) for p in posts.values()),excluded=dict(excluded)),ensure_ascii=False))
