"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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
import { ResetPasswordResult } from "../auth.type";

export const ResetPasswordForm = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: resetPasswordDefaultValues,
  });

  const handleResult = (result: ResetPasswordResult) => {
    switch (result.status) {
      case "validation_error":
        applyServerErrors(setError, result.fieldErrors);
        return;

      case "error":
        setError("root", {
          type: "server",
          message: result.message,
        });
        return;

      case "success":
        toast.success("Your password has been reset successfully.");
        router.push(ROUTES.SIGN_IN);
        return;

      default: {
        const _exhaustive: never = result;
        return _exhaustive;
      }
    }
  };

  const onSubmit = async (data: ResetPasswordFormValues) => {
    const result = await resetPasswordAction(data);
    handleResult(result);
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
