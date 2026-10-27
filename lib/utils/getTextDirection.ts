const PERSIAN_SCRIPT_PATTERN = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

export const getTextDirection = (text: string) =>
  PERSIAN_SCRIPT_PATTERN.test(text) ? "rtl" : "ltr";
