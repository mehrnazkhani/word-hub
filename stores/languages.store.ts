import { create } from "zustand";

import type { getLanguages } from "@/lib/data/getLanguages";

type Languages = Awaited<ReturnType<typeof getLanguages>>;
type Language = NonNullable<Languages>[number];

type LanguagesStore = {
  languages: Language[];
  setLanguages: (languages: Language[]) => void;
};

export const useLanguagesStore = create<LanguagesStore>((set) => ({
  languages: [],
  setLanguages: (languages) => set({ languages }),
}));
