# PYDERIN Partnership Deck

원본 사이트를 이 저장소에서 독립적으로 수정·배포하기 위해 가져온 사본입니다.

- 원본 저장소: https://github.com/gimyedalm-collab/pyderin-deck
- 가져온 커밋: `e9506e5f39c8f609eaf2aad0d447aaadfc396236`
- 가져온 날짜: 2026-10-26
- 기존 공개 주소: https://pyderin-deck.vercel.app/

## 수정 및 미리보기

`index.html`에는 페이지 구조, 기존 히어로 연출, 폰트와 매장 영상이 포함돼 있습니다.
히어로 영상은 같은 폴더의 `film-en.mp4`를 사용합니다. 의존성 설치나 빌드가 필요 없습니다.

- `redesign.css`: 02~12 구간의 반응형 디자인과 상단 언어 선택 프레임.
- `translations.js`: 한국어·영어·대만 번체 중국어·일본어 문구. 기본 언어는 한국어이며, 선택한 언어를 브라우저에 저장합니다.
- `redesign.js`: 번역 적용, 언어 선택 저장, 상단 프레임의 색상 전환.

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
