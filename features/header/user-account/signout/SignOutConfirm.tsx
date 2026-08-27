"use client";

import { useState } from "react";
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

type SignOutConfirmProps =
  | { children: React.ReactNode; open?: never; onOpenChange?: never }
  | { children?: never; open: boolean; onOpenChange: (open: boolean) => void };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <LoadingButton isLoading={pending} variant="destructive">
      {pending ? "Signing out..." : "Sign out"}
    </LoadingButton>
  );
}

function CancelButton() {
  const { pending } = useFormStatus();

  return (
    <AlertDialogCancel
      variant="outline"
      className="cursor-pointer"
      disabled={pending}
    >
      Cancel
    </AlertDialogCancel>
  );
}

export const SignOutConfirm = ({
  open,
  onOpenChange,
  children,
}: SignOutConfirmProps) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = isControlled ? onOpenChange! : setInternalOpen;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}

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
            <AlertDialogAction asChild className="cursor-pointer">
              <SubmitButton />
            </AlertDialogAction>
            <CancelButton />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
