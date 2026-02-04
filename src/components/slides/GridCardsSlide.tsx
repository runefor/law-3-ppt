"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { VP_DEFAULT, SPRING_SOFT, staggerContainer } from "@/lib/animations";

interface Stack {
  area: string;
  items: string[];
  logos?: Record<string, string>;
}

const AREA_COLORS: Record<string, string> = {
  Backend: "#30d158",
  Frontend: "#2997ff",
  "AI/ML": "#bf5af2",
  Database: "#ff9f0a",
};

export default function GridCardsSlide({ slide }: { slide: Slide }) {
  const { stacks } = slide.content as { stacks: Stack[] };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h2 className="mb-6 text-4xl font-bold text-[#f5f5f7]">
        {slide.title}
      </h2>
      <motion.div
        className="grid grid-cols-2 gap-6"
        variants={staggerContainer(0.1, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={VP_DEFAULT}
      >
        {stacks.map((stack, i) => {
          const color = AREA_COLORS[stack.area] || "#2997ff";
          return (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.97 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.4 },
                },
              }}
              className="rounded-2xl bg-[#1d1d1f] p-6"
              style={{ borderTop: `0px solid ${color}` }}
            >
              {/* Category color top border animation */}
              <motion.div
                className="mb-4 h-[3px] rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={VP_DEFAULT}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              />
              <h3
                className="mb-4 text-lg font-semibold"
                style={{ color }}
              >
                {stack.area}
              </h3>
              <div className="flex flex-wrap gap-2">
                {stack.items.map((item, j) => {
                  const logoUrl = stack.logos?.[item];
                  return (
                    <motion.span
                      key={j}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-[#f5f5f7]"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255,255,255,0.1)",
                        transition: SPRING_SOFT,
                      }}
                    >
                      {logoUrl && (
                        <img
                          src={logoUrl}
                          alt=""
                          className="h-4 w-4 object-contain"
                          loading="lazy"
                        />
                      )}
                      {item}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
