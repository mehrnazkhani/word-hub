"use client";

import { Mail, UserRound } from "lucide-react";

import { AppleIcon } from "@/components/icons/apple-icon";
import { GoogleIcon } from "@/components/icons/google-icon";
import { SettingRow } from "../../SettingRow";
import { useUser } from "@/components/providers/user-provider";
import { isDemoUser } from "@/lib/utils/isDemoUser";
import { DEMO_USER_LABEL } from "@/constants/demo";

const providers = {
  demo: {
    icon: UserRound,
    label: DEMO_USER_LABEL,
  },
  email: {
    icon: Mail,
    label: "Email",
  },
  google: {
    icon: GoogleIcon,
    label: "Google",
  },
  apple: {
    icon: AppleIcon,
    label: "Apple",
  },
} as const;

export const SignInMethod = () => {
  const { user } = useUser();

  const provider = isDemoUser(user)
    ? providers.demo
    : (providers[user?.app_metadata?.provider as keyof typeof providers] ??
      providers.email);

  return (
    <SettingRow
      icon={{
        icon: provider.icon,
      }}
      title="Sign-in Method"
      description={provider.label}
    />
  );
};
