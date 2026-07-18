import { Textarea } from "../ui/textarea";
import { createFormField } from "./FormBase";

type FormTextareaProps = {
  placeholder?: string;
};

export const FormTextarea = createFormField<FormTextareaProps>(
  (field, { placeholder }) => (
    <Textarea {...field} placeholder={placeholder} className="resize-none" />
  ),
);
