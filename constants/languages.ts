import { z } from "zod";

export const LanguageSchema = z.object({
  id: z.number(),
  value: z.string(),
  label: z.string(),
  flag: z.string().nullable(),
  is_active: z.boolean(),
});

export type Language = z.infer<typeof LanguageSchema>;

export const LANGUAGES: Language[] = [
  { id: 1, value: "en", label: "English", flag: "🇺🇸", is_active: true },
  { id: 2, value: "es", label: "Spanish", flag: "🇪🇸", is_active: true },
  { id: 3, value: "fa", label: "Persian", flag: "🇮🇷", is_active: true },
  { id: 4, value: "ar", label: "Arabic", flag: "🇸🇦", is_active: true },
  { id: 8, value: "fi", label: "Finnish", flag: "🇫🇮", is_active: true },
  { id: 9, value: "CN", label: "Chinese", flag: "🇨🇳", is_active: true },
  { id: 10, value: "cs", label: "Czech", flag: "🇨🇿", is_active: true },
  { id: 11, value: "hr", label: "Croatian", flag: "🇭🇷", is_active: true },
  { id: 12, value: "de", label: "German", flag: "🇩🇪", is_active: true },
];

export const ACTIVE_LANGUAGES = LANGUAGES.filter((l) => l.is_active);

export const LANGUAGE_MAP = new Map(LANGUAGES.map((l) => [l.id, l]));

export const getLanguageById = (id: number | string | null | undefined) =>
  id != null ? (LANGUAGE_MAP.get(Number(id)) ?? null) : null;

export const getLanguageByValue = (value: string) =>
  LANGUAGES.find((l) => l.value === value) ?? null;
