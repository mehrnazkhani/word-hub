"use client";

import { X } from "lucide-react";
import { SelectItem } from "@/components/ui/select";
import { FormSelect } from "@/components/inputs/FormSelect";
import { ACTIVE_LANGUAGES, getLanguageById } from "@/constants/languages";
import { useFormContext } from "react-hook-form";

type SelectLanguageProps = {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
};

export const SelectLanguage = ({
  name,
  label,
  disabled = false,
  placeholder = "Ln",
  clearable = false,
}: SelectLanguageProps) => {
  const { setValue } = useFormContext();

  return (
    <FormSelect
      name={name}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      onValueChange={(value) => {
        if (value === "__clear__") {
          setValue(name, null, { shouldDirty: true });
        }
      }}
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
      {clearable && (
        <SelectItem
          value="__clear__"
          className="px-1.5 text-accent-foreground/60"
        >
          <X /> None
        </SelectItem>
      )}

      {ACTIVE_LANGUAGES.map((item) => (
        <SelectItem key={item.id} value={String(item.id)}>
          {item.flag} {item.label}
        </SelectItem>
      ))}
    </FormSelect>
  );
};
