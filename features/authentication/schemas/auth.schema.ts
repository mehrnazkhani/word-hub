import { z } from "zod";

export const emailField = z
  .email("Please enter a valid email address")
  .toLowerCase()
  .trim();

export const passwordField = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password is too long")
  .regex(/[a-z]/, "Must include a lowercase letter")
  .regex(/[A-Z]/, "Must include an uppercase letter")
  .regex(/[0-9]/, "Must include a number");

export const confirmPasswordField = z.string();

export const signInSchema = z.object({
  email: emailField,
  password: passwordField,
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name is too long"),

    email: emailField,
    password: passwordField,
    confirmPassword: confirmPasswordField,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const forgotPasswordSchema = z.object({
  email: emailField,
});

export const resetPasswordSchema = z
  .object({
    password: passwordField,
    confirmPassword: confirmPasswordField,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const signInDefaultValues: SignInFormValues = {
  email: "",
  password: "",
};

export const signUpDefaultValues: SignUpFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const forgotPasswordDefaultValues: ForgotPasswordFormValues = {
  email: "",
};

export const resetPasswordDefaultValues: ResetPasswordFormValues = {
  password: "",
  confirmPassword: "",
};
