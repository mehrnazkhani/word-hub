import { z } from "zod";
import { CEFR_VALUES } from "@/constants/cefr-levels";

export const dailyWordSettingsSchema = z.object({
  daily_word_enabled: z.boolean(),
  daily_word_level: z.enum(CEFR_VALUES),
  daily_word_source_lang_id: z.number().nullable(),
});

export type DailyWordSettingsValues = z.infer<typeof dailyWordSettingsSchema>;
