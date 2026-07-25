import { Folder, CaseSensitive, Database } from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";
import { useCategoryCount } from "../../../queries/categories/useCategoryCount";
import { useWordCount } from "../../../queries/words/count/useWordCount";

export const DataOverview = () => {
  const categoryCount = useCategoryCount();
  const { data: wordCountData, isLoading } = useWordCount();

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <IconBadge icon={Database} />
          <h3>Your Data Overview</h3>
        </div>
        <p className="ml-8 text-xs text-accent-foreground/60">
          Here's a summary of your current data.
        </p>
      </div>

      <div className="flex items-center">
        <div className="flex flex-1 items-center justify-center gap-3">
          <IconBadge icon={Folder} badgeSize={10} />

          <div className="flex flex-col">
            <span>{categoryCount}</span>
            <span className="text-accent-foreground/60">Categories</span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center gap-3">
          <IconBadge icon={CaseSensitive} badgeSize={10} />

          <div className="flex flex-col">
            <span>
              {isLoading ? "Calculating..." : wordCountData?.wordCount}
            </span>
            <span className="text-accent-foreground/60">Words</span>
          </div>
        </div>
      </div>
    </div>
  );
};
