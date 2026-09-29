import { useRef } from "react";
import {
  useSpellingCheck,
  type SpellingCheckState,
} from "./spelling-check/useSpellingCheck";
import {
  useBaseFormCheck,
  type BaseFormCheckState,
} from "./base-form-check/useBaseFormCheck";
import { usePosCheck, type PosCheckState } from "./POS-check/usePOSCheck";

export type WordValidationState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "valid" }
  | Extract<SpellingCheckState, { status: "incorrect" }>
  | Extract<BaseFormCheckState, { status: "notBaseForm" }>
  | Extract<PosCheckState, { status: "invalidPos" }>
  | Extract<PosCheckState, { status: "multiplePos" }>;

export type ValidationStage = "spelling" | "baseForm" | "pos";

export type ValidationContext = {
  word: string;
  language: string;
  pos?: string | null;
  explanationLanguage?: string;
};

export const stageOfState = (
  s: WordValidationState,
): ValidationStage | null => {
  switch (s.status) {
    case "incorrect":
      return "spelling";
    case "notBaseForm":
      return "baseForm";
    case "invalidPos":
    case "multiplePos":
      return "pos";
    default:
      return null;
  }
};

const posKey = (pos?: string | null) => `pos:${pos ?? ""}`;

export const useWordValidation = () => {
  const {
    state: spellingState,
    checkSpelling,
    reset: resetSpelling,
  } = useSpellingCheck();
  const {
    state: baseFormState,
    checkBaseForm,
    reset: resetBaseForm,
  } = useBaseFormCheck();
  const { state: posState, checkPos, reset: resetPos } = usePosCheck();

  // مرحله‌های پاس‌شده برای یک (زبان + کلمه). با عوض شدن کلمه یا زبان خودکار خالی می‌شود.
  const passedRef = useRef<{ key: string; stages: Set<string> }>({
    key: "",
    stages: new Set(),
  });

  const getPassed = (word: string, language: string) => {
    const key = `${language}:${word}`;
    if (passedRef.current.key !== key) {
      passedRef.current = { key, stages: new Set() };
    }
    return passedRef.current.stages;
  };

  // مرحله‌ی داده‌شده و همه‌ی مرحله‌های قبل از آن را پاس‌شده علامت می‌زند
  const markPassedUpTo = (stage: ValidationStage, ctx: ValidationContext) => {
    const passed = getPassed(ctx.word, ctx.language);
    passed.add("spelling");
    if (stage === "spelling") return;
    passed.add("baseForm");
    if (stage === "baseForm") return;
    passed.add(posKey(ctx.pos));
  };

  const validate = async (
    ctx: ValidationContext,
  ): Promise<WordValidationState> => {
    const { word, language, pos, explanationLanguage } = ctx;
    const passed = getPassed(word, language);

    // 1. spelling
    if (!passed.has("spelling")) {
      const r = await checkSpelling({ word, language, explanationLanguage });
      if (!r.isCorrect) {
        return { status: "incorrect", suggestions: r.suggestions ?? [] };
      }
      passed.add("spelling");
    }

    // 2. base form
    if (!passed.has("baseForm")) {
      const r = await checkBaseForm({ word, language });
      if (!r.isBaseForm) {
        return {
          status: "notBaseForm",
          formDescription: r.formDescription ?? "",
          baseForm: r.baseForm ?? word,
        };
      }
      passed.add("baseForm");
    }

    const posStage = posKey(pos);
    if (!passed.has(posStage)) {
      const r = await checkPos({ word, language, partOfSpeech: pos });
      if (pos && !r.isValid) return { status: "invalidPos" };
      if (!pos && !r.isValid) {
        return { status: "multiplePos", availablePos: r.availablePos };
      }
      passed.add(posStage);
    }

    return { status: "valid" };
  };

  const reset = () => {
    resetSpelling();
    resetBaseForm();
    resetPos();
  };

  const isLoading =
    spellingState.status === "loading" ||
    baseFormState.status === "loading" ||
    posState.status === "loading";

  return { validate, markPassedUpTo, isLoading, reset };
};
