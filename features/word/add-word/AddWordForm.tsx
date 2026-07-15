"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { AppIcons } from "@/components/icons";
import { FormInput } from "@/components/inputs/FormInput";
import { SelectLanguage } from "./select-fields/SelectLanguage";
import { SelectWordType } from "./select-fields/SelectWordType";
import { SelectCategory } from "./select-fields/SelectCategory";
import { WordFormMoreFields } from "./WordFormMoreFields";
import { LoadingButton } from "@/components/LoadingButton";
import { createWordAction } from "@/lib/actions/createWord.action";
import { useAiFillWord } from "@/hooks/use-ai-fill-word";

import { addWordFormDefaultValues } from "@/schemas/word/addWord.defaults";
import { addWordSchema } from "@/schemas/word/addWord.schema";
import type { AddWordFormValues } from "@/schemas/word/addWord.schema";
import { AiFillButton } from "./AiFillButton";

const AddWordForm = () => {
  const methods = useForm<AddWordFormValues>({
    resolver: zodResolver(addWordSchema),
    defaultValues: addWordFormDefaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const { fillWithAI, isLoading: isAiLoading, stopAI } = useAiFillWord(methods);

  const onSubmit = async (data: AddWordFormValues) => {
    try {
      const result = await createWordAction(data);

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

        <WordFormMoreFields />

        <div className="col-span-4 flex justify-between">
          <AiFillButton
            isLoading={isAiLoading}
            onFill={fillWithAI}
            onStop={stopAI}
          />

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
