"use client";

import { ReactNode } from "react";
import { createFormField } from "./FormBase";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type FormSelectProps = {
  children: ReactNode;
  placeholder?: string;
  renderValue?: (value: string) => ReactNode;
};

export const FormSelect = createFormField<FormSelectProps>(
  ({ onChange, onBlur, ...field }, { children, placeholder, renderValue }) => (
    <Select
      value={
        field.value && field.value !== "null" ? field.value.toString() : ""
      }
      onValueChange={onChange}
      disabled={field.disabled}
    >
      <SelectTrigger
        id={field.id}
        onBlur={onBlur}
        className="w-full cursor-pointer text-xs"
      >
        <SelectValue placeholder={placeholder}>
          {field.value && renderValue ? renderValue(field.value) : undefined}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>{children}</SelectContent>
    </Select>
  ),
);
