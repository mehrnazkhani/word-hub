"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { format, eachDayOfInterval, subDays } from "date-fns";

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
import { useWeeklyPractices } from "@/queries/practice/weeklyPracticesQuery";

const chartConfig = {
  activities: {
    label: "Questions",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const FALLBACK_DATA = eachDayOfInterval({
  start: subDays(new Date(), 6),
  end: new Date(),
}).map((date) => ({
  day: format(date, "EEE"),
  activities: 0,
}));

export function ChartBar() {
  const { data, isPending } = useWeeklyPractices();

  const chartData = useMemo(() => {
    if (!data?.data) return FALLBACK_DATA;

    const questionsPerDay = new Map<string, number>();

    data.data.forEach((practice) => {
      const day = format(new Date(practice.created_at), "yyyy-MM-dd");
      questionsPerDay.set(
        day,
        (questionsPerDay.get(day) ?? 0) + (practice.total_questions ?? 0),
      );
    });

    return eachDayOfInterval({
      start: subDays(new Date(), 6),
      end: new Date(),
    }).map((date) => ({
      day: format(date, "EEE"),
      activities: questionsPerDay.get(format(date, "yyyy-MM-dd")) ?? 0,
    }));
  }, [data]);

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle className="text-xs">Weekly Activity</CardTitle>

        <CardDescription className="text-xs">
          {" "}
          {isPending ? "Loading..." : "Last 7 days"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDecimals={false}
              width={20}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="activities"
              fill="var(--color-activities)"
              radius={4}
              opacity={isPending ? 0.5 : 1}
              maxBarSize={16}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
