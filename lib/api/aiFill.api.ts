import { API_ROUTES } from "@/constants/routes";
import type { AIWordValues } from "@/schemas/word/word.schema";

export type AiFillWordRequest = {
  word: string;
  sourceLanguage: string;
  targetLanguage: string;
};

export type AiFillWordResponse = AIWordValues;

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
