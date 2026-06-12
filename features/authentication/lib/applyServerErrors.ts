import { FieldValues, Path, UseFormSetError } from "react-hook-form";

type FieldErrors<T extends FieldValues> = Partial<
  Record<keyof T, string[] | undefined>
>;

export const applyServerErrors = <T extends FieldValues>(
  setError: UseFormSetError<T>,
  fieldErrors?: FieldErrors<T>,
) => {
  if (!fieldErrors) return;

  Object.entries(fieldErrors).forEach(([field, errors]) => {
    setError(field as Path<T>, {
      type: "server",
      message: errors?.[0],
    });
  });
};
