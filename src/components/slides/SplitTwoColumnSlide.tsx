"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";

interface ColumnData {
  heading: string;
  items: string[];
}

export default function SplitTwoColumnSlide({ slide }: { slide: Slide }) {
  const { left, right, bottomQuote } = slide.content as {
    left: ColumnData;
    right: ColumnData;
    bottomQuote?: string;
  };

  return (
    <div className="flex flex-col justify-center py-4">
      <h2 className="mb-2 text-4xl font-bold text-[#f5f5f7]">
        {slide.title}
      </h2>
      {slide.subtitle && (
        <p className="mb-6 text-lg text-[#86868b]">{slide.subtitle}</p>
      )}
      <div className="mb-6 grid grid-cols-2 gap-6">
        {[left, right].map((col, ci) => (
          <motion.div
            key={ci}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: ci * 0.15 }}
            className="rounded-2xl bg-[#1d1d1f] p-8"
          >
            <h3 className="mb-6 text-2xl font-semibold text-[#f5f5f7]">
              {col.heading}
            </h3>
            <ul className="flex flex-col gap-3">
              {col.items.map((item, ii) => (
                <li
                  key={ii}
                  className="flex items-start gap-3 text-base text-[#86868b]"
                >
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${ci === 0 ? "bg-[#ff453a]" : "bg-[#30d158]"}`} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      {bottomQuote && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-l-2 border-[#2997ff] pl-4 text-base italic text-[#86868b]"
        >
          {bottomQuote}
        </motion.p>
      )}
    </div>
  );
}
