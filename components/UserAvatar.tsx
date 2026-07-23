import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/components/providers/user-provider";

interface UserAvatarProps {
  size?: "sm" | "default" | "lg";
}

export const UserAvatar = ({ size = "default" }: UserAvatarProps) => {
  const { user } = useUser();

  const initial = (user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email ??
    "?")[0].toUpperCase();

  return (
    <Avatar size={size}>
      <AvatarFallback className={size === "lg" ? "text-lg" : undefined}>
        {initial}
      </AvatarFallback>
    </Avatar>
  );
};
