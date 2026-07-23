import { Mail } from "lucide-react";

import Link from "next/link";
import { AuthHeader } from "@/features/authentication/AuthHeader";
import { ChangeEmailForm } from "@/features/settings/profile-settings/change-email/ChangeEmailForm";
import { AppIcons } from "@/components/icons";

const ChangeEmailPage = async () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-md border p-10">
        <div className="space-y-10">
          <AuthHeader
            icon={Mail}
            title="Change email address?"
            description="Enter your new email address to receive a verification link."
          />

          <ChangeEmailForm />

          <Link
            href="#"
            className="flex items-center gap-1 text-xs transition-colors duration-300 hover:text-accent-foreground/70"
          >
            <AppIcons.ChevronLeftIcon strokeWidth={1} size={18} />
            Back to settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmailPage;
