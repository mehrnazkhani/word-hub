"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AppIcons } from "@/components/icons";
import { FieldGroup } from "@/components/ui/field";
import { FormInput } from "@/components/inputs/FormInput";
import { FormPasswordInput } from "@/components/inputs/FormPasswordInput";
import { LoadingButton } from "@/components/LoadingButton";

import { signUpAction } from "../actions/signUp.action";

import {
  signUpSchema,
  signUpDefaultValues,
  type SignUpFormValues,
} from "@/features/authentication/schemas/auth.schema";
import { toast } from "sonner";

export const SignupForm = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const { control, handleSubmit, setError } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpDefaultValues,
  });

  const onSubmit = (data: SignUpFormValues) => {
    startTransition(async () => {
      const result = await signUpAction(data);

      if (!result.success) {
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, errors]) => {
            setError(field as keyof SignUpFormValues, {
              type: "server",
              message: errors?.[0],
            });
          });
        }
        toast.error(result.error || "Something went wrong!");
        return;
      }

      if (result.requiresEmailConfirmation) {
        router.push(
          `/auth/check-email?email=${encodeURIComponent(data.email)}`,
        );
        return;
      }

      router.push("/");
    });
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

      <LoadingButton className="w-full" isLoading={isPending}>
        Create account
      </LoadingButton>
    </form>
  );
};
