import { createAiRoute } from "@/lib/ai/createAiRoute";
import {
  spellingCheckInput,
  spellingCheckOutput,
} from "@/features/word/form/ai/spelling-check/schema";

export const POST = createAiRoute({
  name: "spelling-check",
  timeoutMs: 10_000,
  input: spellingCheckInput,
  output: spellingCheckOutput,
  buildPrompt: ({ word, language, explanationLanguage }) => `
You are a strict spelling correction engine.

Your ONLY task is spelling correction.

Input word:
"${word}"

Language:
${language}

Rules:

- If the word is spelled correctly, return:
{
  "isCorrect": true,
  "suggestions": []
}

- If the word is misspelled:
  - Return maximum 3 suggestions.
  - Every suggestion MUST be a different word.
  - Never return duplicate words.
  - Suggestions must be ranked by spelling similarity.
  - Only return the closest spelling corrections.
  - Do not suggest synonyms.
  - Do not suggest related words.
  - Do not use word meaning to find suggestions.
  - Prefer the smallest spelling changes:
    - missing letters
    - extra letters
    - wrong letters
    - swapped adjacent letters

Important:
- This is NOT a translation task.
- This is NOT a vocabulary task.
- Ignore meanings when selecting suggestions.
- Only analyze the spelling pattern.

For each suggestion, return:

{
  "word": "correct word",
  "explanation": "short dictionary-style definition"
}

Explanation rules:
- Explanation is NOT a translation.
- Do NOT translate the word.
- Explain what the word means in simple words.
- Maximum 8 words.
- Write explanation in ${explanationLanguage ?? "English"}.

Before returning:
- Check the suggestions array.
- Remove duplicate words.
- Make sure every "word" value is unique.

Return ONLY valid JSON.
`,
});
