"use client";

import { findObjectById } from "@/lib/utils/findObjectById";
import { useLanguages } from "./useLanguages";

export const useLanguagesById = (
  sourceLangId?: number | null,
  targetLangId?: number | null,
) => {
  const { data: languages = [] } = useLanguages();

  return {
    sourceLang: findObjectById(languages, sourceLangId),
    targetLang: findObjectById(languages, targetLangId),
  };
};
