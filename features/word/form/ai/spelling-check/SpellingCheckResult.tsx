import { Button } from "@/components/ui/button";
import { AiResultCard } from "../AiResultCard";
import type { SpellingCheckResponse } from "@/features/word/form/ai/spelling-check/schema";

type SpellingSuggestion = SpellingCheckResponse["suggestions"][number];

type SpellingCheckResultProps = {
  word: string;
  suggestions: SpellingSuggestion[];
  onConfirmWord: (word: string) => void;
  onContinueAnyway: () => void;
};

export const SpellingCheckResult = ({
  word,
  suggestions,
  onConfirmWord,
  onContinueAnyway,
}: SpellingCheckResultProps) => {
  const uniqueSuggestions = Array.from(
    new Map(suggestions.map((s) => [s.word.toLowerCase(), s])).values(),
  );

  return (
    <AiResultCard title="Did you mean?">
      <div className="flex flex-col gap-3">
        {uniqueSuggestions.map((s) => (
          <Button
            key={s.word}
            type="button"
            variant="outline"
            size="sm"
            className="h-auto cursor-pointer flex-col items-start gap-0.5 py-2"
            onClick={() => onConfirmWord(s.word)}
          >
            <span>{s.word}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {s.explanation}
            </span>
          </Button>
        ))}

        <Button
          type="button"
          size="sm"
          className="cursor-pointer"
          onClick={onContinueAnyway}
        >
          Continue with "{word}"
        </Button>
      </div>
    </AiResultCard>
  );
};
