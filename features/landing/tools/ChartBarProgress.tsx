"use client";

import { FeatureShowcaseContainer } from "./FeatureShowcaseContainer";

const BARS = [22, 28, 62, 78, 38, 80, 26, 58, 24, 92];

const getBarColor = (i: number, total: number) => {
  const third = total / 3;
  if (i < third) return "bg-accent-foreground/20 hover:bg-accent-foreground/40";
  if (i < third * 2)
    return "bg-accent-foreground/40 hover:bg-accent-foreground/60";
  return "bg-accent-foreground/50 hover:bg-accent-foreground/80";
};

export const ChartBarProgress = () => {
  return (
    <FeatureShowcaseContainer
      title="Your Progress at a Glance"
      description="See how consistent you've been — track your practice sessions over the last 7 days and keep your streak going."
      position="right"
    >
      <div className="flex h-24 items-center justify-center gap-4">
        {BARS.map((h, i) => (
          <div
            key={i}
            className="flex h-full cursor-pointer flex-col justify-end"
          >
            <div
              className={`w-4 rounded-sm transition-all duration-300 ${getBarColor(i, BARS.length)}`}
              style={{ height: `${h}px` }}
            />
          </div>
        ))}
      </div>
    </FeatureShowcaseContainer>
  );
};
