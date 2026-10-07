"use client";

import { useEffect, useMemo } from "react";
import { Languages, Folder } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Separator } from "@/components/ui/separator";
import { SelectCategory } from "@/components/inputs/selectors/SelectCategory";
import { SelectLanguage } from "@/components/inputs/selectors/SelectLanguage";
import { SettingRow } from "../SettingRow";
import { useUserSettings } from "@/queries/user-settings/useUserSettings";
import { useCategoryById } from "@/queries/categories/useCategoryById";
import { useUpdateDefaultWordFormSettingsMutation } from "./useUpdateDefaultWordFormSettings.mutation";
import { ArrowButton } from "@/components/ArrowButton";
import { getLanguageById } from "@/constants/languages";

import {
  wordFormSettingsSchema,
  type WordFormSettingsValues,
} from "@/schemas/word/word.schema";
import { LoadingButton } from "@/components/LoadingButton";

const WordFormSettings = () => {
  const { data: userSettings } = useUserSettings();
  const sourceLanguage = getLanguageById(userSettings?.default_source_lang_id);
  const targetLanguage = getLanguageById(userSettings?.default_target_lang_id);
  const { category } = useCategoryById(userSettings?.default_category_id);

  const defaultValues = useMemo<WordFormSettingsValues>(
    () => ({
      sourceLanguageId: userSettings?.default_source_lang_id?.toString() ?? "",
      targetLanguageId: userSettings?.default_target_lang_id?.toString() ?? "",
      categoryId: userSettings?.default_category_id?.toString() ?? null,
    }),
    [userSettings],
  );

  const methods = useForm<WordFormSettingsValues>({
    resolver: zodResolver(wordFormSettingsSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    reset(defaultValues, { keepDefaultValues: false });
  }, [defaultValues, reset]);

  const { mutate: updateWordFormSettings, isPending } =
    useUpdateDefaultWordFormSettingsMutation();

  const onSubmit = (data: WordFormSettingsValues) => {
    updateWordFormSettings(data, {
      onSuccess: () => reset(data, { keepDefaultValues: false }),
      onError: () => toast.error("Failed to save settings. Please try again."),
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex h-full flex-col justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset disabled={isPending} className="space-y-5">
          <p className="text-sm text-muted-foreground">
            Choose your default language pair and category. These settings will
            be automatically used when adding new words.
          </p>

          <SettingRow
            icon={{ icon: Languages }}
            title="Default Source Language"
            description={
              sourceLanguage
                ? `${sourceLanguage.flag} ${sourceLanguage.label}`
                : "No default language"
            }
          >
            <div className="w-38">
              <SelectLanguage
                name="sourceLanguageId"
                placeholder="Select Language"
                disabled={isPending}
                clearable
              />
            </div>
          </SettingRow>

          <Separator />

          <SettingRow
            icon={{ icon: Languages }}
            title="Default Target Language"
            description={
              targetLanguage
                ? `${targetLanguage.flag} ${targetLanguage.label}`
                : "No default language"
            }
          >
            <div className="w-38">
              <SelectLanguage
                name="targetLanguageId"
                placeholder="Select Language"
                disabled={isPending}
                clearable
              />
            </div>
          </SettingRow>

          <Separator />

          <SettingRow
            icon={{ icon: Folder }}
            title="Default Saved Category"
            description={category?.name ?? "No default category"}
          >
            <div className="w-38">
              <SelectCategory
                name="categoryId"
                placeholder="Select Category"
                disabled={isPending}
              />
            </div>
          </SettingRow>
        </fieldset>

        <div className="flex justify-end">
          <LoadingButton
            type="submit"
            size="lg"
            disabled={!isDirty || isPending}
            isLoading={isPending}
            className="w-full sm:w-auto"
          >
            Save Changes
          </LoadingButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default WordFormSettings;
