import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export const SidebarCategoriesSkeleton = () => {
  return (
    <SidebarMenu className="ml-3 flex-1 overflow-y-auto border-l pl-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <Skeleton className="h-8 w-full rounded-md" />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
