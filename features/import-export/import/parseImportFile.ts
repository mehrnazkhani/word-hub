import type { ExportShape } from "@/lib/utils/mapWordToExportShape";

export type ImportFileShape = {
  category: string;
  words: ExportShape[];
};

export const parseImportFile = (raw: unknown): ImportFileShape => {
  if (
    typeof raw !== "object" ||
    raw === null ||
    !("category" in raw) ||
    !("words" in raw)
  ) {
    throw new Error("Invalid file format.");
  }

  const { category, words } = raw as Record<string, unknown>;

  if (typeof category !== "string" || !category.trim()) {
    throw new Error("Missing or invalid category name.");
  }
  if (!Array.isArray(words) || words.length === 0) {
    throw new Error("No words found in file.");
  }

  for (const word of words) {
    if (
      typeof word !== "object" ||
      word === null ||
      typeof (word as Record<string, unknown>).word !== "string" ||
      typeof (word as Record<string, unknown>).translation !== "string"
    ) {
      throw new Error("One or more words have an invalid format.");
    }
  }

  return raw as ImportFileShape;
};
