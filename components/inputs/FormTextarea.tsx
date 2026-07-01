import { Textarea } from "../ui/textarea";
import { createFormField } from "./FormBase";

export const FormTextarea = createFormField((field) => <Textarea {...field} />);
