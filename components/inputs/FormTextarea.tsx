import { Textarea } from "../ui/textarea";
import { createFormField } from "./FormBase";

type FormTextareaProps = {
  placeholder?: string;
  rows?: number;
};

export const FormTextarea = createFormField<FormTextareaProps>(
  (field, { placeholder, rows = 4 }) => (
    <Textarea
      {...field}
      placeholder={placeholder}
      rows={rows}
      className="resize-none"
    />
  ),
);
