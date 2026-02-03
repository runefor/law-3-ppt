"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";

interface Stack {
  area: string;
  items: string[];
  logos?: Record<string, string>;
}

const areaColors: Record<string, string> = {
  Backend: "#30d158",
  Frontend: "#2997ff",
  "AI/ML": "#bf5af2",
  Database: "#ff9f0a",
};

const vp = { once: true, amount: 0.2 } as const;

export default function GridCardsSlide({ slide }: { slide: Slide }) {
  const { stacks } = slide.content as { stacks: Stack[] };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h2 className="mb-6 text-4xl font-bold text-[#f5f5f7]">{slide.title}</h2>
      <div className="grid grid-cols-2 gap-6">
        {stacks.map((stack, i) => {
          const color = areaColors[stack.area] || "#2997ff";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl bg-[#1d1d1f] p-6"
            >
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
                    <span
                      key={j}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-[#f5f5f7]"
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
                    </span>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
