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
import { ROUTES } from "@/constants/routes";

import {
  signUpSchema,
  signUpDefaultValues,
  type SignUpFormValues,
} from "@/features/authentication/schemas/auth.schema";
import { applyServerErrors } from "../lib/applyServerErrors";

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

  const onSubmit = async (data: SignUpFormValues) => {
    const result = await signUpAction(data);

    if (!result.success) {
      applyServerErrors(setError, result.fieldErrors);
      toast.error(result.error || "Something went wrong!");
      return;
    }

    if (result.requiresEmailConfirmation) {
      router.push(ROUTES.CHECK_EMAIL(data.email));
      return;
    }

    router.push(ROUTES.HOME);
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
