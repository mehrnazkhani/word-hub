"use client";

import { useWatch } from "react-hook-form";

import { Skeleton } from "@/components/ui/skeleton";
import { FormInput } from "@/components/inputs/FormInput";
import { SelectLanguage } from "@/components/inputs/selectors/SelectLanguage";
import { SelectWordType } from "@/components/inputs/selectors/SelectWordType";
import { SelectCategory } from "@/components/inputs/selectors/SelectCategory";

import { WordPronunciation } from "@/components/WordPronunciation";
import { getLanguageById } from "@/constants/languages";

import type { AddWordFormValues } from "@/schemas/word/word.schema";
import type { UseFormReturn } from "react-hook-form";
import type { aiFillWord } from "@/lib/api/aiFill.api";

type AiResult = Awaited<ReturnType<typeof aiFillWord>>;

interface AiWordFormTabProps {
  methods: UseFormReturn<AddWordFormValues>;
  isAiLoading: boolean;
  aiResult: AiResult | null | undefined;
}

const ResultField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-sm">{value}</p>
  </div>
);

export const AiWordFormTab = ({
  methods,
  isAiLoading,
  aiResult,
}: AiWordFormTabProps) => {
  const wordValue = useWatch({ control: methods.control, name: "word" });
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

      {isAiLoading && (
        <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      )}

      {aiResult && (
        <div className="animate-in space-y-3 rounded-lg border border-border bg-muted/30 p-4 duration-300 fade-in slide-in-from-bottom-2">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            AI Generated
          </p>

          {aiResult.translation && (
            <ResultField label="Translation" value={aiResult.translation} />
          )}

          {(aiResult.synonyms || aiResult.antonyms) && (
            <div className="flex gap-4">
              {aiResult.synonyms && (
                <ResultField label="Synonyms" value={aiResult.synonyms} />
              )}
              {aiResult.antonyms && (
                <ResultField label="Antonyms" value={aiResult.antonyms} />
              )}
            </div>
          )}

          {aiResult.example && (
            <ResultField label="Example" value={aiResult.example} />
          )}

          {aiResult.description && (
            <ResultField label="Description" value={aiResult.description} />
          )}
        </div>
      )}
    </div>
  );
};
