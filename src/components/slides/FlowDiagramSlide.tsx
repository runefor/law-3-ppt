"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { VP_DEFAULT, staggerContainer } from "@/lib/animations";

interface FlowStep {
  stage: string;
  detail: string;
}

const STAGE_COLORS = ["#2997ff", "#bf5af2", "#30d158", "#ff9f0a", "#ff453a"];
const DATA_PARTICLE_COUNT = 3;

export default function FlowDiagramSlide({ slide }: { slide: Slide }) {
  const { flow } = slide.content as { flow: FlowStep[] };
  const stepCount = flow.length;
  const svgWidth = 800;
  const stepSpacing = svgWidth / stepCount;

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        transition={{ duration: 0.4 }}
        className="mb-6 text-4xl font-bold text-[#f5f5f7]"
      >
        {slide.title}
      </motion.h2>

      <motion.div
        className="relative w-full max-w-4xl"
        variants={staggerContainer(0.15, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VP_DEFAULT}
      >
        {/* SVG connector lines with drawing animation */}
        <svg
          className="absolute left-0 z-0 w-full"
          style={{ top: "-10px" }}
          viewBox={`0 0 ${svgWidth} 60`}
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2997ff" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#bf5af2" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#30d158" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Main connector line — path drawing */}
          <motion.line
            x1={stepSpacing / 2}
            y1={30}
            x2={svgWidth - stepSpacing / 2}
            y2={30}
            stroke="url(#lineGrad)"
            strokeWidth={2}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={VP_DEFAULT}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
          />

          {/* Shimmer sweep — white highlight moving across the line */}
          {[0, 1].map((idx) => (
            <motion.line
              key={idx}
              x1={stepSpacing / 2}
              y1={30}
              x2={svgWidth - stepSpacing / 2}
              y2={30}
              stroke="white"
              strokeWidth={2}
              strokeOpacity={0.15}
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{
                pathOffset: [0, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5 + idx * 1.2,
              }}
              style={{ pathLength: 0.15 }}
            />
          ))}

          {/* Data flow particles — chevrons moving along the line */}
          {Array.from({ length: DATA_PARTICLE_COUNT }).map((_, idx) => (
            <motion.text
              key={idx}
              y={30}
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fillOpacity={0.6}
              fontSize={28}
              fontWeight="bold"
              animate={{
                x: [stepSpacing / 2, svgWidth - stepSpacing / 2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: idx * 1,
              }}
            >
              ›
            </motion.text>
          ))}
        </svg>

        {/* Step circles + labels */}
        <div className="relative z-10 flex w-full items-start justify-between">
          {flow.map((step, i) => {
            const color = STAGE_COLORS[i % STAGE_COLORS.length];
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4 },
                  },
                }}
                className="flex flex-1 flex-col items-center text-center"
              >
                {/* Sequential fill: outline → solid */}
                <motion.div
                  className="mb-3 flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold"
                  initial={{
                    backgroundColor: "transparent",
                    borderWidth: 2,
                    borderColor: color,
                    color,
                  }}
                  whileInView={{
                    backgroundColor: color,
                    color: "#000",
                  }}
                  viewport={VP_DEFAULT}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.15 }}
                  style={{ borderStyle: "solid" }}
                >
                  {i + 1}
                </motion.div>
                <h4 className="mb-2 text-sm font-semibold text-[#f5f5f7]">
                  {step.stage}
                </h4>
                <p className="max-w-[180px] text-xs leading-relaxed text-[#86868b]">
                  {step.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
