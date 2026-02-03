"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Star, Briefcase, ChevronDown } from "lucide-react";
import { MOCK_LAWYERS } from "@/data/mockData";
import type { Lawyer } from "@/types/demo";

const districts = ["전체", "서초구", "강남구", "종로구", "영등포구"];

export default function LawyerFinderDemo() {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const kakaoMapRef = useRef<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState("전체");
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filtered =
    selectedDistrict === "전체"
      ? MOCK_LAWYERS
      : MOCK_LAWYERS.filter((l) => l.location === selectedDistrict);

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

        // Add markers
        MOCK_LAWYERS.forEach((lawyer) => {
          const marker = new w.kakao.maps.Marker({
            position: new w.kakao.maps.LatLng(lawyer.lat, lawyer.lng),
            map,
          });

          const infoContent = `
            <div style="padding:8px 12px;font-size:12px;background:#1d1d1f;color:#f5f5f7;border:1px solid rgba(255,255,255,0.1);border-radius:8px;min-width:150px;">
              <div style="font-weight:600;margin-bottom:2px;">${lawyer.name} 변호사</div>
              <div style="color:#86868b;font-size:11px;">${lawyer.office}</div>
              <div style="color:#2997ff;font-size:11px;margin-top:2px;">${lawyer.specialty} 전문</div>
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

    // Check if kakao is already loaded
    const w = window as Window & { kakao?: typeof kakao };
    if (w.kakao?.maps) {
      initMap();
    } else {
      // Poll for kakao maps SDK
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

  return (
    <div className="flex h-[600px] overflow-hidden rounded-2xl border border-white/10 bg-[#1d1d1f]">
      {/* Left Sidebar */}
      <div className="flex w-80 shrink-0 flex-col border-r border-white/10">
        {/* District selector */}
        <div className="border-b border-white/10 p-4">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex w-full items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm text-[#f5f5f7] hover:bg-white/10 transition-colors"
            >
              <span>{selectedDistrict}</span>
              <ChevronDown
                size={14}
                className={`text-[#86868b] transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-white/10 bg-[#2d2d2f] py-1">
                {districts.map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setSelectedDistrict(d);
                      setDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-sm transition-colors ${
                      selectedDistrict === d
                        ? "text-[#2997ff]"
                        : "text-[#f5f5f7] hover:bg-white/5"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="mt-3 flex gap-2">
            {["1km", "3km", "5km"].map((r) => (
              <span
                key={r}
                className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[#86868b]"
              >
                {r}
              </span>
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
          {filtered.map((lawyer) => (
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
                <span className="rounded-full bg-[#2997ff]/20 px-2 py-0.5 text-[10px] font-medium text-[#2997ff]">
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
          ))}
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
