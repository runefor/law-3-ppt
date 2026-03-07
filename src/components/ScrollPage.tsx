"use client";

import type { Slide } from "@/data/slides";
import { AudienceProvider, useAudience } from "@/contexts/AudienceContext";
import ScrollSection from "./ScrollSection";
import StickyNav from "./StickyNav";

import HeroSlide from "./slides/HeroSlide";
import ListMinimalSlide from "./slides/ListMinimalSlide";
import SplitTwoColumnSlide from "./slides/SplitTwoColumnSlide";
import CardsRowSlide from "./slides/CardsRowSlide";
import ThreeColumnSlide from "./slides/ThreeColumnSlide";
import DiagramFullscreenSlide from "./slides/DiagramFullscreenSlide";
import FeatureSplitSlide from "./slides/FeatureSplitSlide";
import GridCardsSlide from "./slides/GridCardsSlide";
import FlowDiagramSlide from "./slides/FlowDiagramSlide";
import StatsCountupSlide from "./slides/StatsCountupSlide";
import StatsHighlightSlide from "./slides/StatsHighlightSlide";
import ProgressBarsSlide from "./slides/ProgressBarsSlide";
import ScreenshotFullSlide from "./slides/ScreenshotFullSlide";
import LiveDemoSlide from "./slides/LiveDemoSlide";
import TimelineRoadmapSlide from "./slides/TimelineRoadmapSlide";
import MinimalCenterSlide from "./slides/MinimalCenterSlide";
import ServiceLandscapeSlide from "./slides/ServiceLandscapeSlide";
import BurndownChartSlide from "./slides/BurndownChartSlide";
import GanttMilestoneSlide from "./slides/GanttMilestoneSlide";
import BarChartSlide from "./slides/BarChartSlide";
import ChallengeLogSlide from "./slides/ChallengeLogSlide";
import ChallengeSolutionSlide from "./slides/ChallengeSolutionSlide";

import TriptychCardsSlide from "./slides/TriptychCardsSlide";
import VisionFlowSlide from "./slides/VisionFlowSlide";
import CtStepperSlide from "./slides/CtStepperSlide";
import DataPipelineSlide from "./slides/DataPipelineSlide";
import RolePlatformSlide from "./slides/RolePlatformSlide";
import DualTrackSlide from "./slides/DualTrackSlide";
import VideoShowcaseSlide from "./slides/VideoShowcaseSlide";
import StrategicAssetsSlide from "./slides/StrategicAssetsSlide";
import ThreePillarsSlide from "./slides/ThreePillarsSlide";
import RagPipelineSlide from "./slides/RagPipelineSlide";
import OnnxOptimizationSlide from "./slides/OnnxOptimizationSlide";
import RecursiveCteSlide from "./slides/RecursiveCteSlide";
import SummaryVisionSlide from "./slides/SummaryVisionSlide";
import ScaleProofSlide from "./slides/ScaleProofSlide";
import CostManagementSlide from "./slides/CostManagementSlide";
import TeamIntroSlide from "./slides/TeamIntroSlide";
import RetrospectiveSlide from "./slides/RetrospectiveSlide";
import StrategyRadialSlide from "./slides/StrategyRadialSlide";

interface NavSection {
  label: string;
  slideId: number;
}

interface ScrollPageProps {
  slides: Slide[];
  navSections: NavSection[];
  useAudienceFilter?: boolean;
}

const layoutComponents: Record<
  string,
  React.ComponentType<{ slide: Slide }>
> = {
  "hero-fullscreen": HeroSlide,
  "list-minimal": ListMinimalSlide,
  "split-two-column": SplitTwoColumnSlide,
  "cards-row": CardsRowSlide,
  "three-column": ThreeColumnSlide,
  "diagram-fullscreen": DiagramFullscreenSlide,
  "feature-split": FeatureSplitSlide,
  "grid-cards": GridCardsSlide,
  "flow-diagram": FlowDiagramSlide,
  "stats-countup": StatsCountupSlide,
  "stats-highlight": StatsHighlightSlide,
  "progress-bars": ProgressBarsSlide,
  "screenshot-full": ScreenshotFullSlide,
  "live-demo": LiveDemoSlide,
  "timeline-roadmap": TimelineRoadmapSlide,
  "service-landscape": ServiceLandscapeSlide,
  "minimal-center": MinimalCenterSlide,
  "burndown-chart": BurndownChartSlide,
  "gantt-milestone": GanttMilestoneSlide,
  "bar-chart": BarChartSlide,
  "challenge-log": ChallengeLogSlide,
  "challenge-solution": ChallengeSolutionSlide,
  "triptych-cards": TriptychCardsSlide,
  "vision-flow": VisionFlowSlide,
  "ct-stepper": CtStepperSlide,
  "data-pipeline": DataPipelineSlide,
  "role-platform": RolePlatformSlide,
  "dual-track": DualTrackSlide,
  "video-showcase": VideoShowcaseSlide,
  "strategic-assets": StrategicAssetsSlide,
  "three-pillars": ThreePillarsSlide,
  "rag-pipeline": RagPipelineSlide,
  "onnx-optimization": OnnxOptimizationSlide,
  "recursive-cte": RecursiveCteSlide,
  "summary-vision": SummaryVisionSlide,
  "scale-proof": ScaleProofSlide,
  "cost-management": CostManagementSlide,
  "team-intro": TeamIntroSlide,
  "retrospective": RetrospectiveSlide,
  "strategy-radial": StrategyRadialSlide,
};

const fullHeightLayouts = new Set([
  "hero-fullscreen",
  "minimal-center",
  "live-demo",
]);

function AudienceSlideRenderer({ slides: slideData }: { slides: Slide[] }) {
  const { audience } = useAudience();

  const filteredSlides = slideData.filter((slide) => {
    const a = slide.audience || "both";
    if (a === "both") return true;
    return a === audience;
  });

  return (
    <>
      {filteredSlides.map((slide) => {
        const SlideComponent = layoutComponents[slide.layout];
        if (!SlideComponent) return null;

        return (
          <ScrollSection
            key={slide.id}
            id={`slide-${slide.id}`}
            fullHeight={fullHeightLayouts.has(slide.layout)}
          >
            <SlideComponent slide={slide} />
          </ScrollSection>
        );
      })}
    </>
  );
}

function PlainSlideRenderer({ slides: slideData }: { slides: Slide[] }) {
  return (
    <>
      {slideData.map((slide) => {
        const SlideComponent = layoutComponents[slide.layout];
        if (!SlideComponent) return null;

        return (
          <ScrollSection
            key={slide.id}
            id={`slide-${slide.id}`}
            fullHeight={fullHeightLayouts.has(slide.layout)}
          >
            <SlideComponent slide={slide} />
          </ScrollSection>
        );
      })}
    </>
  );
}

export default function ScrollPage({
  slides: slideData,
  navSections,
  useAudienceFilter = false,
}: ScrollPageProps) {
  const content = (
    <div data-scroll-container className="relative bg-black h-screen overflow-y-auto snap-y snap-mandatory">
      <StickyNav sections={navSections} showAudienceToggle={useAudienceFilter} />
      {useAudienceFilter ? (
        <AudienceSlideRenderer slides={slideData} />
      ) : (
        <PlainSlideRenderer slides={slideData} />
      )}
    </div>
  );

  if (useAudienceFilter) {
    return <AudienceProvider>{content}</AudienceProvider>;
  }

  return content;
}
