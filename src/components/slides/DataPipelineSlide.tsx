"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { VP_DEFAULT, staggerContainer, fadeUpItem } from "@/lib/animations";

interface ServiceItem {
  icon: string;
  category: string;
  title: string;
  description: string;
  stat: string;
}

interface PipelineStep {
  step: string;
  title: string;
  subtitle: string;
  sources?: string[];
}

const CATEGORY_COLORS: Record<string, string> = {
  BUSINESS: "#30E7A9",
  VICTORY: "#6AE4FF",
  EFFICIENCY: "#bf5af2",
  FRESHNESS: "#fbbf24",
};

export default function DataPipelineSlide({ slide }: { slide: Slide }) {
  const content = slide.content as {
    pivot: { before: string; transition: string; after: string };
    services: ServiceItem[];
    pipelineSteps: PipelineStep[];
  };

  return (
    <div className="flex flex-col items-center py-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        className="mb-6 max-w-4xl text-center text-2xl font-bold text-[#f5f5f7]"
      >
        {slide.title}
      </motion.h2>

      {/* Pivot Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        className="mb-6 flex items-center gap-4 max-w-3xl"
      >
        <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm text-[#86868b]">
          {content.pivot.before}
        </div>
        <motion.span
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[#6AE4FF] text-lg shrink-0"
        >
          →
        </motion.span>
        <div className="rounded-xl bg-[#0071E3]/10 border border-[#0071E3]/30 px-4 py-2 text-sm font-semibold text-[#6AE4FF]">
          {content.pivot.after}
        </div>
      </motion.div>

      {/* 4 Service Cards */}
      <motion.div
        className="grid grid-cols-2 gap-4 max-w-4xl w-full mb-6"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VP_DEFAULT}
      >
        {content.services.map((svc, i) => {
          const color = CATEGORY_COLORS[svc.category] || "#6AE4FF";
          return (
            <motion.div
              key={i}
              variants={fadeUpItem}
              whileHover={{ y: -3 }}
              className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{svc.icon}</span>
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color }}
                >
                  {svc.category}
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#f5f5f7] mb-1">
                {svc.title}
              </h3>
              <p className="text-xs text-[#86868b] mb-2">{svc.description}</p>
              <div
                className="inline-block rounded-full px-2 py-0.5 text-xs font-medium"
                style={{
                  color,
                  backgroundColor: `${color}15`,
                  border: `1px solid ${color}30`,
                }}
              >
                {svc.stat}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Pipeline Steps */}
      <motion.div
        className="flex items-center gap-3 max-w-4xl"
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={VP_DEFAULT}
      >
        {content.pipelineSteps.map((ps, i) => (
          <motion.div key={i} variants={fadeUpItem} className="flex items-center gap-3">
            <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center min-w-[140px]">
              <div className="text-xs font-bold text-[#6AE4FF] mb-1">
                {ps.step}
              </div>
              <div className="text-sm font-semibold text-[#f5f5f7]">
                {ps.title}
              </div>
              <div className="text-xs text-[#86868b]">{ps.subtitle}</div>
              {ps.sources && (
                <div className="mt-2 flex flex-wrap gap-1 justify-center">
                  {ps.sources.slice(0, 4).map((s, j) => (
                    <span
                      key={j}
                      className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-[#86868b]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {i < content.pipelineSteps.length - 1 && (
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                className="text-[#6AE4FF] text-lg"
              >
                →
              </motion.span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
