"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { HELLO_TRANSLATION } from "@/constants/hello-translations";
import { ACTIVE_LANGUAGES } from "@/constants/languages";

type TranslationResult = (typeof HELLO_TRANSLATION)[number] | null;
type Status = "idle" | "loading" | "done";

export const HeroWordCard = () => {
  const [selectedLang, setSelectedLang] = useState("es");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<TranslationResult>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;

    if (input) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }, []);

  const handleTranslate = () => {
    const lang = ACTIVE_LANGUAGES.find((l) => l.value === selectedLang);
    if (!lang) return;

    setStatus("loading");
    setResult(null);

    setTimeout(() => {
      const translation = HELLO_TRANSLATION.find(
        (t) => t.language === lang.label,
      );

      setResult(translation ?? null);
      setStatus("done");
    }, 2500);
  };

  return (
    <Card className="mx-auto w-full max-w-2xl bg-foreground/3">
      <CardContent className="space-y-3 px-8">
        <div className="flex items-center">
          <Input
            ref={inputRef}
            type="text"
            defaultValue="Hello"
            onKeyDown={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            onBeforeInput={(e) => e.preventDefault()}
            className="cursor-default border-none bg-transparent! p-0 text-lg!"
          />

          <div className="flex items-center gap-3">
            <Select value={selectedLang} onValueChange={setSelectedLang}>
              <SelectTrigger className="cursor-pointer border-none bg-transparent! shadow-none ring-0 outline-none hover:bg-transparent focus:bg-transparent focus:ring-0 focus-visible:ring-0 data-[state=open]:bg-transparent">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {ACTIVE_LANGUAGES.map((language) => (
                  <SelectItem key={language.id} value={language.value}>
                    {language.flag} {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              size="sm"
              className="cursor-pointer"
              onClick={handleTranslate}
              disabled={status === "loading"}
            >
              <ArrowUp />
            </Button>
          </div>
        </div>

        <div className="space-y-5 px-2">
          {/* Translation */}
          {status === "loading" ? (
            <div className="h-4 w-2/5 rounded-full bg-accent-foreground/20" />
          ) : status === "done" ? (
            <p className="font-semibold">{result?.translation}</p>
          ) : (
            <div className="h-4 w-2/5 rounded-full bg-accent-foreground/20" />
          )}

          {/* Description */}
          {status === "loading" ? (
            <div className="space-y-2">
              <Skeleton className="h-3 w-3/5 rounded-full" />
              <Skeleton className="h-3 w-5/5 rounded-full" />
            </div>
          ) : status === "done" ? (
            <p className="text-sm text-accent-foreground/70">
              {result?.description}
            </p>
          ) : (
            <div className="space-y-2">
              <div className="h-3 w-3/5 rounded-full bg-accent-foreground/10" />
              <div className="h-3 w-5/5 rounded-full bg-accent-foreground/10" />
            </div>
          )}

          {/* Synonyms & Antonyms */}
          {status === "loading" ? (
            <div className="divide-y overflow-hidden rounded-lg border">
              <div className="flex items-center gap-4 px-4 py-3">
                <Skeleton className="h-3 w-1/5 rounded-md" />
                <Skeleton className="h-3 w-2/5 rounded-md" />
              </div>

              <div className="flex items-center gap-4 px-4 py-3">
                <Skeleton className="h-3 w-1/5 rounded-md" />
                <Skeleton className="h-3 w-2/5 rounded-md" />
                <Skeleton className="h-3 w-1/5 rounded-md" />
              </div>
            </div>
          ) : status === "done" ? (
            <div className="divide-y overflow-hidden rounded-lg border">
              <div className="flex items-start gap-4 px-4 py-3">
                <span className="w-14 shrink-0 text-xs font-medium text-accent-foreground/50">
                  Synonyms
                </span>

                <span className="text-sm">{result?.synonyms.join(", ")}</span>
              </div>

              <div className="flex items-start gap-4 px-4 py-3">
                <span className="w-14 shrink-0 text-xs font-medium text-accent-foreground/50">
                  Antonyms
                </span>

                <span className="text-sm">{result?.antonyms.join(", ")}</span>
              </div>
            </div>
          ) : (
            <div className="divide-y overflow-hidden rounded-lg border">
              <div className="flex items-center gap-4 px-4 py-3">
                <div className="h-3 w-1/5 rounded-full bg-accent-foreground/10" />
                <div className="h-3 w-2/5 rounded-full bg-accent-foreground/10" />
              </div>

              <div className="flex items-center gap-4 px-4 py-3">
                <div className="h-3 w-1/5 rounded-full bg-accent-foreground/10" />
                <div className="h-3 w-2/5 rounded-full bg-accent-foreground/10" />
                <div className="h-3 w-1/5 rounded-full bg-accent-foreground/10" />
              </div>
            </div>
          )}

          {/* Example */}
          {status === "loading" ? (
            <div className="flex items-center gap-4 rounded-lg bg-accent-foreground/3 px-4 py-3">
              <Skeleton className="h-3 w-1/5 rounded-md" />
              <Skeleton className="h-3 w-3/5 rounded-md" />
            </div>
          ) : status === "done" ? (
            <div className="flex items-center gap-4 rounded-lg bg-accent-foreground/3 px-4 py-3">
              <span className="w-14 shrink-0 text-xs font-medium text-accent-foreground/50">
                Example
              </span>

              <span className="text-sm italic">"{result?.example}"</span>
            </div>
          ) : (
            <div className="flex items-center gap-4 rounded-lg bg-accent-foreground/3 px-4 py-3">
              <div className="h-3 w-1/5 rounded-full bg-accent-foreground/13" />
              <div className="h-3 w-3/5 rounded-full bg-accent-foreground/13" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
