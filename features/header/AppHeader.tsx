"use client";

import { useUser } from "@/components/providers/user-provider";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { HeaderBreadcrumb } from "./HeaderBreadcrumb";
import { UserAccount } from "./user-account/UserAccount";
import { SearchWord } from "../search-word/SearchWord";
import { PermanentDeleteAllButton } from "../word/word-list/deleted-word/PermanentDeleteAllButton";
import { usePageTitle } from "./usePageTitle";

export const AppHeader = () => {
  const { user } = useUser();
  const { isTrash } = usePageTitle();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 overflow-hidden bg-background px-5">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <SidebarTrigger className="shrink-0" />
        <Separator
          orientation="vertical"
          className="mr-2 shrink-0 data-[orientation=vertical]:h-4"
        />
        <HeaderBreadcrumb />
      </div>

      <div className="ml-auto shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {isTrash && <PermanentDeleteAllButton />}
            <SearchWord />
          </div>

          {user && <UserAccount fullName={user?.user_metadata.full_name} />}
        </div>
      </div>
    </header>
  );
};
