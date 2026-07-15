"use client";

import { SelectItem } from "@/components/ui/select";
import { FormSelect } from "@/components/inputs/FormSelect";
import { useLanguages } from "@/queries/languages/useLanguages";

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
  const { data: languages, isPending } = useLanguages();

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <FormSelect
      name={name}
      label={label}
      placeholder={placeholder}
      renderValue={(value) => {
        const lang = languages?.find((l) => String(l.id) === value);

        return lang ? (
          <span className="flex items-center gap-1">
            <span>{lang.flag}</span>
            <span>{lang.value}</span>
          </span>
        ) : null;
      }}
    >
      {languages &&
        languages.map((item) => (
          <SelectItem key={item.id} value={String(item.id)}>
            {item.flag} {item.label}
          </SelectItem>
        ))}
    </FormSelect>
  );
};
