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

export const MatchingColumn = ({
  items,
  selectedId,
  onSelect,
  matchStatuses,
}: Props) => (
  <div className="flex min-w-72 flex-col gap-3">
    {items.map((item) => (
      <Button
        key={item.id}
        variant={selectedId === item.id ? "secondary" : "outline"}
        className={cn(
          "h-14 w-full cursor-pointer truncate",
          item.label.length > FONT_SIZE_THRESHOLD ? "text-xs" : "text-sm",
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
