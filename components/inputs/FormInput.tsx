import { Input } from "../ui/input";
import { FormBase, type FormControlFunc, type InputProps } from "./FormBase";
import { InputWrapper } from "./InputWrapper";

export const FormInput: FormControlFunc<InputProps> = (props) => {
  const { control, name, label, description, icon, ...inputProps } = props;
  const Icon = icon;

  return (
    <FormBase
      control={control}
      name={name}
      label={label}
      description={description}
    >
      {(field) => (
        <InputWrapper>
          {Icon && <Icon strokeWidth={1} size={16} />}
          <Input {...field} {...inputProps} />
        </InputWrapper>
      )}
    </FormBase>
  );
};
