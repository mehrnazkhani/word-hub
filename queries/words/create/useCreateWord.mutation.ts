"use client";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { createWordAction } from "@/queries/words/create/createWord.action";
import { splitRelatedWords } from "@/schemas/word/word.shared";
import { queryKeys } from "@/queries/queries";

import type { AddWordFormValues } from "@/schemas/word/word.schema";
import type { Word } from "@/types/db-aliases";

export const useCreateWordMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: (formData: AddWordFormValues) => createWordAction(formData),

    onMutate: async (formData) => {
      const categoryId = formData.categoryId ?? null;
      const queryKey = queryKeys.word.byCategoryId(
        Number(categoryId),
        user!.id,
      );

      await queryClient.cancelQueries({ queryKey });

      const previousWords = queryClient.getQueryData<Word[]>(queryKey);

      const optimisticWord: Word = {
        id: -Date.now(),
        category_id: Number(categoryId),
        word: formData.word,
        translation: formData.translation,
        part_of_speech: formData.partOfSpeech ?? null,
        source_language_id: Number(formData.sourceLanguageId),
        target_language_id: Number(formData.targetLanguageId),
        synonyms: formData.synonyms
          ? splitRelatedWords(formData.synonyms)
          : null,
        antonyms: formData.antonyms
          ? splitRelatedWords(formData.antonyms)
          : null,
        example: formData.example ?? null,
        description: formData.description ?? null,
        score: 0,
        created_at: new Date().toISOString(),
        updated_at: null,
        deleted_at: null,
      };

      queryClient.setQueryData<Word[]>(queryKey, (old) => [
        ...(old ?? []),
        optimisticWord,
      ]);

      return { previousWords, queryKey, optimisticWord };
    },

    onSuccess: (result, _formData, context) => {
      if (result.status === "validation_error") {
        toast.error("Invalid form data. Please check your inputs.", {
          id: "create-word",
        });
        queryClient.setQueryData(context.queryKey, context.previousWords);
        return;
      }

      if (result.status === "error") {
        throw new Error(result.message);
      }

      if (result.data) {
        queryClient.setQueryData<Word[]>(
          context.queryKey,
          (old) =>
            old?.map((w) =>
              w.id === context.optimisticWord.id ? result.data : w,
            ) ?? [],
        );
      } else {
        queryClient.invalidateQueries({ queryKey: context.queryKey });
      }

      queryClient.invalidateQueries({
        queryKey: queryKeys.word.count(user!.id),
      });

      toast.success(`Word "${_formData.word}" added successfully`, {
        id: "create-word",
      });
    },

    onError: (_err, _formData, context) => {
      if (context?.previousWords !== undefined) {
        queryClient.setQueryData(context.queryKey, context.previousWords);
      }

      toast.error("Failed to add word. Please try again.", {
        id: "create-word",
      });
    },
  });
};
