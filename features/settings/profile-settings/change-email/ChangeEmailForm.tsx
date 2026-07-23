"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { toast } from "sonner";
import { Mail } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/inputs/FormInput";

import { useUser } from "@/components/providers/user-provider";
import { LoadingButton } from "@/components/LoadingButton";
import { applyServerErrors } from "@/features/authentication/lib/applyServerErrors";
import {
  changeEmailAction,
  type ChangeEmailResult,
} from "./changeEmail.action";

import { changeEmailSchema, type ChangeEmailValue } from "./changeEmail.schema";

export const ChangeEmailForm = () => {
  const { user } = useUser();
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);

  const methods = useForm<ChangeEmailValue>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: { newEmail: "" },
  });

  const {
    handleSubmit,
    setError,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const handleResult = (result: ChangeEmailResult) => {
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
        setEmailSent(true);
        router.push(
          `/account/check-email?email=${encodeURIComponent(methods.getValues("newEmail"))}`,
        );
        return;

      default: {
        const _exhaustive: never = result;
        return _exhaustive;
      }
    }
  };

  const onSubmit = async (data: ChangeEmailValue) => {
    const result = await changeEmailAction(data);
    handleResult(result);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div className="space-y-5">
          <div className="flex flex-col">
            <span className="text-xs text-accent-foreground/60">
              Current email address:
            </span>
            <FormInput
              icon={Mail}
              name=""
              label="Current Email"
              placeholder={user?.email ?? ""}
              disabled
              className="disabled:bg-transparent! dark:disabled:bg-transparent!"
            />
          </div>

          <FormInput
            icon={Mail}
            name="newEmail"
            label="New Email"
            placeholder="New Email Address"
          />
        </div>

        <div className="space-y-5">
          <LoadingButton className="w-full" disabled={emailSent}>
            Send verification link
          </LoadingButton>

          {methods.formState.errors.root && (
            <p className="text-center text-sm text-destructive">
              {methods.formState.errors.root.message}
            </p>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
