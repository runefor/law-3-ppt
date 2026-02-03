"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";

interface GanttTask {
  name: string;
  start: number;
  end: number;
  status: "done" | "in-progress" | "planned";
}

interface GanttCategory {
  category: string;
  tasks: GanttTask[];
}

interface GanttContent {
  totalWeeks: number;
  weekLabels?: string[];
  categories: GanttCategory[];
}

const statusColors: Record<string, { bg: string; border: string; label: string }> = {
  done: { bg: "bg-[#30d158]/80", border: "border-[#30d158]", label: "완료" },
  "in-progress": { bg: "bg-[#2997ff]/80", border: "border-[#2997ff]", label: "진행중" },
  planned: { bg: "bg-[#86868b]/50", border: "border-[#86868b]", label: "예정" },
};

const vp = { once: true, amount: 0.15 } as const;

export default function GanttMilestoneSlide({ slide }: { slide: Slide }) {
  const { totalWeeks, weekLabels, categories } = slide.content as unknown as GanttContent;
  const weeks = weekLabels
    ? weekLabels.map((l, i) => `W${i + 1} (${l})`)
    : Array.from({ length: totalWeeks }, (_, i) => `W${i + 1}`);

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h2 className="mb-3 text-4xl font-bold text-[#f5f5f7]">{slide.title}</h2>

      {/* Legend */}
      <div className="mb-4 flex gap-5">
        {Object.entries(statusColors).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className={`h-2.5 w-5 rounded ${val.bg}`} />
            <span className="text-xs text-[#86868b]">{val.label}</span>
          </div>
        ))}
      </div>

      {/* Gantt Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl rounded-2xl bg-[#1d1d1f] px-5 py-4 overflow-x-auto"
      >
        {/* Week headers */}
        <div className="flex">
          <div className="w-36 shrink-0" />
          <div className="flex flex-1">
            {weeks.map((w) => (
              <div
                key={w}
                className="flex-1 text-center text-xs font-medium text-[#86868b] border-l border-white/5 py-1"
              >
                {w}
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        {categories.map((cat, ci) => (
          <div key={ci} className="mt-1">
            {/* Category header */}
            <div className="flex items-center py-1">
              <span className="w-36 shrink-0 text-xs font-semibold text-[#f5f5f7] pl-1">
                {cat.category}
              </span>
              <div className="flex-1 border-t border-white/5" />
            </div>

            {/* Tasks */}
            {cat.tasks.map((task, ti) => {
              const sc = statusColors[task.status];
              const leftPct = ((task.start - 1) / totalWeeks) * 100;
              const widthPct = ((task.end - task.start + 1) / totalWeeks) * 100;

              return (
                <div key={ti} className="flex items-center py-0.5">
                  <span className="w-36 shrink-0 text-[11px] text-[#86868b] pl-3 truncate">
                    {task.name}
                  </span>
                  <div className="relative flex-1 h-5">
                    {/* Grid lines */}
                    {weeks.map((_, wi) => (
                      <div
                        key={wi}
                        className="absolute top-0 bottom-0 border-l border-white/5"
                        style={{ left: `${(wi / totalWeeks) * 100}%` }}
                      />
                    ))}
                    {/* Bar */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={vp}
                      transition={{
                        duration: 0.5,
                        delay: ci * 0.1 + ti * 0.05,
                      }}
                      style={{
                        left: `${leftPct}%`,
                        width: `${widthPct}%`,
                        originX: 0,
                      }}
                      className={`absolute top-0.5 h-4 rounded ${sc.bg} border ${sc.border} border-opacity-40 flex items-center justify-center`}
                    >
                      <span className="text-[9px] font-medium text-white/90 whitespace-nowrap px-1">
                        {task.name}
                      </span>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
