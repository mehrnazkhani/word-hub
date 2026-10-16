"use client";

import { Clock, Calendar, CircleCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { SettingRow } from "../SettingRow";
import { useUser } from "@/components/providers/user-provider";
import { isDemoUser } from "@/lib/utils/isDemoUser";
import { DEMO_USER_LABEL } from "@/constants/demo";
import { ChangePassword } from "./change-password/ChangePassword";

export default function PrivacySettings() {
  const { user } = useUser();
  const isDemo = isDemoUser(user);
  const isVerified = !!user?.email_confirmed_at;

  const verificationLabel = isDemo
    ? "Not applicable"
    : isVerified
      ? "Verified"
      : "";

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
        description={isDemo ? DEMO_USER_LABEL : (user?.email ?? "")}
      >
        <Badge variant="outline">{verificationLabel}</Badge>
      </SettingRow>

      <Separator />

      <ChangePassword />
    </div>
  );
}
