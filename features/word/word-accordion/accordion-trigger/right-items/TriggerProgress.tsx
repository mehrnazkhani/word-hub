import { Progress } from "@/components/ui/progress";
import { useWordAccordion } from "../../WordAccordionContext";

export const TriggerProgress = () => {
  const { word } = useWordAccordion();
  const progress = word.score;

  return (
    <div className="flex items-center gap-2">
      <Progress value={progress} />
      <span className="text-xs text-app-secondary">{progress}%</span>
    </div>
  );
};
