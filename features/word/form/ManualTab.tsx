"use client";

import { useWatch } from "react-hook-form";
import { FormInput } from "@/components/inputs/FormInput";
import { WordPronunciation } from "@/components/WordPronunciation";
import { SelectLanguage } from "@/components/inputs/selectors/SelectLanguage";
import { SelectWordType } from "@/components/inputs/selectors/SelectWordType";
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
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3 flex items-center">
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

      <div className="col-span-1">
        <SelectLanguage name="sourceLanguageId" label="Source Language" />
      </div>

      <div className="col-span-3">
        <FormInput
          name="translation"
          label="Translation"
          placeholder="Translation"
        />
      </div>

      <div className="col-span-1">
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

      <WordFormAdvanced />
    </div>
  );
};
