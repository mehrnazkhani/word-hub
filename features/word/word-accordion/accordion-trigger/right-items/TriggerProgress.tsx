import { Progress } from "@/components/ui/progress";
import { useWordAccordion } from "../../WordAccordionContext";
import { MAX_WORD_SCORE } from "@/constants/practice-modes";

export const TriggerProgress = () => {
  const { word } = useWordAccordion();
  const progressPercent = Math.round((word.score / MAX_WORD_SCORE) * 100);

  return (
    <div className="flex items-center gap-2">
      <Progress value={progressPercent} />
      <span className="text-xs text-foreground/50">{progressPercent}%</span>
    </div>
  );
};
