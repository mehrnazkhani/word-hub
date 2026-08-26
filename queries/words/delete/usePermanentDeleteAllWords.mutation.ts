"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { permanentDeleteAllWordsAction } from "./permanentDeleteAllWords.action";
import { queryKeys } from "@/queries/queries";
import { toast } from "sonner";

type WordCache = {
  id: number;
  category_id: number;
  deleted_at: string | null;
  [key: string]: unknown;
};

export const usePermanentDeleteAllWordsMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: () => permanentDeleteAllWordsAction(),

    onMutate: async () => {
      const deletedQueryKey = queryKeys.word.deleted(user!.id);
      const countQueryKey = queryKeys.word.count(user!.id);

      await queryClient.cancelQueries({ queryKey: deletedQueryKey });
      await queryClient.cancelQueries({ queryKey: countQueryKey });

      const previousDeletedWords =
        queryClient.getQueryData<WordCache[]>(deletedQueryKey);
      const previousCount = queryClient.getQueryData<number | null>(
        countQueryKey,
      );

      queryClient.setQueryData<WordCache[]>(deletedQueryKey, (old) => {
        if (old === undefined) return undefined;
        return [];
      });

      queryClient.setQueryData<number | null>(countQueryKey, (old) => {
        if (old === undefined || old === null) return old;
        return 0;
      });

      toast.success("All words permanently deleted", {
        id: "permanent-delete-all-words",
      });

      return {
        previousDeletedWords,
        previousCount,
        deletedQueryKey,
        countQueryKey,
      };
    },

    onSuccess: (result) => {
      if (result.error) throw new Error(result.error);
    },

    onError: (_, __, context) => {
      if (context?.previousDeletedWords !== undefined)
        queryClient.setQueryData(
          context.deletedQueryKey,
          context.previousDeletedWords,
        );

      if (context?.previousCount !== undefined)
        queryClient.setQueryData(context.countQueryKey, context.previousCount);

      toast.error("Failed to permanently delete all words. Please try again.", {
        id: "permanent-delete-all-words",
      });
    },
  });
};
