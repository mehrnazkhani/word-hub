"use client";

import { SelectItem } from "@/components/ui/select";
import { FormSelect } from "@/components/inputs/FormSelect";
import { CEFR_LEVELS } from "@/constants/cefr-levels";

type SelectCEFRLevelProps = {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

export const SelectCEFRLevel = ({
  name,
  label,
  placeholder = "Level",
  disabled = false,
}: SelectCEFRLevelProps) => {
  return (
    <FormSelect
      name={name}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      renderValue={(value) => {
        const level = CEFR_LEVELS.find((l) => l.value === value);
        return level ? <span>{level.value}</span> : null;
      }}
    >
      {CEFR_LEVELS.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </FormSelect>
  );
};
