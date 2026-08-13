import type { CategoryId } from "@/features/practices/practice-modes/PracticeCategoryList";

export const ROUTES = {
  HOME: "/",
  PRACTICE: "/app/practice",
  PRACTICE_Mode: (practiceMode: string, categoryId: CategoryId) =>
    `/practice/${practiceMode}?category=${categoryId}`,

  CHANGE_EMAIL: "/account/change-email",
  EDIT_NAME: "/account/edit-name",
  CHANGE_PASSWORD: "/account/change-password",

  APP: "/app",
  TRASH: "/app/trash",
  RECENT: "/app/recent",
  CATEGORY: (categoryId: number) => `/app/${categoryId}`,
  WORD_IN_CATEGORY: (categoryId: number, wordId: number) =>
    `/app/${categoryId}#word-${wordId}`,

  AUTH_CONFIRM: "/auth/confirm",
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  CHECK_EMAIL: (email?: string) =>
    email
      ? `/auth/check-email?email=${encodeURIComponent(email)}`
      : "/auth/check-email",
} as const;

export const API_ROUTES = {
  SEARCH_WORD: (query: string, limit = 15) =>
    `/api/search/word?q=${encodeURIComponent(query)}&limit=${limit}`,
  ai_FILL_WORD: "/api/ai/fill-word",
} as const;
