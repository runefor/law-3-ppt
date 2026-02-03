---
name: sync-slides
description: PROJECT_INFO.md + SLIDE_STRUCTURE.md를 기반으로 src/data/slides.ts를 동기화하는 스킬
user_invocable: true
---

# 슬라이드 데이터 동기화 스킬

## 트리거
- "슬라이드 데이터 동기화해줘"
- "slides.ts 업데이트해줘"
- "슬라이드 데이터 재생성"

## 동작 절차

### Step 1: 소스 파일 읽기
다음 2개 파일을 읽는다:
1. `PROJECT_INFO.md` — 프로젝트 핵심 데이터 (Single Source of Truth)
2. `SLIDE_STRUCTURE.md` — 슬라이드 구조/순서/레이아웃/콘텐츠

### Step 2: slides.ts 생성/업데이트
읽은 데이터를 조합하여 `src/data/slides.ts`를 생성한다:
- TypeScript 타입 정의 (`SlideLayout`, `Slide` 인터페이스)
- `slides` 배열: 각 슬라이드의 `id`, `section`, `title`, `subtitle`, `layout`, `content`, `speaker_notes`
- `content` 필드는 레이아웃 타입에 맞는 구조로 작성
- `<!-- TODO -->` 마커가 있는 항목은 placeholder 텍스트로 표시

### Step 3: 검증
- slides.ts의 슬라이드 수가 SLIDE_STRUCTURE.md와 일치하는지 확인
- 각 슬라이드의 layout 값이 컴포넌트에 매핑 가능한 값인지 확인
- TypeScript 타입 에러가 없는지 확인

## 출력
- `src/data/slides.ts` 파일 생성/업데이트
- 동기화 완료 메시지 출력
- `npm run dev`가 실행중이면 HMR로 즉시 반영됨

## 주의사항
- 기존 slides.ts의 content 구조를 유지 (각 레이아웃 컴포넌트가 해당 구조에 의존)
- 새로운 레이아웃 타입 추가 시 `src/components/slides/`에 컴포넌트도 함께 생성 필요
