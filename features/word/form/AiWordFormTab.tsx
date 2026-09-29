"use client";

import { useWatch } from "react-hook-form";

import { FormInput } from "@/components/inputs/FormInput";
import { SelectLanguage } from "@/components/inputs/selectors/SelectLanguage";
import { SelectWordType } from "@/components/inputs/selectors/SelectWordType";
import { SelectCategory } from "@/components/inputs/selectors/SelectCategory";
import { WordPronunciation } from "@/components/WordPronunciation";
import { getLanguageById } from "@/constants/languages";

import { ValidationResult } from "./ai/ValidationResult";
import {
  AiFillResult,
  AiFillResultSkeleton,
} from "./ai/word-details/WordDetailsResult";

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
            placeholder="Word"
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
          <SelectLanguage name="sourceLanguageId" label="Source Language" />
        </div>

        <div className="col-span-2">
          <SelectLanguage name="targetLanguageId" label="Target Language" />
        </div>

        <div className="col-span-2">
          <SelectWordType />
        </div>

        <div className="col-span-2">
          <SelectCategory
            name="categoryId"
            label="Select Category"
            placeholder="Select Category"
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

      {isAiLoading && <AiFillResultSkeleton />}
      {aiResult && <AiFillResult result={aiResult} />}
    </div>
  );
};
