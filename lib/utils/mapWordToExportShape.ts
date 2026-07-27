import type { Word } from "@/types/db-aliases";

export const mapWordToExportShape = (word: Word) => ({
  word: word.word,
  source_language_id: word.source_language_id,
  translation: word.translation,
  target_language_id: word.target_language_id,
  ...(word.part_of_speech && { part_of_speech: word.part_of_speech }),
  ...(word.synonyms?.length && { synonyms: word.synonyms }),
  ...(word.antonyms?.length && { antonyms: word.antonyms }),
  ...(word.example && { example: word.example }),
  ...(word.description && { description: word.description }),
});
