"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { useAudience } from "@/contexts/AudienceContext";
import { assetPath } from "@/lib/assetPath";
import {
  VP_DEFAULT,
  SPRING_BOUNCE,
  staggerContainer,
} from "@/lib/animations";

interface ProblemCard {
  image: string;
  title: string;
  description: string;
}

interface AgentInfo {
  name: string;
  desc: string;
  badge: string;
}

export default function TriptychCardsSlide({ slide }: { slide: Slide }) {
  const { audience } = useAudience();
  const content = slide.content as {
    investorCards: ProblemCard[];
    developerTitle: string;
    developerSubtitle: string;
    agents: AgentInfo[];
  };

  return (
    <div className="flex flex-col items-center py-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        className="mb-8 max-w-4xl text-center text-3xl font-bold text-[#f5f5f7]"
      >
        {audience === "developer" ? content.developerTitle : slide.title}
      </motion.h2>

      {audience === "developer" && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP_DEFAULT}
          className="mb-6 text-center text-base text-[#86868b]"
        >
          {content.developerSubtitle}
        </motion.p>
      )}

      {audience === "investor" ? (
        <motion.div
          className="grid grid-cols-3 gap-6"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={VP_DEFAULT}
        >
          {content.investorCards.map((card, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: SPRING_BOUNCE },
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="overflow-hidden rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={assetPath(card.image)}
                  alt={card.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-lg font-bold text-[#f5f5f7]">
                  {card.title}
                </h3>
                <p className="text-sm text-[#86868b]">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-4 gap-3 max-w-4xl"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VP_DEFAULT}
        >
          {content.agents.map((agent, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: SPRING_BOUNCE },
              }}
              whileHover={{ y: -3, borderColor: "rgba(106,228,255,0.4)" }}
              className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-4"
            >
              <div className="mb-1 text-sm font-bold text-[#6AE4FF]">
                {agent.name}
              </div>
              <div className="mb-2 text-xs text-[#86868b]">{agent.desc}</div>
              <span className="inline-block rounded-full bg-[#0071E3]/20 px-2 py-0.5 text-xs font-medium text-[#6AE4FF]">
                {agent.badge}
              </span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
