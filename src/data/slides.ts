export type SlideLayout =
  | "hero-fullscreen"
  | "list-minimal"
  | "split-two-column"
  | "cards-row"
  | "three-column"
  | "diagram-fullscreen"
  | "feature-split"
  | "grid-cards"
  | "flow-diagram"
  | "stats-countup"
  | "stats-highlight"
  | "progress-bars"
  | "screenshot-full"
  | "live-demo"
  | "timeline-roadmap"
  | "service-landscape"
  | "minimal-center"
  | "burndown-chart"
  | "gantt-milestone"
  | "bar-chart"
  | "challenge-log"
  | "challenge-solution"
  | "triptych-cards"
  | "vision-flow"
  | "ct-stepper"
  | "data-pipeline"
  | "role-platform"
  | "dual-track"
  | "video-showcase"
  | "strategic-assets"
  | "three-pillars"
  | "rag-pipeline"
  | "onnx-optimization"
  | "recursive-cte"
  | "summary-vision"
  | "scale-proof"
  | "cost-management"
  | "team-intro"
  | "retrospective"
  | "strategy-radial";

export type Audience = "investor" | "developer" | "both";

export interface Slide {
  id: number;
  section: string;
  title: string;
  subtitle?: string;
  layout: SlideLayout;
  content: Record<string, unknown>;
  speaker_notes: string;
  audience?: Audience;
}

export const slides: Slide[] = [
  {
    id: 1,
    section: "인트로",
    title: "Law-3 AI 법률 플랫폼",
    subtitle:
      "일반인에게는 상담의 문턱을 낮추고, 변호사에게는 고객과 개업 전략을 제공하는 AI 법률 플랫폼",
    layout: "hero-fullscreen",
    content: {
      team: "Law-3 Team",
      event: "AI Camp 4기 · 중간 발표",
      date: "2026년 2월 4일",
    },
    speaker_notes: "프로젝트 소개. AI와 변호사의 상생을 강조하며 시작.",
  },
  {
    id: 2,
    section: "인트로",
    title: "현재 법률 서비스 시장",
    layout: "service-landscape",
    content: {
      services: [
        {
          name: "Law&Good",
          image: "/images/services/lawgood.png",
          description: "법률 상담 플랫폼",
        },
        {
          name: "빅케이스",
          image: "/images/services/bigcase.png",
          description: "판례 검색 서비스",
        },
        {
          name: "SuperLawyer",
          image: "/images/services/superlawyer.png",
          description: "변호사 매칭 서비스",
        },
        {
          name: "CaseNote",
          image: "/images/services/casenote.png",
          description: "사건 관리 도구",
        },
        {
          name: "LBOX",
          image: "/images/services/lbox.png",
          description: "법률 AI 플랫폼",
        },
        {
          name: "Lfind",
          image: "/images/services/lfind.png",
          description: "변호사 검색 서비스",
        },
      ],
    },
    speaker_notes:
      "현재 시장에 존재하는 다양한 법률 서비스들. 각각의 영역에서 활동하고 있지만, 일반인과 변호사의 상생을 동시에 풀어주는 통합 플랫폼은 부재.",
  },
  {
    id: 3,
    section: "배경",
    title: "위기의 법률 시장",
    layout: "split-two-column",
    content: {
      left: {
        heading: "위기",
        items: [
          '"AI가 변호사를 대체한다?" — 대체 공포 확산',
          "변호사 과잉 공급",
          "일반인의 법률 서비스 접근 장벽 여전",
        ],
      },
      right: {
        heading: "양쪽의 고민",
        items: [
          "⚖️ 변호사: AI 대체 공포 + 과잉 공급 → 수임 경쟁 심화",
          "👤 일반인: 높은 상담 문턱과 비용 → 법률 복지 사각지대",
        ],
      },
      bottomQuote:
        "AI는 법률적 판단을 내리는 침입자가 아니라, 의뢰인의 목소리를 법률 언어로 번역해 변호사에게 전달하는 가장 스마트한 동반자",
    },
    speaker_notes:
      "법률 시장의 현재 위기를 설명하고, 우리가 제시하는 기회를 대비. 핵심은 AI가 변호사를 대체하는 것이 아니라 돕는다는 메시지.",
  },
  {
    id: 4,
    section: "배경",
    title: "기회: AI는 동반자",
    layout: "cards-row",
    content: {
      personas: [
        {
          icon: "🤖",
          name: "AI는 대체자가 아닌 동반자",
          description:
            "의뢰인의 목소리를 법률 언어로 번역하는 스마트한 다리 역할",
          needs:
            "변호사에게 준비된 고객 연결, 데이터 기반 개업 전략 제공",
        },
        {
          icon: "🤝",
          name: "상생의 플랫폼",
          description: "변호사와 일반인 모두의 문제를 동시에 해결",
          needs:
            "일반인에게는 낮은 상담 문턱, 변호사에게는 수임 기회 확대",
        },
      ],
    },
    speaker_notes:
      "위기 속에서 AI가 제시하는 기회를 설명. AI는 변호사를 대체하는 것이 아니라 돕는 동반자.",
  },
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
          description:
            "AI와 변호사가 대체가 아닌 협력 관계. AI는 의뢰인을 정리해 변호사에게 전달하는 스마트한 다리.",
        },
        {
          icon: "⚡",
          title: "효율 (Efficiency)",
          description:
            "법률 상담 진입장벽을 AI로 낮춤. 일반인이 쉽게 사건을 정리하고 상담 준비 가능.",
        },
        {
          icon: "💰",
          title: "수익 (Profit)",
          description:
            "변호사에게 준비된 고객 연결. 데이터 기반 개업 전략으로 블루오션 발굴.",
        },
      ],
    },
    speaker_notes:
      "세 가지 핵심 가치를 통해 우리의 미션을 정의. 상생-효율-수익 세 축이 플랫폼의 근간.",
  },
  {
    id: 6,
    section: "솔루션",
    title: "서비스 전체 흐름",
    layout: "diagram-fullscreen",
    content: {
      placeholder: "서비스 전체 흐름 다이어그램",
      flow: {
        entry: "역할 선택 (일반인 / 변호사)",
        paths: [
          {
            role: "일반인",
            steps: [
              "AI 상담 채팅",
              "사건 정리",
              "변호사 리포트 생성",
              "변호사 매칭",
            ],
          },
          {
            role: "변호사",
            steps: [
              "변호사 지도 기반 현황 파악",
              "히트맵 / 개업추천지수",
              "블루오션 탐색",
            ],
          },
        ],
        convergence: "고객 매칭 — 준비된 의뢰인 × 최적의 변호사",
      },
      note: "역할에 따라 최적화된 경험 제공",
    },
    speaker_notes:
      "서비스의 전체 흐름을 보여줌. 역할 선택 → 기능 분기가 핵심. 일반인과 변호사 각각의 여정을 설명.",
  },
  {
    id: 7,
    section: "솔루션",
    title: "Biz Helper",
    subtitle:
      "변호사 시장을 데이터 기반으로 분석하여, 변호사가 실제 사업 전략과 업무 방향을 수립하는 데 활용할 수 있는 비즈니스 인텔리전스 도구",
    layout: "feature-split",
    content: {
      features: [
        "지역별 변호사 현황 지도 시각화",
        "추계 인구 데이터를 활용한 향후 변호사 밀도 변화 시각화",
        "지역 × 전문분야 교차 분석 기반 변호사 현황 조회",
      ],
      screenshots: [
        "/images/services/biz-helper.png",
        "/images/services/biz-helper2.png",
        "/images/services/biz-helper3.png",
      ],
    },
    speaker_notes:
      "변호사 대상 핵심 기능. 지역별 변호사 현황 지도, 추계 인구 기반 밀도 변화 시각화, 지역×전문분야 교차 분석으로 비즈니스 인텔리전스 제공.",
  },
  {
    id: 8,
    section: "솔루션",
    title: "변호사–일반인 범용 법률 서비스",
    subtitle: "법률 검색부터 변호사 연결까지, 하나의 플랫폼에서",
    layout: "split-two-column",
    content: {
      left: {
        heading: "일반인 대상",
        items: [
          "단순 질문만으로 법률 정보와 판례, 관련 법령을 쉽게 검색",
          "법률 영역에 대한 진입 장벽을 낮춰, 법률 정보 접근성 개선",
        ],
      },
      right: {
        heading: "변호사 대상",
        items: [
          "쟁점 파악, 관련 판례 탐색, 근거 자료 확인 과정의 시간 단축",
          "반복적인 업무 부담을 감소시켜 실질적인 사건 분석과 전략 수립에 집중 가능",
        ],
      },
    },
    speaker_notes:
      "일반인에게는 법률 정보 접근성을 개선하고, 변호사에게는 업무 효율화를 제공하는 범용 법률 서비스 플랫폼.",
  },
  {
    id: 9,
    section: "솔루션",
    title: "Legal Tech — 종합 법률 검색 시스템",
    subtitle: "법제처 국가법령정보센터 65개 데이터 · 20GB 통합 DB",
    layout: "split-two-column",
    content: {
      left: {
        heading: "핵심 기능",
        style: "feature-cards",
        items: [
          "단일 검색 인터페이스에서 법령·판례·해석례 등 모든 법률 문서 동시 탐색",
          "출처가 명확한 근거 기반 AI 답변 제공",
          "원문 바로 확인 가능한 법률 검색",
        ],
      },
      right: {
        heading: "활용 데이터 범위 (65종)",
        items: [
          "법령 · 행정규칙 · 자치법규",
          "판례 · 헌재결정례 · 12개 위원회 결정문",
          "법령해석례 · 행정심판례 · 4개 특별행정심판",
          "37개 중앙부처 1차 해석 · 감사원 사전컨설팅 의견서",
          "조약 · 법령용어",
          "공공학교 학칙 · 공단 규칙 · 공공기관 규칙",
        ],
      },
      bottomQuote:
        "반쪽짜리 법률 시스템이 아닌, 국가법령정보센터의 모든 법률 정보를 통합 분석하는 진짜 법률 전문가 AI",
    },
    speaker_notes:
      "종합 법률 검색 시스템 소개. 법제처 국가법령정보센터의 65개 데이터(20GB)를 통합하여, 법령·판례·해석례 등 모든 법률 문서를 단일 인터페이스에서 검색. RAG + 리랭킹으로 출처 명확한 AI 답변 제공.",
  },
  {
    id: 10,
    section: "아키텍처",
    title: "시스템 아키텍처",
    layout: "diagram-fullscreen",
    content: {
      placeholder: "시스템 아키텍처 다이어그램",
      layers: [
        {
          name: "Frontend",
          tech: "Next.js 14, TypeScript, Tailwind CSS",
          logos: [
            "https://cdn.simpleicons.org/nextdotjs/white",
            "https://cdn.simpleicons.org/typescript/white",
            "https://cdn.simpleicons.org/tailwindcss/white",
          ],
        },
        {
          name: "API Gateway",
          tech: "FastAPI 0.110+",
          logos: [
            "https://cdn.simpleicons.org/fastapi/white",
          ],
        },
        {
          name: "Orchestrator",
          tech: "Multi-Agent System (LangChain)",
          logos: [
            "https://cdn.simpleicons.org/langchain/white",
          ],
        },
        {
          name: "Data Layer",
          tech: "PostgreSQL + LanceDB + Neo4j",
          logos: [
            "https://cdn.simpleicons.org/postgresql/white",
            "https://cdn.simpleicons.org/neo4j/white",
          ],
        },
      ],
      note: "멀티 에이전트 기반 모듈형 아키텍처",
    },
    speaker_notes:
      "전체 시스템 구조. Frontend → API Gateway → Multi-Agent Orchestrator → DB Layer 4계층. 각 계층의 기술 스택을 간략히 소개.",
  },
  {
    id: 11,
    section: "아키텍처",
    title: "기술 스택",
    layout: "grid-cards",
    content: {
      stacks: [
        {
          area: "Backend",
          items: [
            "FastAPI 0.110+",
            "Python 3.11+",
            "uv",
            "Pydantic 2.x",
            "SQLAlchemy 2.0",
          ],
          logos: {
            "FastAPI 0.110+": "https://cdn.simpleicons.org/fastapi/white",
            "Python 3.11+": "https://cdn.simpleicons.org/python/white",
            "Pydantic 2.x": "https://cdn.simpleicons.org/pydantic/white",
            "SQLAlchemy 2.0": "https://cdn.simpleicons.org/sqlalchemy/white",
          },
        },
        {
          area: "Frontend",
          items: [
            "Next.js 14",
            "TypeScript 5.x",
            "Tailwind CSS 3.x",
            "TanStack Query 5.x",
            "Kakao Maps SDK",
            "Recharts",
          ],
          logos: {
            "Next.js 14": "https://cdn.simpleicons.org/nextdotjs/white",
            "TypeScript 5.x": "https://cdn.simpleicons.org/typescript/white",
            "Tailwind CSS 3.x": "https://cdn.simpleicons.org/tailwindcss/white",
            "TanStack Query 5.x": "https://cdn.simpleicons.org/react/white",
          },
        },
        {
          area: "AI/ML",
          items: [
            "GPT-4o-mini",
            "KURE-v1 (로컬 임베딩)",
            "LangChain",
          ],
          logos: {
            "GPT-4o-mini": "https://cdn.simpleicons.org/openai/white",
            "LangChain": "https://cdn.simpleicons.org/langchain/white",
          },
        },
        {
          area: "Database",
          items: [
            "PostgreSQL",
            "LanceDB (벡터)",
            "Neo4j (그래프)",
          ],
          logos: {
            "PostgreSQL": "https://cdn.simpleicons.org/postgresql/white",
            "Neo4j (그래프)": "https://cdn.simpleicons.org/neo4j/white",
          },
        },
      ],
    },
    speaker_notes:
      "4개 영역의 기술 스택 상세. 특히 AI/ML에서 Solar 대신 GPT-4o-mini로 변경한 점, 로컬 임베딩으로 KURE-v1 사용하는 점 강조.",
  },
  {
    id: 12,
    section: "아키텍처",
    title: "멀티 에이전트 아키텍처",
    layout: "diagram-fullscreen",
    content: {
      placeholder: "멀티 에이전트 아키텍처 다이어그램",
      architecture: {
        orchestrator: "Orchestrator (최상위 조율)",
        router: "Router (의도 파악 & 분류)",
        executor: "Executor (실행 관리)",
        agents: [
          {
            name: "LegalAnswerAgent",
            description: "판례/법령 검색 및 응답",
            color: "#2997ff",
          },
          {
            name: "LawyerFinderAgent",
            description: "위치 기반 변호사 찾기",
            color: "#bf5af2",
          },
          {
            name: "SmallClaimsAgent",
            description: "소액소송 가이드",
            color: "#30d158",
          },
          {
            name: "SimpleChatAgent",
            description: "일반 LLM 채팅",
            color: "#ff9f0a",
          },
        ],
      },
      note: "의도 기반 라우팅으로 최적 에이전트 자동 선택",
    },
    speaker_notes:
      "멀티 에이전트 구조 설명. Orchestrator → Router → Executor → Agent 흐름. 사용자 의도에 따라 4개 에이전트 중 적절한 것이 자동 선택.",
  },
  {
    id: 13,
    section: "아키텍처",
    title: "AI 채팅 흐름",
    layout: "flow-diagram",
    content: {
      flow: [
        { stage: "입력", detail: "사용자 메시지 입력" },
        {
          stage: "라우팅",
          detail:
            "Router: 의도 파악 (법률 질의 / 변호사 검색 / 소액소송 / 일반 대화)",
        },
        { stage: "분기", detail: "해당 에이전트로 분기" },
        {
          stage: "실행",
          detail: "에이전트 실행 (RAG 검색 / API 호출 / LLM 응답)",
        },
        { stage: "응답", detail: "결과 포맷팅 & 응답 반환" },
      ],
      placeholder: "AI 채팅 흐름 다이어그램",
    },
    speaker_notes:
      "사용자 메시지가 들어오면 Router가 의도를 파악하고 적절한 에이전트로 분기. 각 에이전트는 독립적으로 실행되어 결과를 반환.",
  },
  {
    id: 14,
    section: "데이터",
    title: "데이터 파이프라인",
    layout: "flow-diagram",
    content: {
      flow: [
        {
          stage: "수집",
          detail:
            "법령 API (5,841건), 판례 크롤링 (65,107건 완료), 변호사 데이터 (17,326건)",
        },
        {
          stage: "전처리",
          detail: "청킹 전략 5가지 테스트 → B조합 선정",
        },
        {
          stage: "임베딩",
          detail: "KURE-v1 (로컬 임베딩) → 253,768 청크 생성",
        },
        {
          stage: "저장",
          detail:
            "LanceDB (벡터), PostgreSQL (메타데이터), Neo4j (관계)",
        },
      ],
      placeholder: "데이터 파이프라인 플로우 다이어그램",
    },
    speaker_notes:
      "데이터 파이프라인 4단계. 수집 → 전처리 → 임베딩 → 저장. 청킹 전략 5가지를 테스트해서 B조합을 선정한 과정 강조.",
  },
  {
    id: 15,
    section: "데이터",
    title: "프로젝트 데이터 규모",
    layout: "bar-chart",
    content: {
      reflectedStats: [
        { value: 5841, label: "법령 데이터", suffix: "건", status: "완료" },
        { value: 65107, label: "판례 데이터", suffix: "건", status: "완료" },
        { value: 253768, label: "임베딩 청크", suffix: "개", status: "완료" },
        { value: 17326, label: "변호사 데이터", suffix: "건", status: "완료" },
      ],
      bars: [
        { label: "자치법규", value: 158190 },
        { label: "4개 특별행정심판", value: 152755 },
        { label: "판례", value: 92068 },
        { label: "12개 위원회 결정문", value: 61589 },
        { label: "37개 중앙부처 1차 해석", value: 38863 },
        { label: "법령용어", value: 36797 },
        { label: "헌재결정례", value: 36781 },
        { label: "행정심판례", value: 34258 },
        { label: "행정규칙", value: 21622 },
        { label: "법령해석례", value: 8597 },
        { label: "법령 체계도", value: 5555 },
        { label: "법령", value: 5548 },
        { label: "학칙·공단", value: 5258 },
        { label: "조약", value: 3589 },
      ],
      suffix: "건",
      total: 661470,
    },
    speaker_notes:
      "법제처 국가법령정보센터 65종 데이터 총 661,470건 규모. 자치법규·특별행정심판이 가장 큰 비중.",
  },
  {
    id: 16,
    section: "데모",
    title: "서비스 시연",
    layout: "screenshot-full",
    content: {
      screenshot: "시연 영상 또는 스크린샷",
      description: "",
      video: "/video/법률3팀_중간_시연영상.mp4",
    },
    speaker_notes:
      "서비스 시연. 역할 선택 화면에서 일반인을 선택하고 AI 채팅으로 사건을 상담하는 흐름을 보여줌.",
  },
  {
    id: 17,
    section: "데모",
    title: "변호사 찾기",
    subtitle: "위치 기반 변호사 검색 서비스",
    layout: "live-demo",
    content: { demoKey: "lawyer-finder" },
    speaker_notes:
      "카카오맵 기반 변호사 찾기 데모. 지도에서 마커를 클릭하면 변호사 정보를 확인할 수 있음.",
  },
  {
    id: 18,
    section: "데모",
    title: "변호사 시장 분석",
    subtitle: "17,326명 변호사 데이터 기반 통계",
    layout: "live-demo",
    content: { demoKey: "lawyer-stats" },
    speaker_notes:
      "변호사 분포 통계 데모. 지역별/전문분야별 분포를 차트와 히트맵으로 시각화.",
  },
  {
    id: 19,
    section: "데모",
    title: "법령 체계도",
    subtitle: "대한민국 법령 관계 시각화",
    layout: "live-demo",
    content: { demoKey: "statute-hierarchy" },
    speaker_notes:
      "법령 체계도 데모. 헌법을 중심으로 법률-시행령-규칙의 관계를 태양계 메타포로 시각화.",
  },
  {
    id: 20,
    section: "데모",
    title: "판례 검색",
    subtitle: "RAG 기반 판례 검색 & AI 답변",
    layout: "live-demo",
    content: { demoKey: "case-precedent" },
    speaker_notes:
      "판례 검색 데모. 임대차보증금 관련 판례를 검색하고 AI 답변을 확인.",
  },
  {
    id: 21,
    section: "데모",
    title: "스토리보드",
    subtitle: "사건의 흐름을 시각화하고 AI로 이미지와 영상을 생성",
    layout: "live-demo",
    content: { demoKey: "storyboard" },
    speaker_notes:
      "스토리보드 데모. 임대차보증금 분쟁 사건을 타임라인으로 시각화. 각 장면의 참여자와 증거를 한눈에 확인.",
  },
  {
    id: 22,
    section: "데모",
    title: "소액소송 도우미",
    subtitle: "4단계 위자드로 내용증명·지급명령·소액심판 서류 작성",
    layout: "live-demo",
    content: { demoKey: "small-claims" },
    speaker_notes:
      "소액소송 도우미 데모. 분쟁 유형 선택 → 사건 정보 입력 → 증거 체크 → 서류 생성까지 4단계 위자드.",
  },
  {
    id: 23,
    section: "진행",
    title: "일정 및 비용",
    layout: "burndown-chart",
    content: {
      budget: 15,
      schedule: [
        { week: "W1 (1/15)", planned: 100, actual: 100, costActual: 0.37, costPlan: 0.37 },
        { week: "W2 (1/22)", planned: 83, actual: 82, costActual: 0.88, costPlan: 0.88 },
        { week: "W3 (1/29)", planned: 67, actual: 55, costActual: 1.24, costPlan: 1.24 },
        { week: "W4 (2/5)", planned: 50, actual: null, costActual: null, costPlan: 1.5 },
        { week: "W5 (2/12)", planned: 33, actual: null, costActual: null, costPlan: 1.7 },
        { week: "W6 (2/19)", planned: 17, actual: null, costActual: null, costPlan: 5.9 },
        { week: "W7 (2/26)", planned: 0, actual: null, costActual: null, costPlan: 10.2 },
      ],
      stats: {
        overallProgress: "55%",
        budgetUsed: "8%",
        budgetDetail: "12,364원 / 150,000원",
        daysRemaining: "D-30",
      },
      costBreakdown: {
        openai: { charged: "$11 (선결제)", used: "$8.14 (실사용)", krw: "11,884원" },
        nanoBanana: "480원",
        deployEstimate: "86,800원 (AWS EC2 2주)",
      },
    },
    speaker_notes:
      "프로젝트 기간 1/15~3/6(7주), 예산 15만원. OpenAI API 실사용 $8.14(선결제 $11, 잔여 크레딧 ~$1.86) + 나노바나나 480원 = 현재 12,364원(8%) 소진. W6-7 AWS EC2 2주 배포 시 약 8.7만원 추가, 총 ~10.2만원(68%) 전망.",
  },
  {
    id: 24,
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
      inProgress: ["전처리 파이프라인"],
      planned: [
        "쿼리 리라이팅 / 리랭킹",
        "RAG 단계별 평가",
        "판례/보강자료 적재",
        "UI 개발",
      ],
    },
    speaker_notes:
      "완료된 작업 4건, 진행중 1건, 예정 4건. 데이터 수집과 임베딩 적재가 완료되어 RAG 기반이 마련됨. 다음은 리라이팅/리랭킹 테스트.",
  },
  {
    id: 25,
    section: "계획",
    title: "전체 일정도",
    layout: "gantt-milestone",
    content: {
      totalWeeks: 7,
      weekLabels: ["1/15", "1/22", "1/29", "2/5", "2/12", "2/19", "2/26"],
      categories: [
        {
          category: "데이터 수집",
          tasks: [
            { name: "법령 데이터", start: 1, end: 1, status: "done" },
            { name: "판례 크롤링", start: 1, end: 2, status: "done" },
            { name: "변호사 데이터", start: 1, end: 1, status: "done" },
          ],
        },
        {
          category: "전처리",
          tasks: [
            { name: "청킹 전략", start: 1, end: 2, status: "done" },
            {
              name: "전처리 파이프라인",
              start: 2,
              end: 3,
              status: "in-progress",
            },
            { name: "임베딩 적재", start: 2, end: 2, status: "done" },
          ],
        },
        {
          category: "RAG 개발",
          tasks: [
            { name: "LanceDB 연동", start: 2, end: 2, status: "done" },
            { name: "쿼리 리라이팅", start: 3, end: 4, status: "planned" },
            { name: "RAG 평가", start: 4, end: 5, status: "planned" },
          ],
        },
        {
          category: "UI 개발",
          tasks: [
            { name: "AI 채팅 UI", start: 4, end: 6, status: "planned" },
            { name: "Biz Helper", start: 5, end: 6, status: "planned" },
            { name: "PDF 리포트", start: 6, end: 6, status: "planned" },
          ],
        },
        {
          category: "배포 & 테스트",
          tasks: [
            { name: "AWS EC2 배포", start: 6, end: 7, status: "planned" },
            { name: "통합 테스트", start: 6, end: 7, status: "planned" },
            { name: "최종 정리", start: 7, end: 7, status: "planned" },
          ],
        },
      ],
    },
    speaker_notes:
      "프로젝트 기간 1/15~3/6(7주). 데이터 수집 완료, 전처리 진행중. W4부터 RAG 고도화·UI 개발 병행, W6-7에 AWS EC2 2주 배포 및 통합 테스트.",
  },
  {
    id: 26,
    section: "계획",
    title: "개발 과제 해결 로그",
    subtitle: "중간발표까지 프로젝트를 진행하며 힘들었던 것들",
    layout: "challenge-log",
    content: {
      entries: [
        {
          category: "인프라",
          challenge: "임베딩 모델 구축",
          detail: "pytorch version 문제, runpod 환경 첫 사용 등의 문제",
          solution: "환경 구성 완료",
          status: "resolved",
        },
        {
          category: "비용",
          challenge: "배포/개발 비용 예측",
          detail: "개발 단계 비용 예측 실패",
          solution: "배포 환경 비용 예측 성공",
          status: "resolved",
        },
        {
          category: "DB",
          challenge: "벡터DB+RDB 비용 절감",
          detail: "대용량 벡터 DB와 RDB 아키텍처 구상",
          solution: "PostgreSQL + LanceDB + GraphDB 구조 실험중",
          status: "unresolved",
        },
        {
          category: "개발 프로세스",
          challenge: "바이브 코딩 코드 리뷰",
          detail: "코드를 모르고 기능만 동작하는 문제",
          solution: "rules/skills로 동일 규칙 세팅",
          status: "resolved",
        },
        {
          category: "협업",
          challenge: "git 협업 문제",
          detail: "merge 시 꼬임이 자주 발생",
          solution: "AI coding agent가 commit/merge 대행",
          status: "resolved",
        },
        {
          category: "데이터 전처리",
          challenge: "법령 데이터 구조",
          detail: "조/항/호/목 복잡한 JSON 구조",
          solution: "일반인: 호·목 통합, 변호사: 목만 통합",
          status: "resolved",
        },
        {
          category: "데이터 전처리",
          challenge: "판례 판시사항·판결요지 누락",
          detail: "판시사항, 판결요지가 생략된 판례 다수",
          solution: "LLM(gpt-4o-mini, solar-pro)으로 요약 생성",
          status: "in-progress",
          progress: "80%",
        },
        {
          category: "데이터 전처리",
          challenge: "법령·판례 내 이미지",
          detail: "이미지가 포함된 데이터 존재",
          solution: "이미지 제거로 범위 축소",
          status: "resolved",
        },
      ],
    },
    speaker_notes:
      "중간발표까지 직면한 8가지 과제. 6건 해결, 1건 진행중(80%), 1건 미해결.",
  },
  {
    id: 27,
    section: "계획",
    title: "예상 과제 및 해결 방안",
    layout: "challenge-solution",
    content: {
      pairs: [
        {
          challenge: {
            icon: "🔧",
            title: "데이터 전처리의 어려움",
            description: "전체 데이터의 6%만 전처리 완료",
          },
          solution: {
            title: "범위 축소 전략",
            description:
              "2주 안에 전처리가 완료되지 않는 데이터는 제외하여 범위 축소",
            status: "resolved",
          },
        },
        {
          challenge: {
            icon: "💾",
            title: "임베딩 벡터 용량",
            description: "로컬 임베딩 처리 시 컴퓨터 성능 요구",
          },
          solution: {
            title: "해결 방안 고민 중",
            description: "벡터 압축, 외부 GPU 서버 활용 등 검토 중",
            status: "unresolved",
          },
        },
        {
          challenge: {
            icon: "⚡",
            title: "Backend/Frontend 성능",
            description: "데이터 양이 많아 성능 요구치 높음",
          },
          solution: {
            title: "최적화 + DB 설계",
            description:
              "Frontend·Backend 최적화 시도, DB 스키마 재설계로 해결",
            status: "resolved",
          },
        },
      ],
    },
    speaker_notes:
      "프로젝트 진행 중 예상되는 3가지 주요 과제와 해결 방안. 전처리 범위 축소, 임베딩 용량 문제(미해결), 성능 최적화 전략.",
  },
  {
    id: 28,
    section: "마무리",
    title: "Q & A",
    subtitle: "감사합니다",
    layout: "minimal-center",
    content: {
      team: "Law-3 Team",
      event: "AI Camp 4기",
      contact: "",
    },
    speaker_notes: "질의응답 시간. 감사 인사와 함께 팀 연락처 안내.",
  },
];
