"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Slide } from "@/data/slides";

interface Stat {
  value: string;
  label: string;
}

const statColors = ["#2997ff", "#30d158", "#ff9f0a"];

function parsePercent(val: string): number | null {
  const match = val.match(/(\d+)%/);
  return match ? parseInt(match[1], 10) : null;
}

function parseDDay(val: string): number | null {
  const match = val.match(/D-(\d+)/);
  if (match) {
    const days = parseInt(match[1], 10);
    return ((60 - days) / 60) * 100;
  }
  return null;
}

function DonutChart({
  percent,
  color,
  label,
  displayValue,
  inView,
  delay,
}: {
  percent: number;
  color: string;
  label: string;
  displayValue: string;
  inView: boolean;
  delay: number;
}) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      className="flex w-64 flex-col items-center rounded-2xl bg-[#1d1d1f] p-8 text-center"
    >
      <svg width="140" height="140" viewBox="0 0 140 140" className="mb-4">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="10"
        />
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={
            inView
              ? { strokeDashoffset }
              : { strokeDashoffset: circumference }
          }
          transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeOut" }}
          transform="rotate(-90 70 70)"
        />
        <text
          x="70"
          y="70"
          textAnchor="middle"
          dominantBaseline="central"
          fill={color}
          fontSize="28"
          fontWeight="bold"
          fontFamily="system-ui"
        >
          {displayValue}
        </text>
      </svg>
      <span className="text-sm text-[#86868b]">{label}</span>
    </motion.div>
  );
}

export default function StatsHighlightSlide({ slide }: { slide: Slide }) {
  const { stats } = slide.content as { stats: Stat[] };
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="flex flex-col items-center justify-center py-4">
      <h2 className="mb-6 text-4xl font-bold text-[#f5f5f7]">
        {slide.title}
      </h2>
      <div className="flex gap-10">
        {stats.map((stat, i) => {
          const pct = parsePercent(stat.value);
          const dday = parseDDay(stat.value);
          const percent = pct ?? dday ?? 50;
          const color = statColors[i % statColors.length];

          return (
            <DonutChart
              key={i}
              percent={percent}
              color={color}
              label={stat.label}
              displayValue={stat.value}
              inView={inView}
              delay={i * 0.12}
            />
          );
        })}
      </div>
    </div>
  );
}
