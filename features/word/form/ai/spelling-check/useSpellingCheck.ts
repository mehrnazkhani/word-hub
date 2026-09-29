"use client";

import { useAiCheck } from "../useAiCheck";
import { aiSpellingCheck } from "@/lib/api/aiSpellingCheck.api";
import type {
  SpellingCheckRequest,
  SpellingSuggestion,
} from "@/features/word/form/ai/spelling-check/schema";

export type SpellingCheckState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "correct" }
  | { status: "incorrect"; suggestions: SpellingSuggestion[] };

type SpellingResultState = Extract<
  SpellingCheckState,
  { status: "correct" | "incorrect" }
>;

export const useSpellingCheck = () => {
  const { state, check, reset } = useAiCheck(
    aiSpellingCheck,
    (res): SpellingResultState =>
      res.isCorrect
        ? { status: "correct" }
        : { status: "incorrect", suggestions: res.suggestions },
  );

  const checkSpelling = (req: SpellingCheckRequest, signal?: AbortSignal) =>
    check(req, signal);

  return { state: state as SpellingCheckState, checkSpelling, reset };
};
