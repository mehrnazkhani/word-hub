import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import { ArrowLink } from "@/components/ArrowLink";
import { AuthHeader } from "@/features/authentication/AuthHeader";
import { ChangeEmailForm } from "@/features/settings/profile/change-email/ChangeEmailForm";

const ChangeEmailPage = async () => {
  notFound();

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

          <ArrowLink href="#" direction="left">
            Back to settings
          </ArrowLink>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmailPage;
