export const AI_MODELS = {
  gemini: "gemini-3.5-flash-lite",
  gpt: "openai/gpt-oss-120b",
  qwen: "qwen/qwen3.8-27b",
} as const;

export type AiModelKey = keyof typeof AI_MODELS;

export type UserPlan = "free" | "premium";

/**
 * Ordered model fallback chains per user plan.
 * - premium -> Gemini (primary), GPT (fallback), Qwen (final fallback)
 * - free -> GPT (primary), Qwen (fallback)
 *
 * GPT and Qwen are both served via the Groq provider using GROQ_API_KEY.
 * Gemini is served via the Google provider using GOOGLE_GENERATIVE_AI_API_KEY.
 */
export const PLAN_MODEL_CHAIN: Record<UserPlan, readonly AiModelKey[]> = {
  premium: ["gemini", "gpt", "qwen"],
  free: ["gpt", "qwen"],
} as const;

/**
 * Primary AI model key per user plan (first entry of the chain).
 * - premium -> Gemini (Google)
 * - free -> GPT (Groq-hosted)
 */
export const PLAN_PRIMARY_MODEL: Record<UserPlan, AiModelKey> = {
  premium: "gemini",
  free: "gpt",
} as const;

export const isPremiumPlan = (plan: UserPlan | undefined | null): boolean =>
  plan === "premium";
