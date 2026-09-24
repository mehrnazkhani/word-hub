"use client";

import { useWatch } from "react-hook-form";
import { FormInput } from "@/components/inputs/FormInput";
import { WordPronunciation } from "@/components/WordPronunciation";
import { SelectLanguage } from "@/components/inputs/selectors/SelectLanguage";
import { getLanguageById } from "@/constants/languages";
import type { AddWordFormValues } from "@/schemas/word/word.schema";
import type { UseFormReturn } from "react-hook-form";

interface AiWordFormTabProps {
  methods: UseFormReturn<AddWordFormValues>;
  isAiLoading: boolean;
  aiHasFilled: boolean;
}

export const AiWordFormTab = ({
  methods,
  isAiLoading,
  aiHasFilled,
}: AiWordFormTabProps) => {
  const wordValue = useWatch({ control: methods.control, name: "word" });
  const sourceLanguageId = useWatch({
    control: methods.control,
    name: "sourceLanguageId",
  });
  const translation = useWatch({
    control: methods.control,
    name: "translation",
  });
  const partOfSpeech = useWatch({
    control: methods.control,
    name: "partOfSpeech",
  });
  const example = useWatch({ control: methods.control, name: "example" });
  const description = useWatch({
    control: methods.control,
    name: "description",
  });
  const synonyms = useWatch({ control: methods.control, name: "synonyms" });
  const antonyms = useWatch({ control: methods.control, name: "antonyms" });

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
      </div>

      {isAiLoading && (
        <div className="animate-pulse rounded-lg border border-border bg-muted/30 p-4">
          <div className="space-y-3">
            <div className="h-3 w-1/4 rounded bg-muted" />
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-4 w-1/2 rounded bg-muted" />
            <div className="h-4 w-2/3 rounded bg-muted" />
          </div>
        </div>
      )}

      {aiHasFilled && (
        <div className="animate-in space-y-3 rounded-lg border border-border bg-muted/30 p-4 duration-300 fade-in slide-in-from-bottom-2">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            AI Generated
          </p>

          {translation && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Translation</p>
              <p className="text-sm font-medium">{translation}</p>
            </div>
          )}

          {partOfSpeech && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Part of Speech</p>
              <p className="text-sm font-medium">{partOfSpeech}</p>
            </div>
          )}

          {(synonyms || antonyms) && (
            <div className="flex gap-4">
              {synonyms && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Synonyms</p>
                  <p className="text-sm">{synonyms}</p>
                </div>
              )}
              {antonyms && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Antonyms</p>
                  <p className="text-sm">{antonyms}</p>
                </div>
              )}
            </div>
          )}

          {example && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Example</p>
              <p className="text-sm">{example}</p>
            </div>
          )}

          {description && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Description</p>
              <p className="text-sm">{description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
