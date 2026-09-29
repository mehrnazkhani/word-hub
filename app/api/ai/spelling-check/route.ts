import { z } from "zod";
import { createAiRoute } from "@/lib/ai/CreateAiRoute";

export const POST = createAiRoute({
  name: "spelling-check",
  timeoutMs: 10_000,
  input: z.object({
    word: z.string().min(1),
    language: z.string().min(1),
  }),
  output: z.object({
    isCorrect: z.boolean(),
    suggestions: z.array(z.string()).max(3),
  }),
  buildPrompt: ({ word, language }) => `
    Check if this word has a spelling mistake in ${language}.
    Word: "${word}"

    Rules:
    - If correct: { "isCorrect": true, "suggestions": [] }
    - If incorrect: { "isCorrect": false, "suggestions": ["correct1", "correct2"] }
    - Max 3 suggestions.
    - Only return words similar to what the user intended.
      `,
});
