import { AppIcons } from "@/components/icons";
import { useWordAccordion } from "../WordAccordionContext";
import { formatDate } from "@/lib/utils/formatDate";
import { getRemainingDeletionDays } from "@/lib/utils/getRemainingDeletionDays";

type FooterDateProps = {
  type?: "created" | "deleted";
};

export const FooterDate = ({ type = "created" }: FooterDateProps) => {
  const { word } = useWordAccordion();

  const content =
    type === "created"
      ? word.created_at && formatDate({ date: word.created_at })
      : word.deleted_at && `${getRemainingDeletionDays(word.deleted_at)} Days`;

  if (!content) return null;

  return (
    <p className="flex items-center gap-1 text-foreground/50">
      <AppIcons.CalendarIcon size={12} />
      {content}
    </p>
  );
};
