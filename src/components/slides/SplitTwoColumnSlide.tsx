"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import {
  VP_DEFAULT,
  VP_CENTER,
  SPRING_SOFT,
  slideInLeft,
  slideInRight,
  staggerContainer,
  fadeUpItem,
} from "@/lib/animations";

const CARD_COLORS = {
  left: { dot: "bg-[#ff453a]", glow: "rgba(255,69,58,0.15)", border: "rgba(255,69,58,0.3)" },
  right: { dot: "bg-[#30d158]", glow: "rgba(48,209,88,0.15)", border: "rgba(48,209,88,0.3)" },
} as const;

interface ColumnData {
  heading: string;
  items: string[];
  style?: "feature-cards";
}

export default function SplitTwoColumnSlide({ slide }: { slide: Slide }) {
  const { left, right, bottomQuote } = slide.content as {
    left: ColumnData;
    right: ColumnData;
    bottomQuote?: string;
  };

  const quoteChars = bottomQuote ? bottomQuote.split("") : [];

  return (
    <div className="flex flex-col justify-center py-4">
      <motion.h2
        className="mb-2 text-4xl font-bold text-[#f5f5f7]"
        variants={fadeUpItem}
        initial="hidden"
        whileInView="visible"
        viewport={VP_DEFAULT}
      >
        {slide.title}
      </motion.h2>
      {slide.subtitle && (
        <motion.p
          className="mb-6 text-lg text-[#86868b]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP_DEFAULT}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {slide.subtitle}
        </motion.p>
      )}
      <div className="mb-6 grid grid-cols-2 gap-6">
        {[left, right].map((col, ci) =>
          col.style === "feature-cards" ? (
            <div key={ci}>
              <h3 className="mb-4 text-2xl font-semibold text-[#f5f5f7]">
                {col.heading}
              </h3>
              <motion.div
                className="flex flex-col gap-4"
                variants={staggerContainer(0.1, 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={VP_DEFAULT}
              >
                {col.items.map((item, ii) => (
                  <motion.div
                    key={ii}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.4 },
                      },
                    }}
                    whileHover={{ x: 4, transition: SPRING_SOFT }}
                    className="flex items-start gap-4 rounded-xl bg-[#1d1d1f] p-5"
                  >
                    <motion.span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                      initial={{
                        backgroundColor: "transparent",
                        borderWidth: 2,
                        borderColor: "#2997ff",
                        color: "#2997ff",
                      }}
                      whileInView={{
                        backgroundColor: "rgba(41,151,255,0.2)",
                        color: "#2997ff",
                      }}
                      viewport={VP_DEFAULT}
                      transition={{ duration: 0.3, delay: 0.4 + ii * 0.1 }}
                      style={{ borderStyle: "solid" }}
                    >
                      {ii + 1}
                    </motion.span>
                    <span className="text-base text-[#f5f5f7]">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ) : (
            <motion.div
              key={ci}
              variants={ci === 0 ? slideInLeft : slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={VP_DEFAULT}
              whileHover={{
                y: -4,
                boxShadow: `0 8px 32px ${ci === 0 ? CARD_COLORS.left.glow : CARD_COLORS.right.glow}`,
                borderColor: ci === 0 ? CARD_COLORS.left.border : CARD_COLORS.right.border,
                transition: SPRING_SOFT,
              }}
              className="rounded-2xl border border-white/5 bg-[#1d1d1f] p-8"
            >
              <motion.h3
                className="mb-6 text-2xl font-semibold text-[#f5f5f7]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VP_DEFAULT}
                transition={{ duration: 0.4, delay: ci * 0.15 }}
              >
                {col.heading}
              </motion.h3>
              <motion.ul
                className="flex flex-col gap-3"
                variants={staggerContainer(0.1, 0.3)}
                initial="hidden"
                whileInView="visible"
                viewport={VP_DEFAULT}
              >
                {col.items.map((item, ii) => (
                  <motion.li
                    key={ii}
                    variants={{
                      hidden: { opacity: 0, x: ci === 0 ? -20 : 20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.4 },
                      },
                    }}
                    whileHover={{
                      x: ci === 0 ? 6 : -6,
                      color: "#f5f5f7",
                      transition: { duration: 0.2 },
                    }}
                    className="flex cursor-default items-start gap-3 text-base text-[#86868b] transition-colors"
                  >
                    <motion.span
                      className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${ci === 0 ? CARD_COLORS.left.dot : CARD_COLORS.right.dot}`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={VP_DEFAULT}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                        delay: 0.4 + ii * 0.12,
                      }}
                    />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ),
        )}
      </div>

      {/* Typewriter bottom quote */}
      {quoteChars.length > 0 && (
        <motion.p
          className="border-l-2 border-[#2997ff] pl-4 text-base italic text-[#86868b]"
          variants={staggerContainer(0.02, 0.6)}
          initial="hidden"
          whileInView="visible"
          viewport={VP_CENTER}
        >
          {quoteChars.map((char, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
              {char}
            </motion.span>
          ))}
          <span className="typewriter-cursor" />
        </motion.p>
      )}
    </div>
  );
}
