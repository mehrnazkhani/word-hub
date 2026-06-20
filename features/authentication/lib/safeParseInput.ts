import { z } from "zod";

type SafeParseResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      fieldErrors: Record<string, string[] | undefined>;
      error: string;
    };

type SafeParseInputProps<T> = {
  schema: z.ZodType<T>;
  data: unknown;
};

export const safeParseInput = <T>({
  schema,
  data,
}: SafeParseInputProps<T>): SafeParseResult<T> => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const flattened = z.flattenError(result.error);

    return {
      success: false,
      error: "Invalid form data",
      fieldErrors: flattened.fieldErrors,
    };
  }

  return {
    success: true,
    data: result.data,
  };
};
