"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";

const LawyerFinderDemo = dynamic(
  () => import("@/components/demos/LawyerFinderDemo"),
  { ssr: false, loading: () => <DemoLoading /> }
);
const LawyerStatsDemo = dynamic(
  () => import("@/components/demos/LawyerStatsDemo"),
  { ssr: false, loading: () => <DemoLoading /> }
);
const StatuteHierarchyDemo = dynamic(
  () => import("@/components/demos/StatuteHierarchyDemo"),
  { ssr: false, loading: () => <DemoLoading /> }
);
const CasePrecedentDemo = dynamic(
  () => import("@/components/demos/CasePrecedentDemo"),
  { ssr: false, loading: () => <DemoLoading /> }
);
const StoryboardDemo = dynamic(
  () => import("@/components/demos/StoryboardDemo"),
  { ssr: false, loading: () => <DemoLoading /> }
);
const SmallClaimsDemo = dynamic(
  () => import("@/components/demos/SmallClaimsDemo"),
  { ssr: false, loading: () => <DemoLoading /> }
);

function DemoLoading() {
  return (
    <div className="flex h-[600px] items-center justify-center rounded-2xl border border-white/10 bg-[#1d1d1f]">
      <span className="text-sm text-[#86868b]">로딩 중...</span>
    </div>
  );
}

const demoComponents: Record<string, React.ComponentType> = {
  "lawyer-finder": LawyerFinderDemo,
  "lawyer-stats": LawyerStatsDemo,
  "statute-hierarchy": StatuteHierarchyDemo,
  "case-precedent": CasePrecedentDemo,
  "storyboard": StoryboardDemo,
  "small-claims": SmallClaimsDemo,
};

const vp = { once: true, amount: 0.1 } as const;

export default function LiveDemoSlide({ slide }: { slide: Slide }) {
  const { demoKey } = slide.content as { demoKey: string };
  const DemoComponent = demoComponents[demoKey];

  return (
    <div className="flex flex-col py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-4xl font-bold text-[#f5f5f7]">{slide.title}</h2>
        {slide.subtitle && (
          <p className="mt-2 text-lg text-[#86868b]">{slide.subtitle}</p>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {DemoComponent ? (
          <DemoComponent />
        ) : (
          <div className="flex h-[600px] items-center justify-center rounded-2xl border border-white/10 bg-[#1d1d1f]">
            <span className="text-[#86868b]">데모를 찾을 수 없습니다: {demoKey}</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
