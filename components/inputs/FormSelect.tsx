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
};

export const FormSelect = createFormField<FormSelectProps>(
  ({ onChange, onBlur, ...field }, { children, placeholder }) => (
    <Select {...field} onValueChange={onChange}>
      <SelectTrigger
        id={field.id}
        onBlur={onBlur}
        className="w-full cursor-pointer text-xs"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  ),
);
