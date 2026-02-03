---
name: slide-content
description: 특정 슬라이드의 콘텐츠를 생성하거나 수정하는 스킬
user_invocable: true
---

# 슬라이드 콘텐츠 생성/수정 스킬

## 트리거
- "N번 슬라이드 내용 수정해줘"
- "슬라이드 내용 채워줘"
- "N번 슬라이드 업데이트"

## 동작 절차

### Step 1: 대상 슬라이드 확인
1. `SLIDE_STRUCTURE.md`를 읽어 전체 슬라이드 구조를 파악한다
2. 사용자가 지정한 슬라이드 번호(N)의 섹션을 찾는다
3. 해당 슬라이드의 제목, 레이아웃 타입, 콘텐츠 키를 확인한다

### Step 2: 관련 데이터 참조
1. `PROJECT_INFO.md`에서 해당 슬라이드에 필요한 데이터를 참조한다
2. 콘텐츠 키에 따라 적절한 섹션의 데이터를 매핑한다

### Step 3: 콘텐츠 생성/수정
슬라이드 타입에 따라 다음 요소를 생성한다:
- **title**: 슬라이드 메인 제목 (간결하고 임팩트 있게)
- **subtitle**: 부제목 (선택)
- **body**: 본문 텍스트 또는 불릿 포인트
- **keypoints**: 핵심 수치/키워드 (있는 경우)
- **placeholder_description**: 이미지/차트 플레이스홀더 설명

### Step 4: SLIDE_STRUCTURE.md + slides.ts 업데이트
1. `SLIDE_STRUCTURE.md`의 해당 슬라이드 섹션을 실제 콘텐츠로 교체한다
2. `src/data/slides.ts`의 해당 슬라이드 객체도 함께 동기화한다
3. `npm run dev` 실행중이면 HMR로 즉시 반영됨

## 출력
- `SLIDE_STRUCTURE.md` 해당 슬라이드 섹션 업데이트
- `src/data/slides.ts` 해당 슬라이드 데이터 업데이트
- 수정된 내용 요약 출력

## 주의사항
- Apple Dark Style 가이드라인에 맞는 톤 유지
- 한국어 콘텐츠, 간결하고 키워드 중심
- 타이틀은 10자 이내, 불릿은 한 줄 1-2문장
- PROJECT_INFO.md의 데이터를 최대한 활용
