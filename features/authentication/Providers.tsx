import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons/google-icon";
import { AppleIcon } from "@/components/icons/apple-icon";

export const Providers = () => {
  return (
    <div className="flex gap-2 *:cursor-pointer">
      <Button variant="outline" size="lg" className="flex-1">
        <GoogleIcon />
        Continue With Google
      </Button>
      <Button variant="outline" size="lg" className="flex-1">
        <AppleIcon />
        Continue With Apple
      </Button>
    </div>
  );
};
