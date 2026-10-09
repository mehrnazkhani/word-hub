"use client";

import { Lock } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { FormPasswordInput } from "@/components/inputs/FormPasswordInput";
import { LoadingButton } from "@/components/LoadingButton";
import { applyServerErrors } from "@/lib/utils/applyServerErrors";

import {
  changePasswordSchema,
  type ChangePasswordValue,
} from "./changePassword.schema";
import {
  changePasswordAction,
  type ChangePasswordResult,
} from "./changePassword.action";

export const ChangePasswordForm = () => {
  const methods = useForm<ChangePasswordValue>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const handleResult = (result: ChangePasswordResult) => {
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
        toast.success("Password updated successfully.");
        reset();
        return;

      default: {
        const _exhaustive: never = result;
        return _exhaustive;
      }
    }
  };

  const onSubmit = async (data: ChangePasswordValue) => {
    const result = await changePasswordAction(data);
    handleResult(result);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-10 [&_input::placeholder]:text-xs"
      >
        <div className="space-y-5">
          <FormPasswordInput
            icon={Lock}
            name="currentPassword"
            label="Current Password"
            placeholder="Enter your current password"
            type="password"
          />
          <FormPasswordInput
            icon={Lock}
            name="newPassword"
            label="New Password"
            placeholder="Enter a new password"
            type="password"
          />
          <FormPasswordInput
            icon={Lock}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your new password"
            type="password"
          />
        </div>

        <div className="space-y-5">
          <LoadingButton
            className="w-full"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Update password
          </LoadingButton>

          {errors.root && (
            <p className="text-center text-sm text-destructive">
              {errors.root.message}
            </p>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
