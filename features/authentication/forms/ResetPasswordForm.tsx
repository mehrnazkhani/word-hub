"use client";

import { useForm } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";
import { FormPasswordInput } from "@/components/inputs/FormPasswordInput";
import { LoadingButton } from "@/components/LoadingButton";

import {
  resetPasswordDefaultValues,
  type ResetPasswordFormValues,
} from "@/features/authentication/schemas/auth.schema";

export const ResetPasswordForm = () => {
  const { control, handleSubmit } = useForm<ResetPasswordFormValues>({
    defaultValues: resetPasswordDefaultValues,
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    console.log(data);
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

      <LoadingButton className="w-full">Reset password</LoadingButton>
      {/* <p>If this email exists, we sent a reset link.</p> */}
    </form>
  );
};
