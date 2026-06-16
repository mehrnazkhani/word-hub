import Link from "next/link";

import { AppIcons } from "@/components/icons";
import { AuthHeader } from "@/features/authentication/AuthHeader";
import { ResetPasswordForm } from "@/features/authentication/forms/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <>
      <AuthHeader
        icon={AppIcons.RefreshCcwIcon}
        title="Reset your password"
        description="Choose a strong password for your account."
      />

      <ResetPasswordForm />
    </>
  );
};

export default ResetPasswordPage;
