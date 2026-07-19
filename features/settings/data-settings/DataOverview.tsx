import { Folder, CaseSensitive, Database } from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";

export const DataOverview = () => {
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
          <CircleIcon>
            <Folder />
          </CircleIcon>
          <div className="flex flex-col">
            <span>10</span>
            <span className="text-accent-foreground/60">Categories</span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center gap-3">
          <CircleIcon>
            <CaseSensitive />
          </CircleIcon>
          <div className="flex flex-col">
            <span>270</span>
            <span className="text-accent-foreground/60">Words</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CircleIcon = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex size-12 items-center justify-center rounded-full bg-accent">
      {children}
    </div>
  );
};
