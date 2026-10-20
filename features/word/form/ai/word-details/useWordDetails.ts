"use client";

import { useReducer, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import { getLanguageById } from "@/constants/languages";
import { useUserSettings } from "@/queries/user-settings/useUserSettings";
import { aiWordDetails } from "@/lib/api/aiWordDetails.api";

import {
  useWordValidation,
  stageOfState,
  type ValidationContext,
} from "../useWordValidation";
import { AddWordFormValues } from "@/schemas/word/word.schema";
import type { AiFillFields } from "@/types/db-aliases";
import type { WordValidationState } from "../useWordValidation";

type State =
  | { phase: "idle" }
  | { phase: "validating" }
  | { phase: "awaiting_user"; validation: WordValidationState }
  | { phase: "filling"; validation: WordValidationState };

type Action =
  | { type: "start" }
  | { type: "needs_user"; validation: WordValidationState }
  | { type: "validated"; validation: WordValidationState }
  | { type: "finish" } // success, error, or abort
  | { type: "reset" }; // dismiss / stop / confirm (clear the UI)

const initialState: State = { phase: "idle" };
const IDLE_VALIDATION: WordValidationState = { status: "idle" };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "start":
      return { phase: "validating" };
    case "needs_user":
      return { phase: "awaiting_user", validation: action.validation };
    case "validated":
      return { phase: "filling", validation: action.validation };
    case "finish":
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export function useWordDetails(form: UseFormReturn<AddWordFormValues>) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data: userSettings } = useUserSettings();
  const abortControllerRef = useRef<AbortController | null>(null);
  const busyRef = useRef(false);
  const aiFillFields = (userSettings?.ai_fill_fields ?? {}) as AiFillFields;
  const {
    validate,
    markPassedUpTo,
    isLoading: isValidating,
    reset: resetValidation,
  } = useWordValidation();

  // Derived values: all computed from one source of truth (state.phase).
  const isAiProcessing = state.phase !== "idle";
  const isFilling = state.phase === "filling";
  const validationState: WordValidationState =
    state.phase === "awaiting_user" || state.phase === "filling"
      ? state.validation
      : IDLE_VALIDATION;

  const fill = async (
    word: string,
    sourceLanguage: string,
    targetLanguage: string,
    signal?: AbortSignal,
  ) => {
    try {
      const data = await aiWordDetails(
        { word, sourceLanguage, targetLanguage },
        signal ?? abortControllerRef.current?.signal,
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
      abortControllerRef.current = null;
    }
  };

  const getContext = () => {
    const word = form.getValues("word");
    const sourceLanguage = getLanguageById(form.getValues("sourceLanguageId"));
    const targetLanguage = getLanguageById(form.getValues("targetLanguageId"));
    if (!word || !sourceLanguage) return null;
    return { word, sourceLanguage, targetLanguage };
  };

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
    dispatch({ type: "reset" });
  };

  const wordDetails = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    dispatch({ type: "start" });
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      const ctx = getContext();
      if (!ctx) {
        dispatch({ type: "finish" });
        return;
      }

      const validation = await validate(toValidationCtx(ctx), signal);

      // Not valid: stay busy and wait for the user's decision.
      if (validation.status !== "valid") {
        dispatch({ type: "needs_user", validation });
        return;
      }

      if (!ctx.targetLanguage) {
        toast.error("Select a target language to fill the word.");
        dispatch({ type: "finish" });
        return;
      }

      dispatch({ type: "validated", validation });
      const result = await fill(
        ctx.word,
        ctx.sourceLanguage.value,
        ctx.targetLanguage.value,
        signal,
      );
      dispatch({ type: "finish" });
      return result;
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        toast.error(err?.message || "Validation failed. Please try again.");
      }
      dispatch({ type: "finish" });
    } finally {
      busyRef.current = false;
    }
  };

  const confirmWord = async (word: string) => {
    const stage = stageOfState(validationState);
    form.setValue("word", word);
    clearValidationUI();

    const ctx = getContext();
    if (!ctx) {
      dispatch({ type: "finish" });
      return;
    }
    if (stage) markPassedUpTo(stage, toValidationCtx(ctx));
    return wordDetails();
  };

  const continueAnyway = async () => {
    const stage = stageOfState(validationState);
    clearValidationUI();

    const ctx = getContext();
    if (!ctx) {
      dispatch({ type: "finish" });
      return;
    }
    if (stage) markPassedUpTo(stage, toValidationCtx(ctx));
    return wordDetails();
  };

  const confirmPos = async (pos: string) => {
    form.setValue("partOfSpeech", pos as AddWordFormValues["partOfSpeech"]);
    clearValidationUI();

    const ctx = getContext();
    if (!ctx) {
      dispatch({ type: "finish" });
      return;
    }
    markPassedUpTo("pos", toValidationCtx(ctx, pos));
    return wordDetails();
  };

  const dismissValidation = () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    clearValidationUI();
  };

  const stopAI = () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    clearValidationUI();
  };

  return {
    wordDetails,
    isLoading: isFilling || isValidating,
    isAiProcessing,
    validationState,
    confirmWord,
    confirmPos,
    continueAnyway,
    dismissValidation,
    stopAI,
  };
}
