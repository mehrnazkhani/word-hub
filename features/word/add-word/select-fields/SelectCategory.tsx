import { SelectItem } from "@/components/ui/select";
import { FormSelect } from "@/components/inputs/FormSelect";
import { useCategoriesStore } from "@/stores/categories.store";

export const SelectCategory = () => {
  const categories = useCategoriesStore((state) => state.categories);

  return (
    <FormSelect
      name="categoryId"
      label="Select category"
      placeholder="Select Category"
    >
      {categories?.map((item) => (
        <SelectItem key={item.id} value={item.id.toString()}>
          {item.name}
        </SelectItem>
      ))}
    </FormSelect>
  );
};
