"use client";

import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";

import { SelectItem } from "@/components/ui/select";
import { FormSelect } from "@/components/inputs/FormSelect";
import { PARTS_OF_SPEECH } from "@/schemas/word/word.shared";

export const SelectPartOfSpeech = () => {
  const { setValue } = useFormContext();

  return (
    <FormSelect
      name="partOfSpeech"
      label="Part of Speech"
      placeholder="Noun, verb..."
      onValueChange={(value) => {
        if (value === "__clear__") {
          setValue("partOfSpeech", null, { shouldDirty: true });
        }
      }}
    >
      {PARTS_OF_SPEECH.map((item) => (
        <SelectItem key={item} value={item}>
          {item}
        </SelectItem>
      ))}

      <SelectItem value="__clear__" className="text-accent-foreground/60">
        <X className="size-3" /> none
      </SelectItem>
    </FormSelect>
  );
};
