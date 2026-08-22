import { CardContent } from "@/components/ui/card";
import { FeatureShowcaseContainer } from "./FeatureShowcaseContainer";
import { Ellipsis, Folder } from "lucide-react";

const ROWS = [
  { colorClass: "bg-accent-foreground/50" },
  { colorClass: "bg-accent-foreground/30" },
  { colorClass: "bg-accent-foreground/20" },
];

export default function FolderList() {
  return (
    <FeatureShowcaseContainer
      title="Organize with Categories"
      description="Group your words into categories to study smarter — practice by topic, focus on what matters most, and track progress for each group."
      position="left"
    >
      <CardContent className="w-full">
        {ROWS.map((row, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg p-2 transition-colors duration-500 hover:bg-accent"
          >
            <Folder className="size-4 text-accent-foreground/40" />
            <div
              className={`h-3 w-1/2 min-w-15 rounded-full ${row.colorClass}`}
            />
            <div className="ml-auto">
              <Ellipsis className="size-5 text-accent-foreground/40" />
            </div>
          </div>
        ))}
      </CardContent>
    </FeatureShowcaseContainer>
  );
}
