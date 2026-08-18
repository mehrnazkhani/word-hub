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
            "flex items-center gap-3.5 py-3.5",
            i < count - 1 && "border-b",
          )}
        >
          <Skeleton className="h-3 w-16" />
          <Skeleton className="size-8 shrink-0 rounded-full" />

          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>

          <div className="flex items-center space-x-5">
            <StatSkeleton />
            <Separator orientation="vertical" className="h-8!" />
            <StatSkeleton />
          </div>

          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </Fragment>
  );
}

type StatSkeletonProps = {
  className?: string;
};

const StatSkeleton = ({ className }: StatSkeletonProps) => (
  <div className={cn("flex flex-col items-center gap-2", className)}>
    <Skeleton className="size-3" />
    <Skeleton className="h-4 w-8" />
  </div>
);
