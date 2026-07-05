"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "./getCategories";
import { categoryKeys } from "../queries";

const DROP_CATEGORY = {
  id: null,
  name: "Drop",
} as const;

export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: getCategories,
    select: (data) => [DROP_CATEGORY, ...data],
  });
};
