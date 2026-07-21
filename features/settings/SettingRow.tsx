import { IconBadge } from "@/components/ui/icon-badge";
import type { IconBadgeProps } from "@/components/ui/icon-badge";

type SettingRowProps = {
  icon: IconBadgeProps;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export const SettingRow = ({
  icon,
  title,
  description,
  children,
}: SettingRowProps) => {
  return (
    <div className="flex items-center justify-between gap-8">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <IconBadge {...icon} />
          {title}
        </div>

        <p className="ml-8 text-xs text-accent-foreground/60">{description}</p>
      </div>

      {children}
    </div>
  );
};
