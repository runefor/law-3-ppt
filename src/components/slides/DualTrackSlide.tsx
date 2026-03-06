"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { VP_DEFAULT, staggerContainer, fadeUpItem } from "@/lib/animations";

interface TrackStep {
  num: string;
  name: string;
  desc: string;
  visual: string;
  badge?: string;
}

interface Track {
  role: string;
  icon: string;
  color: string;
  steps: TrackStep[];
}

export default function DualTrackSlide({ slide }: { slide: Slide }) {
  const content = slide.content as {
    tracks: Track[];
    centerFlow: string[];
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

      <div className="grid grid-cols-[1fr_auto_1fr] gap-0 max-w-5xl w-full items-stretch">
        {content.tracks.map((track, ti) => (
          <motion.div
            key={ti}
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={VP_DEFAULT}
            className="flex flex-col gap-3"
          >
            {/* Track header */}
            <motion.div variants={fadeUpItem} className="flex items-center gap-2 mb-1">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-sm"
                style={{
                  background: `${track.color}15`,
                  border: `1px solid ${track.color}30`,
                }}
              >
                {track.icon}
              </div>
              <span className="text-sm font-bold" style={{ color: track.color }}>
                {track.role}
              </span>
            </motion.div>

            {/* Steps */}
            {track.steps.map((step, si) => (
              <motion.div
                key={si}
                variants={fadeUpItem}
                whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}
                className="rounded-xl bg-white/5 border border-white/10 p-3"
                style={{ borderLeft: `3px solid ${track.color}40` }}
              >
                <div
                  className="mb-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: track.color }}
                >
                  {step.num}
                </div>
                <div className="text-sm font-bold text-[#f5f5f7] mb-1">
                  {step.name}
                </div>
                <p className="text-xs text-[#86868b] mb-1">{step.desc}</p>
                <div className="text-[10px] text-white/35 italic border-t border-white/5 pt-1 mt-1">
                  {step.visual}
                </div>
                {step.badge && (
                  <span
                    className="mt-1 inline-block rounded-full px-2 py-0.5 text-[8px] font-bold"
                    style={{
                      background: "rgba(255,200,50,0.12)",
                      border: "1px solid rgba(255,200,50,0.25)",
                      color: "#FFC832",
                    }}
                  >
                    {step.badge}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        )).reduce<React.ReactNode[]>((acc, el, i) => {
          if (i === 1) {
            acc.push(
              <motion.div
                key="center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VP_DEFAULT}
                className="flex flex-col items-center justify-around px-3 py-10"
              >
                {content.centerFlow.map((label, ci) => (
                  <div key={ci} className="flex flex-col items-center gap-1">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 border border-white/15 text-xs font-bold text-[#f5f5f7]">
                      {ci + 1}
                    </div>
                    <span className="text-[9px] text-[#86868b] font-semibold uppercase tracking-wider">
                      {label}
                    </span>
                    {ci < content.centerFlow.length - 1 && (
                      <motion.span
                        animate={{ y: [0, 3, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                        className="text-white/15"
                      >
                        ↓
                      </motion.span>
                    )}
                  </div>
                ))}
              </motion.div>,
            );
          }
          acc.push(el);
          return acc;
        }, [])}
      </div>
    </div>
  );
}
