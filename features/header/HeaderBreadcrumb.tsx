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
        <BreadcrumbItem>
          <BreadcrumbPage className="line-clamp-1">
            {name}
            {wordCount !== undefined && (
              <span className="ml-2 text-xs font-normal text-foreground/40 tabular-nums">
                {wordCount} words
              </span>
            )}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
