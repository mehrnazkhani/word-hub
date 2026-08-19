"use client";

import { useUser } from "@/components/providers/user-provider";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { HeaderBreadcrumb } from "./HeaderBreadcrumb";
import { UserAccount } from "./user-account/UserAccount";
import { SearchWord } from "../search-word/SearchWord";

export const AppHeader = () => {
  const { user } = useUser();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 bg-background px-5">
      <div className="flex flex-1 items-center gap-2">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <HeaderBreadcrumb />
      </div>

      <div className="ml-auto">
        <div className="flex items-center gap-2">
          <SearchWord />
          {user && <UserAccount fullName={user?.user_metadata.full_name} />}
        </div>
      </div>
    </header>
  );
};
