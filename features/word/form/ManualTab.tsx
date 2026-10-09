"use client";

import { useWatch } from "react-hook-form";
import { FormInput } from "@/components/inputs/FormInput";
import { WordPronunciation } from "@/components/WordPronunciation";
import { SelectLanguage } from "@/components/inputs/selectors/SelectLanguage";
import { SelectPartOfSpeech } from "@/components/inputs/selectors/SelectPartOfSpeech";
import { SelectCategory } from "@/components/inputs/selectors/SelectCategory";
import { WordFormAdvanced } from "./WordFormAdvanced";
import { getLanguageById } from "@/constants/languages";
import type { Control } from "react-hook-form";
import type { AddWordFormValues } from "@/schemas/word/word.schema";

interface ManualTabProps {
  control: Control<AddWordFormValues>;
}

export const ManualTab = ({ control }: ManualTabProps) => {
  const wordValue = useWatch({ control, name: "word" });
  const sourceLanguageId = useWatch({ control, name: "sourceLanguageId" });
  const sourceLanguage = sourceLanguageId
    ? getLanguageById(sourceLanguageId)
    : undefined;

  return (
    <div className="grid w-full min-w-0 grid-cols-4 gap-4">
      <div className="col-span-3 flex min-w-0 items-center">
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

      <div className="col-span-1 min-w-0">
        <SelectLanguage name="sourceLanguageId" label="From" />
      </div>

      <div className="col-span-3 min-w-0">
        <FormInput
          name="translation"
          label="Translation"
          placeholder="Enter the translation"
        />
      </div>

      <div className="col-span-1 min-w-0">
        <SelectLanguage name="targetLanguageId" label="To" />
      </div>

      <div className="col-span-2 min-w-0">
        <SelectPartOfSpeech />
      </div>

      <div className="col-span-2 min-w-0">
        <SelectCategory
          name="categoryId"
          label="Category"
          placeholder="Select category"
        />
      </div>

      <WordFormAdvanced />
    </div>
  );
};
