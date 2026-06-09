"use client";
import { useState } from "react";

import { Input } from "../ui/input";
import { AppIcons } from "../icons";

import { FormBase, type FormControlFunc, type InputProps } from "./FormBase";
import { InputWrapper } from "./InputWrapper";

export const FormPasswordInput: FormControlFunc<InputProps> = (props) => {
  const { control, name, label, description, ...inputProps } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormBase
      control={control}
      name={name}
      label={label}
      description={description}
    >
      {(field) => (
        <InputWrapper>
          <AppIcons.LockIcon strokeWidth={1} size={16} />
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
            {showPassword ? (
              <AppIcons.EyeIcon size={16} strokeWidth={1} />
            ) : (
              <AppIcons.EyeOffIcon size={16} strokeWidth={1} />
            )}
          </button>
        </InputWrapper>
      )}
    </FormBase>
  );
};
