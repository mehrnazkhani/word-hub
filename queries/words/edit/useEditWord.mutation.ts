"use client";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { editWordAction } from "@/queries/words/edit/editWord.action";
import { splitRelatedWords } from "@/schemas/word/word.shared";
import { queryKeys } from "@/queries/queries";

import type { EditWordFormValues } from "@/schemas/word/word.schema";
import type { Word } from "@/types/db-aliases";

type UseEditWordMutationProps = {
  wordId: number;
  categoryId: number | null;
};

export const useEditWordMutation = ({
  wordId,
  categoryId,
}: UseEditWordMutationProps) => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: (formData: EditWordFormValues) =>
      editWordAction({ wordId, formData }),

    onMutate: async (formData) => {
      const queryKey = queryKeys.word.byCategoryId(
        Number(categoryId),
        user!.id,
      );

      await queryClient.cancelQueries({ queryKey });

      const previousWords = queryClient.getQueryData<Word[]>(queryKey);

      const optimisticWord: Partial<Word> = {
        id: wordId,
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
        updated_at: new Date().toISOString(),
      };

      queryClient.setQueryData<Word[]>(
        queryKey,
        (old) =>
          old?.map((w) =>
            w.id === wordId ? { ...w, ...optimisticWord } : w,
          ) ?? [],
      );

      return { previousWords, queryKey };
    },

    onSuccess: (result, _formData, context) => {
      if (result.status === "validation_error") {
        toast.error("Invalid form data. Please check your inputs.", {
          id: "edit-word",
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
          (old) => old?.map((w) => (w.id === wordId ? result.data : w)) ?? [],
        );
      } else {
        queryClient.invalidateQueries({ queryKey: context.queryKey });
      }

      toast.success(`Word "${_formData.word}" updated successfully`, {
        id: "edit-word",
      });
    },

    onError: (_err, _formData, context) => {
      if (context?.previousWords !== undefined) {
        queryClient.setQueryData(context.queryKey, context.previousWords);
      }

      toast.error("Failed to update word. Please try again.", {
        id: "edit-word",
      });
    },
  });
};
