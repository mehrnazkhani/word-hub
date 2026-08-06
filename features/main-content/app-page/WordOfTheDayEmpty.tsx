import { Settings, CalendarX } from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";

export const WordOfTheDayEmpty = () => {
  return (
    <div className="flex flex-col gap-y-8 rounded-xl border bg-sidebar p-7">
      <div className="space-y-2">
        <IconBadge icon={CalendarX} badgeSize={12} />
        <p className="text-2xl font-medium text-accent-foreground/80">
          Word of the day is off
        </p>
        <p className="text-sm leading-relaxed text-secondary-foreground/60">
          Turn on daily words to get a new vocabulary entry each day — with
          meaning, examples, and synonyms.
        </p>
      </div>

      <div className="space-y-1 text-xs text-secondary-foreground/60">
        <p className="font-medium text-secondary-foreground/80">
          Enable it in:
        </p>
        <p className="flex items-center gap-1">
          <Settings size={12} aria-hidden="true" />
          <span>Settings › Daily Word</span>
        </p>
      </div>
    </div>
  );
};

export default WordOfTheDayEmpty;
