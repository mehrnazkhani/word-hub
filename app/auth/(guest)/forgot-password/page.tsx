import Link from "next/link";
import { Key, ChevronLeft } from "lucide-react";
import { AuthHeader } from "@/features/authentication/AuthHeader";
import { ForgotPasswordForm } from "@/features/authentication/forms/ForgotPasswordForm";
import { ROUTES } from "@/constants/routes";

export const ForgotPasswordPage = () => {
  return (
    <>
      <AuthHeader
        icon={Key}
        title="Forgot your password?"
        description="Enter your email and we'll send you a reset link."
      />

      <ForgotPasswordForm />

      <Link
        href={ROUTES.SIGN_IN}
        className="text-app-secondary mt-10 flex items-center gap-1 text-xs transition-colors duration-300 hover:text-primary"
      >
        <ChevronLeft strokeWidth={1} size={18} />
        Back to Sign in
      </Link>
    </>
  );
};

export default ForgotPasswordPage;
