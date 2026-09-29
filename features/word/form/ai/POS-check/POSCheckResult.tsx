import { Button } from "@/components/ui/button";
import { AiResultCard } from "../results-card/AiResultCard";
import type { PosItem } from "./schema";

type InvalidPosResultProps = {
  word: string;
  partOfSpeech: string;
  onContinueAnyway: () => void;
};

export const InvalidPosResult = ({
  word,
  partOfSpeech,
  onContinueAnyway,
}: InvalidPosResultProps) => (
  <AiResultCard title="Part of speech mismatch">
    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted-foreground">
        &ldquo;{word}&rdquo; doesn&apos;t seem to be used as a{" "}
        <span className="font-medium text-foreground">{partOfSpeech}</span>.
        Change the part of speech, or continue anyway.
      </p>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="cursor-pointer"
        onClick={onContinueAnyway}
      >
        Continue as &ldquo;{partOfSpeech}&rdquo;
      </Button>
    </div>
  </AiResultCard>
);

type MultiplePosResultProps = {
  word: string;
  availablePos: PosItem[];
  onConfirmPos: (pos: string) => void;
  onContinueAnyway: () => void;
};

export const MultiplePosResult = ({
  word,
  availablePos,
  onConfirmPos,
  onContinueAnyway,
}: MultiplePosResultProps) => (
  <AiResultCard title="Which part of speech?">
    <div className="flex flex-col gap-2">
      {availablePos.map((item) => (
        <Button
          key={item.pos}
          type="button"
          variant="outline"
          size="sm"
          className="h-auto cursor-pointer flex-col items-start gap-0.5 py-2 text-left whitespace-normal"
          onClick={() => onConfirmPos(item.pos)}
        >
          <span>{item.pos}</span>
          <span className="text-xs font-normal text-muted-foreground">
            {item.meaning}
          </span>
        </Button>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onContinueAnyway}
      >
        Continue with &ldquo;{word}&rdquo;
      </Button>
    </div>
  </AiResultCard>
);
