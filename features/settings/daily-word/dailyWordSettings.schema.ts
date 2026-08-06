import { z } from "zod";
import { CEFR_VALUES } from "@/constants/cefr-levels";

export const dailyWordSettingsSchema = z.object({
  daily_word_enabled: z.boolean(),
  daily_word_level: z.enum(CEFR_VALUES),
  daily_word_source_lang_id: z.string().nullable(),
});

export type DailyWordSettingsValues = z.infer<typeof dailyWordSettingsSchema>;

export const dailyWordSettingsDbSchema = dailyWordSettingsSchema.transform(
  (data) => ({
    daily_word_enabled: data.daily_word_enabled,
    daily_word_level: data.daily_word_level,
    daily_word_source_lang_id: data.daily_word_source_lang_id
      ? Number(data.daily_word_source_lang_id)
      : null,
  }),
);

export type DailyWordSettingsDbValues = z.infer<
  typeof dailyWordSettingsDbSchema
>;
