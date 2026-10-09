"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { createFormField } from "@/components/inputs/FormBase";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryDropdownContent } from "@/components/category/CategoryDropdownContent";
import { useUserCategories } from "@/queries/categories/useCategories";

type SelectCategoryExtraProps = {
  placeholder?: string;
  disabled?: boolean;
};

const BaseSelectCategory = createFormField<SelectCategoryExtraProps>(
  ({ onChange, onBlur, value, ...field }, { placeholder, disabled }) => {
    const { data: categories } = useUserCategories();

    const normalizedValue =
      value && value !== "null" ? String(value) : "";
    const selectedId = normalizedValue ? Number(normalizedValue) : null;
    const selectedCategory = categories?.find((c) => c.id === selectedId);

    const isDisabled = field.disabled || disabled;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            id={field.id}
            disabled={isDisabled}
            onBlur={onBlur}
            aria-invalid={field["aria-invalid"]}
            className="w-full cursor-pointer justify-between font-normal aria-invalid:border-destructive"
          >
            <span
              className={cn(
                "min-w-0 flex-1 truncate text-left",
                !selectedCategory && "text-muted-foreground",
              )}
            >
              {selectedCategory ? selectedCategory.name : placeholder}
            </span>
            <ChevronDown
              size={13}
              className="shrink-0 opacity-50"
            />
          </Button>
        </DropdownMenuTrigger>

        <CategoryDropdownContent
          align="end"
          selectedId={selectedId}
          onSelect={(categoryId) => onChange(String(categoryId))}
        />
      </DropdownMenu>
    );
  },
);

type SelectCategoryProps = {
  name: string;
  label?: string;
  labelClassName?: string;
  placeholder?: string;
  disabled?: boolean;
};

export const SelectCategory = ({
  label,
  labelClassName,
  placeholder = "Select Category",
  ...rest
}: SelectCategoryProps) => (
  <BaseSelectCategory
    label={label ?? placeholder}
    labelClassName={labelClassName}
    placeholder={placeholder}
    {...rest}
  />
);
