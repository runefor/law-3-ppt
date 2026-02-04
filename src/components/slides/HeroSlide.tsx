"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import {
  AMBIENT_ORBS,
  generateParticles,
  staggerContainer,
  type ParticleConfig,
} from "@/lib/animations";

const PARTICLE_COUNT = 5;

export default function HeroSlide({ slide }: { slide: Slide }) {
  const [particles, setParticles] = useState<ParticleConfig[]>([]);

  useEffect(() => {
    setParticles(generateParticles(PARTICLE_COUNT));
  }, []);

  const { team, event, date } = slide.content as {
    team: string;
    event: string;
    date: string;
  };

  const subtitleChars = slide.subtitle ? slide.subtitle.split("") : [];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-20 text-center">
      {/* Ambient background orbs */}
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

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient animated title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="animate-gradient-text relative z-10 mb-6 text-7xl font-bold tracking-tight"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #2997ff, #bf5af2, #2997ff, #bf5af2)",
        }}
      >
        {slide.title}
      </motion.h1>

      {/* Typewriter subtitle */}
      {subtitleChars.length > 0 && (
        <motion.p
          className="relative z-10 mb-12 max-w-3xl text-xl leading-relaxed text-[#86868b]"
          variants={staggerContainer(0.02, 0.3)}
          initial="hidden"
          animate="visible"
        >
          {subtitleChars.map((char, i) => (
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-1 text-sm text-[#86868b]"
      >
        <span className="font-medium text-[#f5f5f7]">{team}</span>
        <span>
          {event} · {date}
        </span>
      </motion.div>
    </div>
  );
}
