"use client";
import { PropsWithChildren } from "react";

import { signOutAction } from "./signOut.action";
import { LoadingButton } from "@/components/LoadingButton";
import { useFormStatus } from "react-dom";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogMedia,
} from "@/components/ui/alert-dialog";
import { LogOut } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <LoadingButton isLoading={pending} variant="destructive">
      {pending ? "Signing out..." : "Sign out"}
    </LoadingButton>
  );
}

export const SignOutConfirm = ({ children }: PropsWithChildren) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <LogOut />
          </AlertDialogMedia>
          <AlertDialogTitle>Sign out?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to sign out of your account?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form action={signOutAction}>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline" className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction asChild className="cursor-pointer">
              <SubmitButton />
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
