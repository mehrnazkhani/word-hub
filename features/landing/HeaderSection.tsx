import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

export const HeaderSection = () => {
  return (
    <header className="flex h-16 w-full items-center justify-between px-5">
      <div className="flex items-center px-2 pt-2">
        <Link href="/">
          <Image
            src="/app_logo.png"
            alt="Word Hub Logo"
            width={50}
            height={50}
          />
        </Link>
        <span className="font-bold">Word Hub</span>
      </div>

      <nav className="flex items-center gap-3" aria-label="Main navigation">
        <ModeToggle />
        <Button className="cursor-pointer" asChild>
          <Link href={ROUTES.SIGN_IN}>Get Started</Link>
        </Button>
      </nav>
    </header>
  );
};
