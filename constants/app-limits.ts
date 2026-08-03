import { z } from "zod";

export const AppLimitsSchema = z.object({
  word_limit_per_user: z.number(),
  category_limit_per_user: z.number(),
});

export type AppLimits = z.infer<typeof AppLimitsSchema>;

export const APP_LIMITS: AppLimits = {
  word_limit_per_user: 1000,
  category_limit_per_user: 30,
};

export const APP_LIMITS_META: Record<
  keyof AppLimits,
  {
    value_type: "number" | "boolean" | "string";
    description: string;
  }
> = {
  word_limit_per_user: {
    value_type: "number",
    description: "Maximum number of words per user",
  },
  category_limit_per_user: {
    value_type: "number",
    description: "Maximum number of categories per user",
  },
};
