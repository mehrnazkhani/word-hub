export const queryKeys = {
  category: {
    all: ["categories"] as const,
    user: (userId?: string) => ["categories", "user", userId] as const,
    byId: (id: string) => ["categories", id] as const,
  },

  word: {
    byCategoryId: (categoryId: number, userId: string) =>
      ["words", categoryId, userId] as const,
    deleted: (userId: string) => ["words", "deleted", userId],
    recent: (userId: string) => ["words", "recent", userId],
    count: (userId: string) => ["words", "count", userId],
    dailySuggestion: (sourceLangId?: number | null, level?: string | null) =>
      ["daily_word", sourceLangId, level] as const,
  },

  settings: {
    user: (userId: string) => ["settings", userId],
  },

  practice: {
    recent: (userId: string) => ["practice", "recent", userId],
  },

  language: {
    all: ["languages"] as const,
  },
};
