"use client";

import { useState } from "react";
import { MapPin, ArrowDownWideNarrow } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  REGION_RANKING,
  SIDO_LIST,
  MAP_BUBBLE_DATA,
  CROSS_TAB_CATEGORIES,
  CROSS_TAB_DATA,
  SPECIALTY_DISTRIBUTION,
} from "@/data/mockData";

type MainTab = "regional" | "cross-tab";
type SubTab = "count" | "density" | "forecast";

const SUB_TABS: { key: SubTab; label: string }[] = [
  { key: "count", label: "변호사 수" },
  { key: "density", label: "인구 대비 밀도" },
  { key: "forecast", label: "향후 예측" },
];

const MAX_RANKING_COUNT = REGION_RANKING[0]?.count ?? 1;
const CROSS_TAB_MAX = Math.max(
  ...CROSS_TAB_DATA.flatMap((r) => Object.values(r.values))
);

const COLUMN_TOTALS = CROSS_TAB_CATEGORIES.map((cat) =>
  CROSS_TAB_DATA.reduce((sum, row) => sum + (row.values[cat] ?? 0), 0)
);
const GRAND_TOTAL = CROSS_TAB_DATA.reduce((sum, row) => sum + row.total, 0);

/** 파란색 농도 계산 (원본 히트맵 스타일) */
function heatBgColor(value: number): string {
  if (value === 0) return "transparent";
  const intensity = Math.min(value / CROSS_TAB_MAX, 1);
  return `rgba(41, 151, 255, ${0.1 + intensity * 0.6})`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BarTooltip = ({ active, payload }: any) => {
  if (active && payload?.[0]) {
    return (
      <div className="rounded-lg border border-white/10 bg-[#1d1d1f] px-3 py-2 text-xs">
        <p className="text-[#f5f5f7]">{payload[0].payload.name}</p>
        <p style={{ color: payload[0].payload.color }}>
          {payload[0].value.toLocaleString()}명
        </p>
      </div>
    );
  }
  return null;
};

export default function LawyerStatsDemo() {
  const [mainTab, setMainTab] = useState<MainTab>("regional");
  const [subTab, setSubTab] = useState<SubTab>("count");
  const [selectedSido, setSelectedSido] = useState("전체");

  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1d1d1f]">
      {/* Main tabs */}
      <div className="flex items-center gap-1 border-b border-white/10 px-5 pt-4 pb-0">
        <button
          onClick={() => setMainTab("regional")}
          className={`rounded-t-lg px-4 py-2 text-sm font-medium transition-colors ${
            mainTab === "regional"
              ? "bg-[#2997ff] text-white"
              : "text-[#86868b] hover:text-[#f5f5f7]"
          }`}
        >
          지역별
        </button>
        <button
          onClick={() => setMainTab("cross-tab")}
          className={`rounded-t-lg px-4 py-2 text-sm font-medium transition-colors ${
            mainTab === "cross-tab"
              ? "bg-[#2997ff] text-white"
              : "text-[#86868b] hover:text-[#f5f5f7]"
          }`}
        >
          지역 × 전문분야
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto demo-scroll">
        {mainTab === "regional" && (
          <RegionalView
            subTab={subTab}
            setSubTab={setSubTab}
            selectedSido={selectedSido}
            setSelectedSido={setSelectedSido}
          />
        )}
        {mainTab === "cross-tab" && <CrossTabView />}
      </div>
    </div>
  );
}

/* ── 지도 상수 ── */
const MAP_MAX_COUNT = Math.max(...MAP_BUBBLE_DATA.map((d) => d.count));
const BUBBLE_MIN_R = 4;
const BUBBLE_MAX_R = 28;

/** 변호사 수 → 빨간색 농도 (원본과 동일한 빨간 히트맵) */
function mapHeatColor(count: number): string {
  const intensity = Math.min(count / MAP_MAX_COUNT, 1);
  const alpha = 0.2 + intensity * 0.7;
  return `rgba(220, 50, 50, ${alpha})`;
}

function bubbleRadius(count: number): number {
  const ratio = count / MAP_MAX_COUNT;
  return BUBBLE_MIN_R + ratio * (BUBBLE_MAX_R - BUBBLE_MIN_R);
}

/**
 * 간략한 대한민국 외곽선 (SVG path).
 * 300×420 뷰포트에 맞춘 근사 좌표.
 */
const KOREA_OUTLINE =
  "M85,30 L105,22 L128,18 L150,25 L170,20 L195,28 L215,38 L230,52 " +
  "L248,72 L258,95 L268,120 L270,148 L262,175 L255,200 L260,225 " +
  "L258,248 L248,265 L235,278 L220,285 L200,280 L185,275 L170,282 " +
  "L155,290 L140,285 L125,278 L110,282 L95,290 L80,298 L68,288 " +
  "L60,270 L55,250 L58,228 L62,210 L68,192 L72,170 L68,148 " +
  "L72,128 L78,108 L80,88 L78,68 L80,48 Z";

const JEJU_OUTLINE =
  "M58,358 L68,352 L88,350 L102,355 L98,365 L82,370 L65,368 Z";

/* ── 지역별 뷰 ── */
function RegionalView({
  subTab,
  setSubTab,
  selectedSido,
  setSelectedSido,
}: {
  subTab: SubTab;
  setSubTab: (t: SubTab) => void;
  selectedSido: string;
  setSelectedSido: (s: string) => void;
}) {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  return (
    <div className="p-5">
      {/* Header row */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#f5f5f7]">
          지역별 변호사 현황
        </h3>
        <div className="flex rounded-lg border border-white/10 overflow-hidden">
          {SUB_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setSubTab(t.key)}
              className={`px-3 py-1.5 text-xs transition-colors ${
                subTab === t.key
                  ? "bg-white/10 text-[#f5f5f7]"
                  : "text-[#86868b] hover:text-[#f5f5f7]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sido pills */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {SIDO_LIST.map((sido) => (
          <button
            key={sido}
            onClick={() => setSelectedSido(sido)}
            className={`rounded-full px-2.5 py-1 text-[11px] transition-colors ${
              selectedSido === sido
                ? "bg-[#2997ff] text-white"
                : "border border-white/15 text-[#86868b] hover:border-white/30 hover:text-[#f5f5f7]"
            }`}
          >
            {sido}
          </button>
        ))}
      </div>

      {/* Map + Ranking side-by-side */}
      <div className="flex gap-4">
        {/* Left: Korea bubble map */}
        <div className="relative w-[280px] shrink-0">
          <svg viewBox="0 0 320 420" className="h-full w-full">
            {/* Korea mainland outline */}
            <path
              d={KOREA_OUTLINE}
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1.5"
            />
            {/* Jeju outline */}
            <path
              d={JEJU_OUTLINE}
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1.5"
            />

            {/* Bubbles */}
            {MAP_BUBBLE_DATA.map((city) => {
              const r = bubbleRadius(city.count);
              const isHovered = hoveredCity === city.sido;
              return (
                <g
                  key={city.sido}
                  onMouseEnter={() => setHoveredCity(city.sido)}
                  onMouseLeave={() => setHoveredCity(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={r}
                    fill={mapHeatColor(city.count)}
                    stroke={isHovered ? "#ff453a" : "rgba(220,50,50,0.4)"}
                    strokeWidth={isHovered ? 2 : 0.8}
                  />
                  {/* Label for larger bubbles */}
                  {(city.count > 150 || isHovered) && (
                    <text
                      x={city.x}
                      y={city.y + (r > 12 ? 0 : -r - 4)}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="pointer-events-none select-none"
                      fill={r > 12 ? "#fff" : "#c8c8c8"}
                      fontSize={r > 16 ? 10 : 8}
                      fontWeight={600}
                    >
                      {city.sido}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Hover tooltip */}
          {hoveredCity && (
            <div className="absolute bottom-2 left-2 rounded-lg border border-white/10 bg-[#2d2d2f] px-3 py-1.5 text-xs shadow-lg">
              <span className="text-[#f5f5f7] font-medium">{hoveredCity}</span>
              <span className="ml-2 text-[#ff453a] font-semibold">
                {MAP_BUBBLE_DATA.find((d) => d.sido === hoveredCity)?.count.toLocaleString()}명
              </span>
            </div>
          )}

          {/* Legend */}
          <div className="mt-1 flex items-center justify-center gap-3 text-[9px] text-[#86868b]">
            <div className="flex items-center gap-1">
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(220,50,50,0.25)" }} />
              <span>1~10명</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full" style={{ background: "rgba(220,50,50,0.5)" }} />
              <span>100~500명</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 rounded-full" style={{ background: "rgba(220,50,50,0.85)" }} />
              <span>500명 이상</span>
            </div>
          </div>
        </div>

        {/* Right: Ranking list */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-[#f5f5f7]">
              전체 지역 변호사 수 순위 (Top15)
            </span>
            <span className="ml-auto flex items-center gap-1 text-[9px] text-[#86868b]">
              <ArrowDownWideNarrow size={10} /> 높은순
            </span>
          </div>

          <div className="space-y-1">
            {REGION_RANKING.map((item) => {
              const barWidth = (item.count / MAX_RANKING_COUNT) * 100;
              return (
                <div key={item.rank} className="flex items-center gap-2">
                  <span className="w-4 text-right text-[10px] text-[#555]">
                    {item.rank}
                  </span>
                  <MapPin size={10} className="shrink-0 text-[#ff453a]" />
                  <span className="w-24 shrink-0 truncate text-[11px] text-[#f5f5f7]">
                    {item.region}
                  </span>
                  <div className="flex-1">
                    <div
                      className="h-3 rounded-sm bg-[#2997ff]"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <span className="w-14 text-right text-[11px] font-semibold text-[#ff453a]">
                    {item.count.toLocaleString()}명
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 지역 × 전문분야 뷰 ── */
function CrossTabView() {
  return (
    <div className="p-5 space-y-6">
      {/* Heatmap title */}
      <div>
        <h3 className="text-base font-semibold text-[#f5f5f7]">
          지역별 전문분야 현황
        </h3>
        <p className="mt-1 text-xs text-[#86868b]">
          선택한 지역의 전문분야별 변호사 수를 비교할 수 있습니다.
        </p>
      </div>

      {/* Heatmap table */}
      <div className="overflow-x-auto demo-scroll">
        <table className="w-full min-w-[700px] text-[11px]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="sticky left-0 bg-[#1d1d1f] px-2 py-2 text-left font-medium text-[#86868b]">
                지역
              </th>
              {CROSS_TAB_CATEGORIES.map((cat) => (
                <th
                  key={cat}
                  className="px-1.5 py-2 text-center font-medium text-[#86868b] whitespace-nowrap"
                >
                  {cat}
                </th>
              ))}
              <th className="px-2 py-2 text-center font-bold text-[#f5f5f7]">
                합계
              </th>
            </tr>
          </thead>
          <tbody>
            {CROSS_TAB_DATA.map((row) => (
              <tr key={row.region} className="border-b border-white/5">
                <td className="sticky left-0 bg-[#1d1d1f] px-2 py-1.5 font-medium text-[#f5f5f7] whitespace-nowrap">
                  {row.region}
                </td>
                {CROSS_TAB_CATEGORIES.map((cat) => {
                  const val = row.values[cat] ?? 0;
                  return (
                    <td key={cat} className="px-1.5 py-1.5 text-center">
                      <span
                        className="inline-block min-w-[28px] rounded px-1 py-0.5 text-[#f5f5f7]"
                        style={{ backgroundColor: heatBgColor(val) }}
                      >
                        {val > 0 ? val : "-"}
                      </span>
                    </td>
                  );
                })}
                <td className="px-2 py-1.5 text-center font-bold text-[#f5f5f7] bg-white/[0.03]">
                  {row.total}
                </td>
              </tr>
            ))}
            {/* Totals row */}
            <tr className="border-t border-white/15">
              <td className="sticky left-0 bg-[#1d1d1f] px-2 py-2 font-bold text-[#f5f5f7]">
                합계
              </td>
              {COLUMN_TOTALS.map((total, i) => (
                <td
                  key={CROSS_TAB_CATEGORIES[i]}
                  className="px-1.5 py-2 text-center font-bold text-[#f5f5f7] bg-white/[0.03]"
                >
                  {total}
                </td>
              ))}
              <td className="px-2 py-2 text-center font-bold text-[#2997ff] bg-white/[0.05]">
                {GRAND_TOTAL}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Heatmap legend */}
        <div className="mt-2 flex items-center justify-between text-[10px] text-[#86868b]">
          <span>{CROSS_TAB_DATA.length}개 지역 분석 결과</span>
          <div className="flex items-center gap-1">
            <span>낮음</span>
            {[0.1, 0.25, 0.4, 0.55, 0.7].map((intensity) => (
              <div
                key={intensity}
                className="h-3 w-5 rounded-sm"
                style={{
                  backgroundColor: `rgba(41, 151, 255, ${0.1 + intensity * 0.6})`,
                }}
              />
            ))}
            <span>높음</span>
          </div>
        </div>
      </div>

      {/* Specialty bar chart */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-[#f5f5f7]">
          전문분야별 변호사 분포
        </h4>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={SPECIALTY_DISTRIBUTION}
            layout="vertical"
            margin={{ top: 0, right: 40, bottom: 0, left: 100 }}
          >
            <XAxis
              type="number"
              tick={{ fill: "#86868b", fontSize: 10 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tickFormatter={(v: number) => `${v}명`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#86868b", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              width={95}
            />
            <Tooltip content={<BarTooltip />} />
            <Bar dataKey="count" radius={[0, 4, 4, 0]}>
              {SPECIALTY_DISTRIBUTION.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
