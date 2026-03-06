"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { useAudience } from "@/contexts/AudienceContext";
import { VP_DEFAULT, staggerContainer, fadeUpItem } from "@/lib/animations";

interface InvestorStat {
  icon: string;
  value: number;
  suffix: string;
  label: string;
}

interface DataSource {
  icon: string;
  name: string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function CountUpValue({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / 2000, 1);
            setVal(Math.round(easeOutCubic(progress) * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-3xl font-bold text-[#6AE4FF]">
      {val.toLocaleString()}{suffix}
    </div>
  );
}

export default function ScaleProofSlide({ slide }: { slide: Slide }) {
  const { audience } = useAudience();
  const content = slide.content as {
    investorStats: InvestorStat[];
    dataSources: DataSource[];
    developerTitle: string;
    pride: Array<{ title: string; description: string }>;
    backlog: Array<{ title: string; description: string }>;
  };

  return (
    <div className="flex flex-col items-center py-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        className="mb-6 text-center text-3xl font-bold text-[#f5f5f7]"
      >
        {audience === "developer" ? content.developerTitle : slide.title}
      </motion.h2>

      {audience === "investor" ? (
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VP_DEFAULT}
          className="flex flex-col items-center gap-8 max-w-4xl w-full"
        >
          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-4 w-full">
            {content.investorStats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUpItem}
                whileHover={{ y: -3 }}
                className="flex flex-col items-center rounded-2xl bg-white/5 border border-white/10 p-5 text-center"
              >
                <span className="mb-2 text-2xl">{stat.icon}</span>
                <CountUpValue target={stat.value} suffix={stat.suffix} />
                <span className="mt-1 text-xs text-[#86868b]">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Data sources */}
          <motion.div variants={fadeUpItem} className="flex flex-wrap justify-center gap-3">
            {content.dataSources.map((ds, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-[#86868b]"
              >
                <span>{ds.icon}</span>
                {ds.name}
              </span>
            ))}
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VP_DEFAULT}
          className="grid grid-cols-2 gap-6 max-w-4xl w-full"
        >
          {/* Pride */}
          <motion.div variants={fadeUpItem} className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-lg">🚀</span>
              <span className="text-sm font-bold text-[#30E7A9]">기술적 성취</span>
            </div>
            {content.pride.map((item, i) => (
              <div key={i} className="mb-3">
                <h4 className="text-sm font-bold text-[#f5f5f7] mb-1">{item.title}</h4>
                <p className="text-xs text-[#86868b] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </motion.div>

          {/* Backlog */}
          <motion.div variants={fadeUpItem} className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-lg">🧭</span>
              <span className="text-sm font-bold text-[#6AE4FF]">향후 과제</span>
            </div>
            {content.backlog.map((item, i) => (
              <div key={i} className="mb-3">
                <h4 className="text-sm font-bold text-[#f5f5f7] mb-1">{item.title}</h4>
                <p className="text-xs text-[#86868b] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
