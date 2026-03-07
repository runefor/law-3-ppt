import ScrollPage from "@/components/ScrollPage";
import { finalSlides } from "@/data/finalSlides";

const FINAL_NAV_SECTIONS = [
  { label: "문제", slideId: 2 },
  { label: "솔루션", slideId: 4 },
  { label: "데모", slideId: 8 },
  { label: "기술", slideId: 9 },
  { label: "데이터", slideId: 15 },
  { label: "팀", slideId: 17 },
  { label: "전략", slideId: 19 },
];

export default function FinalPage() {
  return (
    <ScrollPage
      slides={finalSlides}
      navSections={FINAL_NAV_SECTIONS}
      useAudienceFilter
    />
  );
}
