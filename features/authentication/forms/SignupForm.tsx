"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { AppIcons } from "@/components/icons";
import { FieldGroup } from "@/components/ui/field";
import { FormInput } from "@/components/inputs/FormInput";
import { FormPasswordInput } from "@/components/inputs/FormPasswordInput";
import { LoadingButton } from "@/components/LoadingButton";

import { signUpAction } from "../actions/signUp.action";
import { applyServerErrors } from "../../../lib/utils/applyServerErrors";
import { ROUTES } from "@/constants/routes";

import {
  signUpSchema,
  signUpDefaultValues,
  type SignUpFormValues,
} from "@/features/authentication/schemas/auth.schema";
import { SignUpResult } from "../auth.type";
import { readSync } from "fs";

export const SignupForm = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpDefaultValues,
  });

  const handleResult = (result: SignUpResult) => {
    switch (result.status) {
      case "validation_error":
        applyServerErrors(setError, result.fieldErrors);
        return;

      case "email_confirmation_required":
        router.push(ROUTES.CHECK_EMAIL(result.email));
        return;

      case "error":
        toast.error(result.message);
        return;

      case "success":
        toast.success("Account created successfully!");
        router.push(ROUTES.HOME);
        return;

      default: {
        const exhaustiveCheck: never = result;
        return exhaustiveCheck;
      }
    }
  };

  const onSubmit = async (data: SignUpFormValues) => {
    const result = await signUpAction(data);
    handleResult(result);
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

      <LoadingButton className="w-full" isLoading={isSubmitting}>
        Create account
      </LoadingButton>
    </form>
  );
};
