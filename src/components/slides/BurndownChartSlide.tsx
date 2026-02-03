"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import type { Slide } from "@/data/slides";

interface SchedulePoint {
  week: string;
  planned: number;
  actual: number | null;
  costActual: number | null;
  costPlan: number | null;
}

interface BurndownContent {
  budget: number;
  schedule: SchedulePoint[];
  stats: {
    overallProgress: string;
    budgetUsed: string;
    budgetDetail: string;
    daysRemaining: string;
  };
}

const vp = { once: true, amount: 0.2 } as const;

/* eslint-disable @typescript-eslint/no-explicit-any */
function DarkTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-[#1d1d1f] px-4 py-3 text-sm shadow-xl border border-white/10">
      <p className="mb-1 font-semibold text-[#f5f5f7]">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} style={{ color: entry.color }}>
          {entry.name}: {entry.value ?? "—"}%
        </p>
      ))}
    </div>
  );
}

function CostTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-[#1d1d1f] px-4 py-3 text-sm shadow-xl border border-white/10">
      <p className="mb-1 font-semibold text-[#f5f5f7]">{label}</p>
      {payload
        .filter((entry: any) => entry.value != null)
        .map((entry: any, i: number) => (
          <p key={i} style={{ color: entry.color }}>
            {entry.name}: {entry.value}만원
          </p>
        ))}
    </div>
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default function BurndownChartSlide({ slide }: { slide: Slide }) {
  const { budget, schedule, stats } = slide.content as unknown as BurndownContent;

  const kpis = [
    { label: "전체 공정률", value: stats.overallProgress, color: "#2997ff" },
    { label: "예산 소진율", value: stats.budgetUsed, sub: stats.budgetDetail, color: "#30d158" },
    { label: "최종 발표까지", value: stats.daysRemaining, color: "#ff9f0a" },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h2 className="mb-6 text-4xl font-bold text-[#f5f5f7]">{slide.title}</h2>

      {/* KPI Cards */}
      <div className="mb-6 flex gap-5">
        {kpis.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col items-center rounded-2xl bg-[#1d1d1f] px-6 py-3 min-w-[140px]"
          >
            <span className="text-3xl font-bold" style={{ color: kpi.color }}>
              {kpi.value}
            </span>
            <span className="mt-1 text-sm text-[#86868b]">{kpi.label}</span>
            {"sub" in kpi && kpi.sub && (
              <span className="mt-0.5 text-xs text-[#86868b]/70">{kpi.sub}</span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="flex w-full max-w-5xl gap-6">
        {/* Burndown Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-1 rounded-2xl bg-[#1d1d1f] p-6"
        >
          <h3 className="mb-4 text-lg font-semibold text-[#f5f5f7]">
            번다운 차트{" "}
            <span className="text-sm font-normal text-[#86868b]">
              (남은 작업 %)
            </span>
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={schedule}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="week"
                stroke="#86868b"
                tick={{ fill: "#86868b", fontSize: 11 }}
              />
              <YAxis
                stroke="#86868b"
                tick={{ fill: "#86868b", fontSize: 12 }}
                domain={[0, 100]}
              />
              <Tooltip content={<DarkTooltip />} />
              <Legend wrapperStyle={{ color: "#86868b", fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="planned"
                name="계획"
                stroke="#86868b"
                strokeDasharray="8 4"
                strokeWidth={2}
                dot={{ r: 4, fill: "#86868b" }}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="actual"
                name="실제"
                stroke="#2997ff"
                strokeWidth={2.5}
                dot={{ r: 5, fill: "#2997ff" }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Budget Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex-1 rounded-2xl bg-[#1d1d1f] p-6"
        >
          <h3 className="mb-4 text-lg font-semibold text-[#f5f5f7]">
            예산 소진 현황{" "}
            <span className="text-sm font-normal text-[#86868b]">
              (총 {budget}만원 / AWS EC2 2주 기준)
            </span>
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={schedule}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="week"
                stroke="#86868b"
                tick={{ fill: "#86868b", fontSize: 11 }}
              />
              <YAxis
                stroke="#86868b"
                tick={{ fill: "#86868b", fontSize: 12 }}
                domain={[0, budget]}
                tickFormatter={(v) => `${v}만`}
              />
              <Tooltip content={<CostTooltip />} />
              <Legend wrapperStyle={{ color: "#86868b", fontSize: 12 }} />
              <ReferenceLine
                y={budget}
                stroke="#ff453a"
                strokeDasharray="6 3"
                label={{
                  value: `총 예산 ${budget}만원`,
                  fill: "#ff453a",
                  fontSize: 11,
                  position: "insideTopRight",
                }}
              />
              <Line
                type="monotone"
                dataKey="costPlan"
                name="예상"
                stroke="#86868b"
                strokeDasharray="8 4"
                strokeWidth={2}
                dot={{ r: 4, fill: "#86868b" }}
                connectNulls
              />
              <Area
                type="monotone"
                dataKey="costActual"
                name="실제"
                stroke="#30d158"
                fill="#30d158"
                fillOpacity={0.2}
                strokeWidth={2.5}
                dot={{ r: 5, fill: "#30d158" }}
                connectNulls={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
