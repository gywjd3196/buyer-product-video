# PYDERIN Partnership Deck

원본 사이트를 이 저장소에서 독립적으로 수정·배포하기 위해 가져온 사본입니다.

- 원본 저장소: https://github.com/gimyedalm-collab/pyderin-deck
- 가져온 커밋: `e9506e5f39c8f609eaf2aad0d447aaadfc396236`
- 가져온 날짜: 2026-10-26
- 기존 공개 주소: https://pyderin-deck.vercel.app/

## 수정 및 미리보기

`index.html`에는 페이지 구조, 히어로 영상 제어와 매장 영상이 포함돼 있습니다.
히어로 영상은 원본 `film-en.mp4`를 사용하며, PC와 모바일 모두 첫 화면 전체를 채우도록 표시합니다. 편집 시안 `film-refined.mp4`는 비교용으로 보존합니다. 사이트 실행에는 의존성 설치나 빌드가 필요 없습니다.

- `redesign.css`: 02~12 구간의 반응형 디자인과 상단 언어 선택 프레임. 밝은 배경에 피더린 레드 `#c41f32`로 핵심 실적·제품 함량·문의 동작을 강조합니다. 섹션별로 제품 분할, 대형 수치, 영상, 타임라인, 데이터 표 등 다른 구성을 사용합니다.
- `translations.js`: 한국어·영어·대만 번체 중국어·일본어 문구. 기본 언어는 한국어이며, 선택한 언어를 브라우저에 저장합니다.
- `redesign.js`: 번역 적용, 언어 선택 저장과 읽던 섹션 유지. 상단 프레임은 히어로에서 숨기고 본문 진입 시 표시합니다.
- `assets/`: 같은 브랜드의 실제 로고·제품 사진, Pretendard Variable 서체와 OFL 라이선스. 이 폴더만 독립적으로 배포할 수 있도록 필요한 자산을 함께 보관합니다.

디자인 참고: https://pyderin-buyer-showcase.web.app/
히어로는 입자형 시작 효과를 생략하고 원본 브랜드 영상을 바로 재생합니다. `object-fit: cover`로 화면을 채우며, 히어로의 상단 프레임은 숨깁니다.

본문에는 원본 DNA 형태의 배경 움직임을 옅은 블루 그레이로 적용했습니다. 스크롤 위치에 따라 회전하며, 히어로와 배경 탭에서는 연속 재생을 멈춥니다. 운영체제의 동작 줄이기 설정에서는 자동 움직임 없이 표시합니다.

## 브랜드 영상 편집

`film-refined.mp4`는 현재 히어로에 사용하지 않는 편집 시안입니다. 원본의 물·미세 장면·실험실·제품·브랜드 순서를 유지하면서 화면 구도와 타이포그래피를 다시 편집한 버전입니다. 기존 영상과 실제 제품 사진만 사용합니다.

- 원본과 같은 약 40.87초, 1920×1080, 30fps.
- 기존 중앙 카운트와 큰 문구는 측면 장면을 선택해 덜어내고 별도 타이포그래피로 정리.
- 완제품의 순도와 혼동하지 않도록 99%는 PDRN **원료 순도**로 표기.
- 원본 음원은 재인코딩 없이 그대로 보존하며, 오디오 패킷 해시가 일치하는지 확인했습니다.
- 영상의 문구·음성은 기존과 같이 영어입니다. 본문의 4개 언어 전환과 별개입니다.

편집용 타이포그래피와 제품 구성 PNG는 `assets/film/`에 있습니다. FFmpeg가 설치된 환경에서 저장소 루트에서 재생성합니다.

```sh
python3 scripts/refine_brand_film.py
```

PNG의 디자인 소스는 `scripts/render_brand_film_art.cjs`입니다. Playwright가 설치된 Node 환경과 위의 로컬 미리보기 서버를 사용합니다. 필요하면 `CHROME_PATH`로 Chrome 실행 파일을 지정할 수 있습니다.

02~12 구간은 핵심 메시지와 수치를 먼저 보여주며, 특허·상세 비교·논문은 펼쳐보기로 제공합니다.
`?lang=en#s8`처럼 언어와 섹션을 지정해 미리볼 수 있습니다. 브랜드 영상의 음성은 원본 영어를 유지합니다.

저장소 최상위 폴더에서 실행합니다.

```sh
python3 -m http.server 4181 --bind 127.0.0.1 --directory pyderin-deck
```

브라우저에서 http://127.0.0.1:4181 을 엽니다.

## 본인 Vercel 계정으로 배포

Vercel에서 새 프로젝트를 만들고 `gywjd3196/buyer-product-video` 저장소를 연결합니다.

- Root Directory: `pyderin-deck`
- Framework Preset: `Other`
- Build Command: 없음 (빈 값)
- Output Directory: `.`

이 폴더의 `vercel.json`이 프레임워크·빌드·출력 설정을 지정합니다.
배포 후 생성되는 새 주소로 운영하며, 연결한 배포 브랜치의 변경 사항이 자동 배포됩니다.
기존 `pyderin-deck.vercel.app` 주소를 그대로 쓰려면 원래 Vercel 프로젝트의 소유자와 프로젝트 이전 또는 권한 공유를 진행해야 합니다.

Vercel 공식 문서: https://vercel.com/docs/builds/configure-a-build

기존 바이어 영상 사이트는 저장소의 `dist/`와 `.openai/hosting.json` 설정을 그대로 사용합니다.
두 사이트의 배포 대상 폴더를 혼동하지 않도록 합니다.
