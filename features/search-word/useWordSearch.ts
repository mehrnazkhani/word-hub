import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { fetchSearchedWords } from "@/lib/api/words.api";
import type { Word } from "@/types/db-aliases";

const SEARCH_DEBOUNCE_MS = 300;
const SEARCH_LIMIT = 15;
const SEARCH_ERROR_MESSAGE = "Search failed. Please try again.";

interface UseWordSearchReturn {
  results: Word[];
  loading: boolean;
  error: string | null;
}

export const useWordSearch = (
  query: string,
  open: boolean,
): UseWordSearchReturn => {
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS).trim();
  const isActive = open && debouncedQuery.length > 0;

  const { data, isFetching, isError } = useQuery({
    queryKey: ["words", "search", debouncedQuery],
    queryFn: ({ signal }) =>
      fetchSearchedWords({
        query: debouncedQuery,
        signal,
        limit: SEARCH_LIMIT,
      }),
    enabled: isActive,
    // Keep showing the previous results while the next query is loading,
    // so the list doesn't flash empty on every keystroke.
    placeholderData: keepPreviousData,
    staleTime: 30_000,
    retry: false,
  });

  return {
    // When the search is inactive (closed or empty query), always show nothing.
    results: isActive ? (data ?? []) : [],
    loading: isActive && isFetching,
    error: isActive && isError ? SEARCH_ERROR_MESSAGE : null,
  };
};
