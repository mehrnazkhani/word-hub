import type { WordValidationState } from "@/features/word/form/ai/useWordValidation";
import { SpellingCheckResult } from "./spelling-check/SpellingCheckResult";
import { BaseFormCheckResult } from "./base-form-check/BaseFormCheckResult";

import {
  InvalidPosResult,
  MultiplePosResult,
} from "./POS-check/POSCheckResult";

interface ValidationResultProps {
  state: WordValidationState;
  word: string;
  partOfSpeech: string;
  onConfirmWord: (word: string) => void;
  onConfirmPos: (pos: string) => void;
  onContinueAnyway: () => void;
}

export const ValidationResult = ({
  state,
  word,
  partOfSpeech,
  onConfirmWord,
  onConfirmPos,
  onContinueAnyway,
}: ValidationResultProps) => {
  switch (state.status) {
    case "incorrect":
      return (
        <SpellingCheckResult
          word={word}
          suggestions={state.suggestions}
          onConfirmWord={onConfirmWord}
          onContinueAnyway={onContinueAnyway}
        />
      );
    case "notBaseForm":
      return (
        <BaseFormCheckResult
          word={word}
          baseForm={state.baseForm}
          formDescription={state.formDescription}
          onConfirmWord={onConfirmWord}
          onContinueAnyway={onContinueAnyway}
        />
      );
    case "invalidPos":
      return (
        <InvalidPosResult
          word={word}
          partOfSpeech={partOfSpeech}
          onContinueAnyway={onContinueAnyway}
        />
      );
    case "multiplePos":
      return (
        <MultiplePosResult
          word={word}
          availablePos={state.availablePos}
          onConfirmPos={onConfirmPos}
          onContinueAnyway={onContinueAnyway}
        />
      );
    default:
      return null;
  }
};
