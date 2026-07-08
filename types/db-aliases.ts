import type { Database } from "@/types/supabase";

type TableRow<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

type TableInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

type TableUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

// =================== Categories ===================
export type Category = TableRow<"categories">;
export type InsertCategory = Pick<TableInsert<"categories">, "name">;
export type UpdateCategoryType = TableUpdate<"categories">;

// =================== Words =========================
export type Word = Omit<TableRow<"words">, "user_id">;
export type WordInsert = Omit<TableInsert<"words">, "user_id">;
export type UpdateWord = TableUpdate<"words">;
export type PartOfSpeech = Database["public"]["Enums"]["part_of_speech_enum"];

// =================== Practices ======================
export type PracticeRecordType = TableRow<"practices">;
export type InsertPracticeRecordType = TableInsert<"practices">;

// =================== Languages ======================
export type Language = TableRow<"languages">;
export type InsertLanguageRecordType = TableInsert<"languages">;
