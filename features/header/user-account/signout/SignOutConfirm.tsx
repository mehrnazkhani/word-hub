"use client";
import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

import { LogOut } from "lucide-react";
import { LoadingButton } from "@/components/LoadingButton";
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
import { signOutAction } from "./signOut.action";

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

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 ring-1 ring-destructive/20">
            <LogOut className="size-5 text-destructive" />
          </AlertDialogMedia>
          <div className="space-y-2">
            <AlertDialogTitle className="text-destructive">
              Sign out?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You'll be signed out of your account on this device. Your data
              will remain intact.
            </AlertDialogDescription>
          </div>
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
