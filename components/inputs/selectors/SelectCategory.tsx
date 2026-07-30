import { SelectItem } from "@/components/ui/select";
import { FormSelect } from "@/components/inputs/FormSelect";
import { useUserCategories } from "@/queries/categories/useCategories";

type SelectCategoryProps = {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

export const SelectCategory = ({
  name,
  label,
  disabled = false,
  placeholder = "Select Category",
}: SelectCategoryProps) => {
  const { data: categories } = useUserCategories();

  return (
    <FormSelect name={name} label={label} placeholder={placeholder}>
      {categories?.map((item) => (
        <SelectItem key={item.id} value={String(item.id)}>
          {item.name}
        </SelectItem>
      ))}
    </FormSelect>
  );
};
