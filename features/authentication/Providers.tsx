import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons/google-icon";

export const Providers = () => {
  return (
    <Button variant="outline" size="lg" className="w-full cursor-pointer">
      <GoogleIcon />
      Continue With Google
    </Button>
  );
};
