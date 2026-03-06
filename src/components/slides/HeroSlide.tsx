"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { useAudience } from "@/contexts/AudienceContext";
import {
  AMBIENT_ORBS,
  generateParticles,
  staggerContainer,
  fadeUpItem,
  type ParticleConfig,
} from "@/lib/animations";

const PARTICLE_COUNT = 5;

export default function HeroSlide({ slide }: { slide: Slide }) {
  const [particles, setParticles] = useState<ParticleConfig[]>([]);
  const { audience } = useAudience();

  useEffect(() => {
    setParticles(generateParticles(PARTICLE_COUNT));
  }, []);

  const content = slide.content as {
    team: string;
    event: string;
    date: string;
    presenter?: string;
    investorTitle?: string;
    investorSlogan?: string;
    developerTitle?: string;
    developerSubtitle?: string;
    techCards?: Array<{
      icon: string;
      title: string;
      sub: string;
      rows: Array<{ label: string; desc: string }>;
    }>;
  };

  const hasDualContent = !!content.investorTitle;
  const displayTitle = hasDualContent
    ? audience === "developer"
      ? content.developerTitle
      : content.investorTitle
    : slide.title;

  const displaySubtitle = hasDualContent
    ? audience === "developer"
      ? content.developerSubtitle
      : content.investorSlogan
    : slide.subtitle;

  const subtitleChars = displaySubtitle ? displaySubtitle.split("") : [];

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

      {audience === "developer" && hasDualContent && content.techCards ? (
        /* Developer view: Tech stack cards */
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center gap-6"
        >
          <motion.h1
            variants={fadeUpItem}
            className="animate-gradient-text text-5xl font-bold tracking-tight"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #6AE4FF, #0071E3, #6AE4FF, #0071E3)",
            }}
          >
            {displayTitle}
          </motion.h1>
          <motion.p variants={fadeUpItem} className="text-lg text-[#86868b]">
            {displaySubtitle}
          </motion.p>

          <motion.div
            variants={fadeUpItem}
            className="grid grid-cols-2 gap-3 max-w-[1100px] w-full"
          >
            {content.techCards.map((card, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition-all hover:border-[#6AE4FF]/30 hover:bg-[rgba(106,228,255,0.04)]"
              >
                <div className="flex items-center gap-2 border-b border-white/10 bg-[rgba(106,228,255,0.04)] px-4 py-2.5">
                  <motion.span
                    className="text-lg"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                  >
                    {card.icon}
                  </motion.span>
                  <span className="text-sm font-bold text-[#6AE4FF]">{card.title}</span>
                  <span className="ml-auto text-xs text-[#86868b] opacity-70">{card.sub}</span>
                </div>
                <div className="flex flex-col gap-2 p-4">
                  {card.rows.map((row, j) => (
                    <div key={j} className="flex items-baseline gap-2">
                      <span className="min-w-[90px] text-[11px] font-semibold uppercase tracking-wider text-[#6AE4FF]/85 shrink-0">
                        {row.label}
                      </span>
                      <span className="text-sm text-[#f5f5f7]">{row.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUpItem}
            className="flex flex-col items-center gap-1 text-sm text-[#86868b]"
          >
            <span className="font-medium text-[#f5f5f7]">{content.team}</span>
            <span>
              {content.event} · {content.date}
            </span>
          </motion.div>
        </motion.div>
      ) : (
        /* Investor / default view */
        <>
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
            {displayTitle}
          </motion.h1>

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
            <span className="font-medium text-[#f5f5f7]">{content.team}</span>
            <span>
              {content.event} · {content.date}
            </span>
            {content.presenter && (
              <span className="text-xs">{content.presenter}</span>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
}
