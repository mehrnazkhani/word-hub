import { UserRoundPlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { GoogleOAuth } from "@/features/authentication/GoogleOAuth";
import { AuthHeader } from "@/features/authentication/AuthHeader";
import { SignupForm } from "@/features/authentication/forms/SignupForm";
import { ROUTES } from "@/constants/routes";

const SignupPage = () => {
  return (
    <>
      <AuthHeader
        icon={UserRoundPlus}
        title="Create a new account"
        description="Already have an account?"
        linkText="Sign in"
        linkHref={ROUTES.SIGN_IN}
      />

      <GoogleOAuth />

      <div className="flex items-center gap-2">
        <Separator className="flex-1" />
        <span className="text-app-secondary text-sm">or</span>
        <Separator className="flex-1" />
      </div>

      <SignupForm />
    </>
  );
};

export default SignupPage;
