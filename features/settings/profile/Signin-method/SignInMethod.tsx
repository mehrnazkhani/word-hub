"use client";

import { Mail } from "lucide-react";

import { AppleIcon } from "@/components/icons/apple-icon";
import { GoogleIcon } from "@/components/icons/google-icon";
import { SettingRow } from "../../SettingRow";
import { useUser } from "@/components/providers/user-provider";

const providers = {
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

  const provider =
    providers[user?.app_metadata?.provider as keyof typeof providers] ??
    providers.email;

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
