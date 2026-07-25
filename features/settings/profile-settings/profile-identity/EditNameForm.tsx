"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CircleUserRound } from "lucide-react";
import { useUser } from "@/components/providers/user-provider";
import { FormInput } from "@/components/inputs/FormInput";
import { LoadingButton } from "@/components/LoadingButton";
import { applyServerErrors } from "@/lib/utils/applyServerErrors";

import { editNameSchema, type EditNameValue } from "./editName.schema";
import { editNameAction, type EditNameResult } from "./editName.action";
import { toast } from "sonner";

export const EditNameForm = () => {
  const { user } = useUser();

  const methods = useForm<EditNameValue>({
    resolver: zodResolver(editNameSchema),
    defaultValues: {
      name: user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const handleResult = (result: EditNameResult) => {
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
        toast.success("Name updated successfully.");
        return;

      default: {
        const _exhaustive: never = result;
        return _exhaustive;
      }
    }
  };

  const onSubmit = async (data: EditNameValue) => {
    const currentName =
      user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? "";

    if (data.name.trim() === currentName.trim()) {
      setError("name", {
        message: "New name must be different from your current name.",
      });
      return;
    }

    const result = await editNameAction(data);
    handleResult(result);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <FormInput
          icon={CircleUserRound}
          name="name"
          label="Name"
          placeholder="Your name"
        />

        <div className="space-y-5">
          <LoadingButton
            className="w-full"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Save
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
