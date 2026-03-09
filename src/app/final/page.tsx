import { Suspense } from "react";
import FinalFrame from "./FinalFrame";

function FinalPageFallback() {
  return <div className="h-[100svh] w-full overflow-hidden bg-black" />;
}

export default function FinalPage() {
  return (
    <Suspense fallback={<FinalPageFallback />}>
      <FinalFrame />
    </Suspense>
  );
}
