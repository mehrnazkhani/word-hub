import { z } from "zod";
import { createAiRoute } from "@/lib/ai/CreateAiRoute";

export const POST = createAiRoute({
  name: "base-form-check",
  timeoutMs: 10_000,
  input: z.object({
    word: z.string().min(1).max(100),
    language: z.string().min(1),
  }),
  output: z.object({
    isBaseForm: z.boolean(),
    formDescription: z.string(),
    baseForm: z.string(),
  }),
  buildPrompt: ({ word, language }) => `
Check if this word is in its base form in ${language}.
Word: "${word}"

IMPORTANT: The base form must be DIFFERENT from the input word.

Examples of non-base forms:
- "books" → plural noun, base form is "book"
- "ran" → past tense, base form is "run"
- "runs" → third person singular, base form is "run"
- "running" → present participle, base form is "run"
- "better" → comparative adjective, base form is "good"
- "children" → plural noun, base form is "child"

Rules:
- If the word IS already in base form: { "isBaseForm": true, "formDescription": "", "baseForm": "" }
- If the word is NOT in base form: {
    "isBaseForm": false,
    "formDescription": "plural noun" | "past tense" | "third person singular" | "present participle" | "comparative" | etc,
    "baseForm": "the actual different base form word"
  }

Never return the same word as the base form.
  `,
});
