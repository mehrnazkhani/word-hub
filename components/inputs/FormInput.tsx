import { Input } from "../ui/input";
import { createFormField, type InputProps } from "./FormBase";
import { InputWrapper } from "./InputWrapper";

export const FormInput = createFormField<InputProps>(
  (field, { icon: Icon, ...inputProps }) => (
    <InputWrapper>
      {Icon && <Icon strokeWidth={1} size={16} />}
      <Input {...field} {...inputProps} />
    </InputWrapper>
  ),
);
