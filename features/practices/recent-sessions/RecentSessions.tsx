"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon, CircleCheck, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { IconBadge } from "@/components/ui/icon-badge";

import { RecentSessionsSkeleton } from "./RecentSessionsSkeleton";
import { useRecentPractices } from "@/queries/practice/recentPracticesQuery";
import { formatDate } from "@/lib/utils/formatDate";
import { formatDuration } from "@/lib/utils/formatDuration";
import { getPracticeIcon } from "@/constants/practice-modes";

const metaTextClass =
  "w-12 shrink-0 text-[10px] text-accent-foreground/50 sm:w-16 sm:text-xs";

export function RecentSessions() {
  const { data: recentPractices = [], isPending } = useRecentPractices();
  const isEmpty = !isPending && recentPractices.length === 0;

  return (
    <section className="space-y-3">
      <h2 className="font-semibold">Recent Sessions</h2>

      <div className="px-5">
        {isPending ? (
          <RecentSessionsSkeleton count={3} />
        ) : isEmpty ? (
          <div className="flex items-center justify-center text-sm text-accent-foreground/60">
            No practice sessions yet
          </div>
        ) : (
          recentPractices.map((recentPractice, i) => {
            const Icon = getPracticeIcon(recentPractice.practice_mode);

            return (
              <div
                key={recentPractice.id}
                className={cn(
                  "flex min-w-0 items-center gap-2 py-3 sm:gap-3.5",
                  i < recentPractices.length - 1 && "border-b",
                )}
              >
                <span className={cn(metaTextClass, "text-start")}>
                  {formatDate({ date: recentPractice.created_at })}
                </span>

                <IconBadge
                  icon={Icon}
                  badgeSize={7}
                  className="shrink-0 text-accent-foreground/60 sm:size-8"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium capitalize">
                    {recentPractice.practice_mode}
                  </p>

                  <p className="truncate text-[11px] text-accent-foreground/60 sm:text-xs">
                    <span>{recentPractice.total_questions} words</span> -{" "}
                    {recentPractice.category?.name ?? "Mixed"}
                  </p>
                </div>

                <div className="flex shrink-0 items-center space-x-1.5 sm:space-x-5">
                  <StatItem
                    icon={CircleCheck}
                    value={recentPractice.correct_count}
                    label="Correct"
                  />

                  <Separator orientation="vertical" className="h-5!" />

                  <StatItem
                    icon={XCircle}
                    value={recentPractice.incorrect_count}
                    label="Incorrect"
                  />
                </div>

                <span className={cn(metaTextClass, "text-end")}>
                  {formatDuration(recentPractice.duration)}
                </span>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

type StatItemProps = {
  icon: LucideIcon;
  value: string | number;
  label: string;
  className?: string;
};

const StatItem = ({ icon: Icon, value, label, className }: StatItemProps) => (
  <div
    className={cn("flex flex-col items-center gap-0.5 sm:gap-1", className)}
    aria-label={label}
  >
    <Icon className="size-3.5 text-accent-foreground/60" />

    <span className="text-xs whitespace-nowrap tabular-nums sm:text-sm">
      {value}
    </span>
  </div>
);
