"use client";

import { Pie, PieChart } from "recharts";
import { useMemo } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useUserWordsScore } from "@/queries/words/score/userWordsScoreQuery";

const chartConfig = {
  count: { label: "Words" },
  notLearned: {
    label: "Not Learned",
    color: "var(--chart-3)",
  },
  learning: {
    label: "In Progress",
    color: "var(--chart-2)",
  },
  mastered: {
    label: "Learned",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const FALLBACK_DATA = [
  { status: "notLearned", count: 0, fill: "var(--color-notLearned)" },
  { status: "learning", count: 0, fill: "var(--color-learning)" },
  { status: "mastered", count: 100, fill: "var(--color-mastered)" },
];

const FALLBACK_STATS = {
  mastered: 0,
  learning: 0,
  notLearned: 0,
  masteredPercent: 0,
  learningPercent: 0,
  notLearnedPercent: 100,
};

export function ChartPie() {
  const { data, isPending } = useUserWordsScore();

  const { chartData, stats } = useMemo(() => {
    if (!data?.data) {
      return { chartData: FALLBACK_DATA, stats: FALLBACK_STATS };
    }

    const result = { mastered: 0, learning: 0, notLearned: 0 };

    data.data.forEach(({ score }) => {
      if (score === 0) result.notLearned++;
      else if (score === 10) result.mastered++;
      else result.learning++;
    });

    const total = result.mastered + result.learning + result.notLearned;

    return {
      chartData: [
        {
          status: "mastered",
          count: result.mastered,
          fill: "var(--color-mastered)",
        },
        {
          status: "learning",
          count: result.learning,
          fill: "var(--color-learning)",
        },
        {
          status: "notLearned",
          count: result.notLearned,
          fill: "var(--color-notLearned)",
        },
      ],
      stats: {
        ...result,
        masteredPercent:
          total === 0 ? 0 : Math.round((result.mastered / total) * 100),
        learningPercent:
          total === 0 ? 0 : Math.round((result.learning / total) * 100),
        notLearnedPercent:
          total === 0 ? 0 : Math.round((result.notLearned / total) * 100),
      },
    };
  }, [data]);

  const legendItems = [
    {
      key: "mastered",
      ...chartConfig.mastered,
      percent: stats.masteredPercent,
      count: stats.mastered,
    },
    {
      key: "learning",
      ...chartConfig.learning,
      percent: stats.learningPercent,
      count: stats.learning,
    },
    {
      key: "notLearned",
      ...chartConfig.notLearned,
      percent: stats.notLearnedPercent,
      count: stats.notLearned,
    },
  ];

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle className="text-xs">Words Progress</CardTitle>
        <CardDescription className="text-xs">
          {isPending ? "Loading..." : "Track how well you're retaining words"}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex items-center justify-center gap-5 py-5">
        <ChartContainer config={chartConfig} className="h-40 w-40 shrink-0">
          <PieChart width={160} height={160}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={32}
              outerRadius={58}
            />
          </PieChart>
        </ChartContainer>

        <div className="flex flex-col gap-6">
          {legendItems.map(({ key, color, label, percent, count }) => (
            <LegendItem
              key={key}
              color={color}
              label={label}
              percent={percent}
              count={count}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

type LegendItemProps = {
  color: string;
  label: string;
  percent: number;
  count: number;
};

function LegendItem({ color, label, percent, count }: LegendItemProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span
          className="size-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm font-medium">
          {percent}%{" "}
          <span className="text-xs text-accent-foreground/60">{label}</span>
        </span>
      </div>
      <p className="ml-4 text-xs text-accent-foreground/40">{count} words</p>
    </div>
  );
}
