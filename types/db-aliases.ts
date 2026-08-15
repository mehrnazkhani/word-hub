import type { Database } from "@/types/supabase";

type TableRow<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

type TableInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

type TableUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

type DbEnum<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

// =================== Categories ===================
export type Category = TableRow<"categories">;
export type CategoryWithWordCount = Category & {
  wordCount: number;
};
export type InsertCategory = Pick<TableInsert<"categories">, "name">;
export type UpdateCategoryType = TableUpdate<"categories">;

// =================== Words =========================
export type Word = Omit<
  TableRow<"words">,
  "user_id" | "translation_audio" | "search_vector"
>;
export type WordInsert = Omit<
  TableInsert<"words">,
  "user_id" | "translation_audio" | "search_vector"
>;
export type UpdateWord = Omit<
  TableUpdate<"words">,
  "translation_audio" | "search_vector"
>;

export type WordSource = "manual" | "suggestion";

// =================== Practices ======================
export type PracticeRecordType = TableRow<"practices">;
export type InsertPracticeRecordType = TableInsert<"practices">;

// =================== Languages ======================
export type Language = Omit<TableRow<"languages">, "created_at">;

// =================== PartOfSpeech ======================
export type PartOfSpeech = DbEnum<"part_of_speech_enum">;

// =================== User Settings ===================
export type AiFillFields = {
  translation: boolean;
  description: boolean;
  part_of_speech: boolean;
  example: boolean;
  antonyms: boolean;
  synonyms: boolean;
};

export type UserSettings = Omit<TableRow<"user_settings">, "ai_fill_fields"> & {
  ai_fill_fields: AiFillFields;
};

export type UpdateUserSettings = Omit<
  TableUpdate<"user_settings">,
  "ai_fill_fields"
> & {
  ai_fill_fields?: AiFillFields;
};

export type CefrLevel = DbEnum<"cefr_level_enum">;
