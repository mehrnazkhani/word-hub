import { notFound } from "next/navigation";
import { CircleUserRound } from "lucide-react";
import { AuthHeader } from "@/features/authentication/AuthHeader";
import { EditNameForm } from "@/features/settings/profile/profile-identity/EditNameForm";
import { ArrowLink } from "@/components/ArrowLink";

const EditNamePage = () => {
  notFound();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-md border p-10">
        <div className="space-y-10">
          <AuthHeader
            icon={CircleUserRound}
            title="Edit your name"
            description="Enter your new name to update your profile."
          />

          <EditNameForm />

          <ArrowLink href="#" direction="left">
            Back to settings
          </ArrowLink>
        </div>
      </div>
    </div>
  );
};

export default EditNamePage;
