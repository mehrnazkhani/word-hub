import { PracticeModes } from "@/features/practices/practice-modes/PracticeModes";
import { Charts } from "@/features/practices/charts-sessions/Charts";
import { RecentSessions } from "@/features/practices/recent-sessions/RecentSessions";

export default function PracticePage() {
  return (
    <div className="mx-auto mb-5 flex max-w-4xl flex-col gap-8 px-5">
      <PracticeModes />
      <Charts />
      <RecentSessions />
    </div>
  );
}
