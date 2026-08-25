import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/components/providers/user-provider";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  size?: "sm" | "default" | "lg" | "xl" | "2xl" | "5xl";
  className?: string;
}

const sizeClasses = {
  sm: "size-8",
  default: "size-10",
  lg: "size-12",
  xl: "size-16",
  "2xl": "size-20",
  "5xl": "size-32",
} as const;

const textSizeClasses = {
  sm: "text-xs",
  default: "text-sm",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "5xl": "text-5xl",
} as const;

export function UserAvatar({ size = "default", className }: UserAvatarProps) {
  const { user } = useUser();

  const initial = (user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email ??
    "?")[0].toUpperCase();

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarFallback className={textSizeClasses[size]}>
        {initial}
      </AvatarFallback>
    </Avatar>
  );
}
