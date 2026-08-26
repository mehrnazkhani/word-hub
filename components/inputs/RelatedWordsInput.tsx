import { CircleHelp } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InputGroupButton } from "@/components/ui/input-group";
import { FormInput } from "./FormInput";

type RelatedWordsInputProps = {
  name: "synonyms" | "antonyms";
  placeholder: string;
};

export const RelatedWordsInput = ({
  name,
  placeholder,
}: RelatedWordsInputProps) => {
  return (
    <FormInput
      name={name}
      label={placeholder}
      placeholder={placeholder}
      endAdornment={
        <Popover>
          <PopoverTrigger asChild>
            <InputGroupButton
              type="button"
              size="icon-xs"
              variant="ghost"
              tabIndex={-1}
              className="text-muted-foreground hover:text-foreground"
            >
              <CircleHelp className="size-4" />
            </InputGroupButton>
          </PopoverTrigger>

          <PopoverContent className="w-auto px-2 py-1 text-xs" side="top">
            Separate multiple {placeholder.toLowerCase()} with commas.
          </PopoverContent>
        </Popover>
      }
    />
  );
};
