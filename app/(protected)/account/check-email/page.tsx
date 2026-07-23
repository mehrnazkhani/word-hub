import { AppIcons } from "@/components/icons";
import { AuthHeader } from "@/features/authentication/AuthHeader";

type CheckEmailPageProps = {
  searchParams: Promise<{
    email?: string;
  }>;
};

export const CheckEmailPage = async ({ searchParams }: CheckEmailPageProps) => {
  const { email } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-md border p-10">
        <div className="space-y-5 text-center">
          <AuthHeader
            icon={AppIcons.MailCheckIcon}
            title="Check your email"
            description={`We sent a confirmation link to ${email}. Please open your inbox and click the link to activate your account.`}
          />

          <p className="text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckEmailPage;
