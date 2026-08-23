import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { MatchStatus, MatchingColumnItem } from "./types";

const FONT_SIZE_THRESHOLD = 30;

type Props = {
  items: MatchingColumnItem[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  matchStatuses: Record<number, MatchStatus>;
};

export const MatchColumn = ({
  items,
  selectedId,
  onSelect,
  matchStatuses,
}: Props) => (
  <div className="flex w-[45vw] max-w-40 flex-col gap-2 sm:w-full sm:max-w-none sm:min-w-72 sm:gap-3">
    {items.map((item) => (
      <Button
        key={item.id}
        variant={selectedId === item.id ? "secondary" : "outline"}
        className={cn(
          "h-11 w-full cursor-pointer truncate px-2 sm:h-14 sm:px-3",
          item.label.length > FONT_SIZE_THRESHOLD
            ? "text-[11px] sm:text-xs"
            : "text-xs sm:text-sm",
          matchStatuses[item.id] === "correct" &&
            "cursor-default bg-muted hover:bg-muted",
          matchStatuses[item.id] === "incorrect" &&
            "bg-destructive/20 hover:bg-destructive/20",
        )}
        disabled={matchStatuses[item.id] === "correct"}
        onClick={() => onSelect(item.id)}
      >
        {item.label}
      </Button>
    ))}
  </div>
);
