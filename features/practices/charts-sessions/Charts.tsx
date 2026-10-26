"use client";

import dynamic from "next/dynamic";

import { ChartsSkeleton } from "./ChartsSkeleton";

const ChartsContent = dynamic(
  () => import("./ChartsContent").then((mod) => mod.ChartsContent),
  {
    ssr: false,
    loading: () => <ChartsSkeleton />,
  },
);

export function Charts() {
  return (
    <section className="space-y-3">
      <h2 className="font-semibold">Charts</h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <ChartsContent />
      </div>
    </section>
  );
}
