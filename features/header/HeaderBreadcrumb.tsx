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
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="min-w-0">
          <BreadcrumbPage className="flex min-w-0 items-center">
            <span className="truncate">{name}</span>

            {wordCount !== undefined && (
              <span className="ml-2 shrink-0 text-xs font-normal text-foreground/40 tabular-nums">
                {wordCount} words
              </span>
            )}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
