import { Lock } from "lucide-react";
import { ArrowLink } from "@/components/ArrowLink";
import { AuthHeader } from "@/features/authentication/AuthHeader";
import { ChangePasswordForm } from "@/features/settings/privacy-settings/change-password/ChangePasswordForm";

const ChangePasswordPage = async () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-md border p-10">
        <div className="space-y-10">
          <AuthHeader
            icon={Lock}
            title="Change password"
            description="Enter your current password and choose a new one."
          />

          <ChangePasswordForm />

          <ArrowLink href="#" direction="left">
            Back to settings
          </ArrowLink>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
