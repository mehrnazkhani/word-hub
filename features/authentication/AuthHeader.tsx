import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type AuthHeaderProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
};

export const AuthHeader = ({
  icon: Icon,
  title,
  description,
  linkText,
  linkHref,
}: AuthHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Icon size={40} strokeWidth={2} />

      <h1 className="text-app-primary text-2xl font-bold">{title}</h1>

      {(description || linkText) && (
        <p className="text-app-tertiary text-xs">
          {description}

          {linkText && linkHref && (
            <Link
              href={linkHref}
              className="text-app-secondary ml-2 text-sm transition-colors duration-300 hover:text-primary"
            >
              {linkText}
            </Link>
          )}
        </p>
      )}
    </div>
  );
};
