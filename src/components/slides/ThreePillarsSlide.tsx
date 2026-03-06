"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { VP_DEFAULT, staggerContainer, fadeUpItem, SPRING_BOUNCE } from "@/lib/animations";

interface Pillar {
  icon: string;
  title: string;
  subtitle: string;
  quote: string;
  description: string;
  benefit: string;
  examples?: string[];
  dualSearch?: string[];
  termComparison?: { general: string; ours: string };
}

interface Stat {
  label: string;
  value: string;
}

const PILLAR_COLORS = ["#2997ff", "#30E7A9", "#bf5af2"];

export default function ThreePillarsSlide({ slide }: { slide: Slide }) {
  const content = slide.content as {
    pillars: Pillar[];
    stats: Stat[];
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
          className="mb-6 max-w-3xl text-center text-sm text-[#86868b]"
        >
          {slide.subtitle}
        </motion.p>
      )}

      <motion.div
        className="grid grid-cols-3 gap-5 max-w-5xl w-full mb-6"
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={VP_DEFAULT}
      >
        {content.pillars.map((pillar, i) => {
          const color = PILLAR_COLORS[i];
          return (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: SPRING_BOUNCE },
              }}
              whileHover={{ y: -4 }}
              className="flex flex-col rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-5"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">{pillar.icon}</span>
                <div>
                  <h3 className="text-lg font-bold" style={{ color }}>
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#86868b]">{pillar.subtitle}</p>
                </div>
              </div>

              <p className="mb-3 text-xs italic text-[#86868b] border-l-2 pl-3" style={{ borderColor: `${color}40` }}>
                {pillar.quote}
              </p>

              <p className="mb-3 text-xs text-[#f5f5f7]">{pillar.description}</p>

              {pillar.examples && (
                <div className="mb-3 space-y-1">
                  {pillar.examples.map((ex, j) => (
                    <div key={j} className="text-xs text-[#86868b]">• {ex}</div>
                  ))}
                </div>
              )}

              {pillar.dualSearch && (
                <div className="mb-3 flex gap-1">
                  {pillar.dualSearch.map((ds, j) => (
                    <span
                      key={j}
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        background: `${color}15`,
                        border: `1px solid ${color}30`,
                        color,
                      }}
                    >
                      {ds}
                    </span>
                  ))}
                </div>
              )}

              {pillar.termComparison && (
                <div className="mb-3 rounded-lg bg-black/30 p-2 font-mono text-xs">
                  <div className="text-red-400">일반: {pillar.termComparison.general} ✗</div>
                  <div className="text-[#30E7A9]">LP: {pillar.termComparison.ours} ✓</div>
                </div>
              )}

              <div className="mt-auto rounded-lg bg-white/5 px-3 py-2">
                <span className="text-xs font-medium" style={{ color }}>
                  ✓ {pillar.benefit}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        className="flex gap-6"
      >
        {content.stats.map((stat, i) => (
          <div
            key={i}
            className="rounded-full bg-white/5 border border-white/10 px-5 py-2 text-center"
          >
            <span className="text-sm font-bold text-[#6AE4FF]">{stat.value}</span>
            <span className="ml-2 text-xs text-[#86868b]">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
