import { API_ROUTES } from "@/constants/routes";
import type { Word } from "@/types/db-aliases";

type FetchSearchedWordsProps = {
  query: string;
  signal: AbortSignal;
  limit: number;
};

export const fetchSearchedWords = async ({
  query,
  limit,
  signal,
}: FetchSearchedWordsProps): Promise<Word[]> => {
  if (!query.trim()) return [];

  const res = await fetch(API_ROUTES.SEARCH_WORD(query, limit), { signal });
  if (!res.ok) throw new Error("Search request failed.");

  const json = await res.json();
  return (json.results ?? []) as Word[];
};
