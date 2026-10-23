"""Join spreadsheet post links with the tracking page's measured, mirrored media.

Inputs stay outside the repository. Only the public catalog allowlist is written.
"""
import argparse
import json
import re
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('sheets', type=Path)
parser.add_argument('tracking', type=Path)
args = parser.parse_args()
path = ROOT / 'dist/catalog.json'
data = json.loads(path.read_text())
sheets = json.loads(args.sheets.read_text())
tracking = json.loads(args.tracking.read_text())
posts = {post['id']: post for post in data['posts']}
product_ids = {product['id'] for product in data['products']}
code_pattern = re.compile(r'instagram\.com/(?:[^/\s]+/)?(?:p|reel|reels)/([\w-]+)')


def map_products(label):
    label = re.sub(r'\s', '', label).replace('리쥬뷰스터', '리쥬부스터')
    found, line = set(), None
    for part in label.split(','):
        explicit = ('hydro' if '하이드로' in part else 'reju' if '리쥬' in part else
                    'clear' if '클리어' in part or '리셋미네랄' in part else None)
        if explicit:
            line = explicit
        if line:
            for word, suffix in [('크림', 'cream'), ('세럼', 'serum'), ('마스크', 'mask')]:
                if word in part:
                    found.add(line + '-' + suffix)
    return sorted(found & product_ids)


# The workbook's campaign tabs have different schemas; never copy personal columns.
sheet_links = set()
for index in [0, 2, 4, 5, 7, 8, 9, 11, 12, 18]:
    sheet = sheets[index]
    link_columns = ['G'] if index == 2 else ['N'] if index == 18 else ['P', 'O'] if index == 5 else ['O', 'N']
    product_column = None if index == 2 else 'F' if index == 4 else 'G' if index == 5 else 'L' if index == 7 else 'E'
    creator_column = 'D' if index == 4 else 'B'
    for row in sheet['rows']:
        cols = {re.sub(r'\d', '', cell): value for cell, value in row.items()}
        country = cols.get('A', '').strip()
        if country not in ['일본', '대만']:
            continue
        label = cols.get(product_column, '') if product_column else ''
        mapped = map_products(label)
        for column in link_columns:
            for code in code_pattern.findall(cols.get(column, '')):
                sheet_links.add(code)
                if code not in posts:
                    posts[code] = dict(id=code, url=f'https://www.instagram.com/p/{code}/',
                        creator=cols.get(creator_column, '').strip(), country=country,
                        productIds=[], productLabel=label, sources=[], views=None,
                        viewsCheckedAt=None, metricSource=None, mediaType='unverified')
                post = posts[code]
                if post['country'] != country:
                    continue
                post['productIds'] = sorted(set(post['productIds']) | set(mapped))
                if label and not post.get('productLabel'):
                    post['productLabel'] = label
                source = dict(sheet=sheet['name'], cell=next(cell for cell in row if re.sub(r'\d', '', cell) == column))
                if source not in post['sources']:
                    post['sources'].append(source)

matched = measured = mirrored = 0
for record in tracking['posts']:
    code = record['id']
    if code not in sheet_links or code not in posts:
        continue
    matched += 1
    post = posts[code]
    if record.get('creator'):
        post['creator'] = record['creator'].strip().lstrip('@')
    if record.get('present') is False:
        post['unavailable'] = True
        continue
    media = record.get('media') or {}
    video = media.get('mp4')
    if video:
        assert video == f'https://storage.googleapis.com/creo-studio-app-media/videos/instagram/{code}.mp4'
        post['videoSrc'] = video
        post['mediaType'] = 'video'
        post.pop('unavailable', None)
        mirrored += 1
    cover = media.get('cover')
    if cover:
        assert re.fullmatch(r'https://storage\.googleapis\.com/creo-studio-app-media/covers/instagram/' + re.escape(code) + r'\.(?:jpg|jpeg|png|webp)', cover)
        post['poster'] = cover
    metric = record.get('latest') or {}
    views, observed = metric.get('views'), metric.get('observedAt')
    if type(views) is int and 0 <= views <= 9007199254740991 and observed and (video or record.get('type') in ['reel', 'video']):
        checked = datetime.fromisoformat(observed.replace('Z', '+00:00'))
        if checked.tzinfo:
            checked = checked.astimezone(ZoneInfo('Asia/Seoul'))
        post.update(views=views, viewsCheckedAt=checked.date().isoformat(),
            metricSource=data['trackingSource'], metricBasis='tracking',
            mediaType='video', viewsApproximate=False)
        post.pop('viewsDisplay', None)
        measured += 1

data['posts'] = list(posts.values())
data['snapshotDate'] = datetime.fromisoformat(tracking['generatedAt']).date().isoformat()
data['audit'].update(sheetCount=len(sheets), sheetPostCount=len(sheet_links),
    trackingStatus='connected', rankingStatus='tracking_metrics',
    trackingGeneratedAt=tracking['generatedAt'], matchedTrackingPosts=matched,
    measuredTrackingPosts=measured, mirroredTrackingPosts=mirrored)
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
print(json.dumps(dict(sheetPosts=len(sheet_links), matched=matched, measured=measured,
    mirrored=mirrored, byProduct={pid: sum(pid in p['productIds'] and bool(p.get('videoSrc'))
    and not p.get('unavailable') for p in posts.values()) for pid in sorted(product_ids)}), ensure_ascii=False))
