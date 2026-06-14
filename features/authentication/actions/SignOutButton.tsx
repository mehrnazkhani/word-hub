"use client";

import { signOutAction } from "./signOut.action";
import { LoadingButton } from "@/components/LoadingButton";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <LoadingButton isLoading={pending}>
      {pending ? "Signing out..." : "Sign out"}
    </LoadingButton>
  );
}

export const SignOutButton = () => {
  return (
    <form action={signOutAction}>
      <SubmitButton />
    </form>
  );
};
