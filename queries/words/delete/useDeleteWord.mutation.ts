"use client";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { deleteWordAction } from "./deleteWord.action";
import { queryKeys } from "@/queries/queries";
import type { Word } from "@/types/db-aliases";

type WordCache = {
  id: number;
  category_id: number;
  deleted_at: string | null;
  [key: string]: unknown;
};

type DeleteWordMutationProps = {
  word: Word;
};

export const useDeleteWordMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: ({ word }: DeleteWordMutationProps) =>
      deleteWordAction({ wordId: word.id }),

    onMutate: async ({ word }) => {
      const { id: wordId, category_id: categoryId } = word;

      await queryClient.cancelQueries({
        queryKey: queryKeys.word.byCategoryId(categoryId, user!.id),
      });

      const previousWords = queryClient.getQueryData<WordCache[]>(
        queryKeys.word.byCategoryId(categoryId, user!.id),
      );

      queryClient.setQueryData<WordCache[]>(
        queryKeys.word.byCategoryId(categoryId, user!.id),
        (old) => old?.filter((w) => w.id !== wordId) ?? [],
      );

      toast.success(`Word ${word.word} deleted successfully`, {
        id: "delete-word",
      });

      return { previousWords };
    },

    onSuccess: (result, { word }) => {
      if (result.error) throw new Error(result.error);

      queryClient.invalidateQueries({
        queryKey: queryKeys.word.byCategoryId(word.category_id, user!.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.word.deleted(user!.id),
        type: "all",
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.word.recent(user!.id),
      });
    },

    onError: (_, { word }, context) => {
      if (context?.previousWords) {
        queryClient.setQueryData(
          queryKeys.word.byCategoryId(word.category_id, user!.id),
          context.previousWords,
        );
      }

      toast.error("Failed to delete word. Please try again.", {
        id: "delete-word",
      });
    },
  });
};
