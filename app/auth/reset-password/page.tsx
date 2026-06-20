import { AppIcons } from "@/components/icons";
import { AuthHeader } from "@/features/authentication/AuthHeader";
import { ResetPasswordForm } from "@/features/authentication/forms/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-md border p-10">
        <div className="space-y-5">
          <AuthHeader
            icon={AppIcons.RefreshCcwIcon}
            title="Reset your password"
            description="Choose a strong password for your account."
          />

          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
