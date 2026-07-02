import {
  splitRelatedWords,
  type AddWordFormValues,
} from "../schemas/addWord.schema";
import type { Language } from "@/types/db-aliases";
import type { WordInsert } from "@/types/db-aliases";

type MapWordToInsertProps = {
  formData: AddWordFormValues;
  languages: Language[];
};

export const mapWordToInsert = ({
  formData,
  languages,
}: MapWordToInsertProps): WordInsert => {
  const sourceLanguage = languages.find(
    (lan) => lan.value === formData.sourceLanguage,
  );
  const targetLanguage = languages.find(
    (lan) => lan.value === formData.targetLanguage,
  );

  const synonymsArray = splitRelatedWords(formData.synonyms);
  const antonymsArray = splitRelatedWords(formData.antonyms);

  return {
    word: formData.word,
    translation: formData.translation,
    description: formData.description,
    part_of_speech: formData.partOfSpeech,
    category_id: Number(formData.categoryId),
    synonyms: synonymsArray,
    antonyms: antonymsArray,
    source_language: sourceLanguage?.label ?? formData.sourceLanguage,
    target_language: targetLanguage?.label ?? formData.targetLanguage,
    source_flag: sourceLanguage?.flag ?? "",
    target_flag: targetLanguage?.flag ?? "",
  };
};
