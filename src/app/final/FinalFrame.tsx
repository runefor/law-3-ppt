"use client";

import { useSearchParams } from "next/navigation";
import { assetPath } from "@/lib/assetPath";

const FORWARDED_PARAMS = ["audience", "presenter"] as const;

export default function FinalFrame() {
  const searchParams = useSearchParams();
  const forwarded = new URLSearchParams();

  for (const key of FORWARDED_PARAMS) {
    const value = searchParams.get(key);
    if (value) {
      forwarded.set(key, value);
    }
  }

  const query = forwarded.toString();
  const src = `${assetPath("/final-presentation/pitch.html")}${query ? `?${query}` : ""}`;

  return (
    <div className="h-[100svh] w-full overflow-hidden bg-black">
      <iframe
        src={src}
        title="법률 대통령 최종 발표"
        className="h-full w-full border-0"
      />
    </div>
  );
}
