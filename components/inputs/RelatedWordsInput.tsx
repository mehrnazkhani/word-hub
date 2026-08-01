import { CircleHelp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
            <button
              type="button"
              tabIndex={-1}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <CircleHelp className="size-4" />
            </button>
          </TooltipTrigger>

          <TooltipContent>
            Separate multiple {placeholder.toLowerCase()} with commas.
          </TooltipContent>
        </Tooltip>
      }
    />
  );
};
