import ScrollPage from "@/components/ScrollPage";
import { slides } from "@/data/slides";

const MIDTERM_NAV_SECTIONS = [
  { label: "배경", slideId: 3 },
  { label: "솔루션", slideId: 6 },
  { label: "아키텍처", slideId: 10 },
  { label: "데이터", slideId: 14 },
  { label: "데모", slideId: 16 },
  { label: "진행", slideId: 23 },
];

export default function MidtermPage() {
  return (
    <ScrollPage
      slides={slides}
      navSections={MIDTERM_NAV_SECTIONS}
    />
  );
}
