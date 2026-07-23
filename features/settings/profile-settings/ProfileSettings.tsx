import { Separator } from "@/components/ui/separator";
import { ChangeEmail } from "./change-email/ChangeEmail";
import { SignInMethod } from "./Signin-method/SignInMethod";
import { DeleteAccount } from "./delete-account/DeleteAccount";
import { ProfileIdentity } from "./profile-identity/ProfileIdentity";

const ProfileSettings = () => {
  return (
    <div className="space-y-5">
      <ProfileIdentity />

      <Separator />
      <ChangeEmail />

      <Separator />
      <SignInMethod />

      <Separator />
      <DeleteAccount />
    </div>
  );
};

export default ProfileSettings;
