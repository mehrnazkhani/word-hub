"use client";

import { useEffect } from "react";
import { Languages, Folder } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Separator } from "@/components/ui/separator";
import { SelectCategory } from "@/features/word/add-word/select-fields/SelectCategory";
import { SelectLanguage } from "@/features/word/add-word/select-fields/SelectLanguage";
import { SettingRow } from "../SettingRow";
import { useUserSettings } from "@/queries/user-settings/useUserSettings";
import { useLanguagesById } from "@/queries/languages/useLanguagesById";
import { useCategoryById } from "@/queries/categories/useCategoryById";
import { useUpdateWordFormSettings } from "@/queries/user-settings/useUpdateDefaultWordFormSettings";
import { LoadingButton } from "@/components/LoadingButton";

import {
  wordFormSettingsSchema,
  type WordFormSettingsValues,
} from "./AddWordFormSettings.schema";

const WordFormSettings = () => {
  const { data: userSettings } = useUserSettings();
  const { sourceLang, targetLang } = useLanguagesById(
    userSettings?.default_source_lang_id,
    userSettings?.default_target_lang_id,
  );
  const { category } = useCategoryById(userSettings?.default_category_id);

  const methods = useForm<WordFormSettingsValues>({
    resolver: zodResolver(wordFormSettingsSchema),
    defaultValues: {
      sourceLanguageId: "",
      targetLanguageId: "",
      categoryId: null,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (!userSettings) return;

    reset({
      sourceLanguageId: userSettings.default_source_lang_id?.toString() ?? "",
      targetLanguageId: userSettings.default_target_lang_id?.toString() ?? "",
      categoryId: userSettings.default_category_id?.toString() ?? null,
    });
  }, [userSettings, reset]);

  const { mutate: updateWordFormSettings, isPending } =
    useUpdateWordFormSettings();

  const onSubmit = (data: WordFormSettingsValues) => {
    updateWordFormSettings(data, {
      onSuccess: () => reset(data),
      onError: () => toast.error("Failed to save settings. Please try again."),
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex h-full flex-col justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground">
            Choose your default language pair and category. These settings will
            be automatically used when adding new words.
          </p>

          <SettingRow
            icon={{ icon: Languages }}
            title="Default Source Language"
            description={
              sourceLang
                ? `${sourceLang.flag} ${sourceLang.label}`
                : "No default language"
            }
          >
            <div className="w-38">
              <SelectLanguage
                name="sourceLanguageId"
                placeholder="Select Language"
                disabled={isPending}
              />
            </div>
          </SettingRow>

          <Separator />

          <SettingRow
            icon={{ icon: Languages }}
            title="Default Target Language"
            description={
              targetLang
                ? `${targetLang.flag} ${targetLang.label}`
                : "No default language"
            }
          >
            <div className="w-38">
              <SelectLanguage
                name="targetLanguageId"
                placeholder="Select Language"
                disabled={isPending}
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
        </div>

        <div className="flex justify-end">
          <LoadingButton
            variant="ghost"
            disabled={!isDirty || isPending}
            isLoading={isPending}
          >
            Save Changes
          </LoadingButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default WordFormSettings;
