"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Slide } from "@/data/slides";

interface Phase {
  phase: string;
  label: string;
  detail: string;
}

const phaseColors = ["#2997ff", "#bf5af2", "#30d158"];

export default function TimelineRoadmapSlide({ slide }: { slide: Slide }) {
  const { phases } = slide.content as { phases: Phase[] };
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const currentPhaseIndex = 0; // Week 1 is current

  return (
    <div ref={ref} className="flex flex-col items-center justify-center py-4">
      <h2 className="mb-6 text-4xl font-bold text-[#f5f5f7]">
        {slide.title}
      </h2>
      <div className="relative flex w-full max-w-4xl justify-between">
        {/* SVG Timeline line with pathLength animation */}
        <svg
          className="absolute left-0 right-0 top-[28px]"
          width="100%"
          height="4"
          viewBox="0 0 1000 4"
          preserveAspectRatio="none"
        >
          <rect x="0" y="0" width="1000" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
          <motion.rect
            x="0"
            y="0"
            width="1000"
            height="4"
            rx="2"
            fill="url(#timelineGrad)"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
          <defs>
            <linearGradient id="timelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2997ff" />
              <stop offset="50%" stopColor="#bf5af2" />
              <stop offset="100%" stopColor="#30d158" />
            </linearGradient>
          </defs>
        </svg>

        {phases.map((p, i) => {
          const isCurrent = i === currentPhaseIndex;
          const color = phaseColors[i % phaseColors.length];

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.2 }}
              className="relative flex flex-1 flex-col items-center text-center"
            >
              {/* Milestone node */}
              <div className="relative mb-6">
                {/* Pulsing ring for current phase */}
                {isCurrent && (
                  <motion.div
                    className="absolute -inset-2 rounded-full"
                    style={{ border: `2px solid ${color}` }}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                {/* Node circle with fill animation */}
                <svg width="56" height="56" viewBox="0 0 56 56">
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    fill="rgba(255,255,255,0.05)"
                    stroke={color}
                    strokeWidth="3"
                  />
                  <motion.circle
                    cx="28"
                    cy="28"
                    r="24"
                    fill={color}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: isCurrent ? 1 : 0.2 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.2 }}
                  />
                  <text
                    x="28"
                    y="28"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isCurrent ? "black" : "#f5f5f7"}
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="system-ui"
                  >
                    {p.label}
                  </text>
                </svg>
              </div>

              <h4 className="mb-2 text-base font-semibold text-[#f5f5f7]">
                {p.phase}
              </h4>
              <p className="max-w-[220px] text-sm leading-relaxed text-[#86868b]">
                {p.detail}
              </p>

              {/* Current position indicator */}
              {isCurrent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 1.5 }}
                  className="mt-3 rounded-full px-3 py-1 text-xs font-medium"
                  style={{ backgroundColor: `${color}20`, color }}
                >
                  현재 진행중
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
