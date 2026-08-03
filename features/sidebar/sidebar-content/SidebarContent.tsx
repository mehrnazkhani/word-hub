import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarContent as Content,
} from "@/components/ui/sidebar";
import { CategoriesList } from "../../category/CategoriesList";

export const SidebarContent = () => {
  return (
    <Content>
      <SidebarGroup className="flex h-full flex-col">
        <SidebarGroupLabel className="uppercase">Categories</SidebarGroupLabel>
        <div className="min-h-0 flex-1 scroll-fade overflow-y-auto px-3">
          <CategoriesList />
        </div>
      </SidebarGroup>
    </Content>
  );
};
