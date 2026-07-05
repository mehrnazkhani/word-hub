"use client";

import { useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AppIcons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { SelectLanguage } from "../word/add-word/select-fields/SelectLanguage";
import { SelectCategory } from "../word/add-word/select-fields/SelectCategory";
import { LoadingButton } from "@/components/LoadingButton";
import { useUserSettingsStore } from "@/stores/userSettings.store";

import {
  addWordFormSettingsSchema,
  type AddWordFormSettingsValues,
} from "./AddWordFormSettings.schema";
import { useCategoriesStore } from "@/stores/categories.store";
import { findObjectById } from "@/lib/utils/findObjectById";
import { useLanguages } from "@/queries/languages/useLanguages";

const AddWordFormSettings = () => {
  const settings = useUserSettingsStore((s) => s.settings);
  const isLoading = useUserSettingsStore((s) => s.isLoading);
  const fetchUserSettings = useUserSettingsStore((s) => s.fetchUserSettings);

  const categories = useCategoriesStore((s) => s.categories);
  const { data: languages } = useLanguages();

  const sourceLanguageObject = useMemo(
    () => findObjectById(languages, settings?.default_source_lang_id),
    [languages, settings?.default_source_lang_id],
  );
  const targetLanguageObject = useMemo(
    () => findObjectById(languages, settings?.default_target_lang_id),
    [languages, settings?.default_target_lang_id],
  );
  const categoryNameObject = useMemo(
    () => findObjectById(categories, settings?.default_category_id),
    [categories, settings?.default_category_id],
  );

  const methods = useForm<AddWordFormSettingsValues>({
    resolver: zodResolver(addWordFormSettingsSchema),
    defaultValues: {
      defaultSourceLanguage: sourceLanguageObject?.value,
      defaultTargetLanguage: targetLanguageObject?.value,
      defaultCategoryId: String(categoryNameObject?.id),
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    fetchUserSettings();
  }, [fetchUserSettings]);

  useEffect(() => {
    if (settings) {
      reset({
        defaultSourceLanguage: settings.default_source_lang_id ?? undefined,
        defaultTargetLanguage: settings.default_target_lang_id ?? undefined,
        defaultCategoryId: settings.default_source_lang_id ?? undefined,
      });
    }
  }, [settings, reset]);

  const onSubmit = (data: AddWordFormSettingsValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span>Default Source Language:</span>
            {isLoading ? (
              "..."
            ) : sourceLanguageObject ? (
              <span className="flex gap-1">
                {sourceLanguageObject.flag} {sourceLanguageObject.label}
              </span>
            ) : (
              "Not set"
            )}
          </div>
          <div className="w-1/4">
            <SelectLanguage name="defaultSourceLanguage" placeholder="Change" />
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span>Default Target Language:</span>
            {isLoading ? (
              "..."
            ) : targetLanguageObject ? (
              <span className="flex gap-1">
                {targetLanguageObject.flag} {targetLanguageObject.label}
              </span>
            ) : (
              "Not set"
            )}
          </div>
          <div className="w-1/4">
            <SelectLanguage name="defaultTargetLanguage" placeholder="Change" />
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span>Default Category:</span>
            <span>
              {" "}
              {isLoading ? "..." : (categoryNameObject?.name ?? "Drop")}
            </span>
          </div>
          <div className="w-1/4">
            <SelectCategory
              name="defaultCategoryId"
              label="Select Category"
              placeholder="Change"
            />
          </div>
        </div>

        <LoadingButton variant="ghost" isLoading={isSubmitting}>
          {isSubmitting ? "Saving Changes..." : "Save Changes"}
          <AppIcons.ChevronRightIcon />
        </LoadingButton>
      </form>
    </FormProvider>
  );
};

export default AddWordFormSettings;
