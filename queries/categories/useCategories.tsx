"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "./getCategories";
import { categoryKeys } from "../queries";

export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: getCategories,
  });
};
