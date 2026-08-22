import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

export const LandingHeader = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center px-2 pt-2">
        <Image src="/logo.png" alt="Logo" width={50} height={50} />{" "}
        <span className="font-bold">Word Hub</span>
      </div>

      <div className="flex items-center gap-3">
        <ModeToggle />
        <Button className="cursor-pointer" asChild>
          <Link href={ROUTES.SIGN_IN}>Get Started</Link>
        </Button>
      </div>
    </div>
  );
};
