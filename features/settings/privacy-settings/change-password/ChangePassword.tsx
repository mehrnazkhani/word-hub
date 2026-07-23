"use client";

import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { SettingRow } from "../../SettingRow";
import { ArrowButton } from "@/components/ArrowButton";
import { ROUTES } from "@/constants/routes";

export const ChangePassword = () => {
  const router = useRouter();
  return (
    <SettingRow
      icon={{
        icon: LockKeyhole,
      }}
      title="Change Password"
      description="********"
    >
      <ArrowButton onClick={() => router.push(ROUTES.CHANGE_PASSWORD)}>
        Change Password
      </ArrowButton>
    </SettingRow>
  );
};
