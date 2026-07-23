import Link from "next/link";

import { AppIcons } from "@/components/icons";
import { AuthHeader } from "@/features/authentication/AuthHeader";
import { EditNameForm } from "@/features/settings/profile-settings/profile-identity/EditNameForm";
import { CircleUserRound } from "lucide-react";

const EditNamePage = () => {
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

export default EditNamePage;
