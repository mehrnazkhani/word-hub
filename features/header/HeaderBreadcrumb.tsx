"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { usePageTitle } from "./usePageTitle";

export const HeaderBreadcrumb = () => {
  const { name, wordCount } = usePageTitle();

  return (
    <Breadcrumb className="min-w-0 flex-1 overflow-hidden">
      <BreadcrumbList className="flex-nowrap overflow-hidden">
        <BreadcrumbItem className="min-w-0 flex-1 overflow-hidden">
          <BreadcrumbPage className="flex min-w-0 flex-1 items-center overflow-hidden">
            <span className="min-w-0 truncate">{name}</span>

            {wordCount !== undefined && (
              <span className="ml-2 shrink-0 text-xs font-normal text-foreground/60 tabular-nums">
                {wordCount} words
              </span>
            )}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
