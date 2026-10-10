import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { generateText, Output } from "ai";
import z from "zod";
import {
  AI_MODELS,
  PLAN_MODEL_CHAIN,
  type AiModelKey,
  type UserPlan,
} from "@/constants/ai-config";
import { toGeminiSafeSchema } from "./geminiSafeSchema";

type GenerateStructuredOptions<T extends z.ZodType> = {
  schema: T;
  prompt: string;
  timeoutMs?: number;
  plan?: UserPlan;
  route?: string;
};

const resolveModel = (key: AiModelKey) => {
  switch (key) {
    case "gemini":
      return {
        model: google(AI_MODELS.gemini),
        providerOptions: undefined,
      };
    case "gpt":
      return {
        model: groq(AI_MODELS.gpt),
        // gpt-oss only accepts low/medium/high ("none" is rejected).
        providerOptions: { groq: { reasoningEffort: "low" } },
      };
    case "qwen":
      return {
        model: groq(AI_MODELS.qwen),
        providerOptions: { groq: { reasoningEffort: "none" } },
      };
  }
};

export const generateStructured = async <T extends z.ZodType>({
  schema,
  prompt,
  timeoutMs = 15_000,
  plan = "free",
  route = "ai",
}: GenerateStructuredOptions<T>) => {
  const chain = PLAN_MODEL_CHAIN[plan] ?? PLAN_MODEL_CHAIN.free;
  const tag = `ai:${route}`;
  let lastError: unknown = null;

  console.log(
    `[${tag}] tier="${plan}" selected primary="${chain[0]}" (${AI_MODELS[chain[0]]}) chain=[${chain.join(" -> ")}]`,
  );

  for (let i = 0; i < chain.length; i++) {
    const key = chain[i];
    const { model, providerOptions } = resolveModel(key);
    // Google rejects empty enum values in response_schema, so send it a
    // sanitized schema — then validate against the original strict schema
    // so the route contract is identical across providers.
    const requestSchema =
      key === "gemini" ? toGeminiSafeSchema(schema) : schema;
    if (requestSchema !== schema) {
      console.log(
        `[${tag}] tier="${plan}" model="gemini" schema sanitized for Google (empty-string enums -> string)`,
      );
    }
    const isFallback = i > 0;
    console.log(
      `[${tag}] tier="${plan}" trying ${isFallback ? `fallback #${i} ` : ""}model="${key}" (${AI_MODELS[key]}) attempt ${i + 1}/${chain.length}`,
    );
    try {
      const result = await generateText({
        model,
        abortSignal: AbortSignal.timeout(timeoutMs),
        output: Output.object({ schema: requestSchema }),
        ...(providerOptions ? { providerOptions } : {}),
        prompt: prompt.trim(),
      });

      const output = schema.parse(result.output);
      console.log(
        `[${tag}] tier="${plan}" success model="${key}" (${AI_MODELS[key]})${isFallback ? ` via fallback #${i}` : ""}`,
      );
      return output;
    } catch (err) {
      lastError = err;
      const next = chain[i + 1];
      if (next) {
        console.warn(
          `[${tag}] tier="${plan}" model="${key}" (${AI_MODELS[key]}) failed, falling back to "${next}" (${AI_MODELS[next]}) | error:`,
          err,
        );
      } else {
        console.error(
          `[${tag}] tier="${plan}" model="${key}" (${AI_MODELS[key]}) failed, chain exhausted [${chain.join(" -> ")}] | error:`,
          err,
        );
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("All AI models failed.");
};
