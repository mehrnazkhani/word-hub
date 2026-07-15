import { AddWordFormValues } from "@/schemas/word/addWord.schema";
import { API_ROUTES } from "@/constants/routes";

export type AiFillWordRequest = {
  word: string;
  sourceLanguage: string;
  targetLanguage: string;
};

export type AiFillWordResponse = {
  translation: string;
  partOfSpeech: AddWordFormValues["partOfSpeech"];
  synonyms: string;
  antonyms: string;
  description: string | null;
};

export const aiFillWord = async (
  payload: AiFillWordRequest,
  signal?: AbortSignal,
): Promise<AiFillWordResponse> => {
  const res = await fetch(API_ROUTES.ai_FILL_WORD, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data?.error || "AI fill failed");

  return data;
};
