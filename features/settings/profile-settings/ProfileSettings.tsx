"use client";

import { useUser } from "@/components/providers/user-provider";
import { Separator } from "@/components/ui/separator";
import { ArrowButton } from "@/components/ArrowButton";
import { ChangeEmail } from "./change-email/ChangeEmail";
import { SignInMethod } from "./Signin-method/SignInMethod";
import { DeleteAccount } from "./delete-account/DeleteAccount";

const ProfileSettings = () => {
  const { user } = useUser();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-accent">
            {(user?.user_metadata?.full_name ??
              user?.email ??
              "?")[0].toUpperCase()}
          </div>
          <div className="flex flex-col gap-1">
            <span>Display Name</span>
            <span className="text-accent-foreground/60">
              {user?.user_metadata?.full_name ??
                user?.user_metadata?.name ??
                "—"}
            </span>
          </div>
        </div>

        <ArrowButton>Edit</ArrowButton>
      </div>

      <Separator />
      <ChangeEmail />
      <Separator />
      <SignInMethod />
      <Separator />
      <DeleteAccount />
    </div>
  );
};

export default ProfileSettings;
