"use client";

import { MoveRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WordPronunciation } from "@/components/WordPronunciation";
import { getLanguageById } from "@/constants/languages";

import { useDailyWordSuggestion } from "@/queries/daily_suggestions/useDailyWordSuggestion";
import { joinRelatedWords } from "@/schemas/word/word.shared";
import { WordOfTheDayEmpty } from "./WordOfTheDayEmpty";
import { SaveWordButton } from "./SaveWordButton";

import type { Word } from "@/types/db-aliases";

export const WordOfTheDay = () => {
  const { data: dailyWordSuggestion } = useDailyWordSuggestion();

  if (!dailyWordSuggestion) return <WordOfTheDayEmpty />;

  const {
    level,
    savedSuggestion,
    display_date,
    translation_audio,
    phonetic,
    ...wordData
  } = dailyWordSuggestion;

  const {
    word,
    translation,
    source_language_id,
    target_language_id,
    part_of_speech,
    synonyms,
    antonyms,
    description,
    example,
  } = wordData;

  const sourceLanguage = getLanguageById(source_language_id);
  const targetLanguage = getLanguageById(target_language_id);

  const hasSynonyms = synonyms && joinRelatedWords(synonyms).length > 0;
  const hasAntonyms = antonyms && joinRelatedWords(antonyms).length > 0;

  return (
    <div className="flex w-full max-w-4xl flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium tracking-widest text-secondary-foreground/50 uppercase">
          Today's Word
        </span>

        <SaveWordButton
          savedSuggestion={savedSuggestion}
          word={wordData as Word}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-5xl font-semibold tracking-tight">{word}</span>
          {word && (
            <WordPronunciation word={word} lang={sourceLanguage?.value} />
          )}
        </div>

        {phonetic && (
          <span className="text-sm text-secondary-foreground/50 italic">
            {phonetic}
          </span>
        )}
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2">
        {part_of_speech && (
          <Badge variant="outline" className="capitalize">
            {part_of_speech}
          </Badge>
        )}
        {level && <Badge variant="outline">{level}</Badge>}
      </div>

      {/* Translation + Description */}
      <div className="space-y-1.5">
        <p className="text-base font-medium text-foreground">{translation}</p>
        {description && (
          <p className="text-sm leading-relaxed text-secondary-foreground/60">
            {description}
          </p>
        )}
      </div>

      {/* Related Words */}
      {(hasSynonyms || hasAntonyms) && (
        <div className="mt-2 flex flex-col divide-y divide-border rounded-md border">
          {hasSynonyms && (
            <div className="flex items-baseline gap-4 px-4 py-3 text-sm">
              <span className="w-18 shrink-0 font-medium text-foreground/80">
                Synonyms
              </span>
              <p className="text-secondary-foreground/60">
                {joinRelatedWords(synonyms)}
              </p>
            </div>
          )}
          {hasAntonyms && (
            <div className="flex items-baseline gap-4 px-4 py-3 text-sm">
              <span className="w-20 shrink-0 font-medium text-foreground/80">
                Antonyms
              </span>
              <p className="text-secondary-foreground/60">
                {joinRelatedWords(antonyms)}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Example */}
      {example && (
        <div className="flex items-baseline gap-4 rounded-md bg-secondary/40 px-4 py-3 text-sm">
          <span className="w-20 shrink-0 font-medium text-foreground/80">
            Example
          </span>
          <p className="text-secondary-foreground/60 italic">"{example}"</p>
        </div>
      )}

      {/* Language Direction */}
      <div className="flex items-center gap-1.5 pt-2 text-xs">
        <span>{sourceLanguage?.flag}</span>
        <span className="text-foreground/50">{sourceLanguage?.label}</span>

        <MoveRight size={12} className="text-foreground/50" />

        <span className="text-foreground/50">{targetLanguage?.label}</span>
        <span>{targetLanguage?.flag}</span>
      </div>
    </div>
  );
};
