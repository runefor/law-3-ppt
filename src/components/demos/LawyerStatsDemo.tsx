"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { REGION_STATS, SPECIALTY_STATS, HEATMAP_DATA } from "@/data/mockData";

const kpiCards = [
  { label: "총 변호사 수", value: "8,500+", color: "#2997ff" },
  { label: "위치정보율", value: "94.2%", color: "#30d158" },
  { label: "전문분야율", value: "78.5%", color: "#bf5af2" },
  { label: "개업률", value: "89.1%", color: "#ff9f0a" },
];

const heatmapRegions = ["서초구", "강남구", "종로구", "영등포구"];
const heatmapCategories = ["민사", "형사", "가사", "부동산", "노동"];

function getHeatmapValue(region: string, category: string): number {
  const cell = HEATMAP_DATA.find(
    (c) => c.region === region && c.category === category
  );
  return cell?.count ?? 0;
}

const maxHeat = Math.max(...HEATMAP_DATA.map((c) => c.count));

function heatColor(count: number): string {
  const intensity = count / maxHeat;
  const r = Math.round(41 + intensity * (41 - 41));
  const g = Math.round(41 + intensity * (151 - 41));
  const b = Math.round(41 + intensity * (255 - 41));
  return `rgba(${r}, ${g}, ${b}, ${0.15 + intensity * 0.65})`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltipBar = ({ active, payload, label }: any) => {
  if (active && payload?.[0]) {
    return (
      <div className="rounded-lg border border-white/10 bg-[#1d1d1f] px-3 py-2 text-xs">
        <p className="text-[#f5f5f7]">{label}</p>
        <p className="text-[#2997ff]">{payload[0].value}명</p>
      </div>
    );
  }
  return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltipPie = ({ active, payload }: any) => {
  if (active && payload?.[0]) {
    return (
      <div className="rounded-lg border border-white/10 bg-[#1d1d1f] px-3 py-2 text-xs">
        <p className="text-[#f5f5f7]">{payload[0].name}</p>
        <p style={{ color: payload[0].payload.color }}>
          {payload[0].value}명
        </p>
      </div>
    );
  }
  return null;
};

export default function LawyerStatsDemo() {
  return (
    <div className="flex flex-col gap-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-white/10 bg-[#1d1d1f] p-4"
          >
            <p className="text-xs text-[#86868b]">{kpi.label}</p>
            <p className="mt-1 text-2xl font-bold" style={{ color: kpi.color }}>
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Bar Chart */}
        <div className="rounded-xl border border-white/10 bg-[#1d1d1f] p-4">
          <h4 className="mb-4 text-sm font-medium text-[#f5f5f7]">
            지역별 변호사 분포 Top 10
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={REGION_STATS}
              layout="vertical"
              margin={{ top: 0, right: 20, bottom: 0, left: 60 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fill: "#86868b", fontSize: 11 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              />
              <YAxis
                type="category"
                dataKey="region"
                tick={{ fill: "#86868b", fontSize: 11 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                width={55}
              />
              <Tooltip content={<CustomTooltipBar />} />
              <Bar dataKey="count" fill="#2997ff" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="rounded-xl border border-white/10 bg-[#1d1d1f] p-4">
          <h4 className="mb-4 text-sm font-medium text-[#f5f5f7]">
            전문분야별 분포
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={SPECIALTY_STATS}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                dataKey="value"
                stroke="none"
                label={// eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ({ name, percent }: any) =>
                  `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                labelLine={{ stroke: "#86868b" }}
              >
                {SPECIALTY_STATS.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltipPie />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Heatmap Table */}
      <div className="rounded-xl border border-white/10 bg-[#1d1d1f] p-4">
        <h4 className="mb-4 text-sm font-medium text-[#f5f5f7]">
          지역 × 전문분야 히트맵
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-[#86868b]">
                  지역
                </th>
                {heatmapCategories.map((cat) => (
                  <th
                    key={cat}
                    className="px-3 py-2 text-center text-xs font-medium text-[#86868b]"
                  >
                    {cat}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatmapRegions.map((region) => (
                <tr key={region} className="border-t border-white/5">
                  <td className="px-3 py-2 text-xs font-medium text-[#f5f5f7]">
                    {region}
                  </td>
                  {heatmapCategories.map((cat) => {
                    const count = getHeatmapValue(region, cat);
                    return (
                      <td key={cat} className="px-3 py-2 text-center">
                        <span
                          className="inline-block min-w-[48px] rounded-md px-2 py-1 text-xs font-medium text-[#f5f5f7]"
                          style={{ backgroundColor: heatColor(count) }}
                        >
                          {count}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
