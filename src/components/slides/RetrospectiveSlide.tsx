"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { VP_DEFAULT, staggerContainer, fadeUpItem } from "@/lib/animations";

interface SuccessItem {
  title: string;
  description: string;
}

interface GrowthItem {
  title: string;
  description: string;
  evolution: { from: string; to: string };
}

export default function RetrospectiveSlide({ slide }: { slide: Slide }) {
  const content = slide.content as {
    successes: SuccessItem[];
    successSummary: string;
    growth: GrowthItem;
    growthSummary: string;
  };

  return (
    <div className="flex flex-col items-center py-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        className="mb-2 text-center text-3xl font-bold text-[#f5f5f7]"
      >
        {slide.title}
      </motion.h2>
      {slide.subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP_DEFAULT}
          className="mb-8 text-center text-sm text-[#86868b]"
        >
          {slide.subtitle}
        </motion.p>
      )}

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={VP_DEFAULT}
        className="grid grid-cols-2 gap-6 max-w-4xl w-full"
      >
        {/* Left: Successes */}
        <motion.div
          variants={fadeUpItem}
          className="rounded-2xl bg-white/5 border border-white/10 p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#30E7A9]/10 border border-[#30E7A9]/30">
              <span className="text-lg">✨</span>
            </div>
            <div>
              <div className="text-xs font-bold text-[#30E7A9] uppercase tracking-wider">
                THE POWER OF SYNERGY
              </div>
              <div className="text-sm font-semibold text-[#f5f5f7]">핵심 성공 요인</div>
            </div>
          </div>

          {content.successes.map((s, i) => (
            <div key={i} className="mb-4">
              <div className="mb-1 text-xs font-bold text-[#f5f5f7]">
                SUCCESS {String(i + 1).padStart(2, "0")}: {s.title}
              </div>
              <p className="text-xs text-[#86868b] leading-relaxed">{s.description}</p>
            </div>
          ))}

          <div className="rounded-lg bg-[#30E7A9]/5 border border-[#30E7A9]/20 p-2 text-xs text-[#30E7A9]">
            {content.successSummary}
          </div>
        </motion.div>

        {/* Right: Growth */}
        <motion.div
          variants={fadeUpItem}
          className="rounded-2xl bg-white/5 border border-white/10 p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6AE4FF]/10 border border-[#6AE4FF]/30">
              <span className="text-lg">🧭</span>
            </div>
            <div>
              <div className="text-xs font-bold text-[#6AE4FF] uppercase tracking-wider">
                THE ROAD TO MATURITY
              </div>
              <div className="text-sm font-semibold text-[#f5f5f7]">향후 발전 방향</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-1 text-xs font-bold text-[#f5f5f7]">
              GROWTH: {content.growth.title}
            </div>
            <p className="text-xs text-[#86868b] leading-relaxed">
              {content.growth.description}
            </p>
          </div>

          {/* Evolution flow */}
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs text-[#86868b]">
              {content.growth.evolution.from}
            </div>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[#6AE4FF]"
            >
              →
            </motion.span>
            <div className="rounded-lg bg-[#6AE4FF]/10 border border-[#6AE4FF]/30 px-3 py-2 text-xs font-semibold text-[#6AE4FF]">
              {content.growth.evolution.to}
            </div>
          </div>

          <div className="rounded-lg bg-[#6AE4FF]/5 border border-[#6AE4FF]/20 p-2 text-xs text-[#6AE4FF]">
            {content.growthSummary}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
