"use client";

import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput } from "@/components/inputs/FormInput";
import { RelatedWordsInput } from "@/components/inputs/RelatedWordsInput";
import { FormTextarea } from "@/components/inputs/FormTextarea";
import { WordPronunciation } from "@/components/WordPronunciation";
import { FormFooter } from "@/components/FormFooter";
import { LoadingButton } from "@/components/LoadingButton";
import { SelectLanguage } from "../../../components/inputs/selectors/SelectLanguage";
import { SelectWordType } from "../../../components/inputs/selectors/SelectWordType";

import { getLanguageById } from "@/constants/languages";
import { useEditWordMutation } from "@/queries/words/edit/useEditWord.mutation";
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

const FORM_ID = "edit-word-form";

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

  const sourceLanguage = sourceLanguageId
    ? getLanguageById(sourceLanguageId)
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
      <form id={FORM_ID} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 gap-4">
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
        </div>
      </form>

      <FormFooter>
        <LoadingButton
          className="w-full"
          type="submit"
          form={FORM_ID}
          isLoading={isSubmitting}
          disabled={!isDirty}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </LoadingButton>
      </FormFooter>
    </FormProvider>
  );
};

export default EditWordForm;
