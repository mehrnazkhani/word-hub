"use client";

import {
  LockKeyhole,
  Clock,
  Calendar,
  SquarePen,
  CircleCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SettingRow } from "./SettingRow";

import { useUser } from "@/components/providers/user-provider";
import { Badge } from "@/components/ui/badge";

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

      <SettingRow
        icon={{
          icon: LockKeyhole,
        }}
        title="Change Password"
        description="********"
      >
        <Button variant="outline">
          <SquarePen className="size-3" /> Change Password
        </Button>
      </SettingRow>
    </div>
  );
}
