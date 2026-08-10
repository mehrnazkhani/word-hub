import type { Word } from "@/types/db-aliases";

export const mapWordToExportShape = (word: Word) => ({
  word: word.word,
  sourceLanguageId: word.source_language_id,
  translation: word.translation,
  targetLanguageId: word.target_language_id,
  ...(word.part_of_speech && { partOfSpeech: word.part_of_speech }),
  ...(word.synonyms?.length && { synonyms: word.synonyms }),
  ...(word.antonyms?.length && { antonyms: word.antonyms }),
  ...(word.example && { example: word.example }),
  ...(word.description && { description: word.description }),
});

export type ExportShape = ReturnType<typeof mapWordToExportShape>;
