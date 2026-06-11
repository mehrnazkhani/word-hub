import { AppIcons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { Providers } from "../../../features/authentication/Providers";
import { AuthHeader } from "@/features/authentication/AuthHeader";
import { SignupForm } from "@/features/authentication/forms/SignupForm";

const SignupPage = () => {
  return (
    <>
      <AuthHeader
        icon={AppIcons.SignupIcon}
        title="Create a new account"
        description="Already have an account?"
        linkText="Sign in"
        linkHref="/auth/signin"
      />

      <Providers />

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
