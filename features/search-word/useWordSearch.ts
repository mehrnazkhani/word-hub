import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { fetchSearchedWords } from "@/lib/api/words.api";
import type { Word } from "@/types/db-aliases";

interface UseWordSearchReturn {
  results: Word[];
  loading: boolean;
  error: string | null;
  reset: () => void;
}

export const useWordSearch = (
  query: string,
  open: boolean,
): UseWordSearchReturn => {
  const [results, setResults] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!open || !debouncedQuery.trim()) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchSearchedWords({
      query: debouncedQuery,
      signal: controller.signal,
      limit: 15,
    })
      .then(setResults)
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Search failed. Please try again.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [debouncedQuery, open]);

  const reset = () => {
    setResults([]);
    setError(null);
    setLoading(false);
  };

  return { results, loading, error, reset };
};
