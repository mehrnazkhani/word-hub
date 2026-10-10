import z from "zod";

/**
 * Google's structured-output `response_schema` rejects empty enum values
 * (e.g. `z.enum(["noun", ..., ""])` fails with
 * "enum[8]: cannot be empty"). Groq accepts them fine.
 *
 * This recursively rebuilds a schema for Gemini-only use, replacing any
 * enum/literal containing `""` with a plain string (keeping descriptions
 * so the model still knows `""` is allowed). The caller must still validate
 * the result against the ORIGINAL strict schema, so the route contract
 * stays identical across providers.
 *
 * Returns the original schema reference when nothing needed changing.
 */
export const toGeminiSafeSchema = <T extends z.ZodType>(schema: T): z.ZodType =>
  sanitizeNode(schema as z.ZodType);

const descriptionOf = (node: z.ZodType): string | undefined => {
  try {
    return (z.globalRegistry.get(node) as { description?: string })
      ?.description;
  } catch {
    return undefined;
  }
};

const withDescription = (
  schema: z.ZodType,
  description: string | undefined,
): z.ZodType => (description ? schema.describe(description) : schema);

function sanitizeNode(node: z.ZodType): z.ZodType {
  const def = (node as { def?: { type?: string } }).def;
  switch (def?.type) {
    case "enum": {
      const values = Object.values(
        (def as { entries?: Record<string, string> }).entries ?? {},
      );
      if (!values.includes("")) return node;
      const fallbackDesc = `One of: ${values.filter((v) => v !== "").join(", ")}, or empty string if unknown`;
      return withDescription(z.string(), descriptionOf(node) ?? fallbackDesc);
    }
    case "literal": {
      const values = (def as { values?: unknown[] }).values ?? [];
      if (!values.includes("")) return node;
      return withDescription(z.string(), descriptionOf(node) ?? "Empty string");
    }
    case "object": {
      const shape = (def as { shape?: Record<string, z.ZodType> }).shape ?? {};
      let changed = false;
      const next: Record<string, z.ZodType> = {};
      for (const [key, value] of Object.entries(shape)) {
        const sanitized = sanitizeNode(value);
        if (sanitized !== value) changed = true;
        next[key] = sanitized;
      }
      if (!changed) return node;
      return withDescription(z.object(next), descriptionOf(node));
    }
    case "array": {
      const element = (def as { element?: z.ZodType }).element;
      if (!element) return node;
      const sanitized = sanitizeNode(element);
      if (sanitized === element) return node;
      return withDescription(z.array(sanitized), descriptionOf(node));
    }
    case "optional":
    case "nullable": {
      const inner = (def as { innerType?: z.ZodType }).innerType;
      if (!inner) return node;
      const sanitized = sanitizeNode(inner);
      if (sanitized === inner) return node;
      const rebuilt =
        def.type === "optional" ? z.optional(sanitized) : z.nullable(sanitized);
      return withDescription(rebuilt, descriptionOf(node));
    }
    case "default": {
      const inner = (def as { innerType?: z.ZodType }).innerType;
      if (!inner) return node;
      const sanitized = sanitizeNode(inner);
      if (sanitized === inner) return node;
      return withDescription(
        sanitized.default((def as { defaultValue?: unknown }).defaultValue),
        descriptionOf(node),
      );
    }
    case "union": {
      const options = (def as { options?: z.ZodType[] }).options ?? [];
      let changed = false;
      const next = options.map((option) => {
        const sanitized = sanitizeNode(option);
        if (sanitized !== option) changed = true;
        return sanitized;
      });
      if (!changed) return node;
      return withDescription(
        z.union(next as [z.ZodType, ...z.ZodType[]]),
        descriptionOf(node),
      );
    }
    default:
      return node;
  }
}
