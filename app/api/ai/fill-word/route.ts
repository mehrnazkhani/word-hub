import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { z } from "zod";
import { PARTS_OF_SPEECH, WORD_LIMITS } from "@/schemas/word/word.shared";

const aiWordSchema = z.object({
  translation: z.string().max(WORD_LIMITS.translation),
  partOfSpeech: z.enum(PARTS_OF_SPEECH).nullable(),
  synonyms: z.string(),
  antonyms: z.string(),
  description: z.string().max(WORD_LIMITS.description).nullable(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body?.word || !body?.sourceLanguage || !body?.targetLanguage) {
      return Response.json(
        {
          error:
            "Missing required fields: word, sourceLanguage, targetLanguage",
        },
        { status: 400 },
      );
    }

    const { word, sourceLanguage, targetLanguage } = body;

    const result = await generateText({
      model: google("gemini-2.5-flash"),
      abortSignal: AbortSignal.timeout(15000),
      output: Output.object({ schema: aiWordSchema }),
      prompt: `
        You are a dictionary assistant.
        Given the word "${word}" in ${sourceLanguage}, fill in the following fields:

        - translation: translate to ${targetLanguage} (max ${WORD_LIMITS.translation} chars)
        - partOfSpeech: one of ${PARTS_OF_SPEECH.join(", ")} or null
        - synonyms: comma-separated synonyms in ${sourceLanguage} (max ${WORD_LIMITS.maxRelatedWords} words, each max ${WORD_LIMITS.relatedWord} chars). If none, return empty string.
        - antonyms: comma-separated antonyms in ${sourceLanguage} (max ${WORD_LIMITS.maxRelatedWords} words, each max ${WORD_LIMITS.relatedWord} chars). If none, return empty string.
        - description: brief description/usage notes in ${targetLanguage} (max ${WORD_LIMITS.description} chars) or null
      `,
    });

    return Response.json(result.output);
  } catch (err: any) {
    console.error("[AI Fill Word]", err);

    // abort / timeout
    if (err.name === "AbortError" || err.name === "TimeoutError") {
      return Response.json(
        { error: "Request timed out. Please try again." },
        { status: 408 },
      );
    }

    // rate limit
    if (err.statusCode === 429 || err.status === 429) {
      return Response.json(
        { error: "AI rate limit reached. Please wait a moment and try again." },
        { status: 429 },
      );
    }

    // auth
    if (err.statusCode === 401 || err.status === 401) {
      return Response.json({ error: "Invalid API key." }, { status: 401 });
    }

    // network / provider down
    if (err.cause?.code === "ECONNREFUSED" || err.cause?.code === "ENOTFOUND") {
      return Response.json(
        { error: "Could not reach AI provider. Please check your connection." },
        { status: 503 },
      );
    }

    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
