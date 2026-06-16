"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AppIcons } from "@/components/icons";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { FormInput } from "@/components/inputs/FormInput";
import { LoadingButton } from "@/components/LoadingButton";

import { forgotPasswordAction } from "../actions/forgotPassword.action";
import { applyServerErrors } from "../lib/applyServerErrors";
import { ROUTES } from "@/constants/routes";

import {
  forgotPasswordSchema,
  forgotPasswordDefaultValues,
  type ForgotPasswordFormValues,
} from "@/features/authentication/schemas/auth.schema";

export const ForgotPasswordForm = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: forgotPasswordDefaultValues,
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    const result = await forgotPasswordAction(data);

    if (!result.success) {
      applyServerErrors(setError, result.fieldErrors);

      setError("root", {
        type: "server",
        message: result.error || "Something went wrong.",
      });
    }

    router.push(ROUTES.CHECK_EMAIL(data.email));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <FieldGroup>
          <FormInput
            control={control}
            name="email"
            label="Email"
            placeholder="Email"
            type="email"
            icon={AppIcons.MailIcon}
          />

          {errors.root && (
            <Field>
              <FieldError>{errors.root.message}</FieldError>
            </Field>
          )}
        </FieldGroup>

        <LoadingButton className="w-full" isLoading={isSubmitting}>
          Send reset link
        </LoadingButton>
      </form>
    </>
  );
};
