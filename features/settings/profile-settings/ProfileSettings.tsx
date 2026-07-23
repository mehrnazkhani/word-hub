"use client";

import { Mail, Trash, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useUser } from "@/components/providers/user-provider";
import { SettingRow } from "../SettingRow";
import { ChangeEmail } from "./change-email/ChangeEmail";
import { DeleteAccount } from "./delete-account/DeleteAccount";
import { ArrowButton } from "@/components/ArrowButton";

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
      <SettingRow
        icon={{
          icon: Mail,
        }}
        title="Sign-in Method"
        description={user?.app_metadata?.provider ?? "email"}
      />
      <Separator />
      <DeleteAccount />
    </div>
  );
};

export default ProfileSettings;
