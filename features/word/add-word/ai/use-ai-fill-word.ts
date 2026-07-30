"use client";

import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import { AddWordFormValues } from "@/schemas/word/word.schema";
import { useLanguages } from "@/queries/languages/useLanguages";
import { useUserSettings } from "@/queries/user-settings/useUserSettings";
import { findObjectById } from "@/lib/utils/findObjectById";
import { aiFillWord } from "@/lib/api/aiFill.api";
import type { AiFillFields } from "@/types/db-aliases";

export function useAiFillWord(form: UseFormReturn<AddWordFormValues>) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: languages = [] } = useLanguages();
  const { data: userSettings } = useUserSettings();
  const abortControllerRef = useRef<AbortController | null>(null);

  const aiFillFields = (userSettings?.ai_fill_fields ?? {}) as AiFillFields;

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

      if (aiFillFields.translation && data.translation)
        form.setValue("translation", data.translation);
      if (aiFillFields.part_of_speech && data.partOfSpeech)
        form.setValue("partOfSpeech", data.partOfSpeech);
      if (aiFillFields.synonyms && data.synonyms !== undefined)
        form.setValue("synonyms", data.synonyms);
      if (aiFillFields.antonyms && data.antonyms !== undefined)
        form.setValue("antonyms", data.antonyms);
      if (aiFillFields.description && data.description)
        form.setValue("description", data.description);
      if (aiFillFields.example && data.example)
        form.setValue("example", data.example);
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
