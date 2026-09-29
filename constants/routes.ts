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
  ai_SPELLING_CHECK: "/api/ai/spelling-check",
  ai_BASE_FORM_CHECK: "/api/ai/base-form-check",
  ai_POS_CHECK: "/api/ai/pos-check",
} as const;

export const EXTERNAL_ROUTES = {
  TELEGRAM_BOT: (username: string, start?: string) =>
    start
      ? `https://t.me/${username}?start=${encodeURIComponent(start)}`
      : `https://t.me/${username}`,
  TELEGRAM_API: (botToken: string, method: string) =>
    `https://api.telegram.org/bot${botToken}/${method}`,
} as const;
