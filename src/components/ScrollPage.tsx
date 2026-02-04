"use client";

import { slides } from "@/data/slides";
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

const layoutComponents: Record<
  string,
  React.ComponentType<{ slide: (typeof slides)[0] }>
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
};

const fullHeightLayouts = new Set(["hero-fullscreen", "minimal-center", "live-demo"]);

export default function ScrollPage() {
  return (
    <div className="relative bg-black h-screen overflow-y-auto snap-y snap-mandatory">
      <StickyNav />
      {slides.map((slide) => {
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
    </div>
  );
}
