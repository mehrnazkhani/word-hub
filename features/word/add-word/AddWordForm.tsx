"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AppIcons } from "@/components/icons";
import { FormInput } from "@/components/inputs/FormInput";
import { FormTextarea } from "@/components/inputs/FormTextarea";
import { SelectLanguage } from "./select-fields/SelectLanguage";
import { SelectWordType } from "./select-fields/SelectWordType";
import { SelectCategory } from "./select-fields/SelectCategory";
import { LoadingButton } from "@/components/LoadingButton";

import {
  type AddWordFormValues,
  addWordSchema,
  addWordFormDefaultValues,
} from "./addWord.schema";

const AddWordForm = () => {
  const methods = useForm<AddWordFormValues>({
    resolver: zodResolver(addWordSchema),
    defaultValues: addWordFormDefaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: AddWordFormValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-4"
      >
        <div className="col-span-3">
          <FormInput name="word" label="Word" placeholder="Word" />
        </div>

        <div className="col-span-1">
          <SelectLanguage name="sourceLanguage" label="Source Language" />
        </div>

        <div className="col-span-3">
          <FormInput
            name="translation"
            label="Translation"
            placeholder="Translation"
          />
        </div>

        <div className="col-span-1">
          <SelectLanguage name="targetLanguage" label="Target Language" />
        </div>

        <div className="col-span-2">
          <SelectWordType />
        </div>

        <div className="col-span-2">
          <SelectCategory />
        </div>

        <div className="col-span-2">
          <FormInput name="synonyms" label="Synonyms" placeholder="Synonyms" />
        </div>

        <div className="col-span-2">
          <FormInput name="antonyms" label="Antonyms" placeholder="Antonyms" />
        </div>

        <div className="col-span-4">
          <FormTextarea
            name="description"
            label="Description"
            placeholder="Description"
          />
        </div>

        <div className="col-span-4 flex justify-end">
          <LoadingButton variant="ghost" isLoading={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
            <AppIcons.ChevronRightIcon />
          </LoadingButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddWordForm;
