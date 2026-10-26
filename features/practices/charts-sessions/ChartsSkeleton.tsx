import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ChartsSkeleton() {
  return (
    <>
      <Card className="bg-background">
        <CardHeader>
          <CardTitle className="text-xs">Weekly Activity</CardTitle>
          <CardDescription className="text-xs">Last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="aspect-video w-full" />
        </CardContent>
      </Card>

      <Card className="bg-background">
        <CardHeader>
          <CardTitle className="text-xs">Words Progress</CardTitle>
          <CardDescription className="text-xs">
            Track how well you&apos;re retaining words
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center gap-5 py-5">
          <Skeleton className="size-40 shrink-0 rounded-full" />

          <div className="flex flex-col gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <div className="flex items-center gap-2">
                  <Skeleton className="size-2.5 shrink-0 rounded-full" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="ml-4 h-4 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
