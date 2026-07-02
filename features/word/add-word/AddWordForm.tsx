"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { AppIcons } from "@/components/icons";
import { FormInput } from "@/components/inputs/FormInput";
import { SelectLanguage } from "./select-fields/SelectLanguage";
import { SelectWordType } from "./select-fields/SelectWordType";
import { SelectCategory } from "./select-fields/SelectCategory";
import { LoadingButton } from "@/components/LoadingButton";

import { createWordAction } from "@/lib/actions/createWord.action";
import { mapWordToInsert } from "./utils/mapWordToInsert";
import { useLanguagesStore } from "@/stores/languages.store";

import {
  type AddWordFormValues,
  addWordSchema,
  addWordFormDefaultValues,
} from "./schemas/addWord.schema";
import { WordFormMoreFields } from "./WordFormMoreFields";

const AddWordForm = () => {
  const methods = useForm<AddWordFormValues>({
    resolver: zodResolver(addWordSchema),
    defaultValues: addWordFormDefaultValues,
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: AddWordFormValues) => {
    const languages = useLanguagesStore.getState().languages;
    if (languages.length === 0) {
      console.error("Languages not loaded yet");
      return;
    }

    const mappedData = mapWordToInsert({
      formData: data,
      languages,
    });

    try {
      const result = await createWordAction(mappedData);

      if (result) {
        toast.success("Word added successfully.");
        reset();
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to add word. Please try again.");
    }
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

        <WordFormMoreFields />

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
