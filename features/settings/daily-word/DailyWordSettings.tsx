"use client";

import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Calendar, Dumbbell, Languages } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { IconBadge } from "@/components/ui/icon-badge";
import { Separator } from "@/components/ui/separator";
import { ArrowButton } from "@/components/ArrowButton";
import { SettingRow } from "../SettingRow";
import { FormSwitch } from "@/components/inputs/FormSwitch";
import { SelectLanguage } from "@/components/inputs/selectors/SelectLanguage";
import { SelectCEFRLevel } from "@/components/inputs/selectors/SelectCEFRLevel";

import { useUserSettings } from "@/queries/user-settings/useUserSettings";
import { getLanguageById } from "@/constants/languages";
import { useUpdateDailyWordSettingsMutation } from "./useUpdateDailyWordSettings.mutation";
import { CEFR_LEVELS } from "@/constants/cefr-levels";

import {
  dailyWordSettingsSchema,
  type DailyWordSettingsValues,
} from "./dailyWordSettings.schema";

const DailyWordSettings = () => {
  const { data: userSettings } = useUserSettings();

  const sourceLanguage = getLanguageById(
    userSettings?.daily_word_source_lang_id,
  );
  const currentLevel = CEFR_LEVELS.find(
    (l) => l.value === userSettings?.daily_word_level,
  );

  const defaultValues = useMemo<DailyWordSettingsValues>(
    () => ({
      daily_word_enabled: userSettings?.daily_word_enabled ?? true,
      daily_word_level: userSettings?.daily_word_level ?? "B1",
      daily_word_source_lang_id:
        userSettings?.daily_word_source_lang_id ?? null,
    }),
    [userSettings],
  );

  const methods = useForm<DailyWordSettingsValues>({
    resolver: zodResolver(dailyWordSettingsSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    reset(defaultValues, { keepDefaultValues: false });
  }, [defaultValues, reset]);

  const { mutate: updateDailyWordSettingsMutation, isPending } =
    useUpdateDailyWordSettingsMutation();

  const onSubmit = (data: DailyWordSettingsValues) => {
    updateDailyWordSettingsMutation(data);
  };

  const isEnabled = watch("daily_word_enabled");

  return (
    <FormProvider {...methods}>
      <form
        className="flex h-full flex-col justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset disabled={isPending} className="space-y-5">
          <p className="text-sm text-muted-foreground">
            Set your preferred language and level. We'll pick a new word for you
            every day.
          </p>

          <div className="space-y-1">
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-2">
                <IconBadge icon={Calendar} />
                Daily word suggestions
              </div>
              <div className="shrink-0">
                <div className="shrink-0 **:data-[slot=field]:flex-row **:data-[slot=field]:items-center">
                  <FormSwitch
                    name="daily_word_enabled"
                    label="Daily word enabled"
                  />
                </div>
              </div>
            </div>
            <p className="ml-8 text-xs text-accent-foreground/60">
              Show a new word every day based on your preferences
            </p>
          </div>

          <Separator />

          <div className={!isEnabled ? "pointer-events-none opacity-50" : ""}>
            <div className="space-y-5">
              <SettingRow
                icon={{ icon: Languages }}
                title="Daily word language"
                description={
                  sourceLanguage
                    ? `${sourceLanguage.flag} ${sourceLanguage.label}`
                    : "No language selected"
                }
              >
                <div className="w-38">
                  <SelectLanguage
                    name="daily_word_source_lang_id"
                    placeholder="Select Language"
                    clearable
                  />
                </div>
              </SettingRow>

              <Separator />

              <SettingRow
                icon={{ icon: Dumbbell }}
                title="Difficulty Level"
                description={currentLevel?.label ?? "No level selected"}
              >
                <div className="w-38">
                  <SelectCEFRLevel name="daily_word_level" />
                </div>
              </SettingRow>
            </div>
          </div>
        </fieldset>

        <div className="flex justify-end">
          <ArrowButton type="submit" disabled={!isDirty || isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </ArrowButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default DailyWordSettings;
