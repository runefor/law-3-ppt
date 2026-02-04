"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { Slide } from "@/data/slides";
import {
  VP_DEFAULT,
  SPRING_SOFT,
  staggerContainer,
  breatheAnimation,
} from "@/lib/animations";

interface ChallengePair {
  challenge: {
    icon: string;
    title: string;
    description: string;
  };
  solution: {
    title: string;
    description: string;
    status: "resolved" | "unresolved";
  };
}

const STATUS_CONFIG = {
  resolved: { color: "#30d158", label: "해결" },
  unresolved: { color: "#ff9f0a", label: "미해결" },
} as const;

const CARD_ACCENTS = ["#2997ff", "#bf5af2", "#30d158"];

const CHALLENGE_BORDER_COLOR = "#ff9f0a";

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const arrowBounce = {
  y: [0, 6, 0],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export default function ChallengeSolutionSlide({
  slide,
}: {
  slide: Slide;
}) {
  const { pairs } = slide.content as { pairs: ChallengePair[] };

  return (
    <div
      className="flex flex-col items-center justify-center py-4"
      style={{ perspective: 1200 }}
    >
      <motion.h2
        className="mb-10 text-4xl font-bold text-[#f5f5f7]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {slide.title}
      </motion.h2>

      <motion.div
        className="grid grid-cols-3 gap-8"
        variants={staggerContainer(0.15, 0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={VP_DEFAULT}
      >
        {pairs.map((pair, i) => {
          const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
          const statusCfg = STATUS_CONFIG[pair.solution.status];

          return (
            <motion.div
              key={i}
              variants={cardVariant}
              whileHover={{
                scale: 1.03,
                y: -6,
                boxShadow: `0 8px 30px ${accent}20`,
                transition: SPRING_SOFT,
              }}
              className="flex flex-col rounded-2xl bg-[#1d1d1f] overflow-hidden"
            >
              {/* 과제 섹션 */}
              <div
                className="flex flex-col gap-3 p-6"
                style={{ borderLeft: `3px solid ${CHALLENGE_BORDER_COLOR}` }}
              >
                <motion.span
                  className="text-4xl"
                  animate={breatheAnimation}
                >
                  {pair.challenge.icon}
                </motion.span>
                <h3 className="text-lg font-semibold text-[#f5f5f7]">
                  {pair.challenge.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#86868b]">
                  {pair.challenge.description}
                </p>
              </div>

              {/* 화살표 */}
              <div className="flex items-center justify-center py-2">
                <motion.svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  animate={arrowBounce}
                >
                  <path
                    d="M12 4v14m0 0l-5-5m5 5l5-5"
                    stroke="#86868b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </div>

              {/* 해결 섹션 */}
              <div className="flex flex-col gap-3 p-6 pt-2">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: statusCfg.color }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: statusCfg.color }}
                  >
                    {statusCfg.label}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-[#f5f5f7]">
                  {pair.solution.title}
                </h4>
                <p className="text-sm leading-relaxed text-[#86868b]">
                  {pair.solution.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
