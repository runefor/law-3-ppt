"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { VP_DEFAULT, staggerContainer, SPRING_BOUNCE } from "@/lib/animations";

interface TeamMember {
  name: string;
  role: string;
  title: string;
  description: string;
  quote: string;
  bio: string;
  gradient: string[];
  emoji: string;
}

export default function TeamIntroSlide({ slide }: { slide: Slide }) {
  const content = slide.content as { members: TeamMember[] };

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
        className="grid grid-cols-3 gap-5 max-w-5xl w-full"
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={VP_DEFAULT}
      >
        {content.members.map((member, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: SPRING_BOUNCE },
            }}
            whileHover={{ y: -4 }}
            className="flex flex-col rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-5 text-center"
          >
            {/* Avatar */}
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full text-3xl"
              style={{
                background: `linear-gradient(135deg, ${member.gradient[0]}30, ${member.gradient[1]}30)`,
                border: `2px solid ${member.gradient[0]}50`,
              }}
            >
              {member.emoji}
            </div>

            <div className="mb-1 text-xs font-bold uppercase tracking-wider"
              style={{ color: member.gradient[0] }}
            >
              {member.role}
            </div>
            <h3 className="mb-1 text-lg font-bold text-[#f5f5f7]">
              {member.name}
            </h3>
            <div className="mb-2 text-xs text-[#86868b]">{member.title}</div>
            <p className="mb-3 text-xs italic text-[#86868b]">
              &ldquo;{member.quote}&rdquo;
            </p>
            <p className="text-[10px] text-[#86868b] leading-relaxed">
              {member.bio}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
