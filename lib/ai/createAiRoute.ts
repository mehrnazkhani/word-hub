import type { z } from "zod";
import { PLAN_MODEL_CHAIN, type UserPlan } from "@/constants/ai-config";
import { createClient } from "@/lib/supabase/server";
import { generateStructured } from "./generate";
import { getUserPlan } from "@/queries/user-settings/getUserPlan";
import { aiErrorResponse } from "./errors";

type AiRouteConfig<
  TInput extends z.ZodTypeAny,
  TOutput extends z.ZodTypeAny,
> = {
  name: string;
  input: TInput;
  output: TOutput;
  timeoutMs?: number;
  buildPrompt: (input: z.infer<TInput>) => string;
};

export function createAiRoute<
  TInput extends z.ZodTypeAny,
  TOutput extends z.ZodTypeAny,
>(config: AiRouteConfig<TInput, TOutput>) {
  return async function POST(req: Request) {
    try {
      const body = await req.json().catch(() => null);
      const parsed = config.input.safeParse(body);

      if (!parsed.success) {
        return Response.json(
          { error: "Invalid request body.", details: parsed.error.flatten() },
          { status: 400 },
        );
      }

      const { plan } = await resolvePlanFromRequest(config.name);

      const output = await generateStructured({
        schema: config.output,
        prompt: config.buildPrompt(parsed.data),
        timeoutMs: config.timeoutMs,
        plan,
        route: config.name,
      });

      return Response.json(output);
    } catch (err) {
      return aiErrorResponse(err, config.name);
    }
  };
}

/**
 * Resolves the caller's plan from the Supabase session cookie.
 * Falls back to "free" for guests or on any lookup failure so AI
 * routes keep working before the `is_premium` column is added.
 */
async function resolvePlanFromRequest(
  route: string,
): Promise<{ plan: UserPlan; userId: string | null }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      console.log(
        `[ai:${route}] user="guest" tier="free" selected primary="gpt" chain=[${PLAN_MODEL_CHAIN.free.join(" -> ")}]`,
      );
      return { plan: "free", userId: null };
    }
    const plan = await getUserPlan(supabase, user.id);
    const chain = PLAN_MODEL_CHAIN[plan] ?? PLAN_MODEL_CHAIN.free;
    console.log(
      `[ai:${route}] user="${user.id}" tier="${plan}" selected primary="${chain[0]}" chain=[${chain.join(" -> ")}]`,
    );
    return { plan, userId: user.id };
  } catch (err) {
    console.warn(
      `[ai:${route}] plan lookup failed, defaulting tier="free" | error:`,
      err,
    );
    return { plan: "free", userId: null };
  }
}
