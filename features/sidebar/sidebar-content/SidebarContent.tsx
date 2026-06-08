import Link from "next/link";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarContent as Content,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import categories from "@/lib/mock-data/categories.json";

export const SidebarContent = () => {
  return (
    <Content>
      <SidebarGroup className="flex h-full flex-col">
        <SidebarGroupLabel className="uppercase">Categories</SidebarGroupLabel>

        <SidebarMenu className="ml-3 flex-1 overflow-y-auto border-l pl-2 text-app-secondary">
          {categories &&
            categories.map((category) => (
              <SidebarMenuItem key={category.id}>
                <SidebarMenuButton className="cursor-pointer">
                  <Link href="#">{category.categoryName}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarGroup>
    </Content>
  );
};
