"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Star, Briefcase, ChevronDown, Search } from "lucide-react";
import { MOCK_LAWYERS } from "@/data/mockData";
import type { Lawyer } from "@/types/demo";

const DISTRICTS = [
  "전체", "서초구", "강남구", "종로구", "영등포구",
  "송파구", "마포구", "용산구", "중구", "서대문구", "동작구",
];

const CATEGORIES: { name: string; icon: string; color: string }[] = [
  { name: "전체", icon: "📋", color: "#f5f5f7" },
  { name: "민사", icon: "📄", color: "#2997ff" },
  { name: "형사", icon: "🔒", color: "#ff453a" },
  { name: "가사", icon: "👨‍👩‍👧", color: "#bf5af2" },
  { name: "부동산", icon: "🏠", color: "#5ac8fa" },
  { name: "노동", icon: "🔧", color: "#ff9f0a" },
  { name: "행정", icon: "🏛️", color: "#30d158" },
  { name: "기업", icon: "🏢", color: "#64d2ff" },
  { name: "조세", icon: "💵", color: "#ffd60a" },
  { name: "의료", icon: "🏥", color: "#ff375f" },
  { name: "지식재산", icon: "💡", color: "#ac8e68" },
];

const RADIUS_OPTIONS = ["500m", "1km", "3km", "5km", "10km"];

const CATEGORY_COLOR_MAP: Record<string, string> = {
  "민사": "#2997ff",
  "형사": "#ff453a",
  "가사": "#bf5af2",
  "부동산": "#5ac8fa",
  "노동": "#ff9f0a",
  "행정": "#30d158",
  "기업": "#64d2ff",
  "조세": "#ffd60a",
  "의료": "#ff375f",
  "지식재산": "#ac8e68",
};

export default function LawyerFinderDemo() {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const kakaoMapRef = useRef<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState("전체");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedRadius, setSelectedRadius] = useState("3km");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [districtOpen, setDistrictOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const filtered = MOCK_LAWYERS.filter((l) => {
    if (selectedDistrict !== "전체" && l.location !== selectedDistrict) return false;
    if (selectedCategory !== "전체" && l.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.office.toLowerCase().includes(q)
      );
    }
    return true;
  });

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      if (typeof window === "undefined") return;
      const w = window as Window & { kakao?: typeof kakao };
      if (!w.kakao?.maps) return;

      w.kakao.maps.load(() => {
        const container = mapRef.current;
        if (!container) return;

        const map = new w.kakao.maps.Map(container, {
          center: new w.kakao.maps.LatLng(37.4837, 127.0324),
          level: 5,
        });

        kakaoMapRef.current = map;

        MOCK_LAWYERS.forEach((lawyer) => {
          const marker = new w.kakao.maps.Marker({
            position: new w.kakao.maps.LatLng(lawyer.lat, lawyer.lng),
            map,
          });

          const badgeColor = CATEGORY_COLOR_MAP[lawyer.category] ?? "#2997ff";
          const infoContent = `
            <div style="padding:8px 12px;font-size:12px;background:#1d1d1f;color:#f5f5f7;border:1px solid rgba(255,255,255,0.1);border-radius:8px;min-width:150px;">
              <div style="font-weight:600;margin-bottom:2px;">${lawyer.name} 변호사</div>
              <div style="color:#86868b;font-size:11px;">${lawyer.office}</div>
              <div style="color:${badgeColor};font-size:11px;margin-top:2px;">${lawyer.specialty} 전문</div>
            </div>
          `;

          const infoWindow = new w.kakao.maps.InfoWindow({
            content: infoContent,
            removable: true,
          });

          w.kakao.maps.event.addListener(marker, "click", () => {
            infoWindow.open(map, marker);
          });
        });

        setMapLoaded(true);
      });
    };

    const w = window as Window & { kakao?: typeof kakao };
    if (w.kakao?.maps) {
      initMap();
    } else {
      const interval = setInterval(() => {
        const w2 = window as Window & { kakao?: typeof kakao };
        if (w2.kakao?.maps) {
          clearInterval(interval);
          initMap();
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, []);

  const panToLawyer = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    const w = window as Window & { kakao?: typeof kakao };
    if (kakaoMapRef.current && w.kakao?.maps) {
      kakaoMapRef.current.panTo(
        new w.kakao.maps.LatLng(lawyer.lat, lawyer.lng)
      );
    }
  };

  const getCategoryColor = (category: string): string =>
    CATEGORY_COLOR_MAP[category] ?? "#2997ff";

  return (
    <div className="flex h-[600px] overflow-hidden rounded-2xl border border-white/10 bg-[#1d1d1f]">
      {/* Left Sidebar */}
      <div className="flex w-80 shrink-0 flex-col border-r border-white/10">
        {/* Search bar */}
        <div className="border-b border-white/10 p-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" />
            <input
              type="text"
              placeholder="이름 또는 사무소 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-white/5 py-2 pl-9 pr-3 text-sm text-[#f5f5f7] placeholder-[#555] outline-none focus:bg-white/10 transition-colors"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-white/10 p-3 space-y-2">
          {/* District dropdown */}
          <div className="relative">
            <button
              onClick={() => { setDistrictOpen(!districtOpen); setCategoryOpen(false); }}
              className="flex w-full items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm text-[#f5f5f7] hover:bg-white/10 transition-colors"
            >
              <span>📍 {selectedDistrict}</span>
              <ChevronDown
                size={14}
                className={`text-[#86868b] transition-transform ${districtOpen ? "rotate-180" : ""}`}
              />
            </button>
            {districtOpen && (
              <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-48 overflow-y-auto rounded-lg border border-white/10 bg-[#2d2d2f] py-1 demo-scroll">
                {DISTRICTS.map((d) => (
                  <button
                    key={d}
                    onClick={() => { setSelectedDistrict(d); setDistrictOpen(false); }}
                    className={`w-full px-3 py-1.5 text-left text-sm transition-colors ${
                      selectedDistrict === d ? "text-[#2997ff]" : "text-[#f5f5f7] hover:bg-white/5"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category dropdown */}
          <div className="relative">
            <button
              onClick={() => { setCategoryOpen(!categoryOpen); setDistrictOpen(false); }}
              className="flex w-full items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm text-[#f5f5f7] hover:bg-white/10 transition-colors"
            >
              <span>
                {CATEGORIES.find((c) => c.name === selectedCategory)?.icon ?? "📋"}{" "}
                {selectedCategory}
              </span>
              <ChevronDown
                size={14}
                className={`text-[#86868b] transition-transform ${categoryOpen ? "rotate-180" : ""}`}
              />
            </button>
            {categoryOpen && (
              <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-48 overflow-y-auto rounded-lg border border-white/10 bg-[#2d2d2f] py-1 demo-scroll">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => { setSelectedCategory(c.name); setCategoryOpen(false); }}
                    className={`w-full px-3 py-1.5 text-left text-sm transition-colors ${
                      selectedCategory === c.name ? "text-[#2997ff]" : "text-[#f5f5f7] hover:bg-white/5"
                    }`}
                  >
                    {c.icon} {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Radius buttons */}
          <div className="flex flex-wrap gap-1.5">
            {RADIUS_OPTIONS.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRadius(r)}
                className={`rounded-full px-2.5 py-1 text-xs transition-colors ${
                  selectedRadius === r
                    ? "bg-[#2997ff] text-white"
                    : "bg-white/5 text-[#86868b] hover:bg-white/10"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="border-b border-white/5 px-4 py-2">
          <span className="text-xs text-[#86868b]">
            {filtered.length}명의 변호사
          </span>
        </div>

        {/* Lawyer cards */}
        <div className="demo-scroll flex-1 overflow-y-auto">
          {filtered.map((lawyer) => {
            const badgeColor = getCategoryColor(lawyer.category);
            return (
              <button
                key={lawyer.id}
                onClick={() => panToLawyer(lawyer)}
                className={`w-full border-b border-white/5 p-4 text-left transition-colors ${
                  selectedLawyer?.id === lawyer.id
                    ? "bg-[#2997ff]/10"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#f5f5f7]">
                      {lawyer.name} 변호사
                    </p>
                    <p className="mt-0.5 text-xs text-[#86868b]">
                      {lawyer.office}
                    </p>
                  </div>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      backgroundColor: `${badgeColor}20`,
                      color: badgeColor,
                    }}
                  >
                    {lawyer.specialty}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3 text-xs text-[#86868b]">
                  <span className="flex items-center gap-1">
                    <MapPin size={10} />
                    {lawyer.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={10} className="text-[#ffd60a]" />
                    {lawyer.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase size={10} />
                    {lawyer.experience}년
                  </span>
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="flex h-32 items-center justify-center">
              <span className="text-sm text-[#555]">검색 결과가 없습니다</span>
            </div>
          )}
        </div>
      </div>

      {/* Right: Map */}
      <div className="relative flex-1">
        <div ref={mapRef} className="h-full w-full" />
        {!mapLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1d1d1f]">
            <MapPin size={48} className="mb-4 text-[#2997ff]" />
            <p className="text-sm text-[#86868b]">
              카카오맵 로딩 중...
            </p>
            <p className="mt-1 text-xs text-[#555]">
              API 키가 없으면 지도가 표시되지 않습니다
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
