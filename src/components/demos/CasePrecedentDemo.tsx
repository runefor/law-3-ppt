"use client";

import { useState } from "react";
import { Search, FileText, Scale, Bot, ChevronDown } from "lucide-react";
import { MOCK_PRECEDENTS } from "@/data/mockData";

const docTypeColors: Record<string, string> = {
  판결: "#2997ff",
  결정: "#30d158",
  명령: "#ff9f0a",
};

export default function CasePrecedentDemo() {
  const [selectedId, setSelectedId] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const selected = MOCK_PRECEDENTS.find((p) => p.id === selectedId)!;

  return (
    <div className="flex h-[600px] overflow-hidden rounded-2xl border border-white/10 bg-[#1d1d1f] [word-break:keep-all]">
      {/* Left: Search Panel */}
      <div className="flex w-96 shrink-0 flex-col border-r border-white/10">
        {/* Search bar */}
        <div className="border-b border-white/10 p-4">
          <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
            <Search size={16} className="text-[#86868b]" />
            <span className="text-sm text-[#f5f5f7]">
              임대차보증금 반환
            </span>
          </div>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="mt-2 flex items-center gap-1 text-xs text-[#86868b] hover:text-[#f5f5f7] transition-colors"
          >
            <ChevronDown
              size={12}
              className={`transition-transform ${filtersOpen ? "rotate-180" : ""}`}
            />
            필터 옵션
          </button>
          {filtersOpen && (
            <div className="mt-2 flex flex-wrap gap-2">
              {["대법원", "고등법원", "지방법원"].map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[#86868b]"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="border-b border-white/5 px-4 py-2">
          <span className="text-xs text-[#86868b]">
            검색 결과 {MOCK_PRECEDENTS.length}건
          </span>
        </div>

        {/* Precedent cards */}
        <div className="demo-scroll flex-1 overflow-y-auto">
          {MOCK_PRECEDENTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`w-full border-b border-white/5 p-4 text-left transition-colors ${
                selectedId === p.id
                  ? "bg-[#2997ff]/10"
                  : "hover:bg-white/5"
              }`}
            >
              <div className="mb-1 flex items-center justify-between">
                <span
                  className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                  style={{
                    backgroundColor: `${docTypeColors[p.docType] || "#86868b"}20`,
                    color: docTypeColors[p.docType] || "#86868b",
                  }}
                >
                  {p.docType}
                </span>
                <span className="rounded-full bg-[#2997ff]/20 px-2 py-0.5 text-[10px] font-medium text-[#2997ff]">
                  {(p.similarity * 100).toFixed(0)}%
                </span>
              </div>
              <p className="mb-1 text-sm font-medium text-[#f5f5f7]">
                {p.caseName}
              </p>
              <div className="flex items-center gap-2 text-xs text-[#86868b]">
                <span>{p.caseNumber}</span>
                <span>·</span>
                <span>{p.court}</span>
              </div>
              <p className="mt-1 text-xs text-[#86868b] line-clamp-2">
                {p.summary}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Detail Panel */}
      <div className="demo-scroll flex flex-1 flex-col overflow-y-auto">
        {/* Header */}
        <div className="border-b border-white/10 p-6">
          <div className="mb-2 flex items-center gap-2">
            <Scale size={16} className="text-[#2997ff]" />
            <span className="text-xs text-[#86868b]">{selected.court}</span>
            <span className="text-xs text-[#86868b]">·</span>
            <span className="text-xs text-[#86868b]">{selected.date}</span>
          </div>
          <h3 className="text-xl font-bold text-[#f5f5f7]">
            {selected.caseName}
          </h3>
          <p className="mt-1 text-sm text-[#86868b]">
            {selected.caseNumber}
          </p>
        </div>

        {/* Content */}
        <div className="border-b border-white/10 p-6">
          <div className="mb-3 flex items-center gap-2">
            <FileText size={14} className="text-[#86868b]" />
            <span className="text-sm font-medium text-[#f5f5f7]">
              판결 내용
            </span>
          </div>
          <div className="rounded-lg bg-white/5 p-4">
            {selected.content.split("\n\n").map((para, i) => (
              <p
                key={i}
                className={`text-sm leading-relaxed text-[#a1a1a6] ${i > 0 ? "mt-3" : ""}`}
              >
                {para.startsWith("【") ? (
                  <>
                    <span className="font-medium text-[#f5f5f7]">
                      {para.split("】")[0]}】
                    </span>
                    {para.split("】")[1]}
                  </>
                ) : (
                  para
                )}
              </p>
            ))}
          </div>
        </div>

        {/* AI Answer */}
        <div className="p-6">
          <div className="mb-3 flex items-center gap-2">
            <Bot size={14} className="text-[#bf5af2]" />
            <span className="text-sm font-medium text-[#f5f5f7]">
              AI 법률 답변
            </span>
          </div>
          <div className="rounded-lg border border-[#bf5af2]/20 bg-[#bf5af2]/5 p-4">
            {selected.aiAnswer.split("\n").map((line, i) => (
              <p
                key={i}
                className={`text-sm leading-relaxed text-[#a1a1a6] ${
                  line.trim() === "" ? "mt-2" : i > 0 ? "mt-1" : ""
                }`}
              >
                {line}
              </p>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
            <Bot size={14} className="text-[#86868b]" />
            <span className="text-xs text-[#86868b]">
              추가 질문을 입력하세요 (데모 모드)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
