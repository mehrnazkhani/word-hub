"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { restoreWordAction } from "./restoreWord.action";
import { queryKeys } from "../../queries";
import { toast } from "sonner";
import type { Word } from "@/types/db-aliases";

type WordCache = {
  id: number;
  category_id: number;
  deleted_at: string | null;
  [key: string]: unknown;
};

type RestoreWordMutationProps = {
  word: Word;
};

export const useRestoreWordMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: ({ word }: RestoreWordMutationProps) =>
      restoreWordAction({ wordId: word.id }),

    onMutate: async ({ word }) => {
      const { id: wordId } = word;

      await queryClient.cancelQueries({
        queryKey: queryKeys.word.deleted(user!.id),
      });

      const previousWords = queryClient.getQueryData<WordCache[]>(
        queryKeys.word.deleted(user!.id),
      );

      queryClient.setQueryData<WordCache[]>(
        queryKeys.word.deleted(user!.id),
        (old) => old?.filter((w) => w.id !== wordId) ?? [],
      );

      toast.success(`Word ${word.word} restored successfully`, {
        id: "restore-word",
      });

      return { previousWords };
    },

    onSuccess: (result, { word }) => {
      if (result.error) throw new Error(result.error);

      queryClient.invalidateQueries({
        queryKey: queryKeys.word.deleted(user!.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.word.byCategoryId(word.category_id, user!.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.word.recent(user!.id),
      });
    },

    onError: (_, { word }, context) => {
      if (context?.previousWords) {
        queryClient.setQueryData(
          queryKeys.word.deleted(user!.id),
          context.previousWords,
        );
      }

      toast.error("Failed to restore word. Please try again.", {
        id: "restore-word",
      });
    },
  });
};
