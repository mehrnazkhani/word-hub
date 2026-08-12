"use client";

import { useRouter } from "next/navigation";

import { SettingRow } from "../../SettingRow";
import { Mail } from "lucide-react";
import { useUser } from "@/components/providers/user-provider";
import { ROUTES } from "@/constants/routes";
import { ArrowButton } from "@/components/ArrowButton";

export const ChangeEmail = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <SettingRow
      icon={{
        icon: Mail,
      }}
      title="Email Address"
      description={user?.email ?? ""}
    >
      {/* <ArrowButton onClick={() => router.push(ROUTES.CHANGE_EMAIL)}>
        Change
      </ArrowButton> */}
    </SettingRow>
  );
};
