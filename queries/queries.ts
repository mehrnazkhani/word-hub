export const queryKeys = {
  category: {
    all: ["categories"] as const,
    user: (userId?: string) => ["categories", "user", userId] as const,
    byId: (categoryId: string, userId?: string) =>
      [...queryKeys.category.user(userId), categoryId] as const,
  },

  word: {
    byCategoryId: (categoryId: number, userId: string) =>
      ["words", categoryId, userId] as const,
    deleted: (userId: string) => ["words", "deleted", userId],
    recent: (userId: string) => ["words", "recent", userId],
    count: (userId: string) => ["words", "count", userId],
    score: (userId: string) => ["words", "score", userId],
    dailySuggestion: (
      sourceLangId?: number | null,
      level?: string | null,
      userId?: string | null,
    ) => ["daily_word", sourceLangId, level, userId] as const,
  },

  settings: {
    user: (userId: string) => ["settings", userId],
  },

  practice: {
    recent: (userId: string) => ["practice", "recent", userId],
    weekly: (userId: string) => ["practice", "weekly", userId],
  },

  language: {
    all: ["languages"] as const,
  },
};
