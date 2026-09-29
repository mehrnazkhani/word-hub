import type { z } from "zod";
import { generateStructured } from "./generate";
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

      const output = await generateStructured({
        schema: config.output,
        prompt: config.buildPrompt(parsed.data),
        timeoutMs: config.timeoutMs,
      });

      return Response.json(output);
    } catch (err) {
      return aiErrorResponse(err, config.name);
    }
  };
}
