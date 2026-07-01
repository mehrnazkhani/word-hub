"use client";

import { useEffect } from "react";
import { getLanguages } from "@/lib/data/getLanguages";
import { useLanguagesStore } from "@/stores/languages.store";

export const useLanguages = () => {
  const languages = useLanguagesStore((s) => s.languages);
  const setLanguages = useLanguagesStore((s) => s.setLanguages);

  useEffect(() => {
    if (languages.length) return;

    const fetchLanguages = async () => {
      try {
        const data = await getLanguages();
        setLanguages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLanguages();
  }, [languages.length, setLanguages]);

  return languages;
};
