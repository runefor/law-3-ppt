"use client";

import { motion } from "framer-motion";
import { VP_DEFAULT } from "@/lib/animations";

interface DonutChartProps {
  saved: number;
  spent: number;
  centerLabel: string;
  size?: number;
}

export default function DonutChart({
  saved,
  spent,
  centerLabel,
  size = 180,
}: DonutChartProps) {
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const spentDash = (spent / 100) * circumference;
  const center = size / 2;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VP_DEFAULT}
      transition={{ duration: 0.6 }}
      className="relative inline-flex items-center justify-center"
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Spent arc */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#donut-gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference - spentDash }}
          viewport={VP_DEFAULT}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          transform={`rotate(-90 ${center} ${center})`}
        />
        <defs>
          <linearGradient id="donut-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2997ff" />
            <stop offset="100%" stopColor="#6AE4FF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-[#30E7A9]">{centerLabel}</span>
      </div>
    </motion.div>
  );
}
