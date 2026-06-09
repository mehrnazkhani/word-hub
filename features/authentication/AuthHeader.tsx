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

      <h1 className="text-2xl font-bold text-app-primary">{title}</h1>

      {(description || linkText) && (
        <p className="text-xs text-app-tertiary">
          {description}

          {linkText && linkHref && (
            <Link
              href={linkHref}
              className="ml-2 text-sm text-app-secondary transition-colors duration-300 hover:text-primary"
            >
              {linkText}
            </Link>
          )}
        </p>
      )}
    </div>
  );
};
