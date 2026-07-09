type FormatDateOptions = {
  date: string | Date;
  withTime?: boolean;
  locale?: string;
};

export const formatDate = ({
  date,
  withTime = false,
  locale = "en-US",
}: FormatDateOptions) => {
  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "";
  }

  const isCurrentYear = value.getFullYear() === new Date().getFullYear();

  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    ...(isCurrentYear ? {} : { year: "numeric" }),
    ...(withTime && {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }).format(value);
};
