"use client";

import { useState } from "react";
import { FileText, Mic, Image, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { MOCK_TIMELINE } from "@/data/mockData";
import type { TimelineItem } from "@/types/demo";

type InputMode = "text" | "voice" | "image";

const INPUT_MODES: { key: InputMode; label: string; icon: React.ReactNode }[] = [
  { key: "text", label: "텍스트", icon: <FileText size={14} /> },
  { key: "voice", label: "음성", icon: <Mic size={14} /> },
  { key: "image", label: "이미지", icon: <Image size={14} /> },
];

const ROLE_COLORS: Record<string, string> = {
  "임차인": "#2997ff",
  "임대인": "#ff453a",
  "기관": "#30d158",
  "피해자": "#ff9f0a",
  "가해자": "#ff375f",
};

export default function StoryboardDemo() {
  const [inputMode, setInputMode] = useState<InputMode>("text");
  const [collapsed, setCollapsed] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleCardClick = (item: TimelineItem) => {
    setSelectedId(selectedId === item.id ? null : item.id);
  };

  return (
    <div className="flex h-[600px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
      {/* Left: Input Panel */}
      <div
        className={`flex shrink-0 flex-col border-r border-white/10 transition-all duration-300 ${
          collapsed ? "w-10" : "w-72"
        }`}
      >
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-10 items-center justify-center border-b border-white/10 text-[#86868b] hover:text-[#f5f5f7] transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {!collapsed && (
          <>
            {/* Input mode tabs */}
            <div className="flex border-b border-white/10">
              {INPUT_MODES.map((mode) => (
                <button
                  key={mode.key}
                  onClick={() => setInputMode(mode.key)}
                  className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-xs transition-colors ${
                    inputMode === mode.key
                      ? "border-b-2 border-[#2997ff] text-[#2997ff]"
                      : "text-[#86868b] hover:text-[#f5f5f7]"
                  }`}
                >
                  {mode.icon}
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Text area */}
            <div className="flex-1 p-4">
              <textarea
                readOnly
                className="h-full w-full resize-none rounded-lg bg-white/5 p-3 text-sm text-[#f5f5f7] placeholder-[#555] outline-none"
                placeholder="사건의 경위를 입력하세요...&#10;&#10;예: 2024년 1월 서울 강남구 소재 아파트를 보증금 5천만원에 임대차 계약을 체결했습니다. 계약 만료 후 임대인이 보증금 반환을 거부하고 있습니다..."
                defaultValue="2024년 1월 서울 강남구 소재 아파트를 보증금 5,000만원, 월세 50만원에 2년간 임대차 계약을 체결했습니다. 계약 만료 후 임대인이 수리비를 공제하겠다며 보증금 반환을 거부하고 있습니다. 내용증명을 보냈으나 응답이 없어 소액소송을 준비 중입니다."
              />
            </div>

            {/* Extract button */}
            <div className="p-4">
              <button className="w-full rounded-lg bg-[#2997ff] py-2.5 text-sm font-medium text-white hover:bg-[#2997ff]/90 transition-colors">
                타임라인 추출
              </button>
            </div>
          </>
        )}
      </div>

      {/* Right: Timeline View */}
      <div className="flex-1 overflow-y-auto p-6 demo-scroll">
        <div className="mb-4 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#2997ff]" />
          <span className="text-sm font-medium text-[#f5f5f7]">
            사건 타임라인
          </span>
          <span className="text-xs text-[#86868b]">
            ({MOCK_TIMELINE.length}개 장면)
          </span>
        </div>

        <div className="relative ml-4">
          {/* Vertical timeline line */}
          <div className="absolute left-3 top-0 h-full w-px bg-white/10" />

          {/* Timeline cards */}
          <div className="space-y-4">
            {MOCK_TIMELINE.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className={`relative ml-8 w-full rounded-xl border p-4 text-left transition-all ${
                    isSelected
                      ? "border-[#2997ff] bg-[#2997ff]/5 shadow-[0_0_20px_rgba(41,151,255,0.15)]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  {/* Timeline node */}
                  <div
                    className={`absolute -left-[2.35rem] top-5 h-3 w-3 rounded-full border-2 ${
                      isSelected
                        ? "border-[#2997ff] bg-[#2997ff]"
                        : "border-[#2997ff] bg-slate-950"
                    }`}
                  />

                  {/* Scene badge + date */}
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2997ff] text-[10px] font-bold text-white">
                      {item.sceneNumber}
                    </span>
                    <span className="text-xs text-[#86868b]">{item.date}</span>
                  </div>

                  {/* Title & description */}
                  <h4 className="text-sm font-semibold text-[#f5f5f7]">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-[#86868b]">
                    {item.descriptionShort}
                  </p>

                  {/* Participants */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.participants.map((p) => {
                      const color = ROLE_COLORS[p.role] ?? "#86868b";
                      return (
                        <span
                          key={`${p.name}-${p.role}`}
                          className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                          style={{
                            backgroundColor: `${color}20`,
                            color,
                          }}
                        >
                          {p.name} ({p.role})
                        </span>
                      );
                    })}
                  </div>

                  {/* Evidence tags */}
                  {item.evidenceItems.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.evidenceItems.map((ev) => (
                        <span
                          key={ev}
                          className="flex items-center gap-1 rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-[#86868b]"
                        >
                          <Check size={8} />
                          {ev}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
