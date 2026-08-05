import { Switch } from "../ui/switch";
import { createFormField } from "./FormBase";

type FormSwitchProps = {
  disabled?: boolean;
};

export const FormSwitch = createFormField<FormSwitchProps>(
  (field, { disabled }) => (
    <Switch
      checked={!!field.value}
      onCheckedChange={field.onChange}
      disabled={disabled}
      onBlur={field.onBlur}
      name={field.name}
      className="cursor-pointer"
    />
  ),
);
