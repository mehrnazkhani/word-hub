import { Checkbox } from "../ui/checkbox";
import { FormBase, FormControlFunc } from "./FormBase";

export const FormCheckbox: FormControlFunc = (props) => {
  return (
    <FormBase {...props} horizontal controlFirst>
      {({ onChange, value, ...field }) => (
        <Checkbox
          className="cursor-pointer"
          {...field}
          checked={value}
          onCheckedChange={onChange}
        />
      )}
    </FormBase>
  );
};
