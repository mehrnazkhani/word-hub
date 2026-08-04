"use client";

import { useUser } from "@/components/providers/user-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { WordPronunciation } from "@/components/WordPronunciation";
import { getLanguageById } from "@/constants/languages";
import { useDailyWordSuggestion } from "@/queries/daily_suggestions/useDailyWordSuggestion";
import { joinRelatedWords } from "@/schemas/word/word.shared";
import { Bookmark, MoveRight } from "lucide-react";

export default function DashboardPage() {
  const { user } = useUser();
  const { data: dailyWordSuggestion } = useDailyWordSuggestion();

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
    level,
  } = dailyWordSuggestion ?? {};

  const sourceLanguage = getLanguageById(source_language_id);
  const targetLanguage = getLanguageById(target_language_id);

  return (
    <div className="flex h-full flex-col px-44">
      {/* Header */}
      <header className="space-y-2 pt-12 pb-8">
        <h1 className="text-3xl">Hello, {user?.user_metadata.full_name}</h1>

        <p className="text-secondary-foreground/60">
          Ready to expand your vocabulary today?
        </p>
      </header>

      <Separator />

      {/* Content */}
      <main className="flex flex-1 justify-center overflow-y-auto py-10">
        <div className="flex w-full max-w-4xl flex-col gap-5">
          <span className="text-xs text-secondary-foreground/60">
            TODAY'S WORD
          </span>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-5xl">{word}</span>

              {word && (
                <WordPronunciation word={word} lang={sourceLanguage?.value} />
              )}
            </div>

            <Button variant="ghost" className="cursor-pointer">
              <Bookmark />
              Save
            </Button>
          </div>

          <span className="text-secondary-foreground/70 italic">
            /,ser.an'dıp.I.ti/
          </span>

          <div className="flex items-center gap-5">
            <Badge variant="secondary">{part_of_speech}</Badge>
            <Badge variant="default">{level}</Badge>
          </div>

          <div className="space-y-3">
            <span className="text-secondary-foreground/60">{translation}</span>
            <p className="text-secondary-foreground/60">{description}</p>
          </div>

          <div className="mt-5 flex items-center gap-5 text-sm">
            <span className="font-medium">Synonyms</span>
            <p className="text-secondary-foreground/60">
              {joinRelatedWords(synonyms)}
            </p>
          </div>

          <div className="flex items-center gap-5 text-sm">
            <span className="font-medium">Antonyms</span>
            <p className="text-secondary-foreground/60">
              {joinRelatedWords(antonyms)}
            </p>
          </div>

          <div className="flex items-center gap-5 text-sm">
            <span className="font-medium">Example</span>
            <p className="text-secondary-foreground/60 italic">"{example}"</p>
          </div>

          <p className="flex items-center gap-1 pt-5 text-xs text-foreground/50">
            {sourceLanguage?.flag} {sourceLanguage?.label}
            <MoveRight size={12} />
            {targetLanguage?.label} {targetLanguage?.flag}
          </p>
        </div>
      </main>

      <Separator />

      {/* Footer */}
      <footer className="py-8">
        <p className="text-center text-xs text-secondary-foreground/60">
          Every new word you learn is a new perspective you gain.
        </p>
      </footer>
    </div>
  );
}
