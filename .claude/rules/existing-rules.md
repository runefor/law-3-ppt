# 프로젝트: Law-3 PPT (로컬 Next.js 앱)

## 디자인 가이드라인 (Apple Dark Style)
- 배경: #000000 ~ #1d1d1f
- 텍스트: #f5f5f7 (주), #86868b (보조)
- 강조: #2997ff (블루), #bf5af2 (퍼플), #30d158 (그린)
- 폰트: system-ui, -apple-system
- 타이틀: 48-72px bold / 본문: 18-24px regular
- 여백: padding 80px+ / 풀스크린 섹션 중심

## 개발 환경
- 로컬 실행: `npm run dev` → http://localhost:3000
- 기술 스택: Next.js 14 (App Router) + TypeScript + Tailwind CSS + framer-motion
- 슬라이드 데이터: `src/data/slides.ts`에서 관리
- 컴포넌트: `src/components/slides/` 디렉토리에 레이아웃별 분리

## 수정 규칙
- 콘텐츠 수정: PROJECT_INFO.md → SLIDE_STRUCTURE.md → `src/data/slides.ts` 순서
- 슬라이드 추가/삭제: SLIDE_STRUCTURE.md 수정 → slides.ts 동기화
- 레이아웃 수정: `src/components/slides/` 내 해당 컴포넌트 수정
- PROJECT_INFO.md는 단일 참조 소스 (Single Source of Truth)
