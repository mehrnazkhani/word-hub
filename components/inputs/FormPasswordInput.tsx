"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

import { Input } from "../ui/input";

import { FormBase, type FormControlFunc, type InputProps } from "./FormBase";
import { InputWrapper } from "./InputWrapper";

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
        <InputWrapper>
          <Lock strokeWidth={1} size={16} />
          <Input
            {...field}
            {...inputProps}
            type={showPassword ? "text" : "password"}
          />
          <button
            type="button"
            className="mr-auto cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <Icon size={16} strokeWidth={1} />
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </button>
        </InputWrapper>
      )}
    </FormBase>
  );
};
