"use client";

import { cn } from "@/lib/utils";
import { FeatureShowcaseContainer } from "./FeatureShowcaseContainer";

const SEGMENTS = [
  { pct: 45, opacity: 0.5, colorClass: "bg-accent-foreground/50" },
  { pct: 30, opacity: 0.3, colorClass: "bg-accent-foreground/30" },
  { pct: 25, opacity: 0.2, colorClass: "bg-accent-foreground/20" },
];

function DonutChart() {
  const size = 100;
  const strokeWidth = 24;
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  let offset = -90;
  const slices = SEGMENTS.map(({ pct, opacity }) => {
    const dash = (pct / 100) * circumference;
    const gap = circumference - dash;
    const rotation = offset;
    offset += (pct / 100) * 360;
    return { dash, gap, rotation, opacity };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="text-accent-foreground"
    >
      {slices.map((s, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeOpacity={s.opacity}
          strokeWidth={strokeWidth}
          strokeDasharray={`${s.dash} ${s.gap}`}
          strokeLinecap="butt"
          transform={`rotate(${s.rotation} ${cx} ${cy})`}
        />
      ))}
    </svg>
  );
}

export default function DonutLegend() {
  return (
    <FeatureShowcaseContainer
      title="Your Vocabulary at a Glance"
      description="Get a clear picture of your overall progress — see how many words you've mastered, how many are in progress, and how many are still waiting to be learned."
      position="right"
    >
      <div className="flex h-full w-full items-center justify-center gap-10">
        <DonutLegend.Donut />

        <div className="flex flex-col gap-4">
          {SEGMENTS.map((segment, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={cn("size-2 rounded-full", segment.colorClass)} />
              <div
                className={cn("h-2.5 w-24 rounded-full", segment.colorClass)}
              />
            </div>
          ))}
        </div>
      </div>
    </FeatureShowcaseContainer>
  );
}

DonutLegend.Donut = function Donut() {
  return <DonutChart />;
};
