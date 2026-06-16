import { z } from "zod";

type SafeParseInputProps<T> = {
  schema: z.ZodType<T>;
  data: unknown;
};

export const safeParseInput = <T>({ schema, data }: SafeParseInputProps<T>) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const flattened = z.flattenError(result.error);

    return {
      success: false as const,
      error: "Invalid form data",
      fieldErrors: flattened.fieldErrors,
    };
  }

  return {
    success: true as const,
    data: result.data,
  };
};
