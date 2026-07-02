import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required!")
    .max(50, "Name must be at most 50 characters long!")
    .trim(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export const categoryFormDefaultValues: CategoryFormValues = {
  name: "",
};
