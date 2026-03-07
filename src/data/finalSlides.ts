import type { Slide } from "./slides";

export const finalSlides: Slide[] = [
  {
    id: 1,
    section: "인트로",
    title: "법률 대통령",
    subtitle: "대한민국 법률 서비스의 새로운 기준, 법률 대통령",
    layout: "hero-fullscreen",
    audience: "both",
    content: {
      team: "법률3팀",
      event: "AI Camp 4기 · 최종 발표",
      date: "2026년 3월 6일",
      presenter: "김용희 · 홍서연 · 김주형",
      investorTitle: "법률 대통령",
      investorSlogan:
        "대한민국 법률 서비스의 새로운 기준, 법률 대통령",
      developerTitle: "Module Orchestration Platform",
      developerSubtitle:
        "240만 건의 법률 데이터를 실시간 처리하는 고성능 지능형 엔진",
      techCards: [
        {
          icon: "🖥️",
          title: "Application Framework",
          sub: "Next.js, FastAPI",
          rows: [
            { label: "FRONTEND", desc: "Next.js 14 App Router + TypeScript" },
            { label: "BACKEND", desc: "FastAPI 0.110+ Async" },
          ],
        },
        {
          icon: "🧠",
          title: "AI & NLP Pipeline",
          sub: "LangGraph, RAG, MeCab",
          rows: [
            { label: "ORCHESTRATOR", desc: "LangGraph Multi-Agent (8 agents)" },
            { label: "SEARCH", desc: "Hybrid RAG + bge-reranker" },
          ],
        },
        {
          icon: "💾",
          title: "Data Engine",
          sub: "PostgreSQL, LanceDB",
          rows: [
            { label: "RELATIONAL", desc: "PostgreSQL 17 + MeCab FTS" },
            { label: "VECTOR", desc: "LanceDB IVF_FLAT (100% Recall)" },
          ],
        },
        {
          icon: "⚡",
          title: "Infra & Optimization",
          sub: "Docker, ONNX",
          rows: [
            { label: "RUNTIME", desc: "ONNX Runtime INT8 (6.88x Speed)" },
            { label: "DEPLOY", desc: "Docker Compose + AWS EC2" },
          ],
        },
      ],
    },
    speaker_notes:
      "프로젝트 소개. 투자자에게는 비전, 개발자에게는 기술 스택을 보여줌.",
  },
  {
    id: 2,
    section: "문제",
    title: "법률 문제는 '검색'이 아니라 '결정'과 '절차'다.",
    layout: "triptych-cards",
    audience: "both",
    content: {
      investorCards: [
        {
          image: "/images/final/A02-1.png",
          title: "이해의 벽",
          description: "법률 용어와 절차가 일반인에게 너무 복잡하다",
          modalTitle: "법률 용어 데이터베이스 현황",
          modalSubtitle:
            "AI가 법률 용어를 이해하고 설명하는 근거 데이터",
          modalStats: [
            { value: "72,700건", label: "총 법률 용어" },
            { value: "37,366건", label: "MeCab 사전 등재" },
            { value: "5종", label: "사전 유형" },
          ],
          modalSources: [
            { name: "법령정의사전", count: "37,169건", desc: "법령에서 정의하는 공식 법률 용어" },
            { name: "한영역추출", count: "18,200건", desc: "법령한영사전에서 역추출한 한글 용어" },
            { name: "법령용어사전", count: "9,800건", desc: "법제처 표준 법률 용어" },
            { name: "생활용어사전", count: "4,500건", desc: "일반인이 쉽게 이해할 수 있는 용어 풀이" },
            { name: "법령한영사전", count: "3,031건", desc: "법률 용어 영문 번역 사전" },
          ],
        },
        {
          image: "/images/final/A02-2.png",
          title: "근거의 부재",
          description:
            "AI 답변에 판례/법령 출처가 없으면 신뢰할 수 없다",
          modalTitle: "RAG 데이터 현황",
          modalSubtitle:
            "AI 법률 상담의 근거가 되는 데이터 규모",
          modalStats: [
            { value: "579,498건", label: "Main RAG 총 데이터" },
            { value: "21종", label: "데이터 타입" },
            { value: "689건", label: "Assist RAG (뉴스)" },
          ],
          modalTopSources: [
            { name: "자치법규", count: "154,289건" },
            { name: "특별행정심판", count: "137,288건" },
            { name: "판례", count: "92,055건" },
            { name: "노동위원회 결정례", count: "40,714건" },
            { name: "부처 유권해석", count: "37,455건" },
            { name: "행정심판", count: "34,254건" },
            { name: "헌법재판소 결정례", count: "31,718건" },
            { name: "행정규칙", count: "17,092건" },
            { name: "법령해석", count: "8,597건" },
            { name: "공정거래 결정례", count: "7,728건" },
          ],
        },
        {
          image: "/images/final/A02-3.png",
          title: "실행의 단절",
          description: "정보를 알아도 다음 행동으로 연결되지 않는다",
          modalTitle: "실행의 단절 -- 주요 기능",
          modalSubtitle:
            "정보에서 행동으로 연결하는 핵심 기능들",
          modalImages: [
            "/images/final/feature-1.png",
            "/images/final/feature-2.png",
            "/images/final/feature-3.png",
          ],
        },
      ],
      developerTitle: "LangGraph Multi-agent System",
      developerSubtitle:
        "8인의 법률 전문가 AI가 협업하는 지능형 의사결정 체계",
      agents: [
        { name: "LegalSearch", desc: "정밀 법률 검색", badge: "RAG Hybrid" },
        { name: "LawyerFinder", desc: "변호사 매칭", badge: "Haversine" },
        { name: "SmallClaims", desc: "소액소송 자동화", badge: "4-Step Wizard" },
        { name: "Storyboard", desc: "사건 타임라인", badge: "Timeline AI" },
        { name: "MockTrial", desc: "AI 모의 법정", badge: "Multi-turn" },
        { name: "LawyerStats", desc: "변호사 통계", badge: "17K Dataset" },
        { name: "LawStudy", desc: "법학 학습", badge: "Study RAG" },
        { name: "ContentMKT", desc: "콘텐츠 생성", badge: "Trend AI" },
      ],
    },
    speaker_notes:
      "문제 정의 슬라이드. 투자자에게는 3가지 벽, 개발자에게는 멀티 에이전트 아키텍처.",
  },
  {
    id: 3,
    section: "문제",
    title: "AI는 법조계의 위협이 아니라, '시장 확대'의 열쇠다.",
    layout: "vision-flow",
    audience: "both",
    content: {
      investorMessage:
        "파이를 나누는 것이 아니라, 파이 자체를 키우는 혁명",
      flow: {
        left: {
          label: "일반인",
          description: "법률 문턱이 낮아져 새로운 수요 창출",
        },
        center: "구조화된 요약본 전달",
        right: {
          label: "변호사",
          description: "준비된 고객으로 수임 효율 극대화",
        },
      },
      developerTitle: "Hybrid RAG Pipeline",
      developerSubtitle:
        "맥락과 키워드를 놓치지 않는 정밀 법률 검색 엔진",
      pipeline: [
        { step: "질문 입력", detail: "사용자 자연어 질문" },
        { step: "Query Rewriting", detail: "법률 쿼리로 재구성" },
        {
          step: "이중 검색",
          detail: "LanceDB(의미) + PostgreSQL(키워드)",
        },
        { step: "RRF Fusion", detail: "결과 병합 및 중복 제거" },
        {
          step: "bge-reranker",
          detail: "최종 정밀 검증 (8K Tokens, KR #1)",
        },
        { step: "LLM 답변", detail: "출처 기반 최종 응답 생성" },
      ],
      focusStrategy: {
        main: "Main 40: Focus Search (벡터 20 + 키워드 20)",
        supp: "Supp 20: Context Search (벡터 10 + 키워드 10)",
      },
    },
    speaker_notes:
      "비전 슬라이드. AI가 시장을 대체하는 게 아니라 확대한다는 메시지.",
  },
  {
    id: 4,
    section: "솔루션",
    title: "컴퓨팅 사고로 법률 문제를 워크플로우로 완벽히 분해하다.",
    layout: "ct-stepper",
    audience: "both",
    content: {
      backgroundImage: "/images/final/A03_CT_TO_MODULE_MAP_BG.png",
      steps: [
        {
          icon: "/images/final/A03-ICON-1.png",
          title: "분해",
          subtitle: "Decomposition",
          description: "법률 문제를 5가지 구성 요소로 분해",
          modalImage: "/images/final/ct-1.png",
        },
        {
          icon: "/images/final/A03-ICON-2.png",
          title: "패턴 인식",
          subtitle: "Pattern Recognition",
          description: "반복되는 3가지 법률 패턴 인식",
          modalImage: "/images/final/ct-2.png",
        },
        {
          icon: "/images/final/A03-ICON-3.png",
          title: "추상화",
          subtitle: "Abstraction",
          description: "공통 구조 추출 → CaseState 데이터 모델",
          modalImage: "/images/final/ct-3.png",
        },
        {
          icon: "/images/final/A03-ICON-4.png",
          title: "알고리즘 설계",
          subtitle: "Algorithm Design",
          description: "AI 솔루션 매핑: 13개 모듈 설계",
          modalImage: "/images/final/ct-4.png",
        },
      ],
      developerTitle: "Legal-Specific Tokenizing",
      developerSubtitle:
        "MeCab 사용자 사전을 통한 법률 도메인 특화 검색 최적화",
      tokenizing: {
        asis: {
          label: "일반 형태소 분석",
          input: "손해배상청구권",
          output: "손해 | 배상 | 청구 | 권",
          tokens: 4,
          result: "검색 가중치 분산 → 맥락 손실 및 정확도 하락",
        },
        tobe: {
          label: "법률 특화 토크나이징",
          input: "손해배상청구권",
          output: "손해배상청구권",
          tokens: 1,
          result: "법률적 의도 보존 → 검색 정밀도 획기적 향상",
          dictEntries: "37,366+",
        },
        architecture:
          "PostgreSQL 17 + MeCab Custom Analyzer → BM25 Index (425K docs)",
      },
    },
    speaker_notes:
      "CT 워크플로우. 투자자에게는 4단계 사고 과정, 개발자에게는 토크나이징 최적화.",
  },
  {
    id: 5,
    section: "솔루션",
    title:
      "범용 법률 AI를 넘어, 변호사의 생존과 필승을 위한 전문 솔루션으로",
    layout: "data-pipeline",
    audience: "both",
    content: {
      pivot: {
        before: "누구나 사용하는 일반 법률 챗봇",
        transition: "변호사 업무 워크플로우 분석을 통한 고도화",
        after: "변호사 특화 비즈니스 & 재판 전략 플랫폼",
      },
      services: [
        {
          icon: "📍",
          category: "BUSINESS",
          title: "어디에 깃발을 꽂을 것인가?",
          description: "최적 개업지 추천 알고리즘",
          stat: "변호사 1인당 인구수 1,200명",
        },
        {
          icon: "⚖️",
          category: "VICTORY",
          title: "어떻게 승소할 것인가?",
          description: "논리 검증 및 변론 시뮬레이션",
          stat: "모의 재판 모드: 가동 중",
        },
        {
          icon: "📁",
          category: "EFFICIENCY",
          title: "10년의 기록, 1초 만에 복기",
          description: "Context-Persistence 클라우드 시스템",
          stat: "AI 메모: 10년 전 대화 요약",
        },
        {
          icon: "📰",
          category: "FRESHNESS",
          title: "잠든 사이 업데이트되는 지식",
          description: "Daily News Aggregation 기반 실시간 지식 보강",
          stat: "RAG: 최신 뉴스 반영 완료",
        },
      ],
      pipelineSteps: [
        {
          step: "STEP 1",
          title: "Collection",
          subtitle: "신뢰의 원천",
          sources: [
            "법제처",
            "대법원",
            "헌법재판소",
            "변호사협회",
            "통계청",
            "법무부",
            "행정심판원",
          ],
        },
        {
          step: "STEP 2",
          title: "Processing",
          subtitle: "지능의 엔진",
        },
        {
          step: "STEP 3",
          title: "Delivery",
          subtitle: "가치의 확산",
        },
      ],
    },
    speaker_notes: "전략적 피봇과 4대 핵심 서비스 소개.",
  },
  {
    id: 6,
    section: "솔루션",
    title: "Role-based Platform",
    layout: "role-platform",
    audience: "investor",
    content: {
      image: "/images/final/A04_ROLE_SPLIT_DIAGRAM.png",
      roleModals: {
        "일반인": {
          groups: [
            {
              label: "문제 해결",
              icon: "🔧",
              services: [
                {
                  name: "주변 변호사 찾기",
                  icon: "📍",
                  tagline: "내 주변 변호사를 지도에서 바로 찾으세요",
                  target: "법률 문제가 생긴 일반인",
                  features: [
                    "GPS 기반 자동 위치 감지 -- 반경 500m~10km 선택",
                    "카카오맵 연동 -- 마커 클릭 시 사무소 상세 정보",
                    "12대 전문분야 필터 -- 민사·가사, 형사, 부동산 등",
                    "AI 챗봇 연동 -- 자연어 입력 시 자동 검색",
                  ],
                  stats: [
                    { value: "17,326", label: "등록 변호사" },
                    { value: "12", label: "전문분야" },
                    { value: "25", label: "서울 구 지원" },
                  ],
                },
                {
                  name: "소액 소송 도우미",
                  icon: "⚖️",
                  tagline: "변호사 없이도 소액 분쟁 서류를 AI가 작성",
                  target: "소액 분쟁 당사자",
                  features: [
                    "4단계 위자드 -- 분쟁유형 선택 → 정보 입력 → AI 서류 생성 → 접수 안내",
                    "5대 분쟁유형 지원 -- 임금체불, 보증금, 매매대금, 손해배상, 대여금",
                    "AI 서류 자동 작성 -- 내용증명, 지급명령 신청서, 소장",
                    "접수 가이드 -- 전자소송(e-Court) 접수 방법 안내",
                  ],
                  stats: [
                    { value: "4단계", label: "위자드 절차" },
                    { value: "5가지", label: "분쟁 유형" },
                    { value: "3종", label: "서류 자동 생성" },
                  ],
                },
                {
                  name: "모의 법정",
                  icon: "🏛️",
                  tagline: "픽셀아트 법정에서 AI와 실제처럼 재판을 체험",
                  target: "재판 과정이 궁금한 일반인",
                  features: [
                    "Phaser.js 픽셀아트 법정 -- 대법원 로비 → 법정 입장 → 재판 진행",
                    "AI 에이전트 3인 -- 판사, 검사, 상대편 변호사",
                    "6단계 재판 -- 모두진술 → 증거조사 → 증인심문 → 변론 → 최종변론 → 판결",
                    "데모 시나리오 2종 -- 형사 사기, 민사 손해배상",
                  ],
                  stats: [
                    { value: "6단계", label: "재판 절차" },
                    { value: "3인", label: "AI 에이전트" },
                    { value: "8가지", label: "감정 표현" },
                  ],
                },
              ],
            },
            {
              label: "정보 찾기",
              icon: "🔍",
              services: [
                {
                  name: "판례 검색",
                  icon: "📚",
                  tagline: "AI가 65만 건의 판례에서 내 사건에 맞는 판례를 탐색",
                  target: "법적 분쟁에 처한 일반인",
                  features: [
                    "하이브리드 RAG -- BM25 키워드 + 벡터 의미 검색 동시 수행",
                    "656,532건 법률 청크 -- 판례·법령 통합 벡터 DB",
                    "AI 판례 요약 -- 핵심 쟁점, 판결 요지, 적용 법조 자동 추출",
                    "SSE 스트리밍 답변 -- AI가 실시간으로 분석 결과 제공",
                  ],
                  stats: [
                    { value: "656K", label: "법률 청크" },
                    { value: "21", label: "데이터 타입" },
                    { value: "SSE", label: "실시간 응답" },
                  ],
                },
                {
                  name: "법률 뉴스",
                  icon: "📰",
                  tagline: "최신 법률 뉴스를 AI가 수집·분석·요약",
                  target: "법률 동향에 관심 있는 일반인",
                  features: [
                    "매일 오전 6시 자동 수집 -- 최신 법률 뉴스를 빠짐없이 수집·정리",
                    "AI 다면 요약 -- 핵심, 법적 영향, 실무 시사점 다각도 분석",
                    "하이브리드 검색 -- 키워드 + AI 의미 검색으로 관련 뉴스 탐색",
                    "차트 시각화 -- 주제별·시기별 뉴스 트렌드 도넛·바 차트",
                  ],
                  stats: [
                    { value: "매일 6시", label: "자동 수집" },
                    { value: "2개", label: "뉴스 소스" },
                    { value: "AI", label: "다면 요약" },
                  ],
                },
              ],
            },
            {
              label: "사건 정리",
              icon: "📂",
              services: [
                {
                  name: "스토리보드",
                  icon: "🎬",
                  tagline: "증거 자료를 업로드하면 AI가 사건 타임라인을 자동 구성",
                  target: "사건 경위를 정리하고 싶은 일반인",
                  features: [
                    "드래그앤드롭 증거 업로드 -- 문서, 사진, 녹취록 한 번에 분석",
                    "간트차트 시각화 -- vis-timeline 기반 사건 흐름 한눈에 파악",
                    "AI 자동 분석 -- 증거에서 날짜, 사건, 인물을 자동 추출",
                    "증분 병합 모드 -- 새 증거 추가 시 기존 타임라인과 자동 통합",
                  ],
                  stats: [
                    { value: "배치", label: "다중 파일 분석" },
                    { value: "간트", label: "차트 시각화" },
                    { value: "SSE", label: "실시간 진행률" },
                  ],
                },
              ],
            },
          ],
        },
        "변호사": {
          groups: [
            {
              label: "인사이트",
              icon: "📊",
              services: [
                {
                  name: "변호사 통계",
                  icon: "📊",
                  tagline: "전국 변호사 분포와 수요를 데이터로 분석",
                  target: "개업·이전을 계획하는 변호사",
                  features: [
                    "TopoJSON 시군구 지도 -- 전국 253개 시군구별 분포 시각화",
                    "4가지 분석 뷰 -- 변호사 수, 인구 대비 밀도, 미래 예측, 사건 수",
                    "미래 예측 -- 2030/2035/2040 변호사 수 증가 추이 시뮬레이션",
                    "지역×전문분야 히트맵 -- 분야별 경쟁 강도 교차 분석",
                  ],
                  stats: [
                    { value: "253", label: "시군구 분석" },
                    { value: "4가지", label: "분석 뷰 모드" },
                    { value: "2040", label: "미래 예측" },
                  ],
                },
                {
                  name: "콘텐츠 마케팅",
                  icon: "📹",
                  tagline: "AI가 법률 트렌드를 분석하고 유튜브 대본까지 생성",
                  target: "온라인 마케팅을 강화하려는 변호사",
                  features: [
                    "페르소나 분석 -- 타겟 고객층의 관심사·고민·검색 패턴 분석",
                    "5대 커뮤니티 키워드 수집 -- 네이버, 클리앙, 뽐뿌, 디시, 더쿠",
                    "AI 유튜브 대본 -- 트렌드 기반 법률 콘텐츠 스크립트 자동 생성",
                    "AI 웹툰 생성 -- 법률 교육용 일러스트·만화 자동 제작",
                  ],
                  stats: [
                    { value: "5개", label: "커뮤니티 분석" },
                    { value: "AI", label: "대본 자동 생성" },
                    { value: "웹툰", label: "AI 생성" },
                  ],
                },
              ],
            },
            {
              label: "리서치",
              icon: "🔍",
              services: [
                {
                  name: "판례 검색",
                  icon: "📚",
                  tagline: "65만 건 판례를 AI가 분석하여 변론 전략의 근거 제공",
                  target: "소송 준비 중인 변호사",
                  features: [
                    "하이브리드 RAG -- BM25 키워드 + 벡터 의미 검색 동시 수행",
                    "AI 전문 분석 -- 쟁점별 판결 논리, 적용 법조, 손해배상 산정 기준",
                    "인용 관계 탐색 -- 판례 간 인용·피인용 관계 그래프 분석",
                    "워크스페이스 연동 -- 분석 결과를 사건별로 저장·관리",
                  ],
                  stats: [
                    { value: "656K", label: "법률 청크" },
                    { value: "Hybrid", label: "RAG 검색" },
                    { value: "SSE", label: "실시간 분석" },
                  ],
                },
                {
                  name: "법령 체계도",
                  icon: "🔗",
                  tagline: "법령 간 상하위·인용 관계를 그래프로 시각화",
                  target: "법령 체계를 파악해야 하는 법조인",
                  features: [
                    "D3 Force-Directed 그래프 -- 법령 간 관계를 인터랙티브 노드로 시각화",
                    "법령 계급 시각화 -- 헌법 → 법률 → 시행령 → 시행규칙 계층 구조",
                    "인용 관계 추적 -- 법령 간 참조·인용·피인용 관계 탐색",
                    "법령 유형 필터 -- 법률, 시행령, 시행규칙, 조례 유형별 필터링",
                  ],
                  stats: [
                    { value: "D3", label: "그래프 엔진" },
                    { value: "계급", label: "법령 체계" },
                    { value: "CTE", label: "그래프 쿼리" },
                  ],
                },
              ],
            },
            {
              label: "사건 검토",
              icon: "📋",
              services: [
                {
                  name: "사건 워크스페이스",
                  icon: "💼",
                  tagline: "모든 사건의 대화, 태그, 타임라인을 한 곳에서 관리",
                  target: "다수 사건을 관리하는 변호사",
                  features: [
                    "사건 CRUD -- 사건 생성·조회·수정·삭제, 상태별 필터링",
                    "자동 태깅 -- AI가 대화 내용에서 법적 이슈·키워드 자동 추출",
                    "타임라인 재구성 -- AI가 대화 기록에서 사건 경위 자동 정리",
                    "4탭 대시보드 -- 요약, 태그, 타임라인, 대화 이력 통합 뷰",
                  ],
                  stats: [
                    { value: "4탭", label: "통합 대시보드" },
                    { value: "AI", label: "자동 태깅" },
                    { value: "자동", label: "타임라인 생성" },
                  ],
                },
                {
                  name: "모의 법정",
                  icon: "🏛️",
                  tagline: "AI 판사·검사·변호사와 실전처럼 모의재판 연습",
                  target: "변론 스킬을 향상하려는 변호사",
                  features: [
                    "Phaser.js 픽셀아트 법정 -- 몰입감 있는 게임형 재판 시뮬레이션",
                    "AI 멀티 에이전트 -- 판사, 검사, 변호사가 실제 법정 절차로 대응",
                    "6단계 재판 절차 -- 모두진술부터 판결 선고까지 완전한 재판 흐름",
                    "RAG 연동 -- 재판 중 관련 판례·법령을 실시간 검색·제출",
                  ],
                  stats: [
                    { value: "6단계", label: "재판 절차" },
                    { value: "3인", label: "AI 에이전트" },
                    { value: "RAG", label: "판례 연동" },
                  ],
                },
              ],
            },
            {
              label: "학습",
              icon: "📚",
              services: [
                {
                  name: "로스쿨 학습",
                  icon: "📖",
                  tagline: "AI 튜터가 판례·법령 기반 맞춤형 법학 학습 지원",
                  target: "로스쿨 학생, 사법시험 준비생",
                  features: [
                    "AI 법학 튜터 -- RAG 기반으로 판례·법령을 근거로 설명",
                    "자동 퀴즈 생성 -- 학습 내용 기반 OX, 사례형 문제 자동 출제",
                    "판례 분석 연습 -- 실제 판례를 읽고 쟁점·결론 분석 훈련",
                    "과목별 학습 -- 민법, 형법, 헌법, 행정법, 상법 등 체계적 학습",
                  ],
                  stats: [
                    { value: "RAG", label: "AI 튜터" },
                    { value: "자동", label: "퀴즈 생성" },
                    { value: "과목별", label: "맞춤 학습" },
                  ],
                },
              ],
            },
          ],
        },
      },
      roles: [
        {
          icon: "👤",
          name: "일반인",
          color: "#30d158",
          features: [
            {
              icon: "/images/final/icon-통합AI채팅.png",
              name: "통합 AI 채팅",
            },
            {
              icon: "/images/final/icon-판례검색.png",
              name: "판례 검색",
            },
            {
              icon: "/images/final/icon-주변변호사찾기.png",
              name: "주변 변호사 찾기",
            },
            {
              icon: "/images/final/icon-소액소송.png",
              name: "소액소송 도우미",
            },
            {
              icon: "/images/final/icon-스토리보드.png",
              name: "스토리보드",
            },
            {
              icon: "/images/final/icon-법률뉴스.png",
              name: "법률 뉴스",
            },
            {
              icon: "/images/final/icon-법령체계도.png",
              name: "법령 체계도",
            },
          ],
        },
        {
          icon: "⚖️",
          name: "변호사",
          color: "#2997ff",
          features: [
            {
              icon: "/images/final/icon-통합AI채팅.png",
              name: "통합 AI 채팅",
            },
            {
              icon: "/images/final/icon-판례검색.png",
              name: "판례 검색",
            },
            {
              icon: "/images/final/icon-변호사통계.png",
              name: "변호사 통계",
            },
            {
              icon: "/images/final/icon-모의법정.png",
              name: "모의 법정",
            },
            {
              icon: "/images/final/icon-워크스페이스.png",
              name: "워크스페이스",
            },
            {
              icon: "/images/final/icon-콘텐츠 마케팅.png",
              name: "콘텐츠 마케팅",
            },
            {
              icon: "/images/final/icon-로스쿨학습.png",
              name: "로스쿨 학습",
            },
          ],
        },
      ],
    },
    speaker_notes: "역할 기반 플랫폼. 일반인과 변호사 각각의 기능 모듈 소개.",
  },
  {
    id: 7,
    section: "솔루션",
    title: "3단계 AI 법률 상담",
    subtitle:
      "시민에겐 법률 문턱을 낮추고, 변호사에겐 사건 준비가 끝난 고객과 승소 전략을 제공합니다.",
    layout: "dual-track",
    audience: "investor",
    content: {
      tracks: [
        {
          role: "시민",
          icon: "👤",
          color: "#30E7A9",
          steps: [
            {
              num: "STEP 1",
              name: "AI 법률 상담",
              desc: "일상 언어로 법률 질문 → AI가 관련 판례·법령 기반으로 쉽게 설명",
              visual: "통합 AI 채팅, 법률 뉴스, 법령 체계도",
            },
            {
              num: "STEP 2",
              name: "사건 정리 & 증거 체크",
              desc: "AI가 사건 흐름을 정리하고 필요한 증거·서류를 체크리스트로 안내",
              visual: "스토리보드, 소액소송 4단계 위자드",
              badge: "Only 시민",
            },
            {
              num: "STEP 3",
              name: "최적 변호사 매칭",
              desc: "사건 유형·지역 기반으로 최적 변호사 자동 추천 및 상담 예약",
              visual: "주변 변호사 찾기(하버사인 거리)",
              badge: "Only 시민",
            },
          ],
        },
        {
          role: "변호사",
          icon: "⚖️",
          color: "#6AE4FF",
          steps: [
            {
              num: "STEP 1",
              name: "전문 법률 리서치",
              desc: "복잡한 쟁점 분석, 유사 판례 비교, 법령 교차 검토를 AI가 병렬 처리",
              visual: "통합 AI 채팅, 판례 검색(Hybrid RAG)",
            },
            {
              num: "STEP 2",
              name: "모의 재판 & 전략 수립",
              desc: "AI 판사와 상대측 AI로 변론 시뮬레이션 → 약점 보완 & 승소 전략",
              visual: "모의 법정, 콘텐츠 마케팅",
              badge: "Only 변호사",
            },
            {
              num: "STEP 3",
              name: "비즈니스 인텔리전스",
              desc: "지역별 변호사 밀도·수요 분석으로 개업지 추천 & 블루오션 발굴",
              visual: "변호사 통계, 워크스페이스",
              badge: "Only 변호사",
            },
          ],
        },
      ],
      centerFlow: ["상담", "준비", "매칭/실행"],
    },
    speaker_notes:
      "3단계 병렬 플로우. 시민과 변호사 각각의 여정을 동시에 보여줌.",
  },
  {
    id: 8,
    section: "데모",
    title: "시연 영상 재생",
    layout: "video-showcase",
    audience: "both",
    content: {
      demoVideo: "/video/법률3팀_최종_시연영상.mp4",
      categories: [
        {
          label: "일반인",
          color: "#30E7A9",
          videos: [
            {
              title: "통합 AI 채팅 & 법률 검색",
              src: "/videos/final/user-law-search.mp4",
              icon: "/images/final/icon-통합AI채팅.png",
            },
            {
              title: "판례 검색",
              src: "/videos/final/user-case-search.mp4",
              icon: "/images/final/icon-판례검색.png",
            },
            {
              title: "주변 변호사 찾기",
              src: "/videos/final/user-lawyer-finder.mp4",
              icon: "/images/final/icon-주변변호사찾기.png",
            },
            {
              title: "소액소송 도우미",
              src: "/videos/final/user-small-claims.mp4",
              icon: "/images/final/icon-소액소송.png",
            },
            {
              title: "스토리보드",
              src: "/videos/final/user-storyboard.mp4",
              icon: "/images/final/icon-스토리보드.png",
            },
            {
              title: "법률 뉴스",
              src: "/videos/final/user-legal-news.mp4",
              icon: "/images/final/icon-법률뉴스.png",
            },
            {
              title: "모의 법정",
              src: "/videos/final/user-mock-trial.mp4",
              icon: "/images/final/icon-모의법정.png",
            },
          ],
        },
        {
          label: "변호사",
          color: "#6AE4FF",
          videos: [
            {
              title: "통합 AI 채팅 & 법률 검색",
              src: "/videos/final/lawyer-law-search.mp4",
              icon: "/images/final/icon-통합AI채팅.png",
            },
            {
              title: "판례 검색",
              src: "/videos/final/lawyer-case-search.mp4",
              icon: "/images/final/icon-판례검색.png",
            },
            {
              title: "변호사 통계",
              src: "/videos/final/lawyer-stats.mp4",
              icon: "/images/final/icon-변호사통계.png",
            },
            {
              title: "법령 체계도",
              src: "/videos/final/lawyer-statute-hierarchy.mp4",
              icon: "/images/final/icon-법령체계도.png",
            },
            {
              title: "워크스페이스",
              src: "/videos/final/lawyer-workspace.mp4",
              icon: "/images/final/icon-워크스페이스.png",
            },
            {
              title: "콘텐츠 마케팅",
              src: "/videos/final/lawyer-content-marketing.mp4",
              icon: "/images/final/icon-콘텐츠 마케팅.png",
            },
            {
              title: "로스쿨 학습",
              src: "/videos/final/lawyer-law-study.mp4",
              icon: "/images/final/icon-로스쿨학습.png",
            },
          ],
        },
      ],
      developerTitle: "Vector Search Optimization (LanceDB)",
      developerSubtitle:
        "14배 빠른 검색 속도와 100% 재현율의 완벽한 균형",
      benchmark: {
        bruteForce: { latency: "91ms", pct: 100 },
        ivfFlat: { latency: "6.4ms", pct: 7 },
        speedup: "14x",
      },
      indexTable: [
        {
          type: "IVF_PQ",
          latency: "3.4ms",
          recall: "60%",
          verdict: "정확도 손실",
          ok: false,
        },
        {
          type: "IVF_HNSW_SQ",
          latency: "3.7ms",
          recall: "90%",
          verdict: "10% 차이",
          ok: false,
        },
        {
          type: "IVF_FLAT",
          latency: "6.4ms",
          recall: "100%",
          verdict: "14배 빠름 + 무손실",
          ok: true,
        },
      ],
    },
    speaker_notes:
      "시연 영상. 투자자에게는 데모 비디오, 개발자에게는 벡터 검색 최적화.",
  },
  {
    id: 9,
    section: "기술",
    title: "STRATEGIC ASSETS",
    subtitle:
      "누구도 복제할 수 없는 법률 대통령만의 4가지 압도적 자산",
    layout: "strategic-assets",
    audience: "both",
    content: {
      slogan:
        "기술은 따라올 수 있어도, 우리가 구축한 '비즈니스 장벽'은 넘을 수 없습니다.",
      assets: [
        {
          icon: "🔄",
          title: "최신성",
          subtitle: "멈추지 않는 지식 엔진",
          modalService: "법률 뉴스",
          modalFeature: "Daily News RAG",
          modalDesc:
            "법제처의 정적인 데이터 한계를 극복합니다. 매일 쏟아지는 법률 뉴스와 판례 동향을 매일 데이터베이스에 적재하여 '어제의 법조계'를 답변에 즉시 반영합니다.",
          modalHighlight:
            "정보의 시차를 없앤 신뢰도 1위의 데이터 주권 확보",
        },
        {
          icon: "📍",
          title: "수익성",
          subtitle: "데이터 기반 개업 전략",
          modalService: "변호사 통계",
          modalFeature: "Business Intelligence",
          modalDesc:
            "전국 행정구별 변호사 밀도 및 재판 접수 통계 분석. 변호사에게 '성공 확률이 가장 높은 개업지'를 데이터로 제안하는 국내 유일의 비즈니스 컨설팅 기능을 제공합니다.",
          modalHighlight:
            "유료 전환율이 가장 높은 변호사 타겟 킬러 서비스",
        },
        {
          icon: "🎮",
          title: "독창성",
          subtitle: "2D 픽셀 모의법정",
          modalService: "모의 법정",
          modalFeature: "Gamification",
          modalDesc:
            "세계 최초 2D 픽셀 게임 방식의 재판 시뮬레이터. 딱딱한 법리 검토를 즐거운 리허설로 전환. 변호사는 승소 전략을 짜고, 일반인은 법을 게임처럼 경험합니다.",
          modalHighlight:
            "시장에 없던 신개념 기능으로 폭발적인 사용자 체류 시간과 바이럴 확보",
        },
        {
          icon: "♾️",
          title: "연속성",
          subtitle: "10년의 기록, 1초의 복기",
          modalService: "사건 워크스페이스",
          modalFeature: "Case Workspace",
          modalDesc:
            "사건별/의뢰인별 10년 장기 데이터 보존 시스템. 대화 맥락이 단절되지 않는 클라우드 기반 워크스페이스를 통해 10년이 지나도 AI가 사건의 모든 디테일을 기억합니다.",
          modalHighlight:
            "사용 기간이 길어질수록 이탈이 불가능해지는 강력한 '락인(Lock-in)' 효과",
        },
      ],
      costOptimization: [
        {
          area: "Vector DB",
          general: "Pinecone, Qdrant",
          ours: "Embedded LanceDB",
          effect: "월 $70+ 고정비 절감",
        },
        {
          area: "Search Engine",
          general: "Elasticsearch",
          ours: "PG pg_textsearch",
          effect: "인프라 단순화",
        },
        {
          area: "Graph Logic",
          general: "Neo4j",
          ours: "PG Recursive CTE",
          effect: "추가 DB 엔진 배제",
        },
        {
          area: "Embedding",
          general: "외부 API (SaaS)",
          ours: "ONNX INT8 Local",
          effect: "API 과금 Zero",
        },
      ],
    },
    speaker_notes:
      "전략 자산 4가지와 비용 최적화 전략. 투자자에게는 장벽, 개발자에게는 비용 절감.",
  },
  {
    id: 10,
    section: "기술",
    title: "초정밀 법률 AI를 만드는 3대 핵심 지능",
    subtitle:
      "단순한 검색을 넘어, 전문가의 '협업'과 '언어'를 완벽히 재현했습니다.",
    layout: "three-pillars",
    audience: "investor",
    content: {
      pillars: [
        {
          icon: "🧠",
          title: "전문성",
          subtitle: "8인의 분야별 AI 전문가 팀",
          quote:
            "모든 것을 대충 아는 AI 한 명보다, 각 분야의 장인 8명이 협업하는 것이 훨씬 강력합니다.",
          description:
            "스마트 접수관(Router)이 질문 분석 → 가장 적절한 전문가 배정",
          examples: [
            "판례 검색 → '검색 전문가' 전담 배정",
            "재판 연습 → '모의법정 전문가' 전담 배정",
          ],
          benefit: "답변 전문성 극대화 + 유연한 확장성",
        },
        {
          icon: "🔍",
          title: "정확성",
          subtitle: "'두 번 확인'하는 초정밀 검색",
          quote:
            "단순히 단어를 찾는 수준을 넘어, 문장의 숨은 의도까지 파악해 가장 정확한 근거를 제시합니다.",
          description:
            "'정밀 검색'(키워드) + '맥락 검색'(의미) + 최종 검수기(Reranker)",
          dualSearch: ["키워드 검색", "의미 검색", "한국어 1위 검증"],
          benefit: "AI 환각 원천 차단 · 100% 근거 기반 답변",
        },
        {
          icon: "📖",
          title: "언어",
          subtitle: "법률 전문 용어 완벽 이해",
          quote:
            "일반인은 이해하기 어려운 복잡한 법률 용어를 AI가 전문가처럼 정확히 알아듣습니다.",
          description:
            '법령 사전 직접 이식 → "손해배상청구권" 하나의 전문 용어로 인식',
          termComparison: {
            general: "손해 | 배상 | 청구 | 권",
            ours: "손해배상청구권",
          },
          benefit: "법조계 현장 언어로 검색 품질과 대화 품격 향상",
        },
      ],
      stats: [
        { label: "법률 데이터 탑재", value: "240만+" },
        { label: "전문 법률 사전 엔트리", value: "37,000+" },
        { label: "전문 AI 에이전트", value: "8개" },
      ],
    },
    speaker_notes:
      "3대 핵심 지능: 전문성·정확성·언어. 각각의 기술적 우위를 투자자 관점에서 설명.",
  },
  {
    id: 11,
    section: "기술",
    title: "RAG 5단계 파이프라인",
    subtitle: "거짓말하지 않는 AI를 만드는 초정밀 공정",
    layout: "rag-pipeline",
    audience: "both",
    content: {
      slogan:
        "단순 검색을 넘어, 수천 페이지의 법률 문서 속에서 '단 하나의 정답'을 찾아내는 압도적 정확도",
      steps: [
        {
          icon: "✍️",
          title: "질문 재해석",
          description:
            "사용자의 모호한 질문을 AI가 검색 최적화된 전문 법률 용어로 재작성",
        },
        {
          icon: "🔍",
          title: "키워드 + 의미 이중 검색",
          description:
            "단어 기반(Keyword) + 의미 기반(Vector) 동시 검색으로 누락 제로화",
        },
        {
          icon: "➕",
          title: "핵심자료 + 보충자료 병합",
          description:
            "Main RAG + Supplementary RAG 병렬 수집으로 풍부한 근거 확보",
        },
        {
          icon: "🏆",
          title: "최적의 정답 선별",
          description:
            "한국어 벤치마크 1위 리랭커로 8,000자+ 장문도 끝까지 분석·재정렬",
        },
        {
          icon: "📄",
          title: "신뢰도 100% 답변 출력",
          description: "검증된 데이터만으로 근거 기반 최종 답변 생성",
        },
      ],
      highlights: [
        {
          icon: "📘",
          title: "긴 문장도 완벽 분석",
          description: "8,192 토큰 지원으로 장문 판례 분석 최적화",
        },
        {
          icon: "🏆",
          title: "한국어 성능 1위",
          description: "국가 공인 벤치마크 1위 엔진(bge-reranker) 사용",
        },
        {
          icon: "⚡",
          title: "비용 효율적 설계",
          description: "고성능이면서도 운영비는 낮춘 지능형 모델 최적화",
        },
      ],
    },
    speaker_notes:
      "RAG 5단계 파이프라인. 질문 재해석부터 최종 답변까지의 정밀 공정.",
  },
  {
    id: 12,
    section: "기술",
    title: "ONNX Runtime 최적화",
    subtitle: "CPU 환경에서도 GPU 오프로딩 이상의 고성능 발휘",
    layout: "onnx-optimization",
    audience: "developer",
    content: {
      embedding: {
        model: "KURE-v1",
        benchmarks: [
          { label: "PyTorch FP32", value: 1501, color: "#86868b" },
          { label: "PyTorch MPS", value: 1531, color: "#86868b" },
          { label: "ORT-opt FP32", value: 218, color: "#2997ff" },
          { label: "QDQ INT8", value: 167, color: "#30E7A9" },
        ],
        kpi: { speedup: "6.88x", similarity: "1.0000" },
      },
      reranker: {
        model: "bge-reranker-v2-m3-ko",
        benchmarks: [
          { label: "PyTorch FP32", value: 3238, color: "#86868b" },
          { label: "ORT-opt FP32", value: 1815, color: "#2997ff" },
          { label: "QDQ INT8", value: 920, color: "#30E7A9" },
        ],
        kpi: { speedup: "3.52x" },
      },
      layerGrid: {
        total: 24,
        fp32Layers: [0, 1, 22, 23],
        description:
          "레이어별 민감도 측정 후 선택적 양자화: 첫 2개·마지막 2개 레이어 FP32 유지",
      },
    },
    speaker_notes:
      "ONNX 최적화 상세. 임베딩 6.88배, 리랭커 3.52배 속도 향상.",
  },
  {
    id: 13,
    section: "기술",
    title: "Recursive CTE 아키텍처",
    subtitle: "Neo4j 없이 PostgreSQL만으로 법령 체계도 구현",
    layout: "recursive-cte",
    audience: "developer",
    content: {
      infraCompare: {
        asis: {
          label: "AS-IS",
          nodes: ["App", "PostgreSQL", "Neo4j"],
          issue: "추가 DB 엔진 관리 부담",
        },
        tobe: {
          label: "TO-BE",
          nodes: ["App", "PostgreSQL + CTE"],
          benefit: "단일 DB로 통합 (SSOT)",
        },
      },
      treeExample: {
        root: "헌법",
        branches: [
          {
            name: "형법",
            children: ["형사소송법", "특별형법"],
          },
          {
            name: "민법",
            children: ["민사소송법", "가사소송법"],
          },
        ],
      },
      sqlSnippet: `WITH RECURSIVE law_tree AS (
  SELECT id, name, parent_id, 1 AS depth
  FROM statutes WHERE parent_id IS NULL
  UNION ALL
  SELECT s.id, s.name, s.parent_id, lt.depth + 1
  FROM statutes s
  JOIN law_tree lt ON s.parent_id = lt.id
)
SELECT * FROM law_tree ORDER BY depth;`,
      features: [
        { icon: "🔄", title: "재귀 탐색", desc: "깊이 제한 없는 계층 탐색" },
        {
          icon: "⚡",
          title: "단일 쿼리",
          desc: "한 번의 SQL로 전체 트리 로드",
        },
        {
          icon: "💰",
          title: "비용 절감",
          desc: "별도 Graph DB 인프라 불필요",
        },
      ],
      metrics: [
        { value: "5,555", unit: "건", label: "법령 체계도" },
        { value: "< 50", unit: "ms", label: "응답 시간" },
        { value: "0", unit: "원", label: "추가 인프라 비용" },
      ],
    },
    speaker_notes:
      "Recursive CTE로 Neo4j 대체. 단일 PostgreSQL로 법령 체계도 구현.",
  },
  {
    id: 14,
    section: "기술",
    title: "Summary & Future Vision",
    subtitle:
      "기술로 혁신하는 법률 문턱, 대한민국 법률 AI의 표준이 되다",
    layout: "summary-vision",
    audience: "developer",
    content: {
      stats: [
        { value: "2.4M", label: "21개 기관 법률 빅데이터", icon: "📄" },
        { value: "14x", label: "ONNX + IVF_FLAT 최적화", icon: "⚡" },
        { value: "9", label: "LangGraph 멀티에이전트", icon: "🤖" },
        { value: "$0", label: "외부 의존성 제거", icon: "💰" },
      ],
      roadmap: [
        {
          icon: "🎮",
          title: "모의법정 실감형 UX 및 멀티모달 고도화",
          items: [
            "이벤트 애니메이션 강화 및 선고 단계 시뮬레이션 최적화",
            "음성 인터페이스(VUI) 도입을 통한 대화형 모의법정 구현",
          ],
        },
        {
          icon: "🔍",
          title: "LLM 기반 지능형 인덱싱을 통한 검색 정밀도 강화",
          items: [
            "데이터 내 LLM 기반 핵심 키워드 자동 추출 프로세스 구축",
            "시맨틱 메타데이터 확장을 통한 RAG 검색 성능 극대화",
          ],
        },
        {
          icon: "⚡",
          title: "클라우드(AWS ARM) 환경 특화 ONNX 가속 최적화",
          items: [
            "M 시리즈 가속기 의존성 탈피 및 AWS ARM CPU 전용 커널 최적화",
            "환경별 하드웨어 특성을 반영한 하이엔드 인퍼런스 튜닝",
          ],
        },
        {
          icon: "🏗️",
          title: "엔터프라이즈급 분산 인프라 및 운영 체계 구축",
          items: [
            "단일 서버 구조에서 탈피한 계층형 아키텍처(EC2, RDS) 전환",
            "환경별(Dev/Stage/Prod) 서버 분리 및 안정적인 배포 파이프라인 수립",
          ],
        },
      ],
    },
    speaker_notes:
      "성과 요약과 미래 로드맵. 4가지 핵심 지표 + 4가지 발전 방향.",
  },
  {
    id: 15,
    section: "데이터",
    title: "실제 데이터로 증명합니다",
    layout: "scale-proof",
    audience: "both",
    content: {
      investorStats: [
        { icon: "📄", value: 597000, suffix: "+", label: "문서 수" },
        { icon: "🧬", value: 3160000, suffix: "+", label: "벡터 청크" },
        { icon: "🔍", value: 425000, suffix: "+", label: "BM25 FTS 색인" },
        { icon: "💻", value: 142000, suffix: "+", label: "코드 라인" },
      ],
      dataSources: [
        { icon: "⚖️", name: "법제처" },
        { icon: "🏛️", name: "대법원" },
        { icon: "📜", name: "헌법재판소" },
        { icon: "👔", name: "대한변호사협회" },
        { icon: "📊", name: "통계청" },
        { icon: "🏢", name: "법무부 / 대한법률구조공단" },
        { icon: "📋", name: "행정심판원" },
        { icon: "⚙️", name: "37개 중앙정부부처" },
        { icon: "🏗️", name: "5개 특별정부기관" },
        { icon: "🗂️", name: "12개 각 위원회" },
      ],
      developerTitle: "기술적 회고",
      pride: [
        {
          title: "ONNX 최적화 심층 탐구",
          description:
            "레이어 하나하나의 민감도를 측정하며 선택적 양자화를 구현한 경험은 추론 비용과 사용자 경험 사이의 최적 지점을 찾는 귀중한 자산이 되었습니다.",
        },
        {
          title: "Claude Code Max로 개발 속도 극대화",
          description:
            "복잡한 모듈 오케스트레이션과 LangGraph의 다중 에이전트 로직을 설계할 때, Claude Code Max를 적극 활용하여 개발 생산성을 극대화했습니다.",
        },
      ],
      backlog: [
        {
          title: "Graph RAG로의 전환",
          description:
            "현재의 재귀형 CTE를 넘어, 더욱 복잡하고 방대한 법령 간의 연관 관계를 다차원적으로 추론하기 위한 Graph RAG 도입.",
        },
        {
          title: "매니지드 벡터 데이터베이스 경험 (Qdrant)",
          description:
            "향후 대규모 트래픽 분산과 고급 필터링 기능을 위해 Qdrant와 같은 전문 매니지드 벡터 데이터베이스를 도입.",
        },
      ],
    },
    speaker_notes:
      "데이터 규모 증명. 투자자에게는 통계, 개발자에게는 기술적 회고.",
  },
  {
    id: 16,
    section: "팀",
    title: "최소 비용으로 최대 성능을 구현한 전략적 자원 관리",
    subtitle:
      "철저한 리스크 관리와 기술 최적화로 예산의 33%를 절감하며 성공적으로 완수했습니다.",
    layout: "cost-management",
    audience: "investor",
    content: {
      donut: {
        saved: 33,
        spent: 67,
        centerLabel: "33% SAVED",
      },
      costCards: [
        {
          label: "지출 현황",
          detail: "현시점 완료 — 고정비 + 운영비",
          amount: "70,000원",
        },
        {
          label: "예비비 현황",
          detail: "API 호출 + AWS 후청부 예상",
          amount: "30,000원",
        },
        {
          label: "최종 정산",
          detail: "안정적 프로젝트 종료",
          amount: "100,000원",
        },
      ],
      budgetTable: [
        { category: "총 배정 예산", amount: "150,000원", note: "1.5개월 기준" },
        { category: "실행 예산 (A)", amount: "70,000원", note: "고정비 및 운영비" },
        {
          category: "추가 정산 예정 (B)",
          amount: "~30,000원",
          note: "API 호출 및 AWS 후청부",
        },
        {
          category: "최종 예상 지출 (A+B)",
          amount: "100,000원",
          note: "전체 예산 대비 66% 집행",
          highlight: true,
        },
        {
          category: "잔여 예산 (절감액)",
          amount: "50,000원",
          note: "33% 세이빙",
          highlight: true,
        },
      ],
      strategies: [
        {
          title: "선제적 리스크 관리",
          description:
            "전체 예산의 20%(3만 원)를 비상 예비비로 별도 책정",
        },
        {
          title: "기술 기반 비용 최적화",
          description:
            "ONNX 최적화 모델 등 운영비 불필요한 고효율 로컬 모델 병행",
        },
        {
          title: "자산 건전성 확보",
          description:
            "불필요한 지출 억제, 예산 33% 절감으로 고도화 시드 자금 확보",
        },
      ],
    },
    speaker_notes: "비용 관리. 33% 예산 절감 및 전략적 자원 운영.",
  },
  {
    id: 17,
    section: "팀",
    title: "이 거대한 시스템을 현실로 만든 사람들",
    subtitle:
      "기획의 정교함, 데이터의 지능, 기술의 실행력이 만나 법률 AI의 새로운 표준을 세웠습니다.",
    layout: "team-intro",
    audience: "investor",
    content: {
      members: [
        {
          name: "김주형",
          role: "THE BUILDER",
          title: "Backend & Infrastructure Architect",
          description: "아이디어를 실체화된 서비스로 바꾼 기술력의 총아",
          quote: "무(無)에서 유(有)를 창조한 기술의 심장",
          bio: "8인의 멀티 에이전트 시스템을 설계하고 코드로 구현한 주인공입니다. 복잡한 로직을 안정적인 서비스로 배포하며, 시스템의 모든 근육과 뼈대를 직접 깎고 다듬었습니다.",
          gradient: ["#2997ff", "#6AE4FF"],
          emoji: "👨‍💻",
        },
        {
          name: "김용희",
          role: "THE NAVIGATOR",
          title: "Project Manager & Data Strategist",
          description: "비즈니스 로직 설계 및 데이터 공급망 총괄",
          quote: "항로를 밝히고 연료를 공급한 설계자",
          bio: "법률 시장의 빈틈을 찾아 서비스의 방향을 정하고, 240만 건에 달하는 방대한 데이터를 수집·전처리했습니다. 프로젝트가 예산 안에서 안전하게 완주할 수 있도록 이끈 나침반입니다.",
          gradient: ["#30E7A9", "#6AE4FF"],
          emoji: "🧑‍💼",
        },
        {
          name: "홍서연",
          role: "THE ANALYST",
          title: "Frontend & Data Analyst",
          description: "데이터를 시각화하고 사용자 경험을 설계",
          quote: "데이터의 목소리를 시각으로 전달하는 분석가",
          bio: "프론트엔드 개발과 데이터 분석을 겸하며, 복잡한 법률 데이터를 직관적인 시각화로 변환했습니다. 사용자 중심의 인터페이스 설계로 서비스의 접근성을 높였습니다.",
          gradient: ["#bf5af2", "#2997ff"],
          emoji: "🧑‍🔬",
        },
      ],
    },
    speaker_notes: "팀 소개. 3명의 핵심 역할과 기여를 상세히 소개.",
  },
  {
    id: 18,
    section: "팀",
    title: "기획회고",
    subtitle: "기획의 상상이 현실이 되는 과정: 성과와 성장을 위한 기록",
    layout: "retrospective",
    audience: "investor",
    content: {
      successes: [
        {
          title: "압도적인 구현력과의 시너지",
          description:
            "전문 프로그래머(2명)와의 긴밀한 협업으로, 복잡한 기획 아이디어가 지체 없이 고도화된 기능으로 실체화되었습니다.",
        },
        {
          title: "유연하고 개방적인 팀 문화",
          description:
            "기획 의도와 아이디어를 팀원들이 적극적으로 수용하고 피드백을 주고받는 '심리적 안전감'이 프로젝트의 창의성을 극대화했습니다.",
        },
      ],
      successSummary:
        "팀원들의 높은 수용성과 기술적 전문성이 만든 압도적 실행력",
      growth: {
        title: "체계적인 일정 관리의 필요성",
        description:
          "폭발적인 아이디어 구현 과정에서 발생한 일정의 유동성을 관리하기 위해, 차기 프로젝트에서는 더욱 데이터 기반의 체계적인 스케줄링 도입이 필요합니다.",
        evolution: { from: "유연한 일정", to: "Gantt Chart" },
      },
      growthSummary:
        "리소스 최적화 및 안정적 마일스톤 관리를 위한 관리 도구 고도화",
    },
    speaker_notes: "기획 회고. 성공 요인과 향후 발전 방향.",
  },
  {
    id: 19,
    section: "전략",
    title: "독점이 아닌 '상생'을 위한 인프라",
    subtitle:
      "법률 대통령은 기존 시장의 경쟁자가 아니라, 법률 전문가들의 검을 갈아주는 '지능형 숫돌'이자 국가 법률 정보의 '디지털 가속기'입니다.",
    layout: "strategy-radial",
    audience: "investor",
    content: {
      hub: { badge: "LP", label: "법률 대통령" },
      targets: [
        {
          icon: "🏛️",
          name: "법제처",
          tag: "B2G",
          color: "#2997ff",
          description:
            "국민의 법률 접근성 혁신 및 공공 데이터의 가치 극대화",
        },
        {
          icon: "⚖️",
          name: "대한변호사협회",
          tag: "",
          color: "#6AE4FF",
          description:
            "AI 시대를 대비한 변호사 경쟁력 강화 및 법률 시장 파이 확대",
        },
        {
          icon: "🏢",
          name: "대형 로펌",
          tag: "",
          color: "#30E7A9",
          description:
            "사건 처리 리드타임 60% 단축 및 고부가가치 전략 수립 집중",
        },
        {
          icon: "🎓",
          name: "법률 학원",
          tag: "",
          color: "#fbbf24",
          description:
            "AI-Native 법조인 양성을 위한 차세대 교육 솔루션 표준",
        },
      ],
    },
    speaker_notes:
      "상생 전략. 법제처·변호사협회·대형 로펌·법률 학원 4개 타겟.",
  },
  {
    id: 20,
    section: "마무리",
    title: "Thank You",
    subtitle: "궁금한 점이 있으시면 무엇이든 질문해 주세요.",
    layout: "minimal-center",
    audience: "both",
    content: {
      team: "법률3팀",
      event: "AI Camp 4기 · 최종 발표",
      contact: "",
      cta: [
        { label: "투자 문의", variant: "primary" },
        { label: "PoC 요청", variant: "outline" },
        { label: "파트너십", variant: "outline" },
      ],
    },
    speaker_notes: "감사 인사와 CTA 버튼.",
  },
];
