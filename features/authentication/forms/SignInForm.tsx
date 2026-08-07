"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Mail } from "lucide-react";
import { FieldGroup, FieldError, Field } from "@/components/ui/field";
import { FormInput } from "@/components/inputs/FormInput";
import { FormPasswordInput } from "@/components/inputs/FormPasswordInput";
import { LoadingButton } from "@/components/LoadingButton";

import { signInAction } from "../actions/signIn.action";
import { applyServerErrors } from "../../../lib/utils/applyServerErrors";
import { ROUTES } from "@/constants/routes";

import {
  signInSchema,
  signInDefaultValues,
  type SignInFormValues,
} from "@/features/authentication/schemas/auth.schema";
import { SignInResult } from "../auth.type";

export const SignInForm = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: signInDefaultValues,
  });

  const handleResult = (result: SignInResult) => {
    switch (result.status) {
      case "validation_error":
        applyServerErrors(setError, result.fieldErrors);
        return;

      case "email_confirmation_required":
        router.push(ROUTES.CHECK_EMAIL(result.email));
        return;

      case "error":
        setError("root", {
          type: "server",
          message: result.message,
        });
        return;

      case "success":
        toast.success("Welcome back!");
        router.push(ROUTES.HOME);
        return;

      default: {
        const _exhaustive: never = result;
        return _exhaustive;
      }
    }
  };

  const onSubmit = async (data: SignInFormValues) => {
    const result = await signInAction(data);
    handleResult(result);
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
          icon={Mail}
        />

        <div className="space-y-2.5">
          <FormPasswordInput
            control={control}
            name="password"
            label="Password"
            placeholder="Password"
          />
          <Link
            href={ROUTES.FORGOT_PASSWORD}
            className="text-app-secondary hover:text-app-primary text-xs transition-colors duration-300"
          >
            Forgot your password?
          </Link>
        </div>

        {errors.root && (
          <Field>
            <FieldError>{errors.root.message}</FieldError>
          </Field>
        )}
      </FieldGroup>

      <LoadingButton className="w-full" isLoading={isSubmitting}>
        Sign in
      </LoadingButton>
    </form>
  );
};
