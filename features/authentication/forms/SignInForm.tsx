"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import { AppIcons } from "@/components/icons";
import { FieldGroup } from "@/components/ui/field";
import { FormInput } from "@/components/inputs/FormInput";
import { FormPasswordInput } from "@/components/inputs/FormPasswordInput";
import { LoadingButton } from "@/components/LoadingButton";

import {
  signInDefaultValues,
  type SignInFormValues,
} from "@/features/authentication/schemas/auth.schema";

export const SignInForm = () => {
  const { control, handleSubmit } = useForm<SignInFormValues>({
    defaultValues: signInDefaultValues,
  });

  const onSubmit = (data: SignInFormValues) => {
    console.log(data);
  };

  return (
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

        <div className="space-y-2.5">
          <FormPasswordInput
            control={control}
            name="password"
            label="Password"
            placeholder="Password"
          />
          <Link
            href="/auth/forgot-password"
            className="text-app-secondary hover:text-app-primary text-xs transition-colors duration-300"
          >
            Forgot your password?
          </Link>
        </div>
      </FieldGroup>

      <LoadingButton className="w-full">Create account</LoadingButton>
    </form>
  );
};
