import type { AddWordFormValues } from "@/schemas/word/addWord.schema";

export const mapAddWordFormToInsert = (formData: AddWordFormValues) => ({
  word: formData.word,
  translation: formData.translation,
  description: formData.description ?? null,
  example: formData.example ?? null,
  part_of_speech: formData.partOfSpeech ?? null,
  category_id: formData.categoryId ?? null,
  source_language_id: formData.sourceLanguageId,
  target_language_id: formData.targetLanguageId,
  synonyms: formData.synonyms,
  antonyms: formData.antonyms,
});
