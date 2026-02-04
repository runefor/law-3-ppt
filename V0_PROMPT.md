# v0.dev 마스터 프롬프트

> 이 파일은 `v0-prompt-generator` 스킬로 자동 생성됩니다.
> 직접 수정하지 말고, PROJECT_INFO.md와 SLIDE_STRUCTURE.md를 수정한 뒤 스킬을 실행하세요.
> 아래 전체 내용을 v0.dev에 붙여넣어 사용합니다.

---

## ===== PART 1: 디자인 & 기술 지시 (거의 수정 불필요) =====

다음 사양으로 프레젠테이션 React 컴포넌트를 만들어주세요:

### 기술 스택
- React + Next.js (App Router)
- Tailwind CSS
- shadcn/ui 컴포넌트
- framer-motion (슬라이드 전환 애니메이션)

### 디자인 테마 (Apple Dark Style)
- 배경색: `#000000` (메인), `#1d1d1f` (카드/섹션)
- 텍스트: `#f5f5f7` (주 텍스트), `#86868b` (보조 텍스트)
- 강조색: `#2997ff` (블루), `#bf5af2` (퍼플), `#30d158` (그린)
- 폰트: `font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif`
- 타이틀: `48-72px`, `font-weight: bold`
- 본문: `18-24px`, `font-weight: regular`
- 여백: `padding: 80px` 이상, 풀스크린 섹션 중심 레이아웃
- 카드: `background: #1d1d1f`, `border-radius: 16px`, `padding: 32px`

### 네비게이션
- 키보드: 좌/우 화살표키, 스페이스바 (다음)
- 클릭: 양쪽 가장자리 클릭으로 이전/다음
- 하단 도트 인디케이터 (현재 슬라이드 하이라이트)
- 슬라이드 번호 표시 (우측 하단, 작은 텍스트)

### 애니메이션
- 슬라이드 전환: framer-motion `AnimatePresence` + `variants`
- 진입: `fadeIn` + 약간의 `slideUp` (y: 20 → 0)
- 퇴장: `fadeOut`
- 카운트업 수치: `framer-motion`의 `useMotionValue` + `animate`
- 프로그레스 바: 진입 시 0% → 목표값 애니메이션

### 코드 구조
- 슬라이드 데이터를 `const slides = [...]` 배열로 분리
- 각 슬라이드 객체: `{ id, section, title, subtitle, layout, content, speaker_notes }`
- 메인 컴포넌트에서 `slides[currentIndex]`로 렌더링
- 레이아웃별 서브 컴포넌트: `HeroSlide`, `StatsSlide`, `FeatureSplitSlide`, `GridSlide`, `SplitTwoColumnSlide`, `FlowDiagramSlide`, `DiagramFullscreenSlide` 등

---

## ===== PART 2: 슬라이드 구조 (SLIDE_STRUCTURE.md에서 생성) =====

총 20개 슬라이드, 7개 섹션:

```
슬라이드 1  — [인트로] 타이틀 (hero-fullscreen)
슬라이드 2  — [인트로] 목차 (list-minimal)
슬라이드 3  — [배경] 위기의 법률 시장 (split-two-column)
슬라이드 4  — [배경] 문제 정의 - 사용자별 (cards-row)
슬라이드 5  — [배경] 우리의 미션 (three-column)
슬라이드 6  — [솔루션] 서비스 전체 흐름 (diagram-fullscreen)
슬라이드 7  — [솔루션] Biz Helper - 기회의 땅 (feature-split)
슬라이드 8  — [솔루션] AI Client Intake (split-two-column)
슬라이드 9  — [솔루션] Legal Tech - 판례 검색 (feature-split)
슬라이드 10 — [아키텍처] 시스템 아키텍처 (diagram-fullscreen)
슬라이드 11 — [아키텍처] 기술 스택 (grid-cards)
슬라이드 12 — [아키텍처] 멀티 에이전트 설계 (diagram-fullscreen)
슬라이드 13 — [아키텍처] AI 채팅 흐름 (flow-diagram)
슬라이드 14 — [데이터] 데이터 파이프라인 (flow-diagram)
슬라이드 15 — [데이터] 핵심 수치 (stats-countup)
슬라이드 16 — [진행] 프로젝트 대시보드 (stats-highlight)
슬라이드 17 — [진행] 완료/진행/예정 작업 (progress-bars)
슬라이드 18 — [데모] 시연 영상 (screenshot-full)
슬라이드 19 — [계획] 남은 작업 & 일정 (timeline-roadmap)
슬라이드 20 — [마무리] Q&A (minimal-center)
```

---

## ===== PART 3: 슬라이드별 콘텐츠 =====

아래 `slides` 배열의 각 항목이 하나의 슬라이드입니다. `{/* PLACEHOLDER */}` 표시된 곳은 나중에 실제 이미지/콘텐츠로 교체 예정입니다.

```javascript
const slides = [
  // <!-- SLIDE_1: 타이틀 -->
  {
    id: 1,
    section: "인트로",
    title: "Law-3 AI 법률 플랫폼",
    subtitle: "일반인에게는 상담의 문턱을 낮추고, 변호사에게는 고객과 개업 전략을 제공하는 AI 법률 플랫폼",
    layout: "hero-fullscreen",
    content: {
      team: "Law-3 Team",
      event: "AI Camp 4기 · 중간 발표",
      date: "2026년 2월",
    },
    speaker_notes: "프로젝트 소개. AI와 변호사의 상생을 강조하며 시작.",
  },

  // <!-- SLIDE_2: 목차 -->
  {
    id: 2,
    section: "인트로",
    title: "발표 순서",
    layout: "list-minimal",
    content: {
      items: [
        { number: "01", label: "배경 — 위기의 법률 시장 & 문제 정의" },
        { number: "02", label: "솔루션 — 서비스 흐름 & 핵심 기능" },
        { number: "03", label: "아키텍처 — 시스템 설계 & 멀티 에이전트" },
        { number: "04", label: "데이터 — 파이프라인 & 핵심 수치" },
        { number: "05", label: "진행 현황 — 대시보드 & 작업 상태" },
        { number: "06", label: "마무리 — 데모, 향후 계획, Q&A" },
      ],
    },
    speaker_notes: "총 6개 섹션으로 구성. 배경부터 마무리까지 30분 내외로 진행.",
  },

  // <!-- SLIDE_3: 위기의 법률 시장 -->
  {
    id: 3,
    section: "배경",
    title: "위기의 법률 시장",
    layout: "split-two-column",
    content: {
      left: {
        heading: "위기",
        items: [
          "\"AI가 변호사를 대체한다?\" — 대체 공포 확산",
          "변호사 과잉 공급 → 수임 경쟁 심화",
          "일반인의 법률 서비스 접근 장벽 여전",
        ],
      },
      right: {
        heading: "기회",
        items: [
          "AI는 대체자가 아닌 동반자",
          "의뢰인의 목소리를 법률 언어로 번역",
          "변호사에게 준비된 고객 연결",
        ],
      },
      bottomQuote: "AI는 법률적 판단을 내리는 침입자가 아니라, 의뢰인의 목소리를 법률 언어로 번역해 변호사에게 전달하는 가장 스마트한 동반자",
    },
    speaker_notes: "법률 시장의 현재 위기를 설명하고, 우리가 제시하는 기회를 대비. 핵심은 AI가 변호사를 대체하는 것이 아니라 돕는다는 메시지.",
  },

  // <!-- SLIDE_4: 문제 정의 (사용자별) -->
  {
    id: 4,
    section: "배경",
    title: "양쪽 모두의 문제",
    layout: "cards-row",
    content: {
      personas: [
        {
          icon: "⚖️",
          name: "변호사의 고민",
          description: "AI 대체 공포 + 과잉 공급 → 개업 및 수임 경쟁 심화",
          needs: "데이터 기반 블루오션 탐색, 개업 전략 수립, 수임 기회 확대",
        },
        {
          icon: "👤",
          name: "일반인의 고민",
          description: "높은 상담 문턱과 비용 → 법률 복지 사각지대",
          needs: "낮은 진입장벽의 법률 상담, 사건 정리, 적합한 변호사 연결",
        },
      ],
    },
    speaker_notes: "변호사와 일반인 양쪽 모두의 페인포인트를 정의. 이 문제를 동시에 풀어야 상생이 가능.",
  },

  // <!-- SLIDE_5: 우리의 미션 -->
  {
    id: 5,
    section: "배경",
    title: "우리의 핵심 가치",
    layout: "three-column",
    content: {
      columns: [
        {
          icon: "🤝",
          title: "상생 (Co-prosperity)",
          description: "AI와 변호사가 대체가 아닌 협력 관계. AI는 의뢰인을 정리해 변호사에게 전달하는 스마트한 다리.",
        },
        {
          icon: "⚡",
          title: "효율 (Efficiency)",
          description: "법률 상담 진입장벽을 AI로 낮춤. 일반인이 쉽게 사건을 정리하고 상담 준비 가능.",
        },
        {
          icon: "💰",
          title: "수익 (Profit)",
          description: "변호사에게 준비된 고객 연결. 데이터 기반 개업 전략으로 블루오션 발굴.",
        },
      ],
    },
    speaker_notes: "세 가지 핵심 가치를 통해 우리의 미션을 정의. 상생-효율-수익 세 축이 플랫폼의 근간.",
  },

  // <!-- SLIDE_6: 서비스 전체 흐름 -->
  {
    id: 6,
    section: "솔루션",
    title: "서비스 전체 흐름",
    layout: "diagram-fullscreen",
    content: {
      placeholder: "서비스 전체 흐름 다이어그램", // {/* PLACEHOLDER */}
      flow: {
        entry: "역할 선택 (일반인 / 변호사)",
        paths: [
          {
            role: "일반인",
            steps: ["AI 상담 채팅", "사건 정리", "변호사 리포트 생성", "변호사 매칭"],
          },
          {
            role: "변호사",
            steps: ["Biz Helper", "히트맵 / 개업추천지수", "블루오션 탐색"],
          },
        ],
      },
      note: "역할에 따라 최적화된 경험 제공",
    },
    speaker_notes: "서비스의 전체 흐름을 보여줌. 역할 선택 → 기능 분기가 핵심. 일반인과 변호사 각각의 여정을 설명.",
  },

  // <!-- SLIDE_7: Biz Helper - 기회의 땅 -->
  {
    id: 7,
    section: "솔루션",
    title: "Biz Helper — 기회의 땅을 찾아서",
    subtitle: "데이터 기반 개업 전략 도구",
    layout: "feature-split",
    content: {
      features: [
        "지역별 변호사 분포 히트맵 (17,326 변호사 데이터)",
        "개업추천지수 시뮬레이션 (경쟁 밀도, 수요 분석)",
        "전문분야별 블루오션 탐색",
      ],
      screenshot: "Biz Helper 히트맵 스크린샷", // {/* PLACEHOLDER */}
    },
    speaker_notes: "변호사 대상 핵심 기능. 17,326 변호사 데이터로 히트맵을 만들고, 개업추천지수를 시뮬레이션. 어디에 어떤 분야로 개업하면 좋을지 데이터로 보여준다.",
  },

  // <!-- SLIDE_8: AI Client Intake -->
  {
    id: 8,
    section: "솔루션",
    title: "AI Client Intake",
    subtitle: "일반인의 목소리를 변호사의 언어로",
    layout: "split-two-column",
    content: {
      left: {
        heading: "일반인 경험",
        items: [
          "AI 채팅으로 자연어 사건 상담",
          "질문-답변 통해 사건 핵심 정리",
          "관련 법령/판례 기반 초기 가이드",
        ],
      },
      right: {
        heading: "변호사 경험",
        items: [
          "정리된 사건 리포트 수신",
          "법률 쟁점 자동 분류",
          "준비된 고객과의 상담 → 수임 전환율 향상",
        ],
      },
    },
    speaker_notes: "일반인은 AI와 대화하며 사건을 정리하고, 변호사는 정리된 리포트를 받아 효율적으로 상담. 양쪽 모두에게 가치를 제공하는 핵심 기능.",
  },

  // <!-- SLIDE_9: Legal Tech - 판례 검색 -->
  {
    id: 9,
    section: "솔루션",
    title: "Legal Tech — 판례 검색",
    subtitle: "RAG 기반 법률 지식 검색 시스템",
    layout: "feature-split",
    content: {
      pipeline: [
        "사용자 질의 → 쿼리 리라이팅",
        "KURE-v1 임베딩 → LanceDB 벡터 검색",
        "관련 법령/판례 리랭킹",
        "GPT-4o-mini 기반 답변 생성",
      ],
      screenshot: "판례 검색 시연 예시", // {/* PLACEHOLDER */}
    },
    speaker_notes: "RAG 파이프라인의 4단계를 설명. 쿼리 리라이팅으로 질의 품질 향상, KURE-v1 로컬 임베딩으로 벡터 검색, 리랭킹 후 GPT-4o-mini로 답변 생성.",
  },

  // <!-- SLIDE_10: 시스템 아키텍처 -->
  {
    id: 10,
    section: "아키텍처",
    title: "시스템 아키텍처",
    layout: "diagram-fullscreen",
    content: {
      placeholder: "시스템 아키텍처 다이어그램", // {/* PLACEHOLDER */}
      layers: [
        { name: "Frontend", tech: "Next.js 14, TypeScript, Tailwind CSS" },
        { name: "API Gateway", tech: "FastAPI 0.110+" },
        { name: "Orchestrator", tech: "Multi-Agent System (LangChain)" },
        { name: "Data Layer", tech: "PostgreSQL + LanceDB + Neo4j" },
      ],
      note: "멀티 에이전트 기반 모듈형 아키텍처",
    },
    speaker_notes: "전체 시스템 구조. Frontend → API Gateway → Multi-Agent Orchestrator → DB Layer 4계층. 각 계층의 기술 스택을 간략히 소개.",
  },

  // <!-- SLIDE_11: 기술 스택 -->
  {
    id: 11,
    section: "아키텍처",
    title: "기술 스택",
    layout: "grid-cards",
    content: {
      stacks: [
        { area: "Backend", items: ["FastAPI 0.110+", "Python 3.11+", "uv", "Pydantic 2.x", "SQLAlchemy 2.0"] },
        { area: "Frontend", items: ["Next.js 14", "TypeScript 5.x", "Tailwind CSS 3.x", "TanStack Query 5.x", "Kakao Maps SDK", "Recharts"] },
        { area: "AI/ML", items: ["GPT-4o-mini", "KURE-v1 (로컬 임베딩)", "LangChain"] },
        { area: "Database", items: ["PostgreSQL", "LanceDB (벡터)", "Neo4j (그래프)"] },
      ],
    },
    speaker_notes: "4개 영역의 기술 스택 상세. 특히 AI/ML에서 Solar 대신 GPT-4o-mini로 변경한 점, 로컬 임베딩으로 KURE-v1 사용하는 점 강조.",
  },

  // <!-- SLIDE_12: 멀티 에이전트 설계 -->
  {
    id: 12,
    section: "아키텍처",
    title: "멀티 에이전트 아키텍처",
    layout: "diagram-fullscreen",
    content: {
      placeholder: "멀티 에이전트 아키텍처 다이어그램", // {/* PLACEHOLDER */}
      architecture: {
        orchestrator: "Orchestrator (최상위 조율)",
        router: "Router (의도 파악 & 분류)",
        executor: "Executor (실행 관리)",
        agents: [
          { name: "LegalAnswerAgent", description: "판례/법령 검색 및 응답", color: "#2997ff" },
          { name: "LawyerFinderAgent", description: "위치 기반 변호사 찾기", color: "#bf5af2" },
          { name: "SmallClaimsAgent", description: "소액소송 가이드", color: "#30d158" },
          { name: "SimpleChatAgent", description: "일반 LLM 채팅", color: "#ff9f0a" },
        ],
      },
      note: "의도 기반 라우팅으로 최적 에이전트 자동 선택",
    },
    speaker_notes: "멀티 에이전트 구조 설명. Orchestrator → Router → Executor → Agent 흐름. 사용자 의도에 따라 4개 에이전트 중 적절한 것이 자동 선택.",
  },

  // <!-- SLIDE_13: AI 채팅 흐름 -->
  {
    id: 13,
    section: "아키텍처",
    title: "AI 채팅 흐름",
    layout: "flow-diagram",
    content: {
      flow: [
        { stage: "입력", detail: "사용자 메시지 입력" },
        { stage: "라우팅", detail: "Router: 의도 파악 (법률 질의 / 변호사 검색 / 소액소송 / 일반 대화)" },
        { stage: "분기", detail: "해당 에이전트로 분기" },
        { stage: "실행", detail: "에이전트 실행 (RAG 검색 / API 호출 / LLM 응답)" },
        { stage: "응답", detail: "결과 포맷팅 & 응답 반환" },
      ],
      placeholder: "AI 채팅 흐름 다이어그램", // {/* PLACEHOLDER */}
    },
    speaker_notes: "사용자 메시지가 들어오면 Router가 의도를 파악하고 적절한 에이전트로 분기. 각 에이전트는 독립적으로 실행되어 결과를 반환.",
  },

  // <!-- SLIDE_14: 데이터 파이프라인 -->
  {
    id: 14,
    section: "데이터",
    title: "데이터 파이프라인",
    layout: "flow-diagram",
    content: {
      flow: [
        { stage: "수집", detail: "법령 API (5,841건), 판례 크롤링 (65,107건 예정), 변호사 데이터 (17,326건)" },
        { stage: "전처리", detail: "청킹 전략 5가지 테스트 → B조합 선정" },
        { stage: "임베딩", detail: "KURE-v1 (로컬 임베딩) → 253,768 청크 생성" },
        { stage: "저장", detail: "LanceDB (벡터), PostgreSQL (메타데이터), Neo4j (관계)" },
      ],
      placeholder: "데이터 파이프라인 플로우 다이어그램", // {/* PLACEHOLDER */}
    },
    speaker_notes: "데이터 파이프라인 4단계. 수집 → 전처리 → 임베딩 → 저장. 청킹 전략 5가지를 테스트해서 B조합을 선정한 과정 강조.",
  },

  // <!-- SLIDE_15: 핵심 수치 -->
  {
    id: 15,
    section: "데이터",
    title: "프로젝트 데이터 규모",
    layout: "stats-countup",
    content: {
      stats: [
        { value: 5841, label: "법령 데이터", suffix: "건" },
        { value: 65107, label: "판례 데이터 (예정)", suffix: "건" },
        { value: 253768, label: "임베딩 청크", suffix: "개" },
        { value: 17326, label: "변호사 데이터", suffix: "건" },
      ],
    },
    speaker_notes: "프로젝트의 데이터 규모를 한눈에. 법령 5,841건이 적재 완료, 판례 65,107건은 예정. 임베딩 청크 253,768개가 LanceDB에 저장됨.",
  },

  // <!-- SLIDE_16: 프로젝트 대시보드 -->
  {
    id: 16,
    section: "진행",
    title: "프로젝트 대시보드",
    layout: "stats-highlight",
    content: {
      stats: [
        { value: "55%", label: "전체 공정률" },
        { value: "42%", label: "예산 소진율" },
        { value: "D-30", label: "최종 발표까지" },
      ],
    },
    speaker_notes: "프로젝트 현황 대시보드. 공정률 55%로 절반 이상 진행, 예산은 42% 소진, 최종 발표까지 약 30일 남음.",
  },

  // <!-- SLIDE_17: 완료/진행/예정 작업 -->
  {
    id: 17,
    section: "진행",
    title: "작업 진행 현황",
    layout: "progress-bars",
    content: {
      completed: [
        "데이터 수집 (법령 5,841건)",
        "청킹 전략 5가지 테스트 (B조합 선정)",
        "LanceDB 적재 (253,768 청크)",
        "테스트 질문 10개 선정",
      ],
      inProgress: [
        "전처리 파이프라인",
      ],
      planned: [
        "쿼리 리라이팅 / 리랭킹",
        "RAG 단계별 평가",
        "판례/보강자료 적재",
        "UI 개발",
      ],
    },
    speaker_notes: "완료된 작업 4건, 진행중 1건, 예정 4건. 데이터 수집과 임베딩 적재가 완료되어 RAG 기반이 마련됨. 다음은 리라이팅/리랭킹 테스트.",
  },

  // <!-- SLIDE_18: 시연 영상 -->
  {
    id: 18,
    section: "데모",
    title: "서비스 시연",
    layout: "screenshot-full",
    content: {
      screenshot: "시연 영상 또는 스크린샷", // {/* PLACEHOLDER */}
      description: "역할 선택 → AI 채팅 → 결과 확인 데모 흐름",
    },
    speaker_notes: "서비스 시연. 역할 선택 화면에서 일반인을 선택하고 AI 채팅으로 사건을 상담하는 흐름을 보여줌.",
  },

  // <!-- SLIDE_19: 남은 작업 & 일정 -->
  {
    id: 19,
    section: "계획",
    title: "남은 작업 & 일정",
    layout: "timeline-roadmap",
    content: {
      phases: [
        { phase: "Week 1", label: "단기", detail: "리라이팅/리랭킹 테스트, 전처리 파이프라인 완성" },
        { phase: "Week 2-3", label: "중기", detail: "RAG 평가, 판례 적재, PDF 리포트 고도화" },
        { phase: "Week 4", label: "장기", detail: "UI 개발, 최종 정리, 서비스 런칭" },
      ],
    },
    speaker_notes: "4주 로드맵. 1주차에 리라이팅/리랭킹, 2-3주차에 RAG 평가와 판례 적재, 4주차에 UI 개발과 서비스 런칭을 목표로 진행.",
  },

  // <!-- SLIDE_20: Q&A -->
  {
    id: 20,
    section: "마무리",
    title: "Q & A",
    subtitle: "감사합니다",
    layout: "minimal-center",
    content: {
      team: "Law-3 Team",
      event: "AI Camp 4기",
      contact: "GitHub: —", // <!-- TODO: 팀 연락처/깃헙 -->
    },
    speaker_notes: "질의응답 시간. 감사 인사와 함께 팀 연락처 안내.",
  },
];
```

---

## 사용 방법

1. 위 전체 내용 (PART 1 + PART 2 + PART 3)을 **v0.dev**에 붙여넣기
2. 생성된 코드를 로컬 프로젝트에 복사
3. `npm install && npm run dev`로 실행
4. 키보드 좌/우 화살표로 슬라이드 네비게이션 확인
5. `{/* PLACEHOLDER */}` 부분을 실제 이미지/스크린샷으로 교체
