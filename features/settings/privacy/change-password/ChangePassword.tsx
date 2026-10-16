"use client";

import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { SettingRow } from "../../SettingRow";
import { LoadingButton } from "@/components/LoadingButton";
import { useUser } from "@/components/providers/user-provider";
import { isDemoUser } from "@/lib/utils/isDemoUser";
import { DEMO_UNAVAILABLE_LABEL } from "@/constants/demo";
import { ROUTES } from "@/constants/routes";

export const ChangePassword = () => {
  const { user } = useUser();
  const router = useRouter();
  const isDemo = isDemoUser(user);

  return (
    <SettingRow
      icon={{
        icon: LockKeyhole,
      }}
      title="Change Password"
      description={isDemo ? DEMO_UNAVAILABLE_LABEL : "********"}
    >
      <LoadingButton
        variant="outline"
        disabled={isDemo}
        onClick={() => {
          if (isDemo) return;
          router.push(ROUTES.CHANGE_PASSWORD);
        }}
      >
        Change Password
      </LoadingButton>
    </SettingRow>
  );
};
