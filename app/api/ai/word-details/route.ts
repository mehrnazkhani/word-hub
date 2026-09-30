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

Word: "${word}"
Source language: ${sourceLanguage}
Target language: ${targetLanguage}

Return all fields below. Use "" when unknown or none.

- translation: translate "${word}" to ${targetLanguage}.
- partOfSpeech: exactly one of: ${PARTS_OF_SPEECH.join(", ")}.
  Use "" only if none fits.
- synonyms: up to ${WORD_LIMITS.maxRelatedWords} comma-separated synonyms in ${sourceLanguage}.
- antonyms: up to ${WORD_LIMITS.maxRelatedWords} comma-separated antonyms in ${sourceLanguage}.
- example: one natural sentence using "${word}" in ${sourceLanguage}.
- description: short explanation in ${targetLanguage}.

Example shape:
{"translation":"...","partOfSpeech":"noun","synonyms":"...","antonyms":"","example":"...","description":"..."}
`,
});
