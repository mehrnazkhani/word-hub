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
  },

  language: {
    all: ["languages"] as const,
  },
};
