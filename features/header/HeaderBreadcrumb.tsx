// features/header/HeaderBreadcrumb.tsx
"use client";

import { useParams } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import { useCategoriesStore } from "@/stores/categories.store";

export const HeaderBreadcrumb = () => {
  const categories = useCategoriesStore((state) => state.categories);
  const { categoryId } = useParams<{ categoryId?: string }>();

  const category = categories.find((item) => item.id === Number(categoryId));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage className="line-clamp-1">
            {category?.name ?? "Categories"}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
