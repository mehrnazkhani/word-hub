import { Suspense } from "react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarContent as Content,
} from "@/components/ui/sidebar";

import { CategoriesList } from "./CategoriesList";
import { SidebarCategoriesSkeleton } from "./SidebarCategoriesSkeleton";
import { getCategories } from "@/lib/data/getCategories";

export const SidebarContent = async () => {
  const categories = await getCategories();

  return (
    <Content>
      <SidebarGroup className="flex h-full flex-col">
        <SidebarGroupLabel className="uppercase">Categories</SidebarGroupLabel>

        <Suspense fallback={<SidebarCategoriesSkeleton />}>
          <CategoriesList categories={categories} />
        </Suspense>
      </SidebarGroup>
    </Content>
  );
};
