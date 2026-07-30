"use client";

import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput } from "@/components/inputs/FormInput";
import { WordPronunciation } from "@/components/WordPronunciation";
import { SelectLanguage } from "../../../components/inputs/selectors/SelectLanguage";
import { SelectWordType } from "../../../components/inputs/selectors/SelectWordType";
import { SelectCategory } from "../../../components/inputs/selectors/SelectCategory";
import { WordFormAdvanced } from "./WordFormAdvanced";
import { ArrowButton } from "@/components/ArrowButton";
import { AiFillButton } from "./ai/AiFillButton";

import { useAiFillWord } from "@/features/word/add-word/ai/use-ai-fill-word";
import { useCreateWordMutation } from "@/queries/words/create/useCreateWord.mutation";
import { useUserSettings } from "@/queries/user-settings/useUserSettings";
import { useLanguages } from "@/queries/languages/useLanguages";
import { findObjectById } from "@/lib/utils/findObjectById";

import {
  addWordFormSchema,
  type AddWordFormValues,
} from "@/schemas/word/word.schema";

const addWordFormDefaultValues: AddWordFormValues = {
  word: "",
  translation: "",
  sourceLanguageId: "",
  targetLanguageId: "",
  partOfSpeech: null,
  categoryId: null,
  synonyms: "",
  antonyms: "",
  description: "",
  example: "",
};

const AddWordForm = () => {
  const { data: userSettings } = useUserSettings();

  const methods = useForm<AddWordFormValues>({
    resolver: zodResolver(addWordFormSchema),
    defaultValues: {
      ...addWordFormDefaultValues,
      sourceLanguageId: userSettings?.default_source_lang_id
        ? String(userSettings.default_source_lang_id)
        : "",
      targetLanguageId: userSettings?.default_target_lang_id
        ? String(userSettings.default_target_lang_id)
        : "",
      categoryId: userSettings?.default_category_id
        ? String(userSettings.default_category_id)
        : null,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
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

  const { fillWithAI, isLoading: isAiLoading, stopAI } = useAiFillWord(methods);

  const { mutateAsync: creteWord } = useCreateWordMutation();

  const onSubmit = async (data: AddWordFormValues) => {
    try {
      await creteWord(data, { onSuccess: () => reset() });
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

        <div className="col-span-2">
          <SelectWordType />
        </div>

        <div className="col-span-2">
          <SelectCategory
            name="categoryId"
            label="Select Category"
            placeholder="Select Category"
          />
        </div>

        <WordFormAdvanced />

        <div className="col-span-4 flex justify-between">
          <AiFillButton
            isLoading={isAiLoading}
            onFill={fillWithAI}
            onStop={stopAI}
          />
          <ArrowButton type="submit" isLoading={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </ArrowButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddWordForm;
