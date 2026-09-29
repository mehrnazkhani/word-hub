"use client";

import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import { AddWordFormValues } from "@/schemas/word/word.schema";
import { getLanguageById } from "@/constants/languages";
import { useUserSettings } from "@/queries/user-settings/useUserSettings";
import { aiFillWord } from "@/lib/api/aiFill.api";
import {
  useWordValidation,
  stageOfState,
  type ValidationContext,
} from "./useWordValidation";
import type { AiFillFields } from "@/types/db-aliases";
import type { WordValidationState } from "./useWordValidation";

export function useAiFillWord(form: UseFormReturn<AddWordFormValues>) {
  const [isLoading, setIsLoading] = useState(false);
  const [validationState, setValidationState] = useState<WordValidationState>({
    status: "idle",
  });
  const { data: userSettings } = useUserSettings();
  const abortControllerRef = useRef<AbortController | null>(null);
  const busyRef = useRef(false); // جلوگیری از اجرای هم‌زمان دو زنجیره

  const aiFillFields = (userSettings?.ai_fill_fields ?? {}) as AiFillFields;
  const {
    validate,
    markPassedUpTo,
    isLoading: isValidating,
    reset: resetValidation,
  } = useWordValidation();

  const fill = async (
    word: string,
    sourceLanguage: string,
    targetLanguage: string,
  ) => {
    abortControllerRef.current = new AbortController();
    setIsLoading(true);

    try {
      const data = await aiFillWord(
        { word, sourceLanguage, targetLanguage },
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

      return data;
    } catch (err: any) {
      if (err.name === "AbortError") return;
      toast.error(err.message || "AI fill failed");
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  // زبان مقصد اجباری نیست؛ چک املا بدون آن هم کار می‌کند (توضیح‌ها انگلیسی می‌شوند)
  const getContext = () => {
    const word = form.getValues("word");
    const sourceLanguage = getLanguageById(form.getValues("sourceLanguageId"));
    const targetLanguage = getLanguageById(form.getValues("targetLanguageId"));
    if (!word || !sourceLanguage) return null;
    return { word, sourceLanguage, targetLanguage };
  };

  // ساخت ورودی اعتبارسنجی از context؛ pos را می‌شود override کرد
  const toValidationCtx = (
    ctx: NonNullable<ReturnType<typeof getContext>>,
    pos: string | null | undefined = form.getValues("partOfSpeech"),
  ): ValidationContext => ({
    word: ctx.word,
    language: ctx.sourceLanguage.value,
    pos,
    explanationLanguage: ctx.targetLanguage?.value ?? "English",
  });

  const clearValidationUI = () => {
    resetValidation();
    setValidationState({ status: "idle" });
  };

  const fillWithAI = async () => {
    if (busyRef.current) return;
    busyRef.current = true;

    try {
      const ctx = getContext();
      if (!ctx) return;

      const validation = await validate(toValidationCtx(ctx));
      setValidationState(validation);
      if (validation.status !== "valid") return;

      // پر کردن فیلدها به زبان مقصد نیاز دارد
      if (!ctx.targetLanguage) {
        toast.error("Select a target language to fill the word.");
        return;
      }

      return await fill(
        ctx.word,
        ctx.sourceLanguage.value,
        ctx.targetLanguage.value,
      );
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      toast.error(err?.message || "Validation failed. Please try again.");
    } finally {
      busyRef.current = false;
    }
  };

  // کاربر suggestion را قبول کرد (کلمه عوض می‌شود)
  const confirmWord = async (word: string) => {
    const stage = stageOfState(validationState);
    form.setValue("word", word);
    clearValidationUI();

    const ctx = getContext();
    if (!ctx) return;
    if (stage) markPassedUpTo(stage, toValidationCtx(ctx));
    return fillWithAI();
  };

  // کاربر گفت با همین کلمه ادامه بده (مثلاً books)
  const continueAnyway = async () => {
    const stage = stageOfState(validationState);
    clearValidationUI();

    const ctx = getContext();
    if (!ctx) return;
    if (stage) markPassedUpTo(stage, toValidationCtx(ctx));
    return fillWithAI();
  };

  // کاربر یک POS انتخاب کرد
  const confirmPos = async (pos: string) => {
    form.setValue("partOfSpeech", pos as AddWordFormValues["partOfSpeech"]);
    clearValidationUI();

    const ctx = getContext();
    if (!ctx) return;
    markPassedUpTo("pos", toValidationCtx(ctx, pos));
    return fillWithAI();
  };

  const dismissValidation = () => {
    clearValidationUI();
  };

  const stopAI = () => {
    abortControllerRef.current?.abort();
  };

  return {
    fillWithAI,
    isLoading: isLoading || isValidating,
    validationState,
    confirmWord,
    confirmPos,
    continueAnyway,
    dismissValidation,
    stopAI,
  };
}
