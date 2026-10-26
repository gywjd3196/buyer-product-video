#!/usr/bin/env python3
"""Re-edit the original PYDERIN film using prepared typography and existing product photos.

Requires ffmpeg. Run from any directory; no third-party Python packages are needed.
The original film and its complete audio track remain intact.
"""
from pathlib import Path
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parent.parent
DECK = ROOT / 'pyderin-deck'
ART = DECK / 'assets' / 'film'
SOURCE = DECK / 'film-en.mp4'
OUTPUT = DECK / 'film-refined.mp4'


def run(*args):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *map(str, args)], check=True)


def main():
    if not shutil.which('ffmpeg'):
        raise SystemExit('ffmpeg is required.')
    with tempfile.TemporaryDirectory(prefix='pyderin-film-') as work:
        work = Path(work)
        segments = []
        # Source sequence is retained: water, precision, laboratory, product, brand.
        # The lateral crop excludes the original central counters and lower captions.
        for index, duration in enumerate([8, 6, 14, 7, 176 / 30]):
            target = work / f'{index}.mp4'
            if index < 3:
                start = [0, 8, 14][index]
                crop = ['crop=500:760:0:0', 'crop=800:800:0:0', 'crop=800:800:1120:0'][index]
                timing = 'trim=duration=4.8,setpts=(PTS-STARTPTS)*5/3,' if index == 0 else 'setpts=PTS-STARTPTS,'
                graph = f'[0:v]{timing}{crop},scale=1008:-2,crop=1008:936:0:0,fps=30,pad=1920:1080:840:72:white[photo];[photo][1:v]overlay=0:0:shortest=1,format=yuv420p[v]'
                run('-ss', start, '-i', SOURCE, '-loop', '1', '-i', ART / f'title-{index}.png',
                    '-filter_complex', graph, '-map', '[v]', '-an', '-t', duration,
                    '-r', '30', '-c:v', 'libx264', '-preset', 'fast', '-crf', '19', '-movflags', '+faststart', target)
            else:
                product = ART / ('product-single.png' if index == 3 else 'product-range.png')
                graph = "[0:v]scale=2016:1872,zoompan=z='min(pzoom+0.00009,1.025)':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1008x936:fps=30,pad=1920:1080:840:72:white[photo];[photo][1:v]overlay=0:0:shortest=1,format=yuv420p[v]"
                run('-loop', '1', '-framerate', '30', '-i', product, '-loop', '1', '-i', ART / f'title-{index}.png',
                    '-filter_complex', graph, '-map', '[v]', '-an', '-t', duration,
                    '-r', '30', '-c:v', 'libx264', '-preset', 'fast', '-crf', '19', '-movflags', '+faststart', target)
            segments.append(target)
            print(f'Rendered scene {index + 1}/5', flush=True)
        manifest = work / 'scenes.txt'
        manifest.write_text(''.join(f"file '{segment}'\n" for segment in segments))
        run('-f', 'concat', '-safe', '0', '-i', manifest, '-i', SOURCE,
            '-map', '0:v:0', '-map', '1:a:0', '-c', 'copy', '-t', '40.866667', '-movflags', '+faststart', OUTPUT)
        run('-ss', '0.5', '-i', OUTPUT, '-frames:v', '1', '-update', '1', '-q:v', '2', ART / 'poster.jpg')
        print(f'Created {OUTPUT}', flush=True)


if __name__ == '__main__':
    main()
