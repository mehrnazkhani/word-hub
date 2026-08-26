import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { createFormField, type InputProps } from "./FormBase";

export const FormInput = createFormField<InputProps>(
  (field, { icon: Icon, endAdornment, ...inputProps }) => (
    <InputGroup className="bg-transparent dark:bg-transparent">
      <InputGroupInput {...field} {...inputProps} />

      {Icon && (
        <InputGroupAddon>
          <Icon strokeWidth={1} size={16} />
        </InputGroupAddon>
      )}

      {endAdornment && (
        <InputGroupAddon align="inline-end">{endAdornment}</InputGroupAddon>
      )}
    </InputGroup>
  ),
);
