import { SelectItem } from "@/components/ui/select";
import { FormSelect } from "@/components/inputs/FormSelect";
import { useLanguages } from "@/hooks/useLanguages";

type SelectLanguageProps = {
  name: string;
  label?: string;
  placeholder?: string;
};

export const SelectLanguage = ({
  name,
  label,
  placeholder = "Ln",
}: SelectLanguageProps) => {
  const languages = useLanguages();

  return (
    <FormSelect
      name={name}
      label={label}
      placeholder={placeholder}
      renderValue={(value) => {
        const lang = languages.find((l) => l.value === value);

        return lang ? (
          <span className="flex items-center gap-2">
            <span>{lang.flag}</span>
            <span>{lang.value}</span>
          </span>
        ) : null;
      }}
    >
      {languages.map((item) => (
        <SelectItem key={item.id} value={item.value}>
          {item.flag} {item.label}
        </SelectItem>
      ))}
    </FormSelect>
  );
};
