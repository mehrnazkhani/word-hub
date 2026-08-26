"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";

import { FormBase, type FormControlFunc, type InputProps } from "./FormBase";

export const FormPasswordInput: FormControlFunc<InputProps> = (props) => {
  const { control, name, label, description, ...inputProps } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const Icon = showPassword ? Eye : EyeOff;

  return (
    <FormBase
      control={control}
      name={name}
      label={label}
      description={description}
    >
      {(field) => (
        <InputGroup className="bg-transparent dark:bg-transparent">
          <InputGroupInput
            {...field}
            {...inputProps}
            type={showPassword ? "text" : "password"}
          />
          <InputGroupAddon>
            <Lock strokeWidth={1} size={16} />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              type="button"
              size="icon-xs"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <Icon size={16} strokeWidth={1} />
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      )}
    </FormBase>
  );
};
