"use client";

import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import { AddWordFormValues } from "@/schemas/word/addWord.schema";
import { useLanguages } from "@/queries/languages/useLanguages";
import { findObjectById } from "@/lib/utils/findObjectById";
import { aiFillWord } from "@/lib/api/ai.api";

export function useAiFillWord(form: UseFormReturn<AddWordFormValues>) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: languages = [] } = useLanguages();
  const abortControllerRef = useRef<AbortController | null>(null);

  const fillWithAI = async () => {
    const word = form.getValues("word");
    const sourceLanguageId = form.getValues("sourceLanguageId");
    const targetLanguageId = form.getValues("targetLanguageId");

    if (!word || !sourceLanguageId || !targetLanguageId) return;

    const sourceLang = findObjectById(languages, sourceLanguageId);
    const targetLang = findObjectById(languages, targetLanguageId);

    if (!sourceLang || !targetLang) return;

    abortControllerRef.current = new AbortController();
    setIsLoading(true);

    try {
      const data = await aiFillWord(
        {
          word,
          sourceLanguage: sourceLang.value,
          targetLanguage: targetLang.value,
        },
        abortControllerRef.current.signal,
      );

      if (data.translation) form.setValue("translation", data.translation);
      if (data.partOfSpeech) form.setValue("partOfSpeech", data.partOfSpeech);
      if (data.synonyms !== undefined) form.setValue("synonyms", data.synonyms);
      if (data.antonyms !== undefined) form.setValue("antonyms", data.antonyms);
      if (data.description) form.setValue("description", data.description);
    } catch (err: any) {
      if (err.name === "AbortError") return;
      toast.error(err.message || "AI fill failed");
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const stopAI = () => {
    abortControllerRef.current?.abort();
  };

  return { fillWithAI, isLoading, stopAI };
}
