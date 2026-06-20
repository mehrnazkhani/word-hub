import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { UserAccount } from "./user-account/UserAccount";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const AppHeader = async () => {
  const user = await getCurrentUser();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 bg-background px-2">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1">
                Project Management & Task Tracking
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="ml-auto">
        <div className="flex items-center gap-2">
          {user && <UserAccount fullName={user?.user_metadata.full_name} />}
        </div>
      </div>
    </header>
  );
};
