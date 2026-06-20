import {
  signInSchema,
  signUpSchema,
  resetPasswordSchema,
  forgotPasswordSchema,
} from "./schemas/auth.schema";

import { z } from "zod";
type ZodFieldNames<T extends z.ZodObject<any>> = keyof T["shape"];

export type FieldErrors<T extends string = string> = Partial<
  Record<T, string[]>
>;

export type ValidationError<TFields extends string = string> = {
  status: "validation_error";
  fieldErrors: FieldErrors<TFields>;
};

export type ErrorResult = {
  status: "error";
  message: string;
};

export type SuccessResult = {
  status: "success";
};

type EmailConfirmationRequired = {
  status: "email_confirmation_required";
  email: string;
};

type SignInFields = ZodFieldNames<typeof signInSchema>;
export type SignInResult =
  | SuccessResult
  | ValidationError<SignInFields>
  | ErrorResult
  | EmailConfirmationRequired;

type SignUpFields = ZodFieldNames<typeof signUpSchema>;
export type SignUpResult =
  | SuccessResult
  | ValidationError<SignUpFields>
  | ErrorResult
  | EmailConfirmationRequired;

type ForgotPasswordFields = ZodFieldNames<typeof forgotPasswordSchema>;
export type ForgotPasswordResult =
  | SuccessResult
  | ValidationError<ForgotPasswordFields>
  | ErrorResult;

type ResetPasswordFields = ZodFieldNames<typeof resetPasswordSchema>;
export type ResetPasswordResult =
  | SuccessResult
  | ValidationError<ResetPasswordFields>
  | ErrorResult;
