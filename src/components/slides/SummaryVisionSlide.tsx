"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { VP_DEFAULT, staggerContainer, fadeUpItem } from "@/lib/animations";

interface StatCard {
  value: string;
  label: string;
  icon: string;
}

interface RoadmapItem {
  icon: string;
  title: string;
  items: string[];
}

export default function SummaryVisionSlide({ slide }: { slide: Slide }) {
  const content = slide.content as {
    stats: StatCard[];
    roadmap: RoadmapItem[];
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
          className="mb-6 text-center text-sm text-[#86868b]"
        >
          {slide.subtitle}
        </motion.p>
      )}

      <div className="grid grid-cols-2 gap-6 max-w-5xl w-full">
        {/* Left: Stats */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VP_DEFAULT}
          className="flex flex-col"
        >
          <motion.div variants={fadeUpItem} className="mb-3 text-xs font-bold text-[#6AE4FF] uppercase tracking-wider">
            The Foundation — Proven Technology
          </motion.div>
          <div className="grid grid-cols-2 gap-3">
            {content.stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUpItem}
                whileHover={{ y: -2 }}
                className="flex flex-col items-center rounded-xl bg-white/5 border border-white/10 p-4 text-center"
              >
                <span className="mb-1 text-lg">{stat.icon}</span>
                <span className="text-2xl font-bold text-[#6AE4FF]">{stat.value}</span>
                <span className="text-xs text-[#86868b]">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Roadmap */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VP_DEFAULT}
          className="flex flex-col"
        >
          <motion.div variants={fadeUpItem} className="mb-3 text-xs font-bold text-[#30E7A9] uppercase tracking-wider">
            The Growth — Future Roadmap
          </motion.div>
          <div className="flex flex-col gap-3">
            {content.roadmap.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUpItem}
                whileHover={{ y: -2 }}
                className="rounded-xl bg-white/5 border border-white/10 p-3"
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-xs font-bold text-[#f5f5f7]">{item.title}</span>
                </div>
                {item.items.map((sub, j) => (
                  <p key={j} className="ml-6 text-[10px] text-[#86868b] leading-relaxed">
                    • {sub}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
