import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export const CategorySkeleton = () => {
  return (
    <SidebarMenu className="space-y-1">
      {Array.from({ length: 12 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuButton asChild>
            <Skeleton
              className="h-8"
              style={{
                backgroundColor: `color-mix(in srgb, var(--muted) ${
                  100 - index * 7
                }%, transparent)`,
              }}
            />
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
