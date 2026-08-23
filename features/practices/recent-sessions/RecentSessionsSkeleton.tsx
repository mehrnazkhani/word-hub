import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type RecentSessionsSkeletonProps = {
  count?: number;
};

export function RecentSessionsSkeleton({
  count = 3,
}: RecentSessionsSkeletonProps) {
  return (
    <Fragment>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex min-w-0 items-center gap-2 py-3 md:gap-3.5",
            i < count - 1 && "border-b",
          )}
        >
          <Skeleton className="h-2.5 w-12 shrink-0 md:h-3 md:w-16" />
          <Skeleton className="size-7 shrink-0 rounded-full md:size-8" />

          <div className="min-w-0 flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-24 md:h-4 md:w-28" />
            <Skeleton className="h-3 w-16 md:w-20" />
          </div>

          <div className="flex shrink-0 items-center space-x-1.5 md:space-x-5">
            <StatSkeleton />
            <Separator orientation="vertical" className="h-5!" />
            <StatSkeleton />
          </div>

          <Skeleton className="h-2.5 w-12 shrink-0 md:h-3 md:w-16" />
        </div>
      ))}
    </Fragment>
  );
}

type StatSkeletonProps = {
  className?: string;
};

const StatSkeleton = ({ className }: StatSkeletonProps) => (
  <div className={cn("flex flex-col items-center gap-0.5 md:gap-1", className)}>
    <Skeleton className="size-3 md:size-3.5" />
    <Skeleton className="h-3 w-6 md:h-3.5 md:w-8" />
  </div>
);
