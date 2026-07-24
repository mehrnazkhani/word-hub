"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Volume2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const LANG_MAP: Record<string, string> = {
  fa: "fa-IR",
  ar: "ar-SA",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  pt: "pt-BR",
  zh: "zh-CN",
  ja: "ja-JP",
  ko: "ko-KR",
  ru: "ru-RU",
};

function resolveLang(lang: string): string {
  if (lang.includes("-")) return lang;
  return LANG_MAP[lang.toLowerCase()] ?? lang;
}

function detectLang(text: string): string {
  if (/[\u0600-\u06FF]/.test(text)) {
    return /[\u06A9\u06AF\u067E\u0686\u06CC\u06F0-\u06F9]/.test(text)
      ? "fa-IR"
      : "ar-SA";
  }
  if (/[áéíóúüñ¿¡àèìòù]/i.test(text)) return "es-ES";
  return "en-US";
}

interface WordPronunciationProps {
  word: string;
  lang?: string;
  rate?: number;
  pitch?: number;
  className?: string;
  size?: number;
}

export function WordPronunciation({
  word,
  lang,
  rate = 0.9,
  pitch = 1,
  className,
  size = 16,
}: WordPronunciationProps) {
  const [speaking, setSpeaking] = useState(false);

  const handleClick = useCallback(() => {
    if (!word.trim()) return;

    if (!("speechSynthesis" in window)) {
      console.warn(
        "SpeakButton: Web Speech API not supported in this browser.",
      );
      return;
    }

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = lang ? resolveLang(lang) : detectLang(word);
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [word, lang, rate, pitch, speaking]);

  return (
    <span
      role="button"
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      aria-label={speaking ? "Stop" : `Pronounce "${word}"`}
      className={cn(
        buttonVariants({
          variant: speaking ? "outline" : "ghost",
          size: "icon",
        }),
        "cursor-pointer text-foreground/80",
        className,
      )}
    >
      <Volume2 size={size} strokeWidth={1.75} />
    </span>
  );
}
