"use client";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { createWordAction } from "@/queries/words/create/createWord.action";
import { queryKeys } from "@/queries/queries";

import type { AddWordFormValues } from "@/schemas/word/addWord.schema";
import type { Word } from "@/types/db-aliases";

export const useCreateWordMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: (formData: AddWordFormValues) => createWordAction(formData),

    onSuccess: (result, formData) => {
      if (result.status === "validation_error") {
        toast.error("Invalid form data. Please check your inputs.", {
          id: "create-word",
        });
        return;
      }

      if (result.status === "error") {
        throw new Error(result.message);
      }

      const categoryId = formData.categoryId ?? null;

      if (result.data) {
        queryClient.setQueryData(
          queryKeys.word.byCategoryId(Number(categoryId), user!.id),
          (old: Word[]) => [...(old ?? []), result.data],
        );
      } else {
        queryClient.invalidateQueries({
          queryKey: queryKeys.word.byCategoryId(Number(categoryId), user!.id),
        });
      }

      toast.success(`Word "${formData.word}" added successfully`, {
        id: "create-word",
      });
    },

    onError: () => {
      toast.error("Failed to add word. Please try again.", {
        id: "create-word",
      });
    },
  });
};
