"use client";

import { useForm } from "react-hook-form";

import { AppIcons } from "@/components/icons";
import { FieldGroup } from "@/components/ui/field";
import { FormInput } from "@/components/inputs/FormInput";
import { LoadingButton } from "@/components/LoadingButton";

import {
  forgotPasswordDefaultValues,
  type ForgotPasswordFormValues,
} from "@/features/authentication/schemas/auth.schema";

export const ForgotPasswordForm = () => {
  const { control, handleSubmit } = useForm<ForgotPasswordFormValues>({
    defaultValues: forgotPasswordDefaultValues,
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log(data);
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
        </FieldGroup>

        <LoadingButton className="w-full">Send reset link</LoadingButton>
        {/* <p>If this email exists, we sent a reset link.</p> */}
      </form>
    </>
  );
};
