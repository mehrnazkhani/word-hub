import React from "react";
import { AppIcons } from "@/components/icons";

import { AuthHeader } from "./AuthHeader";

type EmailConfirmMessageProps = {
  email: string;
};

export const EmailConfirmMessage = ({ email }: EmailConfirmMessageProps) => {
  return (
    <div>
      <AuthHeader
        icon={AppIcons.MailCheckIcon}
        title="Check your email"
        description={`We sent a confirmation link to ${email}`}
      />
    </div>
  );
};
