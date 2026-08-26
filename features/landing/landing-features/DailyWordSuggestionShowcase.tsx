"use client";

import { useState } from "react";

import { Bookmark } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { FeatureShowcaseContainer } from "./FeatureShowcaseContainer";
import { cn } from "@/lib/utils";

const ROWS = [
  { colorClass: "bg-accent-foreground/50" },
  { colorClass: "bg-accent-foreground/30" },
  { colorClass: "bg-accent-foreground/20" },
];

export const DailyWordSuggestionShowcase = () => {
  const [saved, setSaved] = useState(false);

  return (
    <FeatureShowcaseContainer
      index="03 / Daily word"
      title="Discover a New Word Daily"
      description="Get a handpicked word each day - with meaning, example, and pronunciation - to keep your learning fresh and consistent."
      position="right"
    >
      <CardContent className="w-full space-y-5 py-2" aria-hidden="true">
        <div className="flex items-center gap-5">
          <CalendarCard />

          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium tracking-widest text-secondary-foreground/50 uppercase">
                Today's Word
              </span>

              <Bookmark
                onClick={() => setSaved((prev) => !prev)}

                className={cn(
                  "size-5 cursor-pointer text-foreground/80",
                  saved ? "fill-foreground/80" : "",
                )}
              />
            </div>

            <div className="flex flex-col gap-3">
              {ROWS.map((row, index) => (
                <p
                  key={index}
                  className={cn(
                    "h-3 rounded-full",
                    index === 0 && "w-1/3",
                    index === 1 && "w-2/3",
                    index === 2 && "w-full",
                    row.colorClass,
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </FeatureShowcaseContainer>
  );
};

export const CalendarCard = () => {
  return (
    <div className="relative flex h-24 w-20 shrink-0 items-center justify-center rounded-xl bg-foreground/5">
      {/* Header */}
      <div className="absolute inset-x-0 top-0 h-7 rounded-t-lg bg-foreground/10" />

      {/* Rings */}
      <div className="absolute -top-3 left-5 h-6 w-1.5 rounded-full bg-foreground/20" />
      <div className="absolute -top-3 right-5 h-6 w-1.5 rounded-full bg-foreground/20" />

      {/* Date */}
      <div className="z-10 mt-4 flex flex-col items-center">
        <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground">
          APR
        </span>

        <span className="text-2xl leading-none font-bold text-foreground/80">
          16
        </span>
      </div>
    </div>
  );
};
