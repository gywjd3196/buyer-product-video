"""Refresh public product/post associations; keep source workbooks outside the repo."""
import argparse
import collections
import json
import re
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('sheets', type=Path, help='Extracted sheet rows, kept outside the repository')
args = parser.parse_args()
data = json.loads((ROOT / 'dist/catalog.json').read_text())
source = json.loads(args.sheets.read_text())
old = {p['id']: p for p in data['posts']}
product_ids = {p['id'] for p in data['products']}

def map_products(text):
    text = re.sub(r'\s', '', text).replace('리쥬뷰스터', '리쥬부스터')
    found = set()
    for part in text.split(','):
        line = ('hydro' if '하이드로' in part else 'reju' if '리쥬' in part else
                'clear' if '클리어' in part or '리셋미네랄' in part else None)
        if line:
            for word, suffix in [('크림', 'cream'), ('세럼', 'serum'), ('마스크', 'mask')]:
                if word in part:
                    found.add(line + '-' + suffix)
        elif part in ['세럼', '마스크팩', '마스크'] and '하이드로' in text and '리쥬' not in text:
            found.add('hydro-' + ('serum' if part == '세럼' else 'mask'))
    return sorted(found & product_ids)

posts = {}
for index in [0, 2, 4, 7, 8, 9, 11, 12, 18]:
    sheet = source[index]
    for row in sheet['rows']:
        cols = {re.sub(r'\d', '', k): v for k, v in row.items()}
        country = cols.get('A', '').strip()
        if country not in ['일본', '대만']:
            continue
        link_col = 'G' if index == 2 else 'N' if index == 18 else 'O'
        product_col = None if index == 2 else 'F' if index == 4 else 'L' if index == 7 else 'E'
        label = cols.get(product_col, '') if product_col else ''
        creator = cols.get('D' if index == 4 else 'B', '').strip()
        for match in re.finditer(r'instagram\.com/(?:[^/\s]+/)?(?:p|reel|reels)/([\w-]+)', cols.get(link_col, '')):
            pid = match[1]
            if pid not in posts:
                previous = old.get(pid, {})
                posts[pid] = dict(id=pid, url=f'https://www.instagram.com/p/{pid}/', creator=creator,
                    country=country, productIds=[], productLabel=label, sources=[],
                    views=previous.get('views'), viewsCheckedAt=previous.get('viewsCheckedAt'),
                    metricSource=previous.get('metricSource'), mediaType=previous.get('mediaType', 'unverified'))
                for key in ['viewsApproximate', 'viewsDisplay', 'videoSrc', 'poster', 'metricBasis', 'unavailable']:
                    if key in previous:
                        posts[pid][key] = previous[key]
            post = posts[pid]
            if post['country'] != country:
                continue
            post['productIds'] = sorted(set(post['productIds'] + map_products(label)))
            post['sources'].append(dict(sheet=sheet['name'], cell=next(k for k in row if re.sub(r'\d', '', k) == link_col)))

# These are already curated public buyer showcases, not newly measured Instagram totals.
markets = [
    ('JP', '일본', 'JAPAN', '日本', 'pyderin-reels-showcase', 'https://pyderin-japan-reels-showcase.tambeautyofficial.chatgpt.site'),
    ('TW', '대만', 'TAIWAN', '台灣', 'pyderin-taiwan-reels-showcase', 'https://pyderin-taiwan-reels-showcase.tambeautyofficial.chatgpt.site'),
]
data['markets'] = []
for code, country, en, native, directory, url in markets:
    js = (ROOT / directory / 'dist/app.js').read_text().split('const productCatalog')[0]
    reels = re.findall(r'\{id:.*?\}', js)
    for raw in reels:
        def field(key):
            m = re.search(r"\b" + key + r":'([^']*)'", raw)
            return m[1] if m else None
        pid = field('id')
        if pid not in posts:
            continue  # Only posts associated with the supplied spreadsheet.
        p = posts[pid]
        views = field('views')
        if not views:
            continue
        value = float(views[:-1]) * 10000 if views.endswith('만') else int(views.replace(',', ''))
        keys = re.search(r'products:\[(.*?)\]', raw)
        mapped = [dict(reju='reju-cream', clear='clear-mask')[x] for x in re.findall(r"'(.*?)'", keys[1])]
        p['productIds'] = sorted(set(p['productIds'] + mapped))
        if p.get('metricBasis') not in ['tracking', 'verified']:
            p.update(views=int(value), viewsDisplay=views, viewsApproximate='viewsExact:true' not in raw,
                     viewsCheckedAt=str(date.today()), metricSource=url, metricBasis='showcase', mediaType='video')
        for key, source_key in [('videoSrc', 'src'), ('poster', 'poster')]:
            if field(source_key):
                p[key] = url + '/' + field(source_key)
    data['markets'].append(dict(code=code, name=country, english=en, native=native, url=url, featuredCount=len(reels)))

checked = json.loads((ROOT / 'japan-showcase/checked-five-views.json').read_text())
for check in checked['posts']:
    p = posts.get(check['id'])
    if not p:
        continue
    if check['status'] == 'page_unavailable':
        p['unavailable'] = True
        continue
    if p['views'] is None:
        p.update(views=check['approximateViews'], viewsDisplay=check['displayViews'], viewsApproximate=True,
                 viewsCheckedAt=checked['checkedAt'], metricSource=check['sourceUrl'], metricBasis='instagram', mediaType='video')
        for key, suffix in [('videoSrc', '.mp4'), ('poster', '.jpg')]:
            if (ROOT / 'pyderin-reels-showcase/dist/assets' / (p['id'] + suffix)).exists():
                p[key] = markets[0][-1] + '/assets/' + p['id'] + suffix

data.update(snapshotDate=str(date.today()), posts=list(posts.values()),
            trackingSource='https://superinfluencer.web.app/pyderin-tracking')
data['audit'].update(sheetCount=len(source), rankingStatus='partial_showcase_metrics', trackingStatus='login_required')
(ROOT / 'dist/catalog.json').write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
print(json.dumps(dict(products=len(data['products']), posts=len(posts),
    recordedViews=sum(p['views'] is not None for p in posts.values()),
    byProduct={pid: sum(pid in p['productIds'] and p['views'] is not None for p in posts.values()) for pid in product_ids}), ensure_ascii=False))
