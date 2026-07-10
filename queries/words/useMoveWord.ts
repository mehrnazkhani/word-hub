import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { moveWordAction, type moveWordActionProps } from "./moveWord.action";
import { queryKeys } from "../queries";
import { toast } from "sonner";

type WordCache = {
  id: number;
  category_id: number;
  [key: string]: unknown;
};

export const useMoveWord = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: ({
      wordId,
      fromCategoryId,
      toCategoryId,
    }: moveWordActionProps) =>
      moveWordAction({ wordId, fromCategoryId, toCategoryId }),

    onMutate: async ({ wordId, fromCategoryId, toCategoryId }) => {
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: queryKeys.word.byCategoryId(fromCategoryId, user!.id),
        }),
        queryClient.cancelQueries({
          queryKey: queryKeys.word.byCategoryId(toCategoryId, user!.id),
        }),
      ]);

      const previousFrom = queryClient.getQueryData<WordCache[]>(
        queryKeys.word.byCategoryId(fromCategoryId, user!.id),
      );
      const previousTo = queryClient.getQueryData<WordCache[]>(
        queryKeys.word.byCategoryId(toCategoryId, user!.id),
      );

      queryClient.setQueryData<WordCache[]>(
        queryKeys.word.byCategoryId(fromCategoryId, user!.id),
        (old) => old?.filter((w) => w.id !== wordId) ?? [],
      );

      queryClient.setQueryData<WordCache[]>(
        queryKeys.word.byCategoryId(toCategoryId, user!.id),
        (old) => {
          const word = previousFrom?.find((w) => w.id === wordId);
          if (!word) return old ?? [];
          return [...(old ?? []), { ...word, category_id: toCategoryId }];
        },
      );

      toast.success("Word moved successfully", { id: "move-word" });

      return { previousFrom, previousTo };
    },

    onSuccess: (result, { fromCategoryId, toCategoryId }) => {
      if (result.error) throw new Error(result.error);

      queryClient.invalidateQueries({
        queryKey: queryKeys.word.byCategoryId(fromCategoryId, user!.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.word.byCategoryId(toCategoryId, user!.id),
      });
    },

    onError: (_, { fromCategoryId, toCategoryId }, context) => {
      if (context?.previousFrom) {
        queryClient.setQueryData(
          queryKeys.word.byCategoryId(fromCategoryId, user!.id),
          context.previousFrom,
        );
      }
      if (context?.previousTo) {
        queryClient.setQueryData(
          queryKeys.word.byCategoryId(toCategoryId, user!.id),
          context.previousTo,
        );
      }

      toast.error("Failed to move word. Please try again.", {
        id: "move-word",
      });
    },
  });
};
