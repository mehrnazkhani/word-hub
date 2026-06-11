import { PropsWithChildren } from "react";
import { ModeToggle } from "@/features/header/mode-toggle/ModeToggle";

const AuthLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>

      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-md border p-10">
          <div className="space-y-5">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
