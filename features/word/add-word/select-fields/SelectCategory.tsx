import { SelectItem } from "@/components/ui/select";
import { FormSelect } from "@/components/inputs/FormSelect";
import { useCategoriesStore } from "@/stores/categories.store";

type SelectCategoryProps = {
  name: string;
  label?: string;
  placeholder?: string;
};

export const SelectCategory = ({
  name,
  label,
  placeholder,
}: SelectCategoryProps) => {
  const categories = useCategoriesStore((state) => state.categories);

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
