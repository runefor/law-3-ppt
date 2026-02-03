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
  | "gantt-milestone";

export interface Slide {
  id: number;
  section: string;
  title: string;
  subtitle?: string;
  layout: SlideLayout;
  content: Record<string, unknown>;
  speaker_notes: string;
}

export const slides: Slide[] = [
  {
    id: 1,
    section: "인트로",
    title: "Law-3 AI 법률 플랫폼",
    subtitle:
      "일반인에게는 상담의 문턱을 낮추고, 변호사에게는 준비된 고객과 데이터 기반 개업 전략을 제공하는 AI 법률 플랫폼",
    layout: "hero-fullscreen",
    content: {
      team: "Law-3 Team",
      event: "AI Camp 4기 · 중간 발표",
      date: "2026년 2월",
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
      bottomQuote:
        "AI는 법률적 판단을 내리는 침입자가 아니라, 의뢰인의 목소리를 법률 언어로 번역해 변호사에게 전달하는 가장 스마트한 동반자",
    },
    speaker_notes:
      "법률 시장의 현재 위기를 설명하고, 우리가 제시하는 기회를 대비. 핵심은 AI가 변호사를 대체하는 것이 아니라 돕는다는 메시지.",
  },
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
          description:
            "AI 대체 공포 + 과잉 공급 → 개업 및 수임 경쟁 심화",
          needs:
            "데이터 기반 블루오션 탐색, 개업 전략 수립, 수임 기회 확대",
        },
        {
          icon: "👤",
          name: "일반인의 고민",
          description: "높은 상담 문턱과 비용 → 법률 복지 사각지대",
          needs:
            "낮은 진입장벽의 법률 상담, 사건 정리, 적합한 변호사 연결",
        },
      ],
    },
    speaker_notes:
      "변호사와 일반인 양쪽 모두의 페인포인트를 정의. 이 문제를 동시에 풀어야 상생이 가능.",
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
              "Biz Helper",
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
    title: "Biz Helper — 기회의 땅을 찾아서",
    subtitle: "데이터 기반 개업 전략 도구",
    layout: "feature-split",
    content: {
      features: [
        "지역별 변호사 분포 히트맵 (8,500+ 변호사 데이터)",
        "개업추천지수 시뮬레이션 (경쟁 밀도, 수요 분석)",
        "전문분야별 블루오션 탐색",
      ],
      screenshot: "Biz Helper 히트맵 스크린샷",
    },
    speaker_notes:
      "변호사 대상 핵심 기능. 8,500+ 변호사 데이터로 히트맵을 만들고, 개업추천지수를 시뮬레이션. 어디에 어떤 분야로 개업하면 좋을지 데이터로 보여준다.",
  },
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
    speaker_notes:
      "일반인은 AI와 대화하며 사건을 정리하고, 변호사는 정리된 리포트를 받아 효율적으로 상담. 양쪽 모두에게 가치를 제공하는 핵심 기능.",
  },
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
      screenshot: "판례 검색 시연 예시",
    },
    speaker_notes:
      "RAG 파이프라인의 4단계를 설명. 쿼리 리라이팅으로 질의 품질 향상, KURE-v1 로컬 임베딩으로 벡터 검색, 리랭킹 후 GPT-4o-mini로 답변 생성.",
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
            "법령 API (5,841건), 판례 크롤링 (65,107건 예정), 변호사 데이터 (8,500+건)",
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
    layout: "stats-countup",
    content: {
      stats: [
        { value: 5841, label: "법령 데이터", suffix: "건" },
        { value: 65107, label: "판례 데이터 (예정)", suffix: "건" },
        { value: 253768, label: "임베딩 청크", suffix: "개" },
        { value: 8500, label: "변호사 데이터", suffix: "+건" },
      ],
    },
    speaker_notes:
      "프로젝트의 데이터 규모를 한눈에. 법령 5,841건이 적재 완료, 판례 65,107건은 예정. 임베딩 청크 253,768개가 LanceDB에 저장됨.",
  },
  {
    id: 16,
    section: "데모",
    title: "서비스 시연",
    layout: "screenshot-full",
    content: {
      screenshot: "시연 영상 또는 스크린샷",
      description: "역할 선택 → AI 채팅 → 결과 확인 데모 흐름",
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
    subtitle: "8,500+ 변호사 데이터 기반 통계",
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
    id: 22,
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
    id: 23,
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
    id: 24,
    section: "마무리",
    title: "Q & A",
    subtitle: "감사합니다",
    layout: "minimal-center",
    content: {
      team: "Law-3 Team",
      event: "AI Camp 4기",
      contact: "GitHub: —",
    },
    speaker_notes: "질의응답 시간. 감사 인사와 함께 팀 연락처 안내.",
  },
];
