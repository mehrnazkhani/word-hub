"use client";

import { cn } from "@/lib/utils";
import {
  QuestionnaireChoice,
  QuestionnaireChoices,
} from "@/components/ui/questionnaire";

export type PracticeChoiceOption = {
  value: string;
  label: React.ReactNode;
  onSelect: () => void;
};

type PracticeChoicesProps = {
  options: PracticeChoiceOption[];
  selected: string[];
  correct: string[];
  revealed: boolean;
  className?: string;
};

/**
 * Renders one question's answer options and their feedback state. Options are
 * graded once the answer is revealed: correct picks (and the correct answer
 * itself) turn green, wrong picks turn red, and the rest fade out.
 */
export const PracticeChoices = ({
  options,
  selected,
  correct,
  revealed,
  className,
}: PracticeChoicesProps) => (
  <QuestionnaireChoices
    inert={revealed}
    aria-disabled={revealed}
    className={cn(
      "mx-auto grid w-full max-w-xl gap-3",
      revealed && "pointer-events-none",
      className,
    )}
  >
    {options.map((option) => {
      const isSelected = selected.includes(option.value);
      const isCorrect = correct.includes(option.value);

      return (
        <QuestionnaireChoice
          key={option.value}
          value={option.value}
          checked={isSelected}
          onChange={option.onSelect}
          className={cn(
            isCorrect &&
              (revealed || isSelected) &&
              "border-emerald-500/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
            isSelected &&
              !isCorrect &&
              "border-destructive/60 bg-destructive/10 text-destructive",
            revealed && !isSelected && !isCorrect && "opacity-50",
          )}
        >
          {option.label}
        </QuestionnaireChoice>
      );
    })}
  </QuestionnaireChoices>
);
