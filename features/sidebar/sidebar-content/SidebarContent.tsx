import { Suspense } from "react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarContent as Content,
} from "@/components/ui/sidebar";

import { CategoriesList } from "../../category/CategoriesList";
import { SidebarCategoriesSkeleton } from "./SidebarCategoriesSkeleton";

export const SidebarContent = async () => {
  return (
    <Content>
      <SidebarGroup className="flex h-full flex-col">
        <SidebarGroupLabel className="uppercase">Categories</SidebarGroupLabel>

        <Suspense fallback={<SidebarCategoriesSkeleton />}>
          <CategoriesList />
        </Suspense>
      </SidebarGroup>
    </Content>
  );
};
