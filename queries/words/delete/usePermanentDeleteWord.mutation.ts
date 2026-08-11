"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { permanentDeleteWordAction } from "./deleteWord.action";
import { queryKeys } from "@/queries/queries";
import { toast } from "sonner";
import type { Word } from "@/types/db-aliases";

type WordCache = {
  id: number;
  category_id: number;
  deleted_at: string | null;
  [key: string]: unknown;
};

type PermanentDeleteWordMutationProps = {
  word: Word;
};

export const usePermanentDeleteWordMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: ({ word }: PermanentDeleteWordMutationProps) =>
      permanentDeleteWordAction({ wordId: word.id }),

    onMutate: async ({ word }) => {
      const deletedQueryKey = queryKeys.word.deleted(user!.id);
      const recentQueryKey = queryKeys.word.recent(user!.id);
      const countQueryKey = queryKeys.word.count(user!.id);

      await queryClient.cancelQueries({ queryKey: deletedQueryKey });
      await queryClient.cancelQueries({ queryKey: recentQueryKey });
      await queryClient.cancelQueries({ queryKey: countQueryKey });

      const previousDeletedWords =
        queryClient.getQueryData<WordCache[]>(deletedQueryKey);
      const previousRecent =
        queryClient.getQueryData<WordCache[]>(recentQueryKey);
      const previousCount = queryClient.getQueryData<number | null>(
        countQueryKey,
      );

      queryClient.setQueryData<WordCache[]>(deletedQueryKey, (old) => {
        if (old === undefined) return undefined;
        return old.filter((w) => w.id !== word.id);
      });

      queryClient.setQueryData<WordCache[]>(recentQueryKey, (old) => {
        if (old === undefined) return undefined;
        return old.filter((w) => w.id !== word.id);
      });

      queryClient.setQueryData<number | null>(countQueryKey, (old) => {
        if (old === undefined || old === null) return old;
        return Math.max(old - 1, 0);
      });

      toast.success(`Word "${word.word}" permanently deleted`, {
        id: "permanent-delete-word",
      });

      return {
        previousDeletedWords,
        previousRecent,
        previousCount,
        deletedQueryKey,
        recentQueryKey,
        countQueryKey,
      };
    },

    onSuccess: (result) => {
      if (result.error) throw new Error(result.error);
    },

    onError: (_, _variables, context) => {
      if (context?.previousDeletedWords !== undefined)
        queryClient.setQueryData(
          context.deletedQueryKey,
          context.previousDeletedWords,
        );

      if (context?.previousRecent !== undefined)
        queryClient.setQueryData(
          context.recentQueryKey,
          context.previousRecent,
        );

      if (context?.previousCount !== undefined)
        queryClient.setQueryData(context.countQueryKey, context.previousCount);

      toast.error("Failed to permanently delete word. Please try again.", {
        id: "permanent-delete-word",
      });
    },
  });
};
