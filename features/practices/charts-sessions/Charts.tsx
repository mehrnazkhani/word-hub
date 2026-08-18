"use client";

import { ChartBar } from "./ChartBar";
import { ChartPie } from "./ChartPie";

export function Charts() {
  return (
    <section className="space-y-3">
      <h2 className="font-semibold">Charts</h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <ChartBar />
        <ChartPie />
      </div>
    </section>
  );
}
