import { z } from "zod";
import { createAiRoute } from "@/lib/ai/CreateAiRoute";
import { PARTS_OF_SPEECH, WORD_LIMITS } from "@/schemas/word/word.shared";

export const POST = createAiRoute({
  name: "ai-fill-word",
  input: z.object({
    word: z.string().min(1),
    sourceLanguage: z.string().min(1),
    targetLanguage: z.string().min(1),
  }),
  output: z.object({
    translation: z.string(),
    partOfSpeech: z.string(),
    synonyms: z.string(),
    antonyms: z.string(),
    example: z.string(),
    description: z.string(),
  }),
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
