"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Flame, CheckCircle2, Target, Clock } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChartBar } from "./chart-bar/ChartBar";
import { ChartLine } from "./line-chart/LineChart";

// ── data ──────────────────────────────────────────────────
const weeklyData = [
  { day: "Mon", sessions: 25 },
  { day: "Tue", sessions: 40 },
  { day: "Wed", sessions: 60 },
  { day: "Thu", sessions: 55 },
  { day: "Fri", sessions: 90 },
  { day: "Sat", sessions: 85 },
  { day: "Sun", sessions: 65 },
];

const masteryData = [
  { name: "Learned", value: 72, words: 864, color: "#ffffff" },
  { name: "In Progress", value: 18, words: 216, color: "#555555" },
  { name: "Not Learned", value: 10, words: 120, color: "#2a2a2a" },
];

const metrics = [
  { label: "Practice Streak", value: "12", sub: "Days", icon: Flame },
  { label: "Completed", value: "842", sub: "Sessions", icon: CheckCircle2 },
  { label: "Accuracy", value: "91%", sub: "Average", icon: Target },
  { label: "Time Spent", value: "18h 42m", sub: "This week", icon: Clock },
];

// ── custom tooltips ───────────────────────────────────────
function AreaTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-[#2a2a2a] bg-[#111] px-3 py-1.5 text-xs text-neutral-400">
      <span className="font-semibold text-white">{payload[0].value}</span> on{" "}
      {label}
    </div>
  );
}

// ── component ─────────────────────────────────────────────
export function Charts() {
  return (
    <section>
      <h2 className="mb-3 text-base font-semibold tracking-tight">
        Statistics
      </h2>

      {/* charts row */}
      <div className="mb-2.5 grid grid-cols-2 gap-2.5">
        {/* weekly activity */}
        <ChartLine />
        {/* <ChartBar /> */}
        {/* <Card className="border-[#1e1e1e] bg-[#111111]">
          <CardContent className="p-4">
            <p className="mb-3 text-[10px] tracking-widest text-neutral-600 uppercase">
              Weekly Activity
            </p>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart
                data={weeklyData}
                margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#444", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#333", fontSize: 9 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
                />
                <Tooltip
                  content={<AreaTooltip />}
                  cursor={{ stroke: "#2e2e2e", strokeWidth: 1 }}
                />
                <Area
                  type="monotone"
                  dataKey="sessions"
                  stroke="#ffffff"
                  strokeWidth={1.5}
                  fill="url(#areaGrad)"
                  dot={{ r: 3, fill: "#fff", strokeWidth: 0 }}
                  activeDot={{ r: 4, fill: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}

        {/* vocabulary progress */}
        <Card className="border-[#1e1e1e] bg-[#111111]">
          <CardContent className="p-4">
            <p className="mb-3 text-[10px] tracking-widest text-neutral-600 uppercase">
              Vocabulary Progress
            </p>
            <div className="mt-1 flex items-center gap-4">
              {/* donut */}
              <div className="relative h-27.5 w-27.5 shrink-0">
                <ResponsiveContainer width={110} height={110}>
                  <PieChart>
                    <Pie
                      data={masteryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={36}
                      outerRadius={52}
                      dataKey="value"
                      strokeWidth={0}
                      startAngle={90}
                      endAngle={-270}
                    >
                      {masteryData.map((d, i) => (
                        <Cell key={i} fill={d.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold tracking-tight">72%</span>
                </div>
              </div>

              {/* legend */}
              <div className="flex flex-1 flex-col gap-2.5">
                {masteryData.map((d) => (
                  <div key={d.name}>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{
                          background: d.color,
                          border:
                            d.color === "#2a2a2a"
                              ? "1px solid #444"
                              : undefined,
                        }}
                      />
                      <span className="text-sm font-medium">{d.value}%</span>
                      <span className="text-xs text-neutral-600">{d.name}</span>
                    </div>
                    <p className="mt-0.5 pl-3.5 text-[10px] text-neutral-700">
                      {d.words.toLocaleString()} words
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
