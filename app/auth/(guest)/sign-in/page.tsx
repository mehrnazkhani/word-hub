import { AppIcons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { Providers } from "@/features/authentication/Providers";
import { AuthHeader } from "@/features/authentication/AuthHeader";
import { SignInForm } from "@/features/authentication/forms/SignInForm";
import { ROUTES } from "@/constants/routes";

export const SignInPage = () => {
  return (
    <>
      <AuthHeader
        icon={AppIcons.LoginIcon}
        title="Sign in to your account"
        description="Don't have an account?"
        linkText="Sign up"
        linkHref={ROUTES.SIGN_UP}
      />

      <Providers />

      <div className="flex items-center gap-2">
        <Separator className="flex-1" />
        <span className="text-sm">or</span>
        <Separator className="flex-1" />
      </div>

      <SignInForm />
    </>
  );
};

export default SignInPage;
