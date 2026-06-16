import Link from "next/link";

import { AppIcons } from "@/components/icons";
import { AuthHeader } from "@/features/authentication/AuthHeader";
import { ForgotPasswordForm } from "@/features/authentication/forms/ForgotPasswordForm";

export const ForgotPasswordPage = () => {
  return (
    <>
      <AuthHeader
        icon={AppIcons.KeyIcon}
        title="Forgot your password?"
        description="Enter your email and we'll send you a reset link."
      />

      <ForgotPasswordForm />

      <Link
        href="/auth/signin"
        className="text-app-secondary mt-10 flex items-center gap-1 text-xs transition-colors duration-300 hover:text-primary"
      >
        <AppIcons.ChevronLeftIcon strokeWidth={1} size={18} />
        Back to Sign in
      </Link>
    </>
  );
};

export default ForgotPasswordPage;
