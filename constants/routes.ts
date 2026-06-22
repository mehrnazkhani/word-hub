export const ROUTES = {
  HOME: "/",

  TRASH: "/app/trash",

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
