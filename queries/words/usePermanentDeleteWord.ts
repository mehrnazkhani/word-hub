"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { permanentDeleteWordAction } from "./deleteWord.action";
import { queryKeys } from "../queries";
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

export const usePermanentDeleteWord = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: ({ word }: PermanentDeleteWordMutationProps) =>
      permanentDeleteWordAction({ wordId: word.id }),

    onMutate: async ({ word }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.word.deleted(user!.id),
      });

      const previousDeletedWords = queryClient.getQueryData<WordCache[]>(
        queryKeys.word.deleted(user!.id),
      );

      queryClient.setQueryData<WordCache[]>(
        queryKeys.word.deleted(user!.id),
        (old) => old?.filter((w) => w.id !== word.id) ?? [],
      );

      toast.success(`Word "${word.word}" permanently deleted`, {
        id: "permanent-delete-word",
      });

      return { previousDeletedWords };
    },

    onSuccess: (result, { word }) => {
      if (result.error) throw new Error(result.error);

      queryClient.invalidateQueries({
        queryKey: queryKeys.word.deleted(user!.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.word.recent(user!.id),
      });
    },

    onError: (_, _variables, context) => {
      if (context?.previousDeletedWords) {
        queryClient.setQueryData(
          queryKeys.word.deleted(user!.id),
          context.previousDeletedWords,
        );
      }

      toast.error("Failed to permanently delete word. Please try again.", {
        id: "permanent-delete-word",
      });
    },
  });
};
