import { createAiRoute } from "@/lib/ai/createAiRoute";
import { PARTS_OF_SPEECH, WORD_LIMITS } from "@/schemas/word/word.shared";
import {
  wordDetailsInput,
  wordDetailsOutput,
} from "@/features/word/form/ai/word-details/schema";

export const POST = createAiRoute({
  name: "word-details",
  input: wordDetailsInput,
  output: wordDetailsOutput,
  buildPrompt: ({ word, sourceLanguage, targetLanguage }) => `
You are a dictionary assistant.
Given the word "${word}" in ${sourceLanguage}, fill in ALL fields:

- translation: translate to ${targetLanguage} (max ${WORD_LIMITS.translation} chars)
- partOfSpeech: one of ${PARTS_OF_SPEECH.join(", ")}. If unknown, ""
- synonyms: comma-separated in ${sourceLanguage} (max ${WORD_LIMITS.maxRelatedWords} words, each max ${WORD_LIMITS.relatedWord} chars). If none, ""
- antonyms: same rules as synonyms
- example: sentence using "${word}" in ${sourceLanguage} (max ${WORD_LIMITS.example} chars). If none, ""
- description: brief usage notes in ${targetLanguage} (max ${WORD_LIMITS.description} chars). If none, ""

Always return every field. Use "" when there is no value.
  `,
});
