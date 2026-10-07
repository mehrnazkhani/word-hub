import { useEffect, useState } from "react";

import { Progress } from "@/components/ui/progress";
import { useWordAccordion } from "../../WordAccordionContext";
import { MAX_WORD_SCORE } from "@/constants/practice-modes";

export const TriggerProgress = () => {
  const { word } = useWordAccordion();
  const progressPercent = Math.round((word.score / MAX_WORD_SCORE) * 100);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setDisplayValue(progressPercent));
    return () => cancelAnimationFrame(frame);
  }, [progressPercent]);

  return (
    <div className="flex items-center gap-2">
      <Progress
        value={displayValue}
        className="*:data-[slot=progress-indicator]:bg-foreground/60"
      />
      <span className="text-xs text-foreground/50">{progressPercent}%</span>
    </div>
  );
};
