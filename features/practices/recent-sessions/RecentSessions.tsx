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
                  "flex items-center gap-3.5 py-3.5",
                  i < recentPractices.length - 1 && "border-b",
                )}
              >
                <span className="w-16 text-xs text-accent-foreground/50">
                  {formatDate({ date: recentPractice.created_at })}
                </span>

                <IconBadge
                  icon={Icon}
                  badgeSize={8}
                  className="text-accent-foreground/60"
                />

                <div className="flex-1 space-y-1">
                  <p className="font-medium">{recentPractice.practice_mode}</p>
                  <p className="truncate text-xs text-accent-foreground/60">
                    {recentPractice.category?.name ?? "Mixed"} -{" "}
                    <span>{recentPractice.total_questions} words</span>
                  </p>
                </div>

                <div className="flex items-center space-x-5">
                  <StatItem
                    icon={CircleCheck}
                    value={recentPractice.correct_count}
                    label="Correct"
                  />
                  <Separator orientation="vertical" className="h-8!" />
                  <StatItem
                    icon={XCircle}
                    value={recentPractice.incorrect_count}
                    label="Incorrect"
                  />
                </div>

                <span className="w-16 text-end text-xs text-accent-foreground/50">
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
    className={cn("flex flex-col items-center gap-1", className)}
    aria-label={label}
  >
    <Icon className="size-3 text-accent-foreground/60" />
    <span className="text-sm whitespace-nowrap tabular-nums">{value}</span>
  </div>
);
