import { AppIcons } from "@/components/icons";
import { useWordAccordion } from "../WordAccordionContext";

const FooterDate = () => {
  const { word } = useWordAccordion;
  // const date = word.created_at;

  return (
    <p className="flex items-center gap-1">
      <AppIcons.CalendarIcon size={12} />
      {/* {formatShortDate(date)} */}
      {/* {date} */}
    </p>
  );
};

export { FooterDate };
