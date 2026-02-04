import type {
  Lawyer,
  RegionStat,
  SpecialtyStat,
  HeatmapCell,
  GraphNode,
  GraphLink,
  PrecedentItem,
  TimelineItem,
  DisputeTypeOption,
  EvidenceItem,
} from "@/types/demo";

// ── 변호사 찾기 ──
export const MOCK_LAWYERS: Lawyer[] = [
  { id: 1, name: "김민수", office: "법무법인 정의", specialty: "민사", category: "민사", location: "서초구", lat: 37.4916, lng: 127.0073, rating: 4.8, experience: 15 },
  { id: 2, name: "이지현", office: "이지현 법률사무소", specialty: "형사", category: "형사", location: "서초구", lat: 37.4850, lng: 127.0150, rating: 4.6, experience: 12 },
  { id: 3, name: "박준영", office: "법무법인 한결", specialty: "가사", category: "가사", location: "강남구", lat: 37.5010, lng: 127.0390, rating: 4.9, experience: 20 },
  { id: 4, name: "최서연", office: "최서연 법률사무소", specialty: "부동산", category: "부동산", location: "서초구", lat: 37.4930, lng: 127.0250, rating: 4.7, experience: 8 },
  { id: 5, name: "정현우", office: "법무법인 미래", specialty: "노동", category: "노동", location: "강남구", lat: 37.5080, lng: 127.0600, rating: 4.5, experience: 10 },
  { id: 6, name: "한소희", office: "한소희 법률사무소", specialty: "행정", category: "행정", location: "서초구", lat: 37.4870, lng: 127.0100, rating: 4.4, experience: 7 },
  { id: 7, name: "윤태호", office: "법무법인 신뢰", specialty: "조세", category: "조세", location: "종로구", lat: 37.5720, lng: 126.9790, rating: 4.8, experience: 18 },
  { id: 8, name: "강예린", office: "강예린 법률사무소", specialty: "지식재산", category: "지식재산", location: "강남구", lat: 37.5130, lng: 127.0520, rating: 4.6, experience: 9 },
  { id: 9, name: "오승현", office: "법무법인 공감", specialty: "의료", category: "의료", location: "서초구", lat: 37.4890, lng: 127.0200, rating: 4.7, experience: 14 },
  { id: 10, name: "임하늘", office: "임하늘 법률사무소", specialty: "기업", category: "기업", location: "영등포구", lat: 37.5264, lng: 126.9010, rating: 4.5, experience: 11 },
  { id: 11, name: "송지은", office: "법무법인 평화", specialty: "이혼·양육권", category: "가사", location: "송파구", lat: 37.5145, lng: 127.1059, rating: 4.7, experience: 13 },
  { id: 12, name: "장태영", office: "장태영 법률사무소", specialty: "교통사고", category: "민사", location: "마포구", lat: 37.5536, lng: 126.9368, rating: 4.3, experience: 6 },
  { id: 13, name: "배수진", office: "법무법인 도움", specialty: "상속", category: "가사", location: "용산구", lat: 37.5326, lng: 126.9906, rating: 4.8, experience: 16 },
  { id: 14, name: "류현준", office: "류현준 법률사무소", specialty: "임대차", category: "부동산", location: "중구", lat: 37.5640, lng: 126.9975, rating: 4.5, experience: 9 },
  { id: 15, name: "나윤서", office: "법무법인 새길", specialty: "의료과실", category: "의료", location: "동작구", lat: 37.5124, lng: 126.9393, rating: 4.6, experience: 11 },
];

// ── 변호사 통계 ──
export const REGION_STATS: RegionStat[] = [
  { region: "서초구", count: 2450 },
  { region: "강남구", count: 1820 },
  { region: "종로구", count: 890 },
  { region: "영등포구", count: 650 },
  { region: "마포구", count: 480 },
  { region: "송파구", count: 420 },
  { region: "용산구", count: 350 },
  { region: "중구", count: 310 },
  { region: "서대문구", count: 280 },
  { region: "동작구", count: 250 },
];

export const SPECIALTY_STATS: SpecialtyStat[] = [
  { name: "민사", value: 2850, color: "#2997ff" },
  { name: "형사", value: 1420, color: "#ff453a" },
  { name: "가사", value: 980, color: "#bf5af2" },
  { name: "부동산", value: 870, color: "#5ac8fa" },
  { name: "노동", value: 650, color: "#ff9f0a" },
  { name: "행정", value: 540, color: "#30d158" },
  { name: "기업", value: 480, color: "#64d2ff" },
  { name: "조세", value: 320, color: "#ffd60a" },
  { name: "의료", value: 210, color: "#ff375f" },
  { name: "지식재산", value: 150, color: "#ac8e68" },
  { name: "국제", value: 90, color: "#ff6482" },
  { name: "이민", value: 40, color: "#a2845e" },
];

export const HEATMAP_DATA: HeatmapCell[] = [
  { region: "서초구", category: "민사", count: 820 },
  { region: "서초구", category: "형사", count: 450 },
  { region: "서초구", category: "가사", count: 380 },
  { region: "서초구", category: "부동산", count: 420 },
  { region: "서초구", category: "노동", count: 180 },
  { region: "강남구", category: "민사", count: 650 },
  { region: "강남구", category: "형사", count: 320 },
  { region: "강남구", category: "가사", count: 280 },
  { region: "강남구", category: "부동산", count: 350 },
  { region: "강남구", category: "노동", count: 120 },
  { region: "종로구", category: "민사", count: 280 },
  { region: "종로구", category: "형사", count: 180 },
  { region: "종로구", category: "가사", count: 120 },
  { region: "종로구", category: "부동산", count: 160 },
  { region: "종로구", category: "노동", count: 90 },
  { region: "영등포구", category: "민사", count: 210 },
  { region: "영등포구", category: "형사", count: 130 },
  { region: "영등포구", category: "가사", count: 90 },
  { region: "영등포구", category: "부동산", count: 120 },
  { region: "영등포구", category: "노동", count: 70 },
];

// ── 변호사 시장 분석 (원본 UI 기반) ──
export const REGION_RANKING = [
  { rank: 1, region: "서울 서초구", count: 2860 },
  { rank: 2, region: "서울 강남구", count: 1838 },
  { rank: 3, region: "서울 종로구", count: 1064 },
  { rank: 4, region: "서울 중구", count: 584 },
  { rank: 5, region: "부산 연제구", count: 329 },
  { rank: 6, region: "서울 영등포구", count: 314 },
  { rank: 7, region: "경기 수원시", count: 238 },
  { rank: 8, region: "대구 수성구", count: 208 },
  { rank: 9, region: "서울 송파구", count: 186 },
  { rank: 10, region: "대전 서구", count: 177 },
  { rank: 11, region: "서울 마포구", count: 63 },
  { rank: 12, region: "서울 양천구", count: 59 },
  { rank: 13, region: "서울 용산구", count: 48 },
  { rank: 14, region: "서울 구로구", count: 38 },
  { rank: 15, region: "서울 강서구", count: 37 },
];

export const SIDO_LIST = [
  "전체", "서울", "경기", "인천", "부산", "대구", "대전",
  "광주", "울산", "세종", "강원", "충북", "충남",
  "전북", "전남", "경북", "경남", "제주",
];

/** 시/도별 변호사 수 + SVG 좌표 (버블맵용) */
export const MAP_BUBBLE_DATA = [
  { sido: "서울", count: 5520, x: 98, y: 78 },
  { sido: "경기", count: 412, x: 108, y: 100 },
  { sido: "인천", count: 156, x: 72, y: 84 },
  { sido: "부산", count: 329, x: 238, y: 268 },
  { sido: "대구", count: 208, x: 210, y: 218 },
  { sido: "대전", count: 177, x: 128, y: 178 },
  { sido: "광주", count: 124, x: 88, y: 268 },
  { sido: "울산", count: 82, x: 252, y: 244 },
  { sido: "세종", count: 22, x: 115, y: 168 },
  { sido: "강원", count: 64, x: 168, y: 62 },
  { sido: "충북", count: 52, x: 148, y: 152 },
  { sido: "충남", count: 74, x: 95, y: 168 },
  { sido: "전북", count: 92, x: 108, y: 228 },
  { sido: "전남", count: 66, x: 88, y: 298 },
  { sido: "경북", count: 86, x: 218, y: 178 },
  { sido: "경남", count: 108, x: 198, y: 268 },
  { sido: "제주", count: 42, x: 78, y: 378 },
];

export const CROSS_TAB_CATEGORIES = [
  "민사·가사", "형사", "부동산·건설", "노동·산재", "기업·상사",
  "금융·자본시장", "조세·관세", "공정·행정", "지식재산(IP)",
  "IT·미디어", "의료·바이오", "국제·해외",
];

export interface CrossTabRow {
  region: string;
  values: Record<string, number>;
  total: number;
}

export const CROSS_TAB_DATA: CrossTabRow[] = [
  { region: "서울 서초구", values: { "민사·가사": 187, "형사": 22, "부동산·건설": 104, "노동·산재": 19, "기업·상사": 16, "금융·자본시장": 62, "조세·관세": 15, "공정·행정": 32, "지식재산(IP)": 3, "IT·미디어": 3, "의료·바이오": 20, "국제·해외": 4 }, total: 487 },
  { region: "서울 강남구", values: { "민사·가사": 73, "형사": 13, "부동산·건설": 61, "노동·산재": 22, "기업·상사": 16, "금융·자본시장": 25, "조세·관세": 24, "공정·행정": 20, "지식재산(IP)": 4, "IT·미디어": 6, "의료·바이오": 4, "국제·해외": 6 }, total: 274 },
  { region: "서울 종로구", values: { "민사·가사": 8, "형사": 2, "부동산·건설": 11, "노동·산재": 2, "기업·상사": 10, "금융·자본시장": 5, "조세·관세": 7, "공정·행정": 10, "지식재산(IP)": 1, "IT·미디어": 4, "의료·바이오": 0, "국제·해외": 4 }, total: 64 },
  { region: "서울 송파구", values: { "민사·가사": 31, "형사": 3, "부동산·건설": 6, "노동·산재": 1, "기업·상사": 1, "금융·자본시장": 3, "조세·관세": 2, "공정·행정": 1, "지식재산(IP)": 0, "IT·미디어": 0, "의료·바이오": 0, "국제·해외": 0 }, total: 48 },
  { region: "서울 영등포구", values: { "민사·가사": 11, "형사": 1, "부동산·건설": 7, "노동·산재": 9, "기업·상사": 1, "금융·자본시장": 3, "조세·관세": 1, "공정·행정": 0, "지식재산(IP)": 0, "IT·미디어": 0, "의료·바이오": 1, "국제·해외": 0 }, total: 34 },
  { region: "서울 중구", values: { "민사·가사": 3, "형사": 1, "부동산·건설": 4, "노동·산재": 3, "기업·상사": 1, "금융·자본시장": 4, "조세·관세": 3, "공정·행정": 5, "지식재산(IP)": 1, "IT·미디어": 0, "의료·바이오": 1, "국제·해외": 0 }, total: 26 },
  { region: "서울 양천구", values: { "민사·가사": 7, "형사": 1, "부동산·건설": 3, "노동·산재": 0, "기업·상사": 0, "금융·자본시장": 0, "조세·관세": 0, "공정·행정": 0, "지식재산(IP)": 0, "IT·미디어": 0, "의료·바이오": 0, "국제·해외": 0 }, total: 11 },
  { region: "서울 용산구", values: { "민사·가사": 0, "형사": 1, "부동산·건설": 0, "노동·산재": 0, "기업·상사": 1, "금융·자본시장": 1, "조세·관세": 2, "공정·행정": 3, "지식재산(IP)": 0, "IT·미디어": 0, "의료·바이오": 0, "국제·해외": 0 }, total: 8 },
];

export const SPECIALTY_DISTRIBUTION = [
  { name: "민사·가사", count: 335, color: "#2997ff" },
  { name: "부동산·건설", count: 198, color: "#30d158" },
  { name: "형사", count: 47, color: "#ff9f0a" },
  { name: "금융·자본시장", count: 108, color: "#ff453a" },
  { name: "공정·행정", count: 71, color: "#bf5af2" },
  { name: "노동·산재", count: 59, color: "#ff375f" },
  { name: "기업·상사", count: 50, color: "#5ac8fa" },
  { name: "조세·관세", count: 54, color: "#64d2ff" },
  { name: "의료·바이오", count: 27, color: "#ff6482" },
  { name: "IT·미디어", count: 13, color: "#2997ff" },
  { name: "국제·해외", count: 15, color: "#30d158" },
  { name: "지식재산(IP)", count: 9, color: "#bf5af2" },
];

// ── 법령 체계도 ──
export const GRAPH_NODES: GraphNode[] = [
  { id: "constitution", name: "대한민국 헌법", type: "constitution", orbit: 0, color: "#ff453a", size: 24 },
  { id: "civil", name: "민법", type: "law", orbit: 1, color: "#2997ff", size: 14, logo: "/data/logo/National_Assembly.png" },
  { id: "criminal", name: "형법", type: "law", orbit: 1, color: "#2997ff", size: 14, logo: "/data/logo/National_Assembly.png" },
  { id: "commercial", name: "상법", type: "law", orbit: 1, color: "#2997ff", size: 14, logo: "/data/logo/National_Assembly.png" },
  { id: "admin", name: "행정소송법", type: "law", orbit: 1, color: "#2997ff", size: 12, logo: "/data/logo/National_Assembly.png" },
  { id: "labor", name: "근로기준법", type: "law", orbit: 1, color: "#2997ff", size: 12, logo: "/data/logo/National_Assembly.png" },
  { id: "civil_proc", name: "민사소송법", type: "law", orbit: 1, color: "#2997ff", size: 12, logo: "/data/logo/National_Assembly.png" },
  { id: "criminal_proc", name: "형사소송법", type: "law", orbit: 1, color: "#2997ff", size: 12, logo: "/data/logo/National_Assembly.png" },
  { id: "realestate", name: "부동산등기법", type: "law", orbit: 1, color: "#2997ff", size: 10, logo: "/data/logo/National_Assembly.png" },
  { id: "family", name: "가사소송법", type: "law", orbit: 1, color: "#2997ff", size: 10, logo: "/data/logo/National_Assembly.png" },
  { id: "consumer", name: "소비자기본법", type: "law", orbit: 1, color: "#2997ff", size: 10, logo: "/data/logo/National_Assembly.png" },
  { id: "civil_exec", name: "민법시행령", type: "decree", orbit: 2, color: "#30d158", size: 8, logo: "/data/logo/president.svg" },
  { id: "criminal_exec", name: "형법시행령", type: "decree", orbit: 2, color: "#30d158", size: 8, logo: "/data/logo/president.svg" },
  { id: "commercial_exec", name: "상법시행령", type: "decree", orbit: 2, color: "#30d158", size: 8, logo: "/data/logo/president.svg" },
  { id: "labor_exec", name: "근로기준법시행령", type: "decree", orbit: 2, color: "#30d158", size: 8, logo: "/data/logo/president.svg" },
  { id: "admin_exec", name: "행정소송법시행령", type: "decree", orbit: 2, color: "#30d158", size: 8, logo: "/data/logo/president.svg" },
  { id: "realestate_exec", name: "부동산등기규칙", type: "regulation", orbit: 2, color: "#ff9f0a", size: 6, logo: "/data/logo/sck.svg" },
  { id: "family_rule", name: "가사소송규칙", type: "regulation", orbit: 2, color: "#ff9f0a", size: 6, logo: "/data/logo/sck.svg" },
  { id: "civil_proc_rule", name: "민사소송규칙", type: "regulation", orbit: 2, color: "#ff9f0a", size: 6, logo: "/data/logo/sck.svg" },
  { id: "criminal_proc_rule", name: "형사소송규칙", type: "regulation", orbit: 2, color: "#ff9f0a", size: 6, logo: "/data/logo/sck.svg" },
  { id: "rental", name: "주택임대차보호법", type: "law", orbit: 1, color: "#2997ff", size: 10, logo: "/data/logo/National_Assembly.png" },
  { id: "rental_exec", name: "주택임대차보호법시행령", type: "decree", orbit: 2, color: "#30d158", size: 7, logo: "/data/logo/president.svg" },
  { id: "labor_safety", name: "산업안전보건법", type: "law", orbit: 1, color: "#2997ff", size: 10, logo: "/data/logo/National_Assembly.png" },
  { id: "labor_safety_exec", name: "산업안전보건법시행령", type: "decree", orbit: 2, color: "#30d158", size: 7, logo: "/data/logo/president.svg" },
  { id: "personal_info", name: "개인정보보호법", type: "law", orbit: 1, color: "#2997ff", size: 10, logo: "/data/logo/National_Assembly.png" },
];

export const GRAPH_LINKS: GraphLink[] = [
  { source: "constitution", target: "civil", label: "근거" },
  { source: "constitution", target: "criminal", label: "근거" },
  { source: "constitution", target: "commercial", label: "근거" },
  { source: "constitution", target: "admin", label: "근거" },
  { source: "constitution", target: "labor", label: "근거" },
  { source: "constitution", target: "civil_proc", label: "근거" },
  { source: "constitution", target: "criminal_proc", label: "근거" },
  { source: "constitution", target: "realestate", label: "근거" },
  { source: "constitution", target: "family", label: "근거" },
  { source: "constitution", target: "consumer", label: "근거" },
  { source: "constitution", target: "rental", label: "근거" },
  { source: "constitution", target: "labor_safety", label: "근거" },
  { source: "constitution", target: "personal_info", label: "근거" },
  { source: "civil", target: "civil_exec", label: "위임" },
  { source: "criminal", target: "criminal_exec", label: "위임" },
  { source: "commercial", target: "commercial_exec", label: "위임" },
  { source: "labor", target: "labor_exec", label: "위임" },
  { source: "admin", target: "admin_exec", label: "위임" },
  { source: "realestate", target: "realestate_exec", label: "위임" },
  { source: "family", target: "family_rule", label: "위임" },
  { source: "civil_proc", target: "civil_proc_rule", label: "위임" },
  { source: "criminal_proc", target: "criminal_proc_rule", label: "위임" },
  { source: "rental", target: "rental_exec", label: "위임" },
  { source: "labor_safety", target: "labor_safety_exec", label: "위임" },
];

// ── 스토리보드 ──
export const MOCK_TIMELINE: TimelineItem[] = [
  {
    id: "tl-1",
    sceneNumber: 1,
    date: "2024.01.15",
    title: "임대차 계약 체결",
    descriptionShort: "서울시 강남구 소재 아파트에 대해 보증금 5,000만원, 월세 50만원으로 2년간 임대차 계약 체결",
    participants: [
      { name: "김철수", role: "임차인" },
      { name: "박영희", role: "임대인" },
    ],
    evidenceItems: ["임대차계약서", "계좌이체 확인서"],
  },
  {
    id: "tl-2",
    sceneNumber: 2,
    date: "2024.07.10",
    title: "보증금 미반환 통보",
    descriptionShort: "계약 만료 후 임대인이 보증금 반환을 거부. 카카오톡으로 '수리비 공제 후 반환하겠다'는 일방적 통보",
    participants: [
      { name: "박영희", role: "임대인" },
    ],
    evidenceItems: ["카카오톡 대화 캡처", "문자 메시지"],
  },
  {
    id: "tl-3",
    sceneNumber: 3,
    date: "2024.08.05",
    title: "내용증명 발송",
    descriptionShort: "법률 자문을 받아 임대인에게 보증금 전액 반환을 요구하는 내용증명 우편 발송",
    participants: [
      { name: "김철수", role: "임차인" },
    ],
    evidenceItems: ["내용증명 사본", "우편 발송 영수증"],
  },
  {
    id: "tl-4",
    sceneNumber: 4,
    date: "2024.09.01",
    title: "소액소송 제기",
    descriptionShort: "보증금 5,000만원 반환을 청구하는 소액사건심판 청구서를 관할 법원에 접수",
    participants: [
      { name: "김철수", role: "임차인" },
      { name: "서울중앙지방법원", role: "기관" },
    ],
    evidenceItems: ["소장", "증거 목록"],
  },
];

// ── 소액소송 ──
export const DISPUTE_TYPE_OPTIONS: DisputeTypeOption[] = [
  { id: "goods", name: "물품대금", icon: "📦", description: "물품 구매 후 대금 미지급 분쟁" },
  { id: "fraud", name: "중고거래 사기", icon: "🚨", description: "온라인 중고거래 사기 피해" },
  { id: "deposit", name: "임대차 보증금", icon: "🏠", description: "임대차 보증금 미반환 분쟁" },
  { id: "service", name: "용역대금", icon: "💼", description: "용역 수행 후 대금 미지급" },
  { id: "wage", name: "임금 체불", icon: "💰", description: "근로 임금 미지급 분쟁" },
];

export const EVIDENCE_CHECKLIST: EvidenceItem[] = [
  { id: "ev-1", label: "임대차 계약서 사본", required: true },
  { id: "ev-2", label: "보증금 입금 확인서 (계좌이체 내역)", required: true },
  { id: "ev-3", label: "내용증명 발송 사본", required: true },
  { id: "ev-4", label: "전입세대 확인서", required: true },
  { id: "ev-5", label: "카카오톡/문자 대화 캡처", required: false },
  { id: "ev-6", label: "부동산 등기부등본", required: false },
  { id: "ev-7", label: "사진 자료 (훼손 부위 등)", required: false },
  { id: "ev-8", label: "감정평가서 또는 수리비 견적서", required: false },
];

export const MOCK_DOCUMENT_TEXT = `내 용 증 명

수신: 박영희 (서울시 강남구 ○○로 123, 456호)
발신: 김철수 (서울시 서초구 ○○대로 789, 101호)

제목: 임대차보증금 반환 청구

1. 본인은 귀하와 2024년 1월 15일 체결한 임대차계약에 따라 보증금 금 50,000,000원(오천만원)을 지급한 바 있습니다.

2. 위 임대차계약은 2024년 7월 14일 기간 만료로 종료되었으나, 귀하는 현재까지 보증금을 반환하지 않고 있습니다.

3. 이에 본 내용증명을 통해 보증금 전액의 반환을 정식으로 청구하오니, 본 서면 수령일로부터 7일 이내에 아래 계좌로 반환하여 주시기 바랍니다.

반환 계좌: ○○은행 123-456-789012 (예금주: 김철수)

4. 만일 위 기한 내에 반환이 이루어지지 않을 경우, 민사소송법에 따른 소액사건심판 청구 등 법적 절차를 진행할 것임을 알려드립니다.

2024년 8월 5일
발신인: 김철수 (인)`;

// ── 판례 검색 ──
export const MOCK_PRECEDENTS: PrecedentItem[] = [
  {
    id: 1,
    caseNumber: "2023다12345",
    caseName: "임대차보증금반환청구의 소",
    court: "대법원",
    date: "2024-01-15",
    docType: "판결",
    similarity: 0.95,
    summary: "임대차 계약 종료 후 임대인이 보증금을 반환하지 않은 사건에서, 임차인의 보증금 반환 청구권이 인정되었으며, 지연이자 포함 판결.",
    content: "【판시사항】\n임대차 계약이 종료된 후 임대인이 임차인에게 보증금을 반환하지 않은 경우, 임차인은 임대인에 대하여 보증금 반환을 청구할 수 있다. 이 경우 임대인은 임차인이 목적물을 명도할 때까지 보증금 반환을 거절할 수 있는 동시이행의 항변권을 가진다.\n\n【판결요지】\n임대차 계약의 종료에 따른 임대인의 보증금 반환의무와 임차인의 목적물 반환의무는 동시이행의 관계에 있으므로, 임차인이 목적물을 명도하지 아니한 경우에는 임대인은 보증금의 반환을 거절할 수 있다. 그러나 임차인이 목적물을 명도한 이후에도 임대인이 보증금을 반환하지 않는 경우에는 지연손해금을 지급하여야 한다.",
    aiAnswer: "임대차보증금 반환에 대한 핵심 법리는 다음과 같습니다:\n\n1. 임대차 계약 종료 시 임대인은 보증금을 반환할 의무가 있습니다.\n2. 임대인의 보증금 반환의무와 임차인의 목적물 반환의무는 동시이행 관계입니다.\n3. 임차인이 목적물을 명도한 후에도 보증금을 반환하지 않으면 지연손해금이 발생합니다.\n4. 주택임대차보호법에 따라 임차인은 우선변제권을 가질 수 있습니다.",
  },
  {
    id: 2,
    caseNumber: "2023나67890",
    caseName: "임대차보증금우선변제권확인의 소",
    court: "서울고등법원",
    date: "2023-11-20",
    docType: "판결",
    similarity: 0.89,
    summary: "소액임차인의 최우선변제권 범위와 대항력 요건에 대한 판결. 전입신고와 확정일자의 효력 발생 시점을 명확히 함.",
    content: "【판시사항】\n소액임차인의 최우선변제권은 주택임대차보호법 제8조에 근거하며, 임차인이 주택의 인도와 주민등록을 마친 때에 대항력이 발생한다.\n\n【판결요지】\n소액임차인의 최우선변제권은 경매개시결정 등기 전에 대항요건을 갖춘 경우에 인정된다. 대항요건은 주택의 인도와 주민등록(전입신고)을 모두 갖춘 때에 효력이 발생하며, 확정일자는 우선변제권의 요건이다.",
    aiAnswer: "소액임차인의 보증금 보호에 관한 핵심 사항입니다:\n\n1. 대항력: 주택 인도 + 전입신고 완료 시 다음날부터 효력 발생\n2. 우선변제권: 대항요건 + 확정일자를 갖춘 경우 인정\n3. 최우선변제권: 소액임차인은 경매 시 일정 금액까지 최우선 변제",
  },
  {
    id: 3,
    caseNumber: "2022가합54321",
    caseName: "임대차계약해지및보증금반환",
    court: "서울중앙지방법원",
    date: "2023-08-10",
    docType: "판결",
    similarity: 0.84,
    summary: "임대인의 계약 위반으로 인한 임대차 계약 해지와 보증금 반환을 인정한 사례. 임대인의 수선의무 불이행이 해지 사유에 해당.",
    content: "【판시사항】\n임대인이 수선의무를 이행하지 않아 임차 목적물을 사용·수익할 수 없는 경우, 임차인은 계약을 해지하고 보증금 반환을 청구할 수 있다.\n\n【판결요지】\n임대인은 임대차 기간 동안 임차 목적물을 사용·수익에 적합한 상태로 유지할 의무가 있으며, 이를 불이행한 경우 임차인은 민법 제623조에 따라 계약을 해지할 수 있다.",
    aiAnswer: "임대인의 수선의무 불이행과 관련된 법리:\n\n1. 임대인은 목적물을 사용·수익에 적합한 상태로 유지할 의무가 있습니다.\n2. 수선의무 불이행이 중대한 경우 임차인은 계약을 해지할 수 있습니다.\n3. 해지 시 보증금 전액 반환을 청구할 수 있습니다.",
  },
  {
    id: 4,
    caseNumber: "2024가단11111",
    caseName: "전세보증금반환및손해배상",
    court: "수원지방법원",
    date: "2024-03-05",
    docType: "판결",
    similarity: 0.78,
    summary: "전세 계약 만료 후 보증금 미반환에 대한 손해배상 청구. 임대인의 귀책사유로 인한 지연손해금 인정.",
    content: "【판시사항】\n전세권 설정 후 계약 기간 만료 시 전세금 반환의무와 지연손해금 산정 기준에 대한 판단.\n\n【판결요지】\n전세권이 설정된 경우 전세권자는 전세기간 만료 후 전세금의 반환을 청구할 수 있으며, 반환이 지체된 경우 민법 소정의 법정이율에 의한 지연손해금을 청구할 수 있다.",
    aiAnswer: "전세보증금 반환 관련 주요 사항:\n\n1. 전세 기간 만료 시 임대인은 즉시 보증금을 반환해야 합니다.\n2. 반환 지체 시 연 5%(민사) 또는 연 12%(상사)의 지연손해금이 발생합니다.",
  },
  {
    id: 5,
    caseNumber: "2023다99999",
    caseName: "상가건물 임대차보증금 회수",
    court: "대법원",
    date: "2024-02-28",
    docType: "판결",
    similarity: 0.72,
    summary: "상가건물 임대차보호법 적용 범위와 보증금 회수에 관한 대법원 판결. 환산보증금 기준 초과 시에도 일부 보호 규정 적용.",
    content: "【판시사항】\n상가건물 임대차보호법의 적용 범위와 환산보증금 기준에 대한 판단. 보증금과 월 차임을 환산한 금액이 일정 기준을 초과하는 경우에도 계약갱신요구권 등 일부 규정은 적용된다.\n\n【판결요지】\n상가건물 임대차보호법 제2조 제3항에 따라 환산보증금이 기준금액을 초과하는 경우에도 제10조(계약갱신요구권), 제10조의4(권리금 보호) 등은 적용된다.",
    aiAnswer: "상가건물 임대차보증금 회수 관련 핵심:\n\n1. 상가건물 임대차보호법은 환산보증금 기준 이하에만 전면 적용됩니다.\n2. 기준 초과 시에도 계약갱신요구권과 권리금 보호 규정은 적용됩니다.\n3. 대항력은 사업자등록 + 건물 인도 시 발생합니다.",
  },
];
