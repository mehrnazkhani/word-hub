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
        <CategoriesList />
      </SidebarGroup>
    </Content>
  );
};
