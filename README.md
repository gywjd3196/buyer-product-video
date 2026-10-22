# PYDERIN Buyer Video Library

제품별·국가별로 바이어가 마케팅 콘텐츠를 살펴보는 통합 페이지.

배포: https://pyderin-buyer-videos.tambeautyofficial.chatgpt.site

## 화면 구성

- 첫 화면: 제품별 / 국가별 탐색 선택.
- 제품별: 7개 제품, 제품 라인 필터, 제품 상세의 국가 필터.
- 제품 상세: 기록된 조회수 내림차순으로 정렬하고 참고 콘텐츠를 포함해 **최대 3개**만 표시.
- 국가별: 기존 일본·대만 쇼케이스를 iframe으로 표시. 국가 전환 및 새 창 열기 지원.
- 영상: 기존 쇼케이스에서 제공하는 파일은 사이트 내 플레이어로 재생. 나머지는 Instagram 임베드 및 원문 링크 제공.
- 해시 라우팅으로 상세 주소 공유, 새로고침, 뒤로가기 지원.

## 실행 및 검증

```sh
python3 -m http.server 4180 --bind 127.0.0.1 --directory dist
node scripts/check.mjs
```

빌드나 의존성 설치가 필요 없는 HTML/CSS/JavaScript 사이트입니다. `.openai/hosting.json`의 기존 Sites 프로젝트를 유지합니다. 일본·대만 사이트는 별도 관리하므로 하위 프로젝트를 이 사이트 소스에 포함하지 않습니다.

## 데이터 현황 — 2026-10-22

원본 Google Sheets의 19개 탭을 다시 확인했습니다. 중복 제거한 Instagram 게시물 264개와 7개 제품을 보존합니다.

- 제품 연결은 시트의 제품 열 및 기존 국가별 쇼케이스의 명시적 제품 연결에 근거합니다.
- 13개 게시물에 기존 쇼케이스 또는 기록된 Instagram 확인값이 있습니다. 쇼케이스 값은 해당 페이지에서 가져온 기록이며, 현재 Instagram을 새로 측정한 값이 아닙니다.
- 반올림된 조회수는 `viewsApproximate`와 `viewsDisplay`로 보존하고 화면에서 ‘약’을 표시합니다.
- 리쥬부스터 크림·클리어부스터 마스크팩은 기록된 조회수 순으로 선별합니다. 다른 5개 제품은 조회수 미확인 참고 콘텐츠를 최대 3개 표시합니다.
- 접근 불가로 확인된 게시물은 선별에서 제외합니다.
- 전체 후보를 측정하지 않았으므로 전체 TOP 3나 확정 순위로 표시하지 않습니다.
- 요청한 피더린 트래킹 API는 로그인 없이 HTTP 403을 반환합니다. 현재 트래킹 데이터 반영은 로그인 대기 상태이며 자동 동기화는 구현하지 않았습니다.

출처:

- 시트: https://docs.google.com/spreadsheets/d/1J1pAbmN_d5wqdFQKnq5V9kgUJ2t_5o-uji7B4xXO3Zs/edit
- 조회수 트래킹: https://superinfluencer.web.app/pyderin-tracking
- 일본: https://pyderin-japan-reels-showcase.tambeautyofficial.chatgpt.site
- 대만: https://pyderin-taiwan-reels-showcase.tambeautyofficial.chatgpt.site
- 제품명·사진: https://pyderin.com/product

`dist/catalog.json`은 공개용 계정, 국가, 제품, 게시물 URL, 영상 자산 URL, 조회수와 출처만 포함합니다. 원본 주소·전화·계좌·계약·비용은 포함하지 않습니다. XLSX와 원본 추출본은 저장소 밖 임시 경로에서만 다룹니다.

## 데이터 갱신

현재 공유 작업공간의 국가별 프로젝트와 확인 기록을 사용하는 갱신 명령:

```sh
python3 scripts/sync_buyer_catalog.py /absolute/path/to/extracted-sheet-rows.json
node scripts/check.mjs
```

원본 추출본은 `[{"name":"시트명","rows":[{"A1":"셀 값"}]}]` 형태입니다. 갱신 스크립트는 같은 작업공간에 있는 `pyderin-reels-showcase`, `pyderin-taiwan-reels-showcase`, `japan-showcase`를 읽으므로 독립 체크아웃에서는 원본 자료를 별도로 준비해야 합니다. 기존 쇼케이스의 기록을 갱신하는 작업이며 트래킹 조회수를 수집하지 않습니다.

정확한 조회수·측정일·근거 URL·영상 여부가 확인된 CSV는 기존 `scripts/import_metrics.py`로 반영할 수 있습니다. CSV 열은 `id,views,checked_at,source_url,media_type`입니다. 반영 후 소스와 사이트를 다시 배포해야 합니다.
