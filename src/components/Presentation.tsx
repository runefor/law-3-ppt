"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { slides } from "@/data/slides";
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
import TimelineRoadmapSlide from "./slides/TimelineRoadmapSlide";
import MinimalCenterSlide from "./slides/MinimalCenterSlide";
import ChallengeLogSlide from "./slides/ChallengeLogSlide";
import ChallengeSolutionSlide from "./slides/ChallengeSolutionSlide";

const layoutComponents: Record<string, React.ComponentType<{ slide: typeof slides[0] }>> = {
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
  "timeline-roadmap": TimelineRoadmapSlide,
  "minimal-center": MinimalCenterSlide,
  "challenge-log": ChallengeLogSlide,
  "challenge-solution": ChallengeSolutionSlide,
};

const slideVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function Presentation() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  const handleClick = (e: React.MouseEvent) => {
    const x = e.clientX;
    const width = window.innerWidth;
    if (x < width * 0.2) {
      goPrev();
    } else if (x > width * 0.8) {
      goNext();
    }
  };

  const slide = slides[currentIndex];
  const SlideComponent = layoutComponents[slide.layout];

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-black"
      onClick={handleClick}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full w-full"
        >
          {SlideComponent ? (
            <SlideComponent slide={slide} />
          ) : (
            <div className="flex h-full items-center justify-center text-white">
              <p>Unknown layout: {slide.layout}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Section badge */}
      <div className="absolute left-8 top-6 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-[#86868b]">
        {slide.section}
      </div>

      {/* Dot indicator */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "w-6 bg-white"
                : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Slide number */}
      <div className="absolute bottom-6 right-8 text-xs text-[#86868b]">
        {currentIndex + 1} / {slides.length}
      </div>
    </div>
  );
}
