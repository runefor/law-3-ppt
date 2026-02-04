"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { Slide } from "@/data/slides";
import { VP_DEFAULT, SPRING_SOFT, staggerContainer } from "@/lib/animations";

interface ChallengeEntry {
  category: string;
  challenge: string;
  detail: string;
  solution: string;
  status: "resolved" | "in-progress" | "unresolved";
  progress?: string;
}

const STATUS_CONFIG = {
  resolved: { color: "#30d158", label: "해결" },
  "in-progress": { color: "#2997ff", label: "해결중" },
  unresolved: { color: "#ff9f0a", label: "미해결" },
} as const;

const CATEGORY_COLORS: Record<string, string> = {
  "인프라": "#2997ff",
  "비용": "#ff9f0a",
  "DB": "#bf5af2",
  "개발 프로세스": "#30d158",
  "협업": "#2997ff",
  "데이터 전처리": "#bf5af2",
};

const DEFAULT_CATEGORY_COLOR = "#86868b";

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const pulseAnimation = {
  opacity: [1, 0.5, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

function StatusBadge({
  status,
  progress,
}: {
  status: ChallengeEntry["status"];
  progress?: string;
}) {
  const config = STATUS_CONFIG[status];
  const label = progress ? `${config.label} ${progress}` : config.label;

  return (
    <div className="flex items-center gap-1.5">
      <motion.span
        className="inline-block h-2 w-2 rounded-full"
        style={{ backgroundColor: config.color }}
        animate={status === "in-progress" ? pulseAnimation : undefined}
      />
      <span className="text-[10px] font-medium" style={{ color: config.color }}>
        {label}
      </span>
    </div>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const color = CATEGORY_COLORS[category] ?? DEFAULT_CATEGORY_COLOR;

  return (
    <span
      className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
      style={{
        backgroundColor: `${color}20`,
        color,
      }}
    >
      {category}
    </span>
  );
}

function SummaryBar({ entries }: { entries: ChallengeEntry[] }) {
  const counts = {
    resolved: 0,
    "in-progress": 0,
    unresolved: 0,
  };

  for (const entry of entries) {
    counts[entry.status]++;
  }

  return (
    <motion.div
      className="flex items-center gap-5"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP_DEFAULT}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {(Object.keys(STATUS_CONFIG) as Array<keyof typeof STATUS_CONFIG>).map(
        (key) => {
          if (counts[key] === 0) return null;
          const config = STATUS_CONFIG[key];
          return (
            <div key={key} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: config.color }}
              />
              <span className="text-xs text-[#86868b]">
                {config.label}{" "}
                <span className="font-semibold text-[#f5f5f7]">
                  {counts[key]}
                </span>
              </span>
            </div>
          );
        },
      )}
    </motion.div>
  );
}

export default function ChallengeLogSlide({ slide }: { slide: Slide }) {
  const { entries } = slide.content as { entries: ChallengeEntry[] };

  return (
    <div className="flex flex-col items-center justify-center px-12 py-6">
      {/* 타이틀 */}
      <motion.h2
        className="text-3xl font-bold text-[#f5f5f7]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {slide.title}
      </motion.h2>

      {/* 서브타이틀 */}
      {slide.subtitle && (
        <motion.p
          className="mt-2 text-sm text-[#86868b]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP_DEFAULT}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {slide.subtitle}
        </motion.p>
      )}

      {/* 요약 바 */}
      <div className="mt-4">
        <SummaryBar entries={entries} />
      </div>

      {/* 카드 그리드: 2열 4행 */}
      <motion.div
        className="mt-6 grid w-full max-w-5xl grid-cols-2 gap-3"
        variants={staggerContainer(0.06, 0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={VP_DEFAULT}
      >
        {entries.map((entry, i) => {
          const categoryColor =
            CATEGORY_COLORS[entry.category] ?? DEFAULT_CATEGORY_COLOR;

          return (
            <motion.div
              key={i}
              variants={cardVariant}
              whileHover={{
                scale: 1.02,
                y: -2,
                transition: SPRING_SOFT,
              }}
              className="relative flex flex-col gap-1.5 rounded-xl bg-[#1d1d1f] p-3"
              style={{ borderLeft: `2px solid ${categoryColor}30` }}
            >
              {/* 상단: 카테고리 뱃지 + 상태 뱃지 */}
              <div className="flex items-center justify-between">
                <CategoryBadge category={entry.category} />
                <StatusBadge
                  status={entry.status}
                  progress={entry.progress}
                />
              </div>

              {/* 챌린지 제목 */}
              <h3 className="text-sm font-semibold text-[#f5f5f7]">
                {entry.challenge}
              </h3>

              {/* 상세 → 해결 */}
              <p className="text-xs leading-relaxed text-[#86868b]">
                {entry.detail}
                <span className="mx-1 text-[#555]">&rarr;</span>
                <span className="text-[#a1a1a6]">{entry.solution}</span>
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
