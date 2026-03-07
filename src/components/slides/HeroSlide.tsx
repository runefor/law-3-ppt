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

/** Gold-themed ambient orbs (investor view) */
const GOLD_ORBS = [
  { color: "rgba(212,175,85,0.12)", size: "500px", top: "-15%", right: "-5%", left: "auto", bottom: "auto", duration: 8 },
  { color: "rgba(106,228,255,0.09)", size: "400px", top: "auto", right: "auto", left: "-10%", bottom: "-10%", duration: 10 },
  { color: "rgba(48,231,169,0.07)", size: "350px", top: "30%", right: "auto", left: "55%", bottom: "auto", duration: 9 },
  { color: "rgba(167,139,250,0.07)", size: "280px", top: "10%", right: "auto", left: "15%", bottom: "auto", duration: 11 },
  { color: "rgba(212,175,85,0.06)", size: "220px", top: "auto", right: "20%", left: "auto", bottom: "20%", duration: 7 },
];

/** Shooting star configs */
const SHOOTING_STARS = [
  { top: "15%", left: "20%", width: "100px", gradient: "rgba(212,175,85,0.8)", duration: 4, delay: 0 },
  { top: "35%", left: "60%", width: "70px", gradient: "rgba(106,228,255,0.7)", duration: 5, delay: 2 },
  { top: "55%", left: "40%", width: "50px", gradient: "rgba(212,175,85,0.8)", duration: 6, delay: 3.5 },
  { top: "25%", left: "75%", width: "80px", gradient: "rgba(167,139,250,0.6)", duration: 7, delay: 1.5 },
];

/** Hero beam configs */
const HERO_BEAMS = [
  { left: "15%", height: "40%", gradient: "rgba(212,175,85,0.2)", duration: 6, delay: 0 },
  { left: "30%", height: "55%", gradient: "rgba(106,228,255,0.15)", duration: 8, delay: 1 },
  { left: "50%", height: "45%", gradient: "rgba(212,175,85,0.2)", duration: 7, delay: 2.5 },
  { left: "70%", height: "50%", gradient: "rgba(48,231,169,0.12)", duration: 9, delay: 3 },
  { left: "85%", height: "35%", gradient: "rgba(212,175,85,0.2)", duration: 5, delay: 4 },
];

/** Hero emblem SVG (gavel + neural network) */
function HeroEmblem() {
  return (
    <motion.div
      className="mb-8 flex items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-20"
        style={{ animation: "emblemFloat 4s ease-in-out infinite" }}
      >
        {/* Gavel group */}
        <g style={{ animation: "gavelStrike 3s ease-in-out infinite", transformOrigin: "30px 25px" }}>
          <rect x="18" y="20" width="24" height="10" rx="2" fill="rgba(212,175,85,0.25)" stroke="rgba(212,175,85,0.8)" strokeWidth="1.2" />
          <line x1="30" y1="30" x2="30" y2="58" stroke="rgba(212,175,85,0.8)" strokeWidth="2" strokeLinecap="round" />
        </g>
        <rect x="22" y="58" width="16" height="5" rx="1.5" fill="rgba(212,175,85,0.15)" stroke="rgba(212,175,85,0.6)" strokeWidth="1" />
        {/* Neural network nodes */}
        {[
          { cx: 54, cy: 28, r: 4 },
          { cx: 68, cy: 22, r: 3 },
          { cx: 66, cy: 40, r: 3.5 },
          { cx: 56, cy: 50, r: 3 },
          { cx: 72, cy: 54, r: 3 },
        ].map((node, i) => (
          <circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill="rgba(212,175,85,0.2)"
            stroke="rgba(212,175,85,0.7)"
            strokeWidth="1"
            style={{ animation: `nodePulse 2.5s ease-in-out ${i * 0.3}s infinite` }}
          />
        ))}
        {/* Neural connections */}
        {[
          [54, 28, 68, 22], [54, 28, 66, 40], [68, 22, 66, 40],
          [66, 40, 56, 50], [66, 40, 72, 54], [56, 50, 72, 54],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(212,175,85,0.4)"
            strokeWidth="0.8"
            strokeDasharray="6 4"
            style={{ animation: "signalFlow 2s linear infinite" }}
          />
        ))}
        {/* Connecting arc */}
        <path d="M42 25 Q48 20 54 24" stroke="rgba(212,175,85,0.6)" strokeWidth="1" fill="none" strokeDasharray="3,2" />
      </svg>
    </motion.div>
  );
}

/** Gold grid background SVG */
function GoldGridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -bottom-10 -right-10 w-[55%] max-w-[600px]"
        style={{ animation: "gridPulse 5s ease-in-out infinite" }}
      >
        <defs>
          <pattern id="heroGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(212,175,85,0.3)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="500" height="500" fill="url(#heroGrid)" />
        <g transform="translate(250,220)" stroke="rgba(212,175,85,0.5)" strokeWidth="1.5" fill="none">
          <line x1="0" y1="-80" x2="0" y2="100" />
          <rect x="-20" y="95" width="40" height="8" rx="2" fill="rgba(212,175,85,0.15)" stroke="rgba(212,175,85,0.4)" />
          <line x1="-90" y1="-60" x2="90" y2="-60" />
          <line x1="-90" y1="-60" x2="-90" y2="0" />
          <path d="M-120,0 Q-90,20 -60,0" stroke="rgba(212,175,85,0.4)" />
          <line x1="90" y1="-60" x2="90" y2="-15" />
          <path d="M60,-15 Q90,5 120,-15" stroke="rgba(212,175,85,0.4)" />
          <circle cx="0" cy="-80" r="8" fill="rgba(212,175,85,0.1)" stroke="rgba(212,175,85,0.5)" />
          <circle cx="70" cy="-90" r="3" fill="rgba(212,175,85,0.3)" />
          <circle cx="110" cy="-90" r="3" fill="rgba(212,175,85,0.3)" />
          <circle cx="90" cy="-110" r="3" fill="rgba(212,175,85,0.3)" />
          <circle cx="130" cy="-75" r="3" fill="rgba(212,175,85,0.3)" />
          <line x1="70" y1="-90" x2="90" y2="-110" stroke="rgba(212,175,85,0.25)" />
          <line x1="110" y1="-90" x2="90" y2="-110" stroke="rgba(212,175,85,0.25)" />
          <line x1="70" y1="-90" x2="110" y2="-90" stroke="rgba(212,175,85,0.25)" />
          <line x1="110" y1="-90" x2="130" y2="-75" stroke="rgba(212,175,85,0.25)" />
        </g>
      </svg>
    </div>
  );
}

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

  const isInvestorView = audience !== "developer" || !hasDualContent;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-20 text-center">
      {/* Gold-themed background elements (investor view) */}
      {isInvestorView && (
        <>
          {/* Gold grid SVG background */}
          <GoldGridBackground />

          {/* Shooting stars */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            {SHOOTING_STARS.map((star, i) => (
              <div
                key={i}
                className="absolute opacity-0"
                style={{
                  top: star.top,
                  left: star.left,
                  width: star.width,
                  height: "1px",
                  background: `linear-gradient(90deg, ${star.gradient}, transparent)`,
                  transform: "rotate(-35deg)",
                  animation: `shootStar ${star.duration}s ease-in ${star.delay}s infinite`,
                }}
              />
            ))}
          </div>

          {/* Hero beams */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            {HERO_BEAMS.map((beam, i) => (
              <div
                key={i}
                className="absolute bottom-0 w-px opacity-0"
                style={{
                  left: beam.left,
                  height: beam.height,
                  background: `linear-gradient(to top, ${beam.gradient}, transparent)`,
                  transformOrigin: "bottom",
                  animation: `beamRise ${beam.duration}s ease-in-out ${beam.delay}s infinite`,
                }}
              />
            ))}
          </div>

          {/* Gold ambient orbs */}
          {GOLD_ORBS.map((orb, i) => (
            <motion.div
              key={`gold-orb-${i}`}
              className="pointer-events-none absolute rounded-full blur-[70px]"
              style={{
                width: orb.size,
                height: orb.size,
                top: orb.top,
                right: orb.right,
                left: orb.left,
                bottom: orb.bottom,
                background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
              }}
              animate={{
                opacity: [0.3, 0.7, 0.4, 0.8, 0.3],
                scale: [1, 1.15, 0.9, 1.1, 1],
              }}
              transition={{
                duration: orb.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1,
              }}
            />
          ))}
        </>
      )}

      {/* Default ambient orbs (developer view) */}
      {!isInvestorView && AMBIENT_ORBS.map((orb, i) => (
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
            className="flex flex-col items-center gap-3 text-sm text-[#86868b]"
          >
            <span className="font-medium text-[#f5f5f7]">{content.team}</span>
            <span>
              {content.event} · {content.date}
            </span>
          </motion.div>

          {/* System Architecture CTA */}
          <motion.button
            variants={fadeUpItem}
            className="mt-4 rounded-xl border border-[#6AE4FF]/30 bg-[rgba(106,228,255,0.06)] px-6 py-2.5 text-sm font-medium text-[#6AE4FF] transition-all hover:border-[#6AE4FF]/50 hover:bg-[rgba(106,228,255,0.12)]"
          >
            시스템 아키텍처 개요 →
          </motion.button>
        </motion.div>
      ) : (
        /* Investor / default view — Gold theme */
        <>
          {/* Hero emblem (gavel + neural network) */}
          <HeroEmblem />

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="animate-gradient-text relative z-10 mb-2 text-7xl font-bold tracking-tight"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(212,175,85,1), #f5f5f7, rgba(212,175,85,1), #f5f5f7)",
            }}
          >
            {displayTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10 mb-10 text-sm font-medium uppercase tracking-[0.35em]"
            style={{ color: "rgba(212,175,85,0.8)" }}
          >
            LEGAL PRESIDENT AI
          </motion.p>

          {subtitleChars.length > 0 && (
            <motion.p
              className="relative z-10 mb-6 max-w-[640px] text-xl leading-relaxed"
              style={{ color: "rgba(245,245,247,0.75)" }}
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
              <span className="typewriter-cursor-gold" />
            </motion.p>
          )}

          {/* Gold divider line with shimmer */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative z-10 mx-auto mb-12 h-px w-[120px] overflow-hidden"
            style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,85,0.6), transparent)" }}
          >
            <div
              className="absolute -top-px h-[3px] w-[60%]"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(212,175,85,0.9), transparent)",
                animation: "lineShimmer 4s ease-in-out infinite",
              }}
            />
          </motion.div>

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
