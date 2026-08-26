import { CircleHelp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
        <Tooltip>
          <TooltipTrigger asChild>
            <InputGroupButton
              type="button"
              size="icon-xs"
              variant="ghost"
              tabIndex={-1}
              className="text-muted-foreground hover:text-foreground"
            >
              <CircleHelp className="size-4" />
            </InputGroupButton>
          </TooltipTrigger>

          <TooltipContent>
            Separate multiple {placeholder.toLowerCase()} with commas.
          </TooltipContent>
        </Tooltip>
      }
    />
  );
};
