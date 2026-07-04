import { create } from "zustand";
import { getUserSettings } from "@/lib/data/getUserSettings";

export type UserSettings = {
  default_source_lang_id: number | null;
  default_target_lang_id: number | null;
  default_category_id: number | null;
};

type UserSettingsState = {
  settings: UserSettings | null;
  isLoading: boolean;
  error: string | null;
  hasFetched: boolean;

  fetchUserSettings: (force?: boolean) => Promise<void>;
  updateSettingLocally: (patch: Partial<UserSettings>) => void;
  reset: () => void;
};

export const useUserSettingsStore = create<UserSettingsState>((set, get) => ({
  settings: null,
  isLoading: false,
  error: null,
  hasFetched: false,

  fetchUserSettings: async (force = false) => {
    if (get().hasFetched && !force) return;
    if (get().isLoading) return;

    set({ isLoading: true, error: null });

    const data = await getUserSettings();

    if (!data) {
      set({
        error: "Error retrieving user settings.",
        isLoading: false,
        hasFetched: true,
      });
      return;
    }

    set({ settings: data, isLoading: false, hasFetched: true });
  },

  updateSettingLocally: (patch) => {
    set((state) => ({
      settings: state.settings
        ? { ...state.settings, ...patch }
        : (patch as UserSettings),
    }));
  },

  reset: () =>
    set({ settings: null, isLoading: false, error: null, hasFetched: false }),
}));
