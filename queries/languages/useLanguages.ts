"use client";

import { useQuery } from "@tanstack/react-query";
import { getLanguages } from "./getLanguages";

export const useLanguages = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: getLanguages,
  });
};
