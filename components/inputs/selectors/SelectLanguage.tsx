"use client";

import { SelectItem } from "@/components/ui/select";
import { FormSelect } from "@/components/inputs/FormSelect";
import { ACTIVE_LANGUAGES, getLanguageById } from "@/constants/languages";

type SelectLanguageProps = {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

export const SelectLanguage = ({
  name,
  label,
  disabled = false,
  placeholder = "Ln",
}: SelectLanguageProps) => {
  return (
    <FormSelect
      name={name}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      renderValue={(value) => {
        const lang = getLanguageById(value);

        return lang ? (
          <span className="flex items-center gap-1">
            <span>{lang.flag}</span>
            <span>{lang.value}</span>
          </span>
        ) : null;
      }}
    >
      {ACTIVE_LANGUAGES.map((item) => (
        <SelectItem key={item.id} value={String(item.id)}>
          {item.flag} {item.label}
        </SelectItem>
      ))}
    </FormSelect>
  );
};
