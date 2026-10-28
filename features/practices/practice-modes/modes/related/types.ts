export type RelatedField = "synonyms" | "antonyms";

export type RelatedQuestion = {
  id: number;
  word: string;
  related: string[];
  options: string[];
};
