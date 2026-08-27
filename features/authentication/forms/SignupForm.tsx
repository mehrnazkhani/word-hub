"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { CircleUserRound, Mail } from "lucide-react";
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

  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpDefaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <FieldGroup>
          <FormInput
            name="name"
            label="Name"
            placeholder="Name"
            icon={CircleUserRound}
          />
          <FormInput
            name="email"
            label="Email"
            placeholder="Email"
            type="email"
            icon={Mail}
          />
          <FormPasswordInput
            name="password"
            label="Password"
            placeholder="Password"
          />
          <FormPasswordInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
          />
        </FieldGroup>

        <LoadingButton className="w-full" isLoading={isSubmitting}>
          Create account
        </LoadingButton>
      </form>
    </FormProvider>
  );
};
