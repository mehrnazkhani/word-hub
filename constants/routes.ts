export const ROUTES = {
  HOME: "/",

  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  FORGOT_PASSWORD: "/auth/forgot-password",
  CHECK_EMAIL: (email?: string) =>
    email
      ? `/auth/check-email?email=${encodeURIComponent(email)}`
      : "/auth/check-email",
} as const;
