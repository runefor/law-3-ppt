"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, animate, useInView } from "framer-motion";
import type { Slide } from "@/data/slides";
import { SPRING_SOFT } from "@/lib/animations";

interface Stat {
  value: number;
  label: string;
  suffix: string;
}

const BAR_COLORS = ["#2997ff", "#bf5af2", "#30d158", "#ff9f0a"];

function CountupNumber({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const controls = animate(motionValue, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(Math.round(latest).toLocaleString());
      },
    });
    return () => controls.stop();
  }, [motionValue, value, inView]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function StatsCountupSlide({ slide }: { slide: Slide }) {
  const { stats } = slide.content as { stats: Stat[] };
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const maxValue = Math.max(...stats.map((s) => s.value));

  return (
    <div ref={ref} className="flex flex-col items-center justify-center py-4">
      <h2 className="mb-6 text-4xl font-bold text-[#f5f5f7]">
        {slide.title}
      </h2>
      <div className="grid w-full max-w-4xl grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{
              scale: 1.03,
              y: -4,
              transition: SPRING_SOFT,
            }}
            className="shimmer-overlay flex flex-col items-center rounded-2xl bg-[#1d1d1f] p-8 text-center"
          >
            <span className="mb-3 text-4xl font-bold text-[#2997ff]">
              <CountupNumber
                value={stat.value}
                suffix={stat.suffix}
                inView={inView}
              />
            </span>
            <span className="text-sm text-[#86868b]">{stat.label}</span>
          </motion.div>
        ))}
      </div>
      {/* SVG Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 w-full max-w-4xl"
      >
        <svg
          width="100%"
          height={stats.length * 48 + 16}
          viewBox={`0 0 600 ${stats.length * 48 + 16}`}
        >
          {stats.map((stat, i) => {
            const barWidth = (stat.value / maxValue) * 420;
            return (
              <g key={i} transform={`translate(0, ${i * 48 + 8})`}>
                <text
                  x="0"
                  y="22"
                  fill="#86868b"
                  fontSize="12"
                  fontFamily="system-ui"
                >
                  {stat.label}
                </text>
                <rect
                  x="160"
                  y="8"
                  width="420"
                  height="24"
                  rx="4"
                  fill="rgba(255,255,255,0.05)"
                />
                <motion.rect
                  x="160"
                  y="8"
                  height="24"
                  rx="4"
                  fill={BAR_COLORS[i % BAR_COLORS.length]}
                  initial={{ width: 0 }}
                  animate={inView ? { width: barWidth } : { width: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.5 + i * 0.15,
                    ease: "easeOut",
                  }}
                />
                <motion.text
                  x={170 + barWidth}
                  y="24"
                  fill="#f5f5f7"
                  fontSize="11"
                  fontFamily="system-ui"
                  fontWeight="600"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: 1.5 + i * 0.15 }}
                >
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </motion.text>
              </g>
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
}
