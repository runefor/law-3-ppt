"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Slide } from "@/data/slides";
import { VP_DEFAULT, SPRING_SOFT } from "@/lib/animations";

function DonutProgress({
  percent,
  inView,
}: {
  percent: number;
  inView: boolean;
}) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="8"
      />
      <motion.circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="url(#progressGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={
          inView ? { strokeDashoffset } : { strokeDashoffset: circumference }
        }
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        transform="rotate(-90 50 50)"
      />
      <defs>
        <linearGradient
          id="progressGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#2997ff" />
          <stop offset="100%" stopColor="#30d158" />
        </linearGradient>
      </defs>
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#f5f5f7"
        fontSize="18"
        fontWeight="bold"
        fontFamily="system-ui"
      >
        {Math.round(percent)}%
      </text>
    </svg>
  );
}

export default function ProgressBarsSlide({ slide }: { slide: Slide }) {
  const { completed, inProgress, planned } = slide.content as {
    completed: string[];
    inProgress: string[];
    planned: string[];
  };

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const sections = [
    { title: "완료", items: completed, color: "#30d158", icon: "✓" },
    { title: "진행중", items: inProgress, color: "#ff9f0a", icon: "◎" },
    { title: "예정", items: planned, color: "#86868b", icon: "—" },
  ];

  const total = completed.length + inProgress.length + planned.length;
  const progress =
    ((completed.length + inProgress.length * 0.5) / total) * 100;
  const completedPct = (completed.length / total) * 100;
  const inProgressPct = (inProgress.length / total) * 100;
  const plannedPct = (planned.length / total) * 100;

  return (
    <div ref={ref} className="flex flex-col justify-center py-4">
      <h2 className="mb-4 text-4xl font-bold text-[#f5f5f7]">
        {slide.title}
      </h2>

      {/* Top: Donut + Stacked Bar */}
      <div className="mb-6 flex items-center gap-8">
        {/* Donut with shimmer overlay after completion */}
        <div className="shimmer-overlay rounded-full">
          <DonutProgress percent={progress} inView={inView} />
        </div>
        <div className="flex-1">
          <div className="mb-2 flex justify-between text-sm text-[#86868b]">
            <span>전체 진행률</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="flex h-3 overflow-hidden rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${completedPct}%` } : { width: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-[#30d158]"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={
                inView ? { width: `${inProgressPct}%` } : { width: 0 }
              }
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="h-full bg-[#ff9f0a]"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${plannedPct}%` } : { width: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="h-full bg-[#86868b]/40"
            />
          </div>
          <div className="mt-3 flex gap-5 text-xs text-[#86868b]">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#30d158]" />
              완료 {completed.length}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ff9f0a]" />
              진행중 {inProgress.length}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#86868b]/40" />
              예정 {planned.length}
            </span>
          </div>
        </div>
      </div>

      {/* Task cards with hover */}
      <div className="grid grid-cols-3 gap-8">
        {sections.map((section, si) => (
          <motion.div
            key={si}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP_DEFAULT}
            transition={{ duration: 0.4, delay: si * 0.12 }}
          >
            <h3
              className="mb-4 text-lg font-semibold"
              style={{ color: section.color }}
            >
              {section.title} ({section.items.length})
            </h3>
            <ul className="flex flex-col gap-2">
              {section.items.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 rounded-lg bg-[#1d1d1f] px-4 py-3 text-sm text-[#f5f5f7]"
                  style={{ borderLeft: `3px solid ${section.color}` }}
                  whileHover={{ x: 4, transition: SPRING_SOFT }}
                >
                  <span
                    className="mt-0.5 shrink-0 text-xs font-bold"
                    style={{ color: section.color }}
                  >
                    {section.icon}
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
