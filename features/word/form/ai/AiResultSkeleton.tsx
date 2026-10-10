import { Skeleton } from "@/components/ui/skeleton";

const lines = [
  { h: "h-3", w: "w-1/4" },
  { h: "h-4", w: "w-3/4" },
  { h: "h-4", w: "w-1/2" },
  { h: "h-4", w: "w-2/3" },
];

export const AiResultSkeleton = () => (
  <div className="space-y-4">
    {lines.map((line, index) => (
      <Skeleton
        key={index}
        className={`${line.h} ${line.w}`}
        style={{
          backgroundColor: `color-mix(in srgb, var(--muted) ${
            100 - index * 20
          }%, transparent)`,
        }}
      />
    ))}
  </div>
);
