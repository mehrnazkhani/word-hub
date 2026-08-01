"use client";

import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput } from "@/components/inputs/FormInput";
import { RelatedWordsInput } from "@/components/inputs/RelatedWordsInput";
import { FormTextarea } from "@/components/inputs/FormTextarea";
import { WordPronunciation } from "@/components/WordPronunciation";
import { SelectLanguage } from "../../../components/inputs/selectors/SelectLanguage";
import { SelectWordType } from "../../../components/inputs/selectors/SelectWordType";
import { ArrowButton } from "@/components/ArrowButton";

import { useLanguages } from "@/queries/languages/useLanguages";
import { useEditWordMutation } from "@/queries/words/edit/useEditWord.mutation";
import { findObjectById } from "@/lib/utils/findObjectById";
import { joinRelatedWords } from "@/schemas/word/word.shared";

import {
  editWordFormSchema,
  type EditWordFormValues,
} from "@/schemas/word/word.schema";
import type { Word } from "@/types/db-aliases";

type EditWordFormProps = {
  word: Word;
  onSuccess?: () => void;
};

const EditWordForm = ({ word, onSuccess }: EditWordFormProps) => {
  const methods = useForm<EditWordFormValues>({
    resolver: zodResolver(editWordFormSchema),
    defaultValues: {
      word: word.word ?? "",
      translation: word.translation ?? "",
      sourceLanguageId: String(word.source_language_id) ?? "",
      targetLanguageId: String(word.target_language_id) ?? "",
      partOfSpeech: word.part_of_speech ?? null,
      synonyms: joinRelatedWords(word.synonyms),
      antonyms: joinRelatedWords(word.antonyms),
      description: word.description ?? "",
      example: word.example ?? "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const wordValue = useWatch({ control: methods.control, name: "word" });
  const sourceLanguageId = useWatch({
    control: methods.control,
    name: "sourceLanguageId",
  });

  const { data: languages = [] } = useLanguages();
  const sourceLanguage = sourceLanguageId
    ? findObjectById(languages, Number(sourceLanguageId))
    : undefined;

  const { mutateAsync: editWord } = useEditWordMutation({
    wordId: word.id,
    categoryId: word.category_id,
  });

  const onSubmit = async (data: EditWordFormValues) => {
    try {
      await editWord(data, { onSuccess: () => onSuccess?.() });
    } catch {}
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-4"
      >
        <div className="col-span-3 flex items-center">
          <FormInput
            name="word"
            label="Word"
            placeholder="Word"
            endAdornment={
              wordValue ? (
                <WordPronunciation
                  word={wordValue}
                  lang={sourceLanguage?.value}
                />
              ) : undefined
            }
          />
        </div>

        <div className="col-span-1">
          <SelectLanguage name="sourceLanguageId" label="Source Language" />
        </div>

        <div className="col-span-3">
          <FormInput
            name="translation"
            label="Translation"
            placeholder="Translation"
          />
        </div>

        <div className="col-span-1">
          <SelectLanguage name="targetLanguageId" label="Target Language" />
        </div>

        <div className="col-span-4">
          <SelectWordType />
        </div>

        <div className="col-span-4 space-y-4">
          <RelatedWordsInput name="synonyms" placeholder="Synonyms" />
          <RelatedWordsInput name="antonyms" placeholder="Antonyms" />

          <FormTextarea
            name="example"
            label="Example"
            placeholder="Example"
            rows={2}
          />

          <FormTextarea
            name="description"
            label="Description"
            placeholder="Description"
            rows={2}
          />
        </div>

        <div className="col-span-4 flex justify-end">
          <ArrowButton
            type="submit"
            isLoading={isSubmitting}
            disabled={!isDirty || isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </ArrowButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditWordForm;
