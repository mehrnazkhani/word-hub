import { Button } from "@/components/ui/button";
import { AiResultCard } from "../AiResultCard";

type BaseFormCheckResultProps = {
  word: string;
  baseForm: string;
  formDescription: string;
  onConfirmWord: (word: string) => void;
  onContinueAnyway: () => void;
};

export const BaseFormCheckResult = ({
  word,
  baseForm,
  formDescription,
  onConfirmWord,
  onContinueAnyway,
}: BaseFormCheckResultProps) => (
  <AiResultCard title="Use the base form?">
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        &ldquo;{word}&rdquo;
        {formDescription
          ? ` is the ${formDescription}.`
          : " is not in its base form."}
      </p>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="cursor-pointer"
        onClick={() => onConfirmWord(baseForm)}
      >
        Use &ldquo;{baseForm}&rdquo;
      </Button>

      <Button
        type="button"
        variant="default"
        size="sm"
        className="cursor-pointer"
        onClick={onContinueAnyway}
      >
        Continue with &ldquo;{word}&rdquo;
      </Button>
    </div>
  </AiResultCard>
);
