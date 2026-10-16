"use client";

import { useRouter } from "next/navigation";

import { SettingRow } from "../../SettingRow";
import { Mail } from "lucide-react";
import { useUser } from "@/components/providers/user-provider";
import { isDemoUser } from "@/lib/utils/isDemoUser";
import { DEMO_UNAVAILABLE_LABEL } from "@/constants/demo";
import { ROUTES } from "@/constants/routes";
import { ArrowButton } from "@/components/ArrowButton";

export const ChangeEmail = () => {
  const { user } = useUser();
  const router = useRouter();
  const isDemo = isDemoUser(user);

  return (
    <SettingRow
      icon={{
        icon: Mail,
      }}
      title="Email Address"
      description={isDemo ? DEMO_UNAVAILABLE_LABEL : (user?.email ?? "")}
    >
      {/* <ArrowButton onClick={() => router.push(ROUTES.CHANGE_EMAIL)}>
        Change
      </ArrowButton> */}
    </SettingRow>
  );
};
