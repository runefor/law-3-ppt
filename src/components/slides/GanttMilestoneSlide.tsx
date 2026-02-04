"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { VP_DEFAULT, staggerContainer } from "@/lib/animations";

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

const STATUS_COLORS: Record<
  string,
  { bg: string; border: string; label: string }
> = {
  done: { bg: "bg-[#30d158]/80", border: "border-[#30d158]", label: "완료" },
  "in-progress": {
    bg: "bg-[#2997ff]/80",
    border: "border-[#2997ff]",
    label: "진행중",
  },
  planned: {
    bg: "bg-[#86868b]/50",
    border: "border-[#86868b]",
    label: "예정",
  },
};

export default function GanttMilestoneSlide({ slide }: { slide: Slide }) {
  const { totalWeeks, weekLabels, categories } =
    slide.content as unknown as GanttContent;
  const weeks = weekLabels
    ? weekLabels.map((l, i) => `W${i + 1} (${l})`)
    : Array.from({ length: totalWeeks }, (_, i) => `W${i + 1}`);

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h2 className="mb-3 text-4xl font-bold text-[#f5f5f7]">
        {slide.title}
      </h2>

      {/* Legend */}
      <div className="mb-4 flex gap-5">
        {Object.entries(STATUS_COLORS).map(([key, val]) => (
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
        viewport={VP_DEFAULT}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl overflow-x-auto rounded-2xl bg-[#1d1d1f] px-5 py-4"
      >
        {/* Week headers */}
        <div className="flex">
          <div className="w-36 shrink-0" />
          <div className="flex flex-1">
            {weeks.map((w) => (
              <div
                key={w}
                className="flex-1 border-l border-white/5 py-1 text-center text-xs font-medium text-[#86868b]"
              >
                {w}
              </div>
            ))}
          </div>
        </div>

        {/* Categories with stagger: header → task bars */}
        {categories.map((cat, ci) => (
          <motion.div
            key={ci}
            className="mt-1"
            variants={staggerContainer(0.06, ci * 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={VP_DEFAULT}
          >
            {/* Category header */}
            <motion.div
              className="flex items-center py-1"
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.3 },
                },
              }}
            >
              <span className="w-36 shrink-0 pl-1 text-xs font-semibold text-[#f5f5f7]">
                {cat.category}
              </span>
              <div className="flex-1 border-t border-white/5" />
            </motion.div>

            {/* Tasks */}
            {cat.tasks.map((task, ti) => {
              const sc = STATUS_COLORS[task.status];
              const leftPct = ((task.start - 1) / totalWeeks) * 100;
              const widthPct =
                ((task.end - task.start + 1) / totalWeeks) * 100;
              const isInProgress = task.status === "in-progress";

              return (
                <motion.div
                  key={ti}
                  className="flex items-center py-0.5"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { duration: 0.3 },
                    },
                  }}
                >
                  <span className="w-36 shrink-0 truncate pl-3 text-[11px] text-[#86868b]">
                    {task.name}
                  </span>
                  <div className="relative h-5 flex-1">
                    {/* Grid lines */}
                    {weeks.map((_, wi) => (
                      <div
                        key={wi}
                        className="absolute bottom-0 top-0 border-l border-white/5"
                        style={{ left: `${(wi / totalWeeks) * 100}%` }}
                      />
                    ))}
                    {/* Bar with shimmer for in-progress */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={VP_DEFAULT}
                      transition={{
                        duration: 0.5,
                        delay: ci * 0.1 + ti * 0.05,
                      }}
                      style={{
                        left: `${leftPct}%`,
                        width: `${widthPct}%`,
                        originX: 0,
                      }}
                      className={`absolute top-0.5 flex h-4 items-center justify-center rounded ${sc.bg} border ${sc.border} border-opacity-40 ${isInProgress ? "shimmer-overlay" : ""}`}
                    >
                      <span className="whitespace-nowrap px-1 text-[9px] font-medium text-white/90">
                        {task.name}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
