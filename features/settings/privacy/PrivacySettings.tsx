"use client";

import { Clock, Calendar, CircleCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { SettingRow } from "../SettingRow";
import { useUser } from "@/components/providers/user-provider";
import { ChangePassword } from "./change-password/ChangePassword";

export default function PrivacySettings() {
  const { user } = useUser();
  const isVerified = !!user?.email_confirmed_at;

  return (
    <div className="space-y-5">
      <SettingRow
        icon={{
          icon: Clock,
        }}
        title="Last Sign-in"
        description={new Date(user?.last_sign_in_at ?? "").toLocaleString(
          "en-US",
          {
            dateStyle: "medium",
            timeStyle: "short",
          },
        )}
      />

      <Separator />

      <SettingRow
        icon={{
          icon: Calendar,
        }}
        title="Account Created"
        description={new Date(user?.created_at ?? "").toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      />

      <Separator />

      <SettingRow
        icon={{
          icon: CircleCheck,
        }}
        title="Email Verified"
        description={user?.email ?? ""}
      >
        <Badge variant="outline">{isVerified ? "Verified" : ""}</Badge>
      </SettingRow>

      <Separator />

      <ChangePassword />
    </div>
  );
}
