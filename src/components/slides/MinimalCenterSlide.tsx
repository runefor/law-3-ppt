"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { AMBIENT_ORBS, VP_CENTER } from "@/lib/animations";

export default function MinimalCenterSlide({ slide }: { slide: Slide }) {
  const { team, event, contact } = slide.content as {
    team: string;
    event: string;
    contact: string;
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center">
      {/* Ambient background orbs — circular drift */}
      {AMBIENT_ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
          }}
          animate={{
            left: orb.x.map((v) => `${v}%`),
            top: orb.y.map((v) => `${v}%`),
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient animated title */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VP_CENTER}
        transition={{ duration: 0.6 }}
        className="animate-gradient-text relative z-10 mb-4 text-7xl font-bold"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #2997ff, #bf5af2, #2997ff, #bf5af2)",
        }}
      >
        {slide.title}
      </motion.h2>

      {slide.subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP_CENTER}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 mb-10 text-2xl text-[#86868b]"
        >
          {slide.subtitle}
        </motion.p>
      )}

      {/* Breathing glow team info */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VP_CENTER}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10 flex flex-col items-center gap-1 text-sm text-[#86868b]"
      >
        <motion.span
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="font-medium text-[#f5f5f7]"
        >
          {team}
        </motion.span>
        <motion.span
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          {event}
        </motion.span>
        <motion.span
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          {contact}
        </motion.span>
      </motion.div>
    </div>
  );
}
