"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { VP_DEFAULT, staggerContainer, fadeUpItem, SPRING_BOUNCE } from "@/lib/animations";

interface Target {
  icon: string;
  name: string;
  tag: string;
  color: string;
  description: string;
}

export default function StrategyRadialSlide({ slide }: { slide: Slide }) {
  const content = slide.content as {
    hub: { badge: string; label: string };
    targets: Target[];
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
          className="mb-8 max-w-3xl text-center text-sm text-[#86868b]"
        >
          {slide.subtitle}
        </motion.p>
      )}

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={VP_DEFAULT}
        className="relative flex flex-col items-center gap-8"
      >
        {/* Center hub */}
        <motion.div
          variants={fadeUpItem}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #0071E3, #6AE4FF)",
              boxShadow: "0 0 40px rgba(0,113,227,0.3)",
            }}
          >
            {content.hub.badge}
          </motion.div>
          <span className="mt-2 text-sm font-semibold text-[#f5f5f7]">
            {content.hub.label}
          </span>
        </motion.div>

        {/* Target cards */}
        <div className="grid grid-cols-2 gap-4 max-w-3xl w-full">
          {content.targets.map((target, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: SPRING_BOUNCE },
              }}
              whileHover={{ y: -3, borderColor: `${target.color}50` }}
              className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-5"
              style={{ borderLeft: `3px solid ${target.color}` }}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xl">{target.icon}</span>
                <h3 className="text-base font-bold text-[#f5f5f7]">
                  {target.name}
                </h3>
                {target.tag && (
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{
                      color: target.color,
                      background: `${target.color}15`,
                      border: `1px solid ${target.color}30`,
                    }}
                  >
                    {target.tag}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#86868b]">{target.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
