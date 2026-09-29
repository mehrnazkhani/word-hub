import { z } from "zod";
import { createAiRoute } from "@/lib/ai/CreateAiRoute";
import { PARTS_OF_SPEECH } from "@/schemas/word/word.shared";

export const POST = createAiRoute({
  name: "pos-check",
  timeoutMs: 10_000,
  input: z.object({
    word: z.string().min(1),
    language: z.string().min(1),
    partOfSpeech: z.string().optional(),
  }),
  output: z.object({
    isValid: z.boolean(),
    availablePos: z.array(z.object({ pos: z.string(), meaning: z.string() })),
  }),
  buildPrompt: ({ word, language, partOfSpeech }) => `
  Given the word "${word}" in ${language}:

${
  partOfSpeech
    ? `The user selected "${partOfSpeech}" as the part of speech.
Check if this word can be used as a "${partOfSpeech}".
- If valid: { isValid: true, availablePos: [{ pos: "${partOfSpeech}", meaning: "meaning of ${word} as a ${partOfSpeech}" }] }
- If invalid: { isValid: false, availablePos: [] }`
    : `Find all valid parts of speech from this list: ${PARTS_OF_SPEECH.join(", ")}.
- If only one: { isValid: true, availablePos: [{ pos, meaning }] }
- If multiple: { isValid: false, availablePos: [{ pos: "noun", meaning: "..." }, ...] }`
}

Keep meanings short (max 8 words).
  `,
});
