"""Import measured Instagram video views; never substitute followers or likes."""
import argparse, csv, datetime, json, re
from pathlib import Path
from urllib.parse import urlparse

parser = argparse.ArgumentParser()
parser.add_argument('csv', help='CSV columns: id,views,checked_at,source_url,media_type')
args = parser.parse_args()
path = Path(__file__).resolve().parents[1] / 'dist/catalog.json'
data = json.loads(path.read_text())
posts = {p['id']:p for p in data['posts']}
updates = []
with open(args.csv, encoding='utf-8-sig', newline='') as f:
    for row in csv.DictReader(f):
        if row['id'] not in posts: raise ValueError('Unknown post: '+row['id'])
        if not re.fullmatch(r'\d+', row['views']): raise ValueError('Views must be an exact nonnegative integer')
        if int(row['views']) > 9007199254740991: raise ValueError('View count exceeds supported integer range')
        checked = datetime.date.fromisoformat(row['checked_at'])
        if checked > datetime.date.today(): raise ValueError('Measurement date cannot be in the future')
        if row['media_type'] != 'video': raise ValueError('Rankings require confirmed videos')
        url=urlparse(row['source_url'])
        if url.scheme!='https' or not url.netloc: raise ValueError('HTTPS metric evidence URL required')
        updates.append((row['id'],dict(views=int(row['views']),viewsCheckedAt=row['checked_at'],metricSource=row['source_url'],mediaType='video',viewsApproximate=False,viewsDisplay=None,metricBasis='tracking' if url.netloc=='superinfluencer.web.app' else 'verified')))
for pid, metrics in updates: posts[pid].update(metrics)
path.write_text(json.dumps(data,ensure_ascii=False,indent=2))
print(f'Updated {len(updates)} video measurements')
