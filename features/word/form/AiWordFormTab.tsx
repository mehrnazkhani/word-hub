"use client";

import { useWatch } from "react-hook-form";

import { FormInput } from "@/components/inputs/FormInput";
import { SelectLanguage } from "@/components/inputs/selectors/SelectLanguage";
import { SelectPartOfSpeech } from "@/components/inputs/selectors/SelectPartOfSpeech";
import { SelectCategory } from "@/components/inputs/selectors/SelectCategory";
import { WordPronunciation } from "@/components/WordPronunciation";
import { getLanguageById } from "@/constants/languages";

import { ValidationResult } from "./ai/ValidationResult";
import { WordDetailsResult } from "./ai/word-details/WordDetailsResult";
import { AiResultSkeleton } from "./ai/AiResultSkeleton";

import type { AddWordFormValues } from "@/schemas/word/word.schema";
import type { UseFormReturn } from "react-hook-form";
import type { aiWordDetails } from "@/lib/api/aiWordDetails.api";
import type { WordValidationState } from "@/features/word/form/ai/useWordValidation";

type AiResult = Awaited<ReturnType<typeof aiWordDetails>>;

interface AiWordFormTabProps {
  methods: UseFormReturn<AddWordFormValues>;
  isAiLoading: boolean;
  aiResult: AiResult | null | undefined;
  validationState: WordValidationState;
  onConfirmWord: (word: string) => void;
  onConfirmPos: (pos: string) => void;
  onContinueAnyway: () => void;
  onDismissValidation: () => void;
}

export const AiWordFormTab = ({
  methods,
  isAiLoading,
  aiResult,
  validationState,
  onConfirmWord,
  onConfirmPos,
  onContinueAnyway,
}: AiWordFormTabProps) => {
  const wordValue = useWatch({ control: methods.control, name: "word" });
  const partOfSpeech = useWatch({
    control: methods.control,
    name: "partOfSpeech",
  });
  const sourceLanguageId = useWatch({
    control: methods.control,
    name: "sourceLanguageId",
  });

  const sourceLanguage = sourceLanguageId
    ? getLanguageById(sourceLanguageId)
    : undefined;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4">
          <FormInput
            name="word"
            label="Word"
            placeholder="e.g. hello"
            endAdornment={
              wordValue ? (
                <WordPronunciation
                  word={wordValue}
                  lang={sourceLanguage?.value}
                />
              ) : undefined
            }
          />
        </div>

        <div className="col-span-2">
          <SelectLanguage name="sourceLanguageId" label="From" />
        </div>

        <div className="col-span-2">
          <SelectLanguage name="targetLanguageId" label="To" />
        </div>

        <div className="col-span-2">
          <SelectPartOfSpeech />
        </div>

        <div className="col-span-2">
          <SelectCategory
            name="categoryId"
            label="Category"
            placeholder="Select category"
          />
        </div>
      </div>

      <ValidationResult
        state={validationState}
        word={wordValue}
        partOfSpeech={partOfSpeech ?? ""}
        onConfirmWord={onConfirmWord}
        onConfirmPos={onConfirmPos}
        onContinueAnyway={onContinueAnyway}
      />

      <div className="px-2">
        {isAiLoading && <AiResultSkeleton />}
        {aiResult && <WordDetailsResult result={aiResult} />}
      </div>
    </div>
  );
};
