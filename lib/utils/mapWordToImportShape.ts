import {
  wordDbSchema,
  type WordInsertPayload,
} from "@/schemas/word/word.schema";
import type { ExportShape } from "./mapWordToExportShape";

type MapWordToImportShapeProps = {
  word: ExportShape;
  categoryId: number;
};

export const mapWordToImportShape = ({
  word,
  categoryId,
}: MapWordToImportShapeProps): WordInsertPayload => {
  return wordDbSchema.parse({
    word: word.word,
    translation: word.translation,
    sourceLanguageId: String(word.sourceLanguageId),
    targetLanguageId: String(word.targetLanguageId),
    partOfSpeech: word.partOfSpeech ?? null,
    synonyms: Array.isArray(word.synonyms)
      ? word.synonyms.join(", ")
      : (word.synonyms ?? ""),
    antonyms: Array.isArray(word.antonyms)
      ? word.antonyms.join(", ")
      : (word.antonyms ?? ""),
    example: word.example ?? null,
    description: word.description ?? null,
    categoryId: String(categoryId),
  });
};
