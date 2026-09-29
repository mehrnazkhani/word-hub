import { groq } from "@ai-sdk/groq";
import { generateText, Output } from "ai";
import z from "zod";
import { AI_MODELS } from "@/constants/ai-config";

type GenerateStructuredOptions<T extends z.ZodType> = {
  schema: T;
  prompt: string;
  timeoutMs?: number;
};

export const generateStructured = async <T extends z.ZodType>({
  schema,
  prompt,
  timeoutMs = 15_000,
}: GenerateStructuredOptions<T>) => {
  const result = await generateText({
    model: groq(AI_MODELS.groq),
    abortSignal: AbortSignal.timeout(timeoutMs),
    output: Output.object({ schema }),
    providerOptions: {
      groq: { reasoningEffort: "none" },
    },
    prompt: prompt.trim(),
  });

  return result.output;
};
