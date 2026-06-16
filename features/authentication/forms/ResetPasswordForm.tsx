"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldGroup } from "@/components/ui/field";
import { FormPasswordInput } from "@/components/inputs/FormPasswordInput";
import { LoadingButton } from "@/components/LoadingButton";

import { resetPasswordAction } from "../actions/resetPassword.action";
import { applyServerErrors } from "../lib/applyServerErrors";
import { ROUTES } from "@/constants/routes";

import {
  resetPasswordSchema,
  resetPasswordDefaultValues,
  type ResetPasswordFormValues,
} from "@/features/authentication/schemas/auth.schema";

export const ResetPasswordForm = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: resetPasswordDefaultValues,
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    const result = await resetPasswordAction(data);

    if (!result.success) {
      applyServerErrors(setError, result.fieldErrors);

      setError("root", {
        type: "server",
        message: result.error || "Something went wrong!",
      });

      return;
    }

    router.push(ROUTES.SIGN_IN);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <FieldGroup>
        <FormPasswordInput
          control={control}
          name="password"
          label="New Password"
          placeholder="New Password"
        />

        <FormPasswordInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
        />
      </FieldGroup>

      <LoadingButton className="w-full" isLoading={isSubmitting}>
        Reset password
      </LoadingButton>
    </form>
  );
};
