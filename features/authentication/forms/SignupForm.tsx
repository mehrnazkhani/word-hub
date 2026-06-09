"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AppIcons } from "@/components/icons";
import { FieldGroup } from "@/components/ui/field";
import { FormInput } from "@/components/inputs/FormInput";
import { FormPasswordInput } from "@/components/inputs/FormPasswordInput";
import { LoadingButton } from "@/components/LoadingButton";

import {
  signUpSchema,
  signUpDefaultValues,
  type SignUpFormValues,
} from "@/features/authentication/schemas/auth.schema";

export const SignupForm = () => {
  const { control, handleSubmit } = useForm<SignUpFormValues>({
    defaultValues: signUpDefaultValues,
  });

  const onSubmit = (data: SignUpFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <FieldGroup>
        <FormInput
          control={control}
          name="name"
          label="Name"
          placeholder="Name"
          icon={AppIcons.CircleUserRoundIcon}
        />

        <FormInput
          control={control}
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
          icon={AppIcons.MailIcon}
        />

        <FormPasswordInput
          control={control}
          name="password"
          label="Password"
          placeholder="Password"
        />

        <FormPasswordInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
        />
      </FieldGroup>

      <LoadingButton className="w-full">Create account</LoadingButton>
    </form>
  );
};
